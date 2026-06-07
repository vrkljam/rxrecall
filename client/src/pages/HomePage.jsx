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
// benchmark buttons
//   <div className="d-grid gap-4 w-100" style={{ maxWidth: "500px" }}>
//     <button
//       className="btn btn-primary btn-lg py-4"
//       style={{
//         fontSize: "2rem",
//         borderRadius: "20px",
//       }}
//       onClick={() => navigate("/quiz-setup")}
//     >
//       Quiz Mode
//     </button>

//     <button
//       className="btn btn-outline-primary btn-lg py-4"
//       style={{
//         fontSize: "2rem",
//         borderRadius: "20px",
//       }}
//       onClick={() => navigate("/flashcards")}
//     >
//       Flashcard Mode
//     </button>
//   </div>

// buttons option 1 ---very good
//   <div className="d-grid gap-4 w-100" style={{ maxWidth: "500px" }}>
//     <div
//       onClick={() => navigate("/quiz-setup")}
//       style={{
//         padding: "40px",
//         borderRadius: "20px",
//         background: "white",
//         border: "2px solid #0d6efd",
//         cursor: "pointer",
//         boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//         transition: "0.2s",
//       }}
//     >
//       <h2 className="text-primary mb-2">🧠 Quiz Mode</h2>
//       <p className="text-muted mb-0">Test recall under pressure</p>
//     </div>

//     <div
//       onClick={() => navigate("/flashcards")}
//       style={{
//         padding: "40px",
//         borderRadius: "20px",
//         background: "white",
//         border: "2px solid #198754",
//         cursor: "pointer",
//         boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//         transition: "0.2s",
//       }}
//     >
//       <h2 className="text-success mb-2">🃏 Flashcards</h2>
//       <p className="text-muted mb-0">Build long-term memory</p>
//     </div>
//   </div>

// buttons option 2 also very good

{
  /* <div className="d-grid gap-4 w-100" style={{ maxWidth: "500px" }}>
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
</div> */
}
