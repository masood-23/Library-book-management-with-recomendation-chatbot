import React from 'react';
import BookCard from './BookCard';

export default function BookList({ books, reload }) {
  if (!books || books.length === 0) return <div>No books found.</div>;
  return (
    <div>
      {books.map(b => (
        <BookCard key={b._id || b.id} book={b} reload={reload} />
      ))}
    </div>
  );
}
