import { useNavigate } from "react-router-dom";

import "./DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="mt-3 fw-bold">Welcome back</h1>
        <p className="text-muted">Choose how you'd like to study today</p>
      </div>

      {/* Action Cards */}
      <div className="row g-4 justify-content-center">
        <div className="col-md-5">
          <div
            className="study-card quiz-card"
            onClick={() => navigate("/quiz-setup")}
          >
            <h2>⚡ Quiz Mode</h2>
            <p>Test your knowledge with randomized questions.</p>
            <div className="card-action">Start Quiz →</div>
          </div>
        </div>

        <div className="col-md-5">
          <div
            className="study-card flash-card"
            onClick={() => navigate("/flashcards")}
          >
            <h2>🧬 Flashcards</h2>
            <p>Review medications using active recall.</p>
            <div className="card-action">Open Flashcards →</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
