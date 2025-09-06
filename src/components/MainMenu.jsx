import "./MainMenu.css";

const MainMenu = ({ onStartGame }) => {
  return (
    <div className="main-menu">
      <div className="menu-content">
        <p className="menu-subtitle">Guess which song has more Spotify streams</p>
        <button onClick={onStartGame} className="play-button" disabled>
          Daily - WIP
        </button>
        <button onClick={onStartGame} className="play-button">
          Practice
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
