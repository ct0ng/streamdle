import './App.css';
import { useState, useEffect } from "react";
import AuthPage from "./components/AuthPage";
import StreamdleGame from './components/StreamdleGame';
import { jwtDecode } from "jwt-decode";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setAuthenticated(true);
        }
      } catch {
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  if (!authenticated) {
    return <AuthPage onAuthenticated={() => setAuthenticated(true)} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>streamdle</h1>
          <StreamdleGame />
      </header>
    </div>
  );
}

export default App;
