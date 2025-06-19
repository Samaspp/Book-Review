import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-[250px] flex flex-col gap-2">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-72 object-cover rounded"
      />
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600 italic">{book.author}</p>
      <Link
        to={`/books/${book._id}`}
        className="text-blue-500 hover:underline mt-auto"
      >
        View Details →
      </Link>
    </div>
  );
}
