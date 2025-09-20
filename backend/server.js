import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

import bookRoutes from "./routes/bookRoutes.js";
import books from "./routes/books.js";
import recommend from "./routes/recommend.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

// Configure environment variables
dotenv.config();

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello Gemini!");
    console.log("✅ Gemini AI connected:", result.response.text());
  } catch (error) {
    console.error("❌ Gemini AI connection failed:", error.message);
  }
}

// Test Gemini connection
testGemini();
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
