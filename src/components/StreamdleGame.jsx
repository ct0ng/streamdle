import { useState, useEffect } from "react";
import { supabaseClient } from "../supabaseClient.js";

export default function SongMatchupGame() {
  const [pairs, setPairs] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  const fetchRounds = async () => {
    setSelected(null);
    setResult(null);
    setScore(0);
    setCurrentRound(0);

    const { data, error } = await supabaseClient().rpc('get_random_songs');

    if (error) {
      console.error("Error fetching songs:", error);
      return;
    }

    const grouped = [];
    for (let i = 0; i < data.length; i += 2) {
      grouped.push([data[i], data[i + 1]]);
    }
    setPairs(grouped);
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  const handleGuess = (id) => {
    if (selected) return;
    const [a, b] = pairs[currentRound];;
    const correctId = a.stream_count > b.stream_count ? a.song_id : b.song_id;
    setSelected(id);
    const isCorrect = id === correctId;
    setResult(isCorrect ? "✅ Correct!" : "❌ Wrong");
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setResult(null);
    setCurrentRound((prev) => prev + 1);
  };

  if (pairs.length === 0) return <div>Loading...</div>;

  if (currentRound >= pairs.length) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Game Over 🎉</h2>
        <p>Your Score: {score} / {pairs.length}</p>
        <button onClick={fetchRounds}>Play Again</button>
      </div>
    );
  }

  const pair = pairs[currentRound];

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Round {currentRound + 1} of {pairs.length}</h2>
      <p>Score: {score}</p>
      <h3>Which song has more Spotify streams?</h3>

      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        {pair.map((song) => (
          <div
            key={song.song_id}
            style={{
              width: "400px",
              height: "340px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "center",
              overflow: "hidden",
              whiteSpace: "normal",
              background:
              selected === song.song_id
                ? song.stream_count === Math.max(pair[0].stream_count, pair[1].stream_count)
                  ? "#d4edda" // green for correct
                  : "#f8d7da" // red for wrong
                : "#000000ff",  // light blue default
            }}
            onClick={() => handleGuess(song.song_id)}
          >
            <p style={{ fontWeight: "bold", margin: "0 0 0.5rem" }}>{song.title}</p>
            <p style={{ fontSize: "0.9rem", margin: 0, color: "#dac2c2ff" }}>{song.artist_name}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ marginTop: "1rem" }}>
          <p>{result}</p>
          {currentRound < pairs.length - 1 ? (
            <button onClick={handleNext}>Next</button>
          ) : (
            <button onClick={() => setCurrentRound((prev) => prev + 1)}>Finish</button>
          )}
        </div>
      )}
    </div>
  );
}
