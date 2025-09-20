import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api";
import BookCard from "./BookCard";
import BookForm from "./BookForm";
import SearchBar from "./SearchBar";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const { data } = await getBooks();
      setBooks(data);
      setFiltered(data);
    } catch (error) {
      console.error('Error loading books:', error);
      alert('Failed to load books. Please refresh the page.');
    }
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        loadBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book. Please try again.');
      }
    }
  }

  function handleUpdate(book) {
    setEditingBook(book);
    // Scroll to top to show the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingBook(null);
  }

  function handleBookSaved() {
    loadBooks();
    setEditingBook(null);
  }

  function handleSearch(query) {
    const q = query.toLowerCase();
    setFiltered(books.filter(b => 
      b.title.toLowerCase().includes(q) || 
      b.author.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q)
    ));
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <BookForm 
        onBookAdded={handleBookSaved} 
        editingBook={editingBook}
        onCancelEdit={handleCancelEdit}
      />
      {books.length === 0 ? (
        <div className="text-center text-muted mt-4">
          <h5>No books in the library yet!</h5>
          <p>Add your first book using the form above.</p>
        </div>
      ) : (
        <div className="row mt-3">
          {filtered.length === 0 ? (
            <div className="col-12 text-center text-muted">
              <h6>No books match your search.</h6>
            </div>
          ) : (
            filtered.map((book) => (
              <BookCard 
                key={book._id} 
                book={book} 
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </div>
      )}
      {filtered.length > 0 && (
        <div className="mt-4 text-center text-muted">
          <small>Showing {filtered.length} of {books.length} books</small>
        </div>
      )}
    </div>
  );
}
