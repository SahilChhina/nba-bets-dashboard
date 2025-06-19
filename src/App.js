import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './App.css';

function App() {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/top_5_bets_with_teams.csv`)
      .then(response => response.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setBets(results.data);
          },
        });
      })
      .catch(error => console.error("CSV fetch failed:", error));
  }, []);

  const getJerseyImageUrl = (team) => {
    const teamLower = team?.toLowerCase();
    if (teamLower?.includes("pacers")) {
      return "https://nba-bets-data.s3.us-east-1.amazonaws.com/jerseys/pacers.png";
    }
    if (teamLower?.includes("thunder")) {
      return "https://nba-bets-data.s3.us-east-1.amazonaws.com/jerseys/thunder.png";
    }
    return null;
  };

  return (
    <div className="bg-[#fdf7f0] font-sans overflow-x-hidden m-0 p-0">
      {/* Blue Hero Header */}
      <div className="relative w-full bg-blue-700 text-white text-center pt-20 pb-32">
        <img
          src={`${process.env.PUBLIC_URL}/assets/lion.png`}
          alt="Top 5 Bets Logo"
          className="mx-auto h-40 w-40 mb-4"
        />
        <h1 className="text-4xl font-extrabold">NBA Bet Dashboard</h1>
        <p className="text-lg mt-2">Top 5 Bets for Today</p>

        {/* Wave image */}
        <img
          src={`${process.env.PUBLIC_URL}/assets/wave.png`}
          alt="Wave Transition"
          className="absolute bottom-0 left-0 w-full z-10"
        />
      </div>

      {/* Bet Cards */}
      <div className="relative z-20 bg-white pb-16 px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {bets.map((bet, index) => (
            <div key={index} className="bg-gray-50 shadow-lg rounded-lg p-6 relative">
              {getJerseyImageUrl(bet.team) && (
                <img
                  src={getJerseyImageUrl(bet.team)}
                  alt={`${bet.team} jersey`}
                  className="absolute top-2 right-2 h-12 w-12 object-contain"
                />
              )}
              <h2 className="text-xl font-bold mb-1">{bet.player}</h2>
              <p className="text-sm text-gray-600">{`${bet.prop} — ${bet.side} ${bet.line}`}</p>

              <div className="mt-4 grid grid-cols-2 gap-y-1 text-sm text-gray-800">
                <div><strong>Odds:</strong> {bet.odds}</div>
                <div><strong>Stake:</strong> {Math.min(parseFloat(bet.stake_units), 3).toFixed(2)}u</div>
                <div><strong>Weighted Avg:</strong> {bet.weighted_avg}</div>
                <div><strong>EV:</strong> {parseFloat(bet.expected_value).toFixed(2)}%</div>
              </div>

              <p className="mt-4 text-sm italic text-gray-700">{bet.justification}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
