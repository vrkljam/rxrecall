import { useNavigate } from "react-router-dom";
import RxRecallLogo from "../components/RxRecallLogo";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero */}
      <section className="hero text-center">
        <RxRecallLogo size={150} />

        <h1 className="display-2 fw-bold mt-4">RxRecall</h1>

        <p className="lead hero-tagline">
          Master medication knowledge through active recall.
        </p>

        <p className="hero-description">
          Study medications with interactive flashcards and challenge yourself
          with randomized quizzes designed to reinforce long-term memory.
        </p>

        <button
          className="btn btn-primary btn-lg mt-4 px-5"
          onClick={() => navigate("/app")}
        >
          Start Learning
        </button>
      </section>

      {/* Features */}
      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="feature-card h-100">
              <h3>📚 Flashcards</h3>
              <p>
                Learn medications at your own pace using active recall and
                repetition.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="feature-card h-100">
              <h3>📝 Quiz Mode</h3>
              <p>
                Test yourself with randomized questions to strengthen retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="container py-5 text-center">
        <h2>Who is RxRecall for?</h2>

        <div className="audience-list mt-4">
          <span>💊 Pharmacy Students</span>

          <span>🩺 Nursing Students</span>

          <span>🏥 Medical Assistants</span>

          <span>📋 Pharmacy Technicians</span>

          <span>📖 Healthcare Learners</span>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container py-5">
        <div className="disclaimer">
          <h4>Educational Use Only</h4>

          <p>
            RxRecall is intended solely as an educational study aid. It is not
            intended to provide medical advice, diagnosis, treatment, or
            clinical decision support.
          </p>

          <p>
            Always consult qualified healthcare professionals and official
            prescribing information before making medical decisions.
          </p>
        </div>
      </section>

      {/* Footer */}

      <footer className="landing-footer">
        <p>© 2026 RxRecall</p>

        <p>Built for learning. Not for clinical decision making.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
