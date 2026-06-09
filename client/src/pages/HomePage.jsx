import { useNavigate } from "react-router-dom";
import RxRecallLogo from "../components/RxRecallLogo";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <RxRecallLogo size={140} />
      <h1 className="display-3 fw-bold mb-3 home-title">RxRecall</h1>

      <p className="home-subtitle mb-5">Study smarter. Memorize faster.</p>
      <div className="d-grid gap-4 w-100 home-button-container">
        <button
          onClick={() => navigate("/quiz-setup")}
          className="home-btn quiz-btn"
        >
          ⚡ QUIZ BATTLE
        </button>

        <button
          onClick={() => navigate("/flashcards")}
          className="home-btn flash-btn"
        >
          🧬 FLASH MODE
        </button>
      </div>
    </div>
  );
}

export default HomePage;
