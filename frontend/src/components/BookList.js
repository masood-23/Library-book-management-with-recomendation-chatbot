import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api";
import BookCard from "./BookCard";
import BookForm from "./BookForm";
import SearchBar from "./SearchBar";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    const { data } = await getBooks();
    setBooks(data);
    setFiltered(data);
  }

  async function handleDelete(id) {
    await deleteBook(id);
    loadBooks();
  }

  function handleSearch(query) {
    const q = query.toLowerCase();
    setFiltered(books.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)));
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <BookForm onBookAdded={loadBooks} />
      <div className="row mt-3">
        {filtered.map((book) => (
          <BookCard key={book._id} book={book} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
