import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/" className="footer-link">© 2026 streamdle</a>
          <span className="footer-text">Changelog - WIP</span>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-note">
          All music rights belong to respective artists.
        </p>
        <p className="footer-note">
          Spotify stream data provided by kworb.net. Album covers provided by Spotify's oEmbed API.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
