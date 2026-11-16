
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            BURNT<span>.</span>
          </Link>

          <p>
            BUILT THROUGH DISCIPLINE.
            <br />
            DEFINED BY CONSISTENCY.
          </p>

          <span className="footer-location">
            TRAIN HARD. LIVE STRONG.
          </span>
        </div>

        <div className="footer-column">
          <h4>EXPLORE</h4>
          <Link to="/">Home</Link>
          <Link to="/#programs">Programs</Link>
          <Link to="/#membership">Membership</Link>
          <Link to="/#contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h4>PROGRAMS</h4>
          <Link to="/programs/build">Build</Link>
          <Link to="/programs/endure">Endure</Link>
          <Link to="/programs/perform">Perform</Link>
        </div>

        <div className="footer-column">
          <h4>CONNECT</h4>
          <a
            href="https://wa.me/917744983743"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp ↗
          </a>
          <a href="mailto:hello@burnt.com">Email ↗</a>
          <a href="tel:+917744983743">Call Us ↗</a>
        </div>
      </div>

      <div className="footer-big-text">
        <span>STAY</span> HUNGRY.
      </div>

      <div className="footer-bottom">
        <span>© 2026 BURNT. ALL RIGHTS RESERVED.</span>
        <span>DESIGNED TO PUSH LIMITS.</span>
        <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
  );
}
