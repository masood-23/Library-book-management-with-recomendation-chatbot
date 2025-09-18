import React, { useState } from 'react';
import { fetchRecommendByBook, deleteBook } from './api';

export default function BookCard({ book, reload }) {
  const [recs, setRecs] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getRecs() {
    setLoading(true);
    try {
      const data = await fetchRecommendByBook(book._id || book.id);
      setRecs(data);
    } catch (err) {
      console.error('recommendation error', err);
      setRecs([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete this book?')) return;
    try {
      await deleteBook(book._id || book.id);
      if (reload) reload();
    } catch (err) {
      console.error('delete error', err);
      alert('Failed to delete');
    }
  }

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <div><strong>Author:</strong> {book.author}</div>
      <div><strong>Genre:</strong> {book.genre}</div>
      <div style={{ marginTop: 8 }}>{book.description}</div>
      <div style={{ marginTop: 8 }}><strong>Copies:</strong> {book.copies}</div>
      <div style={{ marginTop: 8 }}>
        <button onClick={getRecs}>Recommend similar</button>
        <button onClick={handleDelete} style={{ marginLeft: 8 }}>Delete</button>
      </div>

      {loading && <div>Loading recommendations...</div>}

      {recs && recs.length > 0 && (
        <div className="recs">
          <h4>Recommendations</h4>
          {recs.map((r, i) => (
            <div key={i}>
              {r.book.title} — {r.book.author || '—'} (score {Number(r.score).toFixed(3)})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
