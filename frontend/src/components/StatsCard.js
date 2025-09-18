import React from "react";

export default function StatsCard({ title, value, color }) {
  return (
    <div className="col-md-4 mb-3">
      <div className={`card text-white bg-${color}`}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text fs-4">{value}</p>
        </div>
      </div>
    </div>
  );
}
