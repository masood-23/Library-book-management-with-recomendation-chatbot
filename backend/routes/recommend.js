import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// Simple recommendation by genre
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const books = await Book.find({
      genre: { $regex: text, $options: "i" },
    }).limit(5);

    res.json(
      books.map((b) => ({
        book: { title: b.title, author: b.author },
        score: Math.random(), // placeholder scoring
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Recommendation error" });
  }
});

export default router;
