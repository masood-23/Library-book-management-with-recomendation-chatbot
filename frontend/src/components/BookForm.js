import React, { useState } from "react";
import { createBook } from "../api";
import { Button, Form } from "react-bootstrap";

export default function BookForm({ onBookAdded }) {
  const [form, setForm] = useState({ title: "", author: "", description: "", genre: "", year: "", copies: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createBook(form);
    setForm({ title: "", author: "", description: "", genre: "", year: "", copies: "" });
    onBookAdded();
  }

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-2"><Form.Control name="title" value={form.title} onChange={handleChange} placeholder="Title" required /></div>
        <div className="col-md-2"><Form.Control name="author" value={form.author} onChange={handleChange} placeholder="Author" required /></div>
        <div className="col-md-2"><Form.Control name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" /></div>
        <div className="col-md-2"><Form.Control name="year" value={form.year} onChange={handleChange} placeholder="Year" /></div>
        <div className="col-md-2"><Form.Control name="copies" type="number" value={form.copies} onChange={handleChange} placeholder="Copies" /></div>
        <div className="col-md-2"><Button type="submit" variant="primary">Add Book</Button></div>
      </div>
    </Form>
  );
}
