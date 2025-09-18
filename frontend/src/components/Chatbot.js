import React, { useState, useRef, useEffect } from 'react';
import { fetchRecommendByText } from './api';

export default function Chatbot() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const convRef = useRef(null);

  useEffect(() => {
    // scroll to bottom when messages change
    if (convRef.current) convRef.current.scrollTop = convRef.current.scrollHeight;
  }, [messages]);

  async function send() {
    if (!text.trim()) return;
    setMessages(m => [...m, { who: 'user', text }]);
    const q = text;
    setText('');

    try {
      const res = await fetchRecommendByText(q);
      setMessages(m => [...m, { who: 'bot', text: 'Here are suggestions based on your message:' }]);
      if (Array.isArray(res) && res.length) {
        const mapped = res.map(r => ({
          who: 'bot',
          text: `${r.book.title} — ${r.book.author || ''} (score ${Number(r.score).toFixed(3)})`
        }));
        setMessages(m => [...m, ...mapped]);
      } else {
        setMessages(m => [...m, { who: 'bot', text: 'No recommendations found.' }]);
      }
    } catch (err) {
      console.error('chatbot error', err);
      setMessages(m => [...m, { who: 'bot', text: 'Error fetching recommendations.' }]);
    }
  }

  return (
    <div>
      <div className="conversation" ref={convRef}>
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.who}`}>{m.text}</div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') send(); }}
          placeholder="Tell me what you like (e.g., 'fantasy quests')"
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
