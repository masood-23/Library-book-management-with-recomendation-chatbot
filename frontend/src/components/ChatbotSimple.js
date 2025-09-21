import React, { useState } from "react";
import { sendChatMessage } from "../api";

export default function ChatbotSimple() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  async function send() {
    if (!text.trim() || isTyping) return;
    
    const userMessage = text.trim();
    
    // Add user message
    setMessages((m) => [...m, { 
      id: Date.now(), 
      who: "user", 
      text: userMessage
    }]);
    setText("");
    setIsTyping(true);

    try {
      const res = await sendChatMessage(userMessage);
      
      // Add bot response
      setTimeout(() => {
        setMessages((m) => [...m, { 
          id: Date.now() + 1, 
          who: "bot", 
          text: res.reply || "Sorry, I couldn't process that request."
        }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Chatbot error:", error);
      setTimeout(() => {
        setMessages((m) => [...m, { 
          id: Date.now() + 1, 
          who: "bot", 
          text: "Sorry, I'm experiencing connection issues. Please try again in a moment."
        }]);
        setIsTyping(false);
      }, 1000);
    }
  }

  return (
    <div 
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        border: '1px solid #ddd',
        borderRadius: '15px',
        backgroundColor: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      {/* Header */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '20px',
          borderRadius: '15px 15px 0 0',
          textAlign: 'center'
        }}
      >
        <h4>🤖 AI Library Assistant</h4>
        <small>Online and ready to help</small>
      </div>
      
      {/* Messages Area */}
      <div 
        style={{
          height: '400px',
          overflowY: 'auto',
          padding: '20px',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
        }}
      >
        {messages.map((m) => (
          <div 
            key={m.id}
            style={{
              marginBottom: '16px',
              display: 'flex',
              justifyContent: m.who === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div 
              style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '15px',
                background: m.who === 'user' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : 'white',
                color: m.who === 'user' ? 'white' : 'black',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
            <div 
              style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '15px',
                background: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              🤖 AI is thinking...
            </div>
          </div>
        )}
        
        {/* Welcome Message */}
        {messages.length === 0 && !isTyping && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🤖</div>
            <h5>Welcome to your AI Library Assistant!</h5>
            <p style={{ color: '#6c757d', marginBottom: '20px' }}>
              Ask me for book recommendations, library information, or anything else!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
              <button 
                style={{
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
                onClick={() => setText('Recommend me a science fiction book')}
              >
                "Recommend me a science fiction book"
              </button>
              <button 
                style={{
                  background: '#43e97b',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
                onClick={() => setText('What are some popular mystery novels?')}
              >
                "What are some popular mystery novels?"
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div 
        style={{
          padding: '20px',
          borderTop: '1px solid #eee',
          display: 'flex',
          gap: '10px',
          background: 'rgba(248, 249, 250, 0.5)',
          borderRadius: '0 0 15px 15px'
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
          placeholder="Type your message here..."
          disabled={isTyping}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '2px solid #ddd',
            borderRadius: '25px',
            fontSize: '16px',
            outline: 'none'
          }}
        />
        <button 
          onClick={send} 
          disabled={!text.trim() || isTyping}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '25px',
            cursor: text.trim() && !isTyping ? 'pointer' : 'not-allowed',
            opacity: text.trim() && !isTyping ? 1 : 0.6
          }}
        >
          {isTyping ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}