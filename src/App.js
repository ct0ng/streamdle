import './App.css';
import { AnimatePresence } from "framer-motion";

import AuthPage from "./components/AuthPage";
import PageTransition from "./components/PageTransition";
import StreamdleGame from './components/StreamdleGame';
import { useAuth } from './hooks/useAuth';

function App() {
  const { authenticated, loading, login } = useAuth();

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <div>Loading...</div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <AnimatePresence mode="wait">
          {!authenticated ? (
            <PageTransition key="password">
              <AuthPage onAuthenticated={login} />
            </PageTransition>
          ) : (
            <PageTransition key="game">
              <StreamdleGame />
            </PageTransition>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}

export default App;
