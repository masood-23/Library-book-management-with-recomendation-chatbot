import React, { useState, useRef, useEffect } from "react";
import { fetchRecommendByText } from "../api";
import { Card, Button, Form } from "react-bootstrap";

export default function Chatbot() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const convRef = useRef(null);

  useEffect(() => {
    if (convRef.current) convRef.current.scrollTop = convRef.current.scrollHeight;
  }, [messages]);

  async function send() {
    if (!text.trim()) return;
    setMessages((m) => [...m, { who: "user", text }]);
    const q = text;
    setText("");

    try {
      const res = await fetchRecommendByText(q);
      setMessages((m) => [...m, { who: "bot", text: "Here are suggestions:" }]);
      if (Array.isArray(res) && res.length) {
        setMessages((m) => [
          ...m,
          ...res.map((r) => ({ who: "bot", text: `${r.book.title} — ${r.book.author}` })),
        ]);
      } else {
        setMessages((m) => [...m, { who: "bot", text: "No recommendations found." }]);
      }
    } catch {
      setMessages((m) => [...m, { who: "bot", text: "Error fetching recommendations." }]);
    }
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="fw-bold">💬 Chatbot</Card.Header>
      <Card.Body ref={convRef} style={{ height: "300px", overflowY: "auto", background: "#f8f9fa" }}>
        {messages.map((m, i) => (
          <div key={i} className={`p-2 mb-2 rounded ${m.who === "user" ? "bg-primary text-white" : "bg-light"}`}>
            {m.text}
          </div>
        ))}
      </Card.Body>
      <Card.Footer className="d-flex">
        <Form.Control
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), send())}
          placeholder="Ask for book suggestions..."
          className="me-2"
        />
        <Button onClick={send} variant="success">Send</Button>
      </Card.Footer>
    </Card>
  );
}
