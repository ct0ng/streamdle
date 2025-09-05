import './App.css';
import { AnimatePresence } from "framer-motion";

import AuthPage from "./components/AuthPage";
import PageTransition from "./components/PageTransition";
import StreamdleGame from './components/StreamdleGame';
import Header from './components/Header';
import { useAuth } from './hooks/useAuth';

function App() {
  const { authenticated, loading, login } = useAuth();

  if (loading) {
    return (
      <div className="App">
        <Header />
        <main className="App-main">
          <div>Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main className="App-main">
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
      </main>
    </div>
  );
}

export default App;
