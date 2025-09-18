import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    genre: { type: String },
    year: { type: Number },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
