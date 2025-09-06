import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/" className="footer-link">© 2025 Streamdle</a>
          <span className="footer-text">Feedback - WIP</span>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-note">
          All music rights belong to respective artists. Spotify stream data provided by kworb.net
        </p>
      </div>
    </footer>
  );
};

export default Footer;
