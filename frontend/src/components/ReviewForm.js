import React, { useState } from 'react';
import api from '../api';

export default function ReviewForm({ bookId, onReviewAdded }) {
  const [user, setUser] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hover, setHover] = useState(0);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return setMessage('❗ Please fill all fields.');
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await api.post('/reviews', {
        bookId,
        user,
        rating,
        comment
      });

      // Reset form
      setUser('');
      setRating(0);
      setComment('');
      setMessage('Review submitted!');
      onReviewAdded(res.data.data || res.data);
    } catch (err) {
      console.error('Review submission failed', err);
      setMessage('Could not submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-md p-6 mb-8 border border-gray-200"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Leave a Review</h3>

      <input
        type="text"
        placeholder="Your name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex items-center gap-1 mb-4">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      type="button"
      key={star}
      onClick={() => setRating(star)}
      onMouseEnter={() => setHover(star)}
      onMouseLeave={() => setHover(0)}
      className="text-2xl focus:outline-none transition"
    >
      <span className={star <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}>
        ★
      </span>
    </button>
  ))}
  <span className="ml-2 text-sm text-gray-600">{rating} / 5</span>
</div>


      <textarea
        placeholder="Write your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="w-full border border-gray-300 p-2 rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>

      {message && (
        <p className="mt-4 text-sm text-gray-700">{message}</p>
      )}
    </form>
  );
}
