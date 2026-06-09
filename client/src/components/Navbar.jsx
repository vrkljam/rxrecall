import { Link } from "react-router-dom";
import RxRecallLogo from "../components/RxRecallLogo";
function Navbar({ theme, setTheme }) {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "var(--card)",
        borderBottom: "1px solid var(--border)",
        padding: "14px 0",
      }}
    >
      <div className="container">
        {/* BRAND */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
          style={{
            fontSize: "1.4rem",
            fontWeight: "800",
            color: "var(--text)",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RxRecallLogo />
          </div>
          RxRecall
        </Link>

        {/* LINKS */}
        <div className="navbar-nav d-flex flex-row gap-3">
          <Link className="nav-link" to="/flashcards">
            Flashcards
          </Link>
          <Link className="nav-link" to="/quiz-setup">
            Quiz
          </Link>
          <Link className="nav-link" to="/add-drug">
            Add Drug
          </Link>
          <Link className="nav-link" to="/manage-drugs">
            Manage Drugs
          </Link>
        </div>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
