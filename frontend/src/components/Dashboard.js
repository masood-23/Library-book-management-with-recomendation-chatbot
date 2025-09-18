import React from "react";
import StatsCard from "./StatsCard";

export default function Dashboard({ stats }) {
  return (
    <div className="row">
      <StatsCard title="Total Books" value={stats.totalBooks} color="primary" />
      <StatsCard title="Available Copies" value={stats.availableCopies} color="success" />
      <StatsCard title="Genres" value={stats.genres} color="info" />
    </div>
  );
}
