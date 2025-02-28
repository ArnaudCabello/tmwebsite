import React from "react";
import "./Leader.css"; // Create this file for styling

const Leaderboard = ({ title, data }) => {
  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">{title}</h2>
      <ul className="leaderboard-list">
        {data.map((player, index) => (
          <li key={index} className="leaderboard-item">
            <span className="player-name">{player.name}</span>
            <span className="player-stat">{player.stat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;