import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', bio: '' });
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user
    api.get(`/users/${id}`)
      .then(res => {
        const u = res.data.data || res.data;
        setUser(u);
        setForm({ name: u.name, email: u.email, bio: u.bio || '' });

        // Fetch user's reviews
        api.get(`/reviews?userId=${u._id}`)
          .then(r => setReviews(r.data.data || r.data))
          .catch(() => setReviews([]));
      })
      .catch(() => {
        setMessage('Failed to load user.');
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.put(`/users/${id}`, form);
      setUser(res.data.data || res.data);
      setEditing(false);
      setMessage(' Profile updated!');
    } catch (err) {
      console.error(err);
      setMessage(' Failed to update profile.');
    }
  };

  if (!user) return <p className="text-center text-gray-500 p-8">Loading profile...</p>;

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <img
            src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${user.avatarSeed}`}

            alt={user.name}
            className="w-24 h-24 rounded-full border object-cover"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            {user.bio && (
              <p className="text-sm text-gray-500 mt-2 italic">"{user.bio}"</p>
            )}
          </div>
        </div>

        {/* Edit Button */}
        <div className="text-right mb-4">
          <button
            onClick={() => setEditing(!editing)}
            className="text-sm text-blue-600 hover:underline"
          >
            {editing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {/* Edit Form */}
        {editing && (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
            {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
          </form>
        )}

        <hr className="my-6" />

        {/* Reviews */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews by {user.name}</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={r._id}
                className="border border-gray-200 p-4 rounded shadow-sm bg-gray-50"
              >
                <Link to={`/books/${r.bookId}`} className="text-blue-600 font-semibold hover:underline">
                  View Book →
                </Link>

                <div className="flex items-center mt-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < r.rating ? '★' : '☆'}</span>
                  ))}
                </div>

                {r.comment && (
                  <p className="text-gray-700 mt-2">{r.comment}</p>
                )}

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
