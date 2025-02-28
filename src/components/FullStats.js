import React, { useState } from "react";
import "./FullStats.css"; // Style this separately

const FullStats = ({ players }) => {
  const [sortBy, setSortBy] = useState("name"); // Initial sorting by name
  const [sortDirection, setSortDirection] = useState("asc"); // Initial sort direction

  // Function to sort players based on selected column and direction
  const sortPlayers = (key) => {
    const newDirection = sortBy === key && sortDirection === "asc" ? "desc" : "asc"; // Toggle sort direction
    setSortDirection(newDirection);
    setSortBy(key);
  };

  // Function to get the correct value to sort by
  const getSortValue = (player, key) => {
    switch (key) {
      case "rating":
        return (
          2 * (player.wins / Math.max(1, player.losses)) + player.kills / Math.max(1, player.deaths)
        );
      case "wl":
        return player.wins - player.losses;
      case "kd":
        return player.kills - player.deaths;
      case "kills":
        return player.kills; // Sort by kills
      case "deaths":
        return player.deaths; // Sort by deaths
      case "assists":
        return player.assists;
      case "rounds_played":
        return player.rounds_played;
      case "kpr":
        return player.kills / Math.max(1, player.rounds_played);
      case "srv":
        return player.deaths / Math.max(1, player.rounds_played);
      default:
        return player.name; // For sorting by name
    }
  };

  // Sorting logic
  const sortedPlayers = [...players].sort((a, b) => {
    const valueA = getSortValue(a, sortBy);
    const valueB = getSortValue(b, sortBy);

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="full-stats">
      <table>
        <thead>
          <tr>
            <th onClick={() => sortPlayers("name")}>Player</th>
            <th onClick={() => sortPlayers("rating")}>Rating</th>
            <th onClick={() => sortPlayers("wl")}>W/L (+/-)</th>
            <th onClick={() => sortPlayers("kd")}>KD (+/-)</th>
            <th onClick={() => sortPlayers("kills")}>Kills</th> {/* Added Kills */}
            <th onClick={() => sortPlayers("deaths")}>Deaths</th> {/* Added Deaths */}
            <th onClick={() => sortPlayers("assists")}>Assists</th>
            <th onClick={() => sortPlayers("rounds_played")}>Rounds Played</th>
            <th onClick={() => sortPlayers("kpr")}>KPR</th>
            <th onClick={() => sortPlayers("srv")}>SRV</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>
                {(
                  2 * (player.wins / Math.max(1, player.losses)) +
                  player.kills / Math.max(1, player.deaths)
                ).toFixed(2)}
              </td>
              <td>{(player.wins - player.losses).toFixed(2)}</td>
              <td>{(player.kills - player.deaths).toFixed(2)}</td>
              <td>{player.kills}</td> {/* Added Kills */}
              <td>{player.deaths}</td> {/* Added Deaths */}
              <td>{player.assists}</td>
              <td>{player.rounds_played}</td>
              <td>{(player.kills / Math.max(1, player.rounds_played)).toFixed(2)}</td>
              <td>{(player.deaths / Math.max(1, player.rounds_played)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FullStats;


