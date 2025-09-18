import React from "react";
import { Button, Card } from "react-bootstrap";

export default function BookCard({ book, onDelete }) {
  return (
    <div className="col-md-4 mb-3">
      <Card>
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
          <Card.Text>
            {book.description}<br />
            <strong>Genre:</strong> {book.genre}<br />
            <strong>Year:</strong> {book.year}<br />
            <strong>Copies:</strong> {book.copies}
          </Card.Text>
          <Button variant="danger" onClick={() => onDelete(book._id)}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
