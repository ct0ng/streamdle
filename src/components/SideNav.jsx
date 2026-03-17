import "./SideNav.css";

const SideNav = ({ isOpen, onClose, currentView, onNavigate }) => {
  const navItems = [
    // TODO:
  ];

  return (
    <>
      <div
        className={`side-nav-backdrop ${isOpen ? "side-nav-backdrop-open" : ""}`}
        onClick={onClose}
        role="button"
        tabIndex={-1}
        aria-hidden
      />
      <nav className={`side-nav ${isOpen ? "side-nav-open" : ""}`} aria-hidden={!isOpen}>
        <div className="side-nav-inner">
        <ul className="side-nav-list">
          {navItems.map((item) => (
            <li key={item.id} className="side-nav-item">
              <button
                type="button"
                className={`side-nav-link ${currentView === item.id ? "active" : ""}`}
                onClick={() => onNavigate?.(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
    </>
  );
};

export default SideNav;
