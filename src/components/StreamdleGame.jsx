import { useGame } from "../hooks/useGame";
import { MESSAGES } from "../constants/game.js";
import "./StreamdleGame.css";

export default function StreamdleGame() {
  const {
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
  } = useGame();

  if (loading) {
    return <div className="loading">{MESSAGES.LOADING}</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchRounds} className="retry-button">Try Again</button>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div className="game-over">
        <h2>{MESSAGES.GAME_OVER}</h2>
        <p className="final-score">Your Score: {score} / {pairs.length}</p>
        <button onClick={fetchRounds} className="play-again-button">Play Again</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <h2 className="round-title">Round {currentRound + 1} of {pairs.length}</h2>
        <p className="score">Score: {score}</p>
      </div>
      
      <h3 className="game-question">{MESSAGES.QUESTION}</h3>

      <div className="songs-container">
        {currentPair.map((song) => {
          const isSelected = selected === song.song_id;
          const isCorrect = song.stream_count === Math.max(currentPair[0].stream_count, currentPair[1].stream_count);
          
          return (
            <div
              key={song.song_id}
              className={`song-card ${isSelected ? (isCorrect ? 'correct' : 'wrong') : ''}`}
              onClick={() => handleGuess(song.song_id)}
            >
              <p className="song-title">{song.title}</p>
              <p className="song-artist">{song.artist_name}</p>
            </div>
          );
        })}
      </div>

      <div className="game-feedback">
        {selected && (
          <>
            <p className="result-text">{result}</p>
            {currentRound < pairs.length - 1 ? (
              <button onClick={handleNext} className="next-button">Next</button>
            ) : (
              <button onClick={handleNext} className="finish-button">Finish</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
