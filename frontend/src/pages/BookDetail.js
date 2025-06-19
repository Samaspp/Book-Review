import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import ReviewForm from '../components/ReviewForm';


export default function BookDetail() {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch book data
    api.get(`/books/${id}`)
      .then(res => setBook(res.data.data || res.data))
      .catch(err => console.error('Failed to fetch book:', err));

    // Fetch reviews for this book
    api.get(`/reviews?bookId=${id}`)
      .then(res => setReviews(res.data.data || res.data))
      .catch(err => console.error('Failed to fetch reviews:', err));
  }, [id]);

  if (!book) return <p className="text-center p-8 text-gray-500">Loading book...</p>;

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Book Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-64 h-[400px] object-cover rounded-md shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-lg text-gray-700">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Genre:</strong> {book.genre}
            </p>
            <p className="mt-4 text-gray-800">{book.description}</p>
          </div>
        </div>

        {/* Average Rating */}
        {reviews.length > 0 && (
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-800">Average Rating:</p>
            <div className="flex items-center text-yellow-500 text-2xl">
              {
                (() => {
                  const avg = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;
                  const rounded = Math.round(avg);
                  return Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < rounded ? '★' : '☆'}</span>
                  ));
                })()
              }
              <span className="text-sm text-gray-600 ml-2">
                ({reviews.length} review{reviews.length > 1 ? 's' : ''})
              </span>
            </div>
          </div>
        )}

        {/* Review Form */}
        <ReviewForm
          bookId={book._id}
          onReviewAdded={(newReview) => setReviews(prev => [newReview, ...prev])}
        />

        <hr className="my-8" />

        {/* Reviews */}
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          reviews.map(review => (
            <div
              key={review._id}
              className="border border-gray-200 p-4 rounded-md shadow-sm mb-4 bg-white"
            >
            <div className="flex items-center gap-3 mb-1">
            <img
              src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${review.user.avatarSeed}`}
              alt={review.user.name}
              className="w-10 h-10 rounded-full"
            />
              <p className="text-sm text-gray-600 mb-1 font-medium">{review.user}</p>
            </div>
              <div className="text-yellow-500 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-lg">
                    {i < review.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>

              <p className="text-gray-800">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
        </div>
    </div>
  );
}
