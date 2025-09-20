import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    genre: { type: String },
    year: { type: Number },
    copies: { type: Number, default: 1, min: 0 },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
