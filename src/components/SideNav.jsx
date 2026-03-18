import "./SideNav.css";
const SideNav = ({ isOpen, onClose, currentView, onNavigate }) => {
  const topNavItems = [
    { id: "menu", label: "Menu", type: "route" },
    { id: "game", label: "Practice", type: "route" },
  ];

  const bottomNavItems = [
    {
      id: "mail",
      label: "Email",
      type: "external",
      href: "mailto:christong1114@gmail.com",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      type: "external",
      href: "https://www.linkedin.com/in/c-tong/",
    }
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
          <div className="side-nav-top">
            <ul className="side-nav-list">
              {topNavItems.map((item) => {
                const isRouteActive = currentView === item.id;
                return (
                  <li key={item.id} className="side-nav-item">
                    <button
                      type="button"
                      className={`side-nav-link ${isRouteActive ? "active" : ""}`}
                      onClick={() => onNavigate?.(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="side-nav-bottom">
            <div className="side-nav-bottom-group">
              <div className="side-nav-divider" aria-hidden="true" />
              <div className="side-nav-bottom-label">Connect with me !</div>
              <ul className="side-nav-list">
                {bottomNavItems.map((item) => (
                  <li key={item.id} className="side-nav-item">
                    <a
                      className="side-nav-link"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideNav;
