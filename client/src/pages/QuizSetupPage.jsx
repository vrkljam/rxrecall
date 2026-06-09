import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RxSpinner from "../components/RxSpinner";
import api from "../api/api";

function QuizSetupPage() {
  const navigate = useNavigate();

  const [questionLimit, setQuestionLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mode, setMode] = useState("brand-to-generic");
  const [categories, setCategories] = useState([]);
  const [sammyOnly, setSammyOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  const startQuiz = () => {
    navigate("/quiz", {
      state: {
        questionLimit,
        selectedCategory,
        mode,
        sammyOnly,
      },
    });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const startTime = Date.now();

      const res = await api.get("/api/drugs");

      const allCategories = res.data.flatMap((drug) => drug.categories || []);

      const uniqueCategories = [...new Set(allCategories)].sort();

      const elapsed = Date.now() - startTime;
      const remaining = 700 - elapsed; // 700ms minimum spinner time

      setTimeout(
        () => {
          setCategories(uniqueCategories);
          setLoading(false);
        },
        remaining > 0 ? remaining : 0,
      );
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <RxSpinner variant="light" size={120} />
        <p className="mt-3 quiz-meta">Preparing your quiz setup...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h1 className="text-center mb-4 quiz-title">RxRecall</h1>

        <h4 className="mb-4 quiz-subtitle">Quiz Setup</h4>

        {/* <button
          className="btn btn-outline-info"
          onClick={() =>
            navigate("/flashcards", {
              state: {
                selectedCategory,
                mode,
              },
            })
          }
        >
          Study Flashcards
        </button> */}

        <div className="mb-4">
          <label className="form-label fw-semibold quiz-label">
            Number of Questions
          </label>

          <select
            className="form-select"
            value={questionLimit}
            onChange={(e) => setQuestionLimit(Number(e.target.value))}
          >
            <option value={5}>5 Questions</option>
            <option value={10}>10 Questions</option>
            <option value={20}>20 Questions</option>
            <option value={50}>50 Questions</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold quiz-label">Category</label>

          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={sammyOnly}
              onChange={(e) => setSammyOnly(e.target.checked)}
              id="sammyCheck"
            />
            <label
              className="form-check-label fw-semibold quiz-label"
              htmlFor="sammyCheck"
            >
              Sammy Only
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold quiz-label">Quiz Mode</label>

          <div className="btn-group w-100">
            <button
              className={`btn ${
                mode === "brand-to-generic"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setMode("brand-to-generic")}
            >
              Brand → Generic
            </button>

            <button
              className={`btn ${
                mode === "generic-to-brand"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setMode("generic-to-brand")}
            >
              Generic → Brand
            </button>
            <button
              className={`btn ${
                mode === "mixed" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setMode("mixed")}
            >
              Mixed Mode
            </button>
          </div>
        </div>

        <button className="btn btn-success btn-lg" onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizSetupPage;
