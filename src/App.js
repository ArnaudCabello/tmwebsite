import React, { useState, useEffect } from "react";
import "./App.css";
import Leaderboard from "./components/Leaderboard";
import FullStats from "./components/FullStats";

function App() {
  const [players, setPlayers] = useState([]);
  const [showFullStats, setShowFullStats] = useState(false);

  useEffect(() => {
    // Fetch the players data from the public folder
    fetch(`${process.env.PUBLIC_URL}/players_data.json`)
      .then((response) => response.json()) // Ensure we parse it as JSON
      .then((data) => {
        const enrichedData = data.map((player) => ({
          ...player,
          rating: (
            2 * (player.wins / Math.max(1, player.losses)) +
            player.kills / Math.max(1, player.deaths)
          ).toFixed(2),
          kd: (player.kills - player.deaths).toFixed(2),
          kpr: (player.kills / Math.max(1, player.rounds_played)).toFixed(2),
          srv: (player.deaths / Math.max(1, player.rounds_played)).toFixed(2),
          baiter: (
            Math.max(
              1,
              (player.wins / Math.max(1, player.rounds_played)) *
                (player.kills - player.deaths)
            )
          ).toFixed(2),
        }));
        setPlayers(enrichedData);
      })
      .catch((error) => {
        console.error("Error fetching players data:", error);
      });
  }, []);

  // Sorting functions to get top 5 players
  const getTop5 = (key) => {
    const sortedPlayers = [...players].sort((a, b) => b[key] - a[key]);
    return sortedPlayers.slice(0, 5).map((player) => ({
      name: player.name,
      stat: player[key],
    }));
  };

  // Function to get bottom 5 players
  const getBottom5 = (key) => {
    const sortedPlayers = [...players].sort((a, b) => a[key] - b[key]);
    return sortedPlayers.slice(0, 5).map((player) => ({
      name: player.name,
      stat: player[key],
    }));
  };

  return (
    <div className="App">
      <div className="toggle-buttons">
        <button onClick={() => setShowFullStats(false)}>
          Show Leaderboards
        </button>
        <button onClick={() => setShowFullStats(true)}>
          Show Full Stats
        </button>
      </div>
      {showFullStats ? (
        <FullStats players={players} />
      ) : (
        <div className="leaderboards">
          <Leaderboard title="Rating" data={getTop5("rating")} />
          <Leaderboard title="K-D (+/-)" data={getTop5("kd")} />
          <Leaderboard title="Assists" data={getTop5("assists")} />
          <Leaderboard title="KPR" data={getTop5("kpr")} />
          <Leaderboard title="SRV" data={getTop5("srv")} />
          <Leaderboard title="Chopping Block" data={getBottom5("rating")} />
          <Leaderboard title="Biggest Baiters" data={getTop5("baiter")} />
        </div>
      )}
    </div>
  );
}

export default App;
