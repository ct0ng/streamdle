import "./Header.css";

const Header = ({ showMenuButton, onMenuToggle }) => {
  return (
    <header className="app-header">
      <div className="app-header-row">
        <div className="app-header-side">
          {showMenuButton && (
            <button
              type="button"
              className="app-menu-button"
              onClick={onMenuToggle}
              aria-label="Toggle menu"
            >
              <span className="app-menu-icon" aria-hidden>
                <span className="app-menu-bar" />
                <span className="app-menu-bar" />
                <span className="app-menu-bar" />
              </span>
            </button>
          )}
        </div>
        <h1 className="game-title">streamdle</h1>
        <div className="app-header-side" />
      </div>
    </header>
  );
};

export default Header;
