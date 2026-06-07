import { useNavigate } from "react-router-dom";
import RxRecallLogo from "../components/RxRecallLogo";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <RxRecallLogo size={140} />
      <h1 className="display-3 fw-bold mb-3">RxRecall</h1>

      <p className="text-muted mb-5">Study smarter. Memorize faster.</p>
      <div className="d-grid gap-4 w-100" style={{ maxWidth: "500px" }}>
        <button
          onClick={() => navigate("/quiz-setup")}
          style={{
            padding: "40px",
            fontSize: "2rem",
            fontWeight: "bold",
            borderRadius: "25px",
            border: "none",
            color: "white",
            background: "linear-gradient(90deg, #ff00cc, #3333ff)",
            boxShadow: "0 0 25px rgba(255,0,204,0.6)",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          ⚡ QUIZ BATTLE
        </button>

        <button
          onClick={() => navigate("/flashcards")}
          style={{
            padding: "40px",
            fontSize: "2rem",
            fontWeight: "bold",
            borderRadius: "25px",
            border: "none",
            color: "white",
            background: "linear-gradient(90deg, #00ff88, #00b3ff)",
            boxShadow: "0 0 25px rgba(0,255,136,0.5)",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          🧬 FLASH MODE
        </button>
      </div>
    </div>
  );
}

export default HomePage;
