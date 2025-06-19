import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {user && <Link to={`/users/${user._id}`} className="hover:underline">My Profile</Link>}
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <img
              src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${user.avatarSeed}`}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm">{user.name}</span>
            <button onClick={handleLogout} className="text-sm text-red-400 hover:underline ml-2">
              Logout
            </button>
          </>
        ) : (
          <Link to="/signin" className="text-sm hover:underline">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

