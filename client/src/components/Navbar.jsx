import { Link } from "react-router-dom";
import RxRecallLogo from "../components/RxRecallLogo";
function Navbar() {
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
            fontSize: "1.5rem",
            fontWeight: "800",
            color: "var(--text)",
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              className="navbar-brand d-flex align-items-center gap-2"
              to="/"
              style={{
                fontSize: "1.5rem",
                fontWeight: "800",
                color: "var(--text)",
              }}
            >
              <div style={{ width: "34px", height: "34px" }}>
                <RxRecallLogo />
              </div>
            </Link>
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
      </div>
    </nav>
  );
}

export default Navbar;
