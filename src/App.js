import './App.css';
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import AuthPage from "./components/AuthPage";
import PageTransition from "./components/PageTransition";
import StreamdleGame from './components/StreamdleGame';
import MainMenu from './components/MainMenu';
import Header from './components/Header';
import { useAuth } from './hooks/useAuth';

function App() {
  const { authenticated, loading, login } = useAuth();
  const [currentView, setCurrentView] = useState('menu');
  const [gameKey, setGameKey] = useState(0);

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

  const renderCurrentView = () => {
    if (!authenticated) {
      return (
        <PageTransition key="password">
          <AuthPage onAuthenticated={login} />
        </PageTransition>
      );
    }

    switch (currentView) {
      case 'menu':
        return (
          <PageTransition key="menu">
            <MainMenu onStartGame={() => setCurrentView('game')} />
          </PageTransition>
        );
      case 'game':
        return (
          // Add key to the PageTransition to force re-render when playing again
          <PageTransition key={`game-${gameKey}`}>
            <StreamdleGame 
              onGameOver={() => setCurrentView('menu')}
              onPlayAgain={() => {
                setGameKey(prev => prev + 1);
                setCurrentView('game');
              }}
            />
          </PageTransition>
        );
      default:
        return (
          <PageTransition key="menu">
            <MainMenu onStartGame={() => setCurrentView('game')} />
          </PageTransition>
        );
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <AnimatePresence mode="wait">
          {renderCurrentView()}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
