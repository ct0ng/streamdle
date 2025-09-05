import { useState, useEffect } from "react";
import { supabaseClient } from "../supabaseClient.js";
import { MESSAGES } from "../constants/game.js";

export function useGame() {
  const [pairs, setPairs] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRounds = async () => {
    setCurrentRound(0);
    setSelected(null);
    setResult(null);
    setScore(0);
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabaseClient().rpc('get_random_songs');

      if (fetchError) {
        console.error("Error fetching songs:", fetchError);
        setError(MESSAGES.FETCH_ERROR);
        return;
      }

      const grouped = [];
      for (let i = 0; i < data.length; i += 2) {
        grouped.push([data[i], data[i + 1]]);
      }
      setPairs(grouped);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError(MESSAGES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  const handleGuess = (id) => {
    if (selected || loading) return;
    
    const [a, b] = pairs[currentRound];
    const correctId = a.stream_count > b.stream_count ? a.song_id : b.song_id;
    setSelected(id);
    const isCorrect = id === correctId;
    setResult(isCorrect ? MESSAGES.CORRECT : MESSAGES.WRONG);
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setResult(null);
    setCurrentRound((prev) => prev + 1);
  };

  const isGameOver = currentRound >= pairs.length;
  const currentPair = pairs[currentRound];

  return {
    pairs,
    currentRound,
    selected,
    result,
    score,
    loading,
    error,
    isGameOver,
    currentPair,
    handleGuess,
    handleNext,
    fetchRounds
  };
}
