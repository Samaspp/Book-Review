import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import UserProfile from './pages/UserProfile';
import NavBar from './components/NavBar';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
        <AuthProvider>
         <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/users/:id" element={<UserProfile />} />
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
