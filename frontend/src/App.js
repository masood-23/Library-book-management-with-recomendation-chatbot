import React, { useEffect, useState } from 'react';
import { fetchBooks } from './components/api';
import BookList from './components/BookList';
import Chatbot from './components/Chatbot';

export default function App() {
  const [books, setBooks] = useState([]);

  async function load() {
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      console.error('Failed to fetch books', err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <h1>MERN Library</h1>
      <div className="grid">
        <div className="catalog">
          <h2>Catalog</h2>
          <BookList books={books} reload={load} />
        </div>
        <div className="chat">
          <h2>Recommendation Chatbot</h2>
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
