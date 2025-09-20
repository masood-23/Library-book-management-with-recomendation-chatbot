import express from "express";
import { chatbotReply } from "../controllers/chatbotController.js";

const router = express.Router();

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ message: "Chatbot route is working!" });
});

router.post("/", chatbotReply);

export default router;
