import React, { useEffect, useState } from 'react';
import api from '../api';
import BookCard from '../components/BookCard';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/books')
      .then(res => setBooks(res.data.data || res.data))
      .catch(err => console.error('Failed to fetch books', err));
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Books</h2>

        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <p className="text-gray-500 mt-4">No books found.</p>
        )}
      </div>
    </div>
  );
}
