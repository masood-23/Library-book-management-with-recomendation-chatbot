import React from "react";
import { Button, Card } from "react-bootstrap";

export default function BookCard({ book, onDelete, onUpdate }) {
  return (
    <div className="col-md-4 mb-3">
      <Card>
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
          <Card.Text>
            <strong>Genre:</strong> {book.genre}<br />
            <strong>Year:</strong> {book.year}<br />
            <strong>Available Copies:</strong> 
            <span className={`badge ${book.copies > 0 ? 'bg-success' : 'bg-danger'} ms-1`}>
              {book.copies || 0}
            </span>
          </Card.Text>
          <div className="d-flex gap-2">
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => onUpdate(book)}
            >
              Update
            </Button>
            <Button 
              variant="danger" 
              size="sm"
              onClick={() => onDelete(book._id)}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
