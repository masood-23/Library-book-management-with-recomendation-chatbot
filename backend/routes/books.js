const express = require('express');
const router = express.Router();
const Book = require('../models/Book');


// GET all books
router.get('/', async (req, res) => {
const books = await Book.find().sort({ title: 1 });
res.json(books);
});


// GET book by id
router.get('/:id', async (req, res) => {
const book = await Book.findById(req.params.id);
if (!book) return res.status(404).json({ error: 'Not found' });
res.json(book);
});


// CREATE book
router.post('/', async (req, res) => {
const data = req.body;
const book = new Book(data);
await book.save();
res.status(201).json(book);
});


// UPDATE book
router.put('/:id', async (req, res) => {
const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!book) return res.status(404).json({ error: 'Not found' });
res.json(book);
});


// DELETE book
router.delete('/:id', async (req, res) => {
await Book.findByIdAndDelete(req.params.id);
res.json({ ok: true });
});


module.exports = router;