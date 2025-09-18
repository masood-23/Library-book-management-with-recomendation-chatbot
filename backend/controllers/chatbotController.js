import axios from "axios";
import UserHistory from "../models/UserHistory.js";

// @desc    Chatbot handler
export const chatbotReply = async (req, res) => {
  try {
    const { message } = req.body;

    // Example: call OpenAI / external API
    const apiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = apiResponse.data.choices[0].message.content;

    // Save history
    const history = new UserHistory({ query: message, response: reply });
    await history.save();

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Chatbot API error" });
  }
};
