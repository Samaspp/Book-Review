import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import BookCard from '../components/BookCard';
import NavBar from '../components/NavBar';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get('/books')
      .then(res => setBooks(res.data.data || res.data))
      .catch(err => console.error('Failed to fetch books:', err));
  }, []);

  return (
     <div className="bg-gray-50 min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Featured Books</h1>
        <p className="mb-6 text-gray-600">
          <Link to="/books" className="text-blue-600 hover:underline">Browse all books →</Link>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
