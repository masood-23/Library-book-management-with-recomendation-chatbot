import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import bookRoutes from "./routes/bookRoutes.js";
import books from "./routes/books.js";
import recommend from "./routes/recommend.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/books-alt", books); // alias
app.use("/api/recommend", recommend);
app.use("/api/chatbot", chatbotRoutes);

app.get("/", (req, res) => {
  res.send("📚 Book + Chatbot API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
