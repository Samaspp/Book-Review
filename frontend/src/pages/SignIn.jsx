// src/pages/SignIn.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/users')
      .then(res => setUsers(res.data.data || res.data))
      .catch(() => setUsers([]));
  }, []);

  const handleLogin = () => {
    const user = users.find(u => u._id === selected);
    if (user) {
      login(user);
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <select
        className="w-full p-2 border mb-4"
        value={selected}
        onChange={e => setSelected(e.target.value)}
      >
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        disabled={!selected}
      >
        Login
      </button>
    </div>
  );
}
