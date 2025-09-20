import React, { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../api";
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
    
    const userMessage = text;
    setMessages((m) => [...m, { who: "user", text: userMessage }]);
    setText("");
    
    // Add typing indicator
    setMessages((m) => [...m, { who: "bot", text: "Typing...", isTyping: true }]);

    try {
      const res = await sendChatMessage(userMessage);
      
      // Remove typing indicator and add response
      setMessages((m) => {
        const withoutTyping = m.filter(msg => !msg.isTyping);
        return [...withoutTyping, { who: "bot", text: res.reply || "Sorry, I couldn't process that." }];
      });
    } catch (error) {
      console.error("Chatbot error:", error);
      // Remove typing indicator and add error message
      setMessages((m) => {
        const withoutTyping = m.filter(msg => !msg.isTyping);
        return [...withoutTyping, { who: "bot", text: "Sorry, I'm having trouble connecting. Please try again later." }];
      });
    }
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="fw-bold">💬 Chatbot</Card.Header>
      <Card.Body ref={convRef} className="d-flex flex-column" style={{ height: "300px", overflowY: "auto", background: "#f8f9fa" }}>
        {messages.map((m, i) => (
          <div key={i} className={`p-2 mb-2 rounded ${m.who === "user" ? "bg-primary text-white ms-auto" : "bg-light"}`} style={{ maxWidth: "80%", alignSelf: m.who === "user" ? "flex-end" : "flex-start" }}>
            {m.isTyping ? (
              <span className="d-flex align-items-center">
                <span className="me-2">{m.text}</span>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </span>
            ) : (
              m.text
            )}
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-muted text-center p-4">
            👋 Hi! I'm your library assistant. Ask me for book recommendations!
          </div>
        )}
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
