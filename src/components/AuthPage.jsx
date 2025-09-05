import { useState } from "react";
import "./AuthPage.css";

export default function AuthPage({ onAuthenticated }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onAuthenticated(data.token);
      } else {
        // Show the specific error message from the server
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error(err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError("Unable to connect to server. Please check your connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Enter Password to Play</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={loading}
          className="password-input"
        />
        <button 
          type="submit" 
          disabled={loading || !password.trim()}
          className="auth-button"
        >
          {loading ? "Entering..." : "Enter"}
        </button>
      </form>
      <div className="error-container">
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
