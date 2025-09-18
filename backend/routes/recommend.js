const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const UserHistory = require('../models/UserHistory');


// Helper: tokenize and build term-frequency vector
function tokenize(text) {
    if (!text) return [];
    return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2); // remove tiny tokens
}


function buildTF(docs) {
// docs: array of strings
    const vocab = new Map();
    const docTokens = docs.map(d => tokenize(d));


    docTokens.forEach(tokens => {
        tokens.forEach(t => {
            if (!vocab.has(t)) vocab.set(t, vocab.size);
        });
    });


    const vectors = docTokens.map(tokens => {
        const vec = new Array(vocab.size).fill(0);
        tokens.forEach(t => {
            const idx = vocab.get(t);
            if (idx !== undefined) vec[idx] += 1;
        });
        return vec;
    });


    return { vocab, vectors };
}


function dot(a, b) {
    let s = 0;
    const n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) s += a[i] * b[i];
    return s;
}


function norm(a) {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += a[i] * a[i];
    return Math.sqrt(s);
}


function cosine(a, b) {
    const na = norm(a);
    const nb = norm(b);
    if (na === 0 || nb === 0) return 0;
    return dot(a, b) / (na * nb);
}


// Recommend by text
router.post('/by-text', async (req, res) => {
    const { text, top = 5 } = req.body || {};
    if (!text) return res.status(400).json({ error: 'text required' });


    // store history
    await UserHistory.create({ query: text });


    const books = await Book.find();
    const descriptions = books.map(b => b.description || '');
    const docs = descriptions.concat([text]); // append query as last doc
    const { vocab, vectors } = buildTF(docs);
    const queryVec = vectors[vectors.length - 1];
    const scores = vectors.slice(0, -1).map(v => cosine(v, queryVec));
    const results = books.map((b, i) => ({ book: b, score: scores[i] }));
    results.sort((a, b) => b.score - a.score);
    res.json(results.slice(0, top));
});


// Recommend by book id
router.get('/by-book/:id', async (req, res) => {
const top = parseInt(req.query.top || '5', 10);
const books = await Book.find();
const idx = books.findIndex(b => b._id.toString() === req.params.id);
if (idx === -1) return res.status(404).json({ error: 'book not found' });
const descriptions = books.map(b => b.description || '');
const { vocab, vectors } = buildTF(descriptions);
const queryVec = vectors[idx];
const scores = vectors.map(v => cosine(v, queryVec));
const results = books.map((b, i) => ({ book: b, score: scores[i], index: i }));
results.sort((a, b) => b.score - a.score);
const filtered = results.filter(r => r.book._id.toString() !== req.params.id).slice(0, top);
res.json(filtered);
});


module.exports = router;