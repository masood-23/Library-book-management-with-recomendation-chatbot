import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import Chatbot from "../components/Chatbot";
import { getBooks } from "../api";

export default function Home() {
  const [stats, setStats] = useState({ totalBooks: 0, availableCopies: 0, genres: 0 });

  useEffect(() => {
    async function loadStats() {
      const { data } = await getBooks();
      const totalBooks = data.length;
      const availableCopies = data.reduce((sum, b) => sum + (b.copies || 0), 0);
      const genres = new Set(data.map((b) => b.genre)).size;
      setStats({ totalBooks, availableCopies, genres });
    }
    loadStats();
  }, []);

  return (
    <div>
      <h2 className="mb-3">📊 Dashboard</h2>
      <Dashboard stats={stats} />
      <h2 className="mt-5 mb-3">🤖 Chatbot</h2>
      <Chatbot />
    </div>
  );
}
