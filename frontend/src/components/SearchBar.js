import React from "react";
import { Form } from "react-bootstrap";

export default function SearchBar({ onSearch }) {
  return (
    <Form className="mb-3">
      <Form.Control
        type="text"
        placeholder="Search by title or author..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </Form>
  );
}
