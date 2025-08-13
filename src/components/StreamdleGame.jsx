import React, { useState, useEffect } from "react";
import { supabaseClient } from "../supabaseClient.js";

export default function SongMatchupGame() {
  const [pair, setPair] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  const fetchRandomPair = async () => {
    setSelected(null);
    setResult(null);

    const { data, error } = await supabaseClient()
      .from("song")
      .select("song_id, title, stream_count, artist:artist_id(name)")
      .limit(2);

    if (error) {
      console.error("Error fetching songs:", error);
      return;
    }
    console.log(data)
    setPair(data);
  };

  useEffect(() => {
    fetchRandomPair();
  }, []);

  const handleGuess = (id) => {
    if (selected) return;
    const [a, b] = pair;
    const correctId = a.stream_count > b.stream_count ? a.song_id : b.song_id;
    setSelected(id);
    const isCorrect = id === correctId;
    setResult(isCorrect ? "✅ Correct!" : "❌ Wrong");
    if (isCorrect) setScore((prev) => prev + 1);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Which song has more Spotify streams?</h2>

      {pair.length === 2 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          {pair.map((song) => (
            <div
              key={song.song_id}
              style={{
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
                background:
                  selected === song.song_id
                    ? song.stream_count === Math.max(pair[0].stream_count, pair[1].stream_count)
                      ? "#d4edda"
                      : "#f8d7da"
                    : "white",
              }}
              onClick={() => handleGuess(song.song_id)}
            >
              <p><strong>{song.title}</strong></p>
              <p>{song.artist?.name}</p>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div style={{ marginTop: "1rem" }}>
          <p>{result}</p>
          <p>Your Score: {score}</p>
          <button onClick={fetchRandomPair}>Next</button>
        </div>
      )}
    </div>
  );
}
