import { useEffect, useState } from "react";

import api from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import RxSpinner from "../components/RxSpinner";

function QuizPage() {
  const [drug, setDrug] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wrongDrugs, setWrongDrugs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizDrugs, setQuizDrugs] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const {
    questionLimit = 10,
    selectedCategory = "all",
    mode = "brand-to-generic",
    sammyOnly = false,
  } = location.state || {};

  useEffect(() => {
    startQuiz();
  }, []);

  const resolveMode = () => {
    if (mode === "mixed") {
      return Math.random() < 0.5 ? "brand-to-generic" : "generic-to-brand";
    }
    return mode;
  };

  const startQuiz = async () => {
    try {
      const res = await api.get("/api/drugs");

      let drugs = [...res.data];

      // 🔥 Sammy filter
      if (sammyOnly) {
        drugs = drugs.filter((d) => d.forSammy === true);
      }

      // 🔥 Category filter
      if (selectedCategory !== "all") {
        drugs = drugs.filter((d) => d.categories?.includes(selectedCategory));
      }

      // shuffle
      drugs.sort(() => Math.random() - 0.5);

      // limit
      const limit = questionLimit || 10;
      drugs = drugs.slice(0, limit);

      // format questions
      const formattedDrugs = drugs.map((drug) => {
        const actualMode = resolveMode();

        const question =
          actualMode === "brand-to-generic"
            ? drug.brandNames[
                Math.floor(Math.random() * drug.brandNames.length)
              ]
            : drug.genericNames[
                Math.floor(Math.random() * drug.genericNames.length)
              ];

        return {
          ...drug,
          question,
          mode: actualMode,
        };
      });

      setQuizDrugs(formattedDrugs);
      setDrug(formattedDrugs[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/api/drugs/check", {
      drugId: drug._id,
      answer,
      mode: drug.mode,
    });

    setResult(res.data);
    setQuestionCount((prev) => prev + 1);
    if (res.data.correct) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
      setWrongDrugs((prev) => [
        ...prev,
        {
          question: drug.question,
          correctAnswer: res.data.correctAnswer,
          userAnswer: answer,
          mode: drug.mode,
          category: selectedCategory,
        },
      ]);
    }
    // if (currentIndex + 1 >= quizDrugs.length) {
    //   setQuizFinished(true);
    // } else {
    //   const nextIndex = currentIndex + 1;

    //   setCurrentIndex(nextIndex);
    //   setDrug(quizDrugs[nextIndex]);
    //   setResult(null);
    //   setAnswer("");
    // }
  };

  const updateDifficulty = async (difficulty) => {
    try {
      await api.patch(`/api/drugs/${drug._id}/difficulty`, { difficulty });
    } catch (error) {
      console.error(error);
    }
  };

  if (quizFinished) {
    return (
      <div className="container mt-5 text-center">
        <h2>Quiz Complete</h2>

        <h4>
          Score: {score} / {questionLimit}
        </h4>

        <p>Wrong Answers: {wrongDrugs.length}</p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-success" onClick={() => navigate("/")}>
            Restart Quiz
          </button>

          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/review", {
                state: { wrongDrugs },
              })
            }
          >
            Review Mistakes
          </button>
        </div>
      </div>
    );
  }
  if (!drug) return <RxSpinner variant="light" size={120} />;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center quiz-title">RxRecall</h2>
      <div className="mb-4">
        <div className="d-flex justify-content-between mb-1">
          <small className="quiz-meta">
            Question {currentIndex + 1} of {questionLimit}
          </small>

          <small className="quiz-meta">
            {Math.round((currentIndex / questionLimit) * 100)}%
          </small>
        </div>

        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${(currentIndex / questionLimit) * 100}%`,
            }}
          />
        </div>
      </div>
      <div className="card border-0 mb-4">
        <h3 className="text-center mb-4 quiz-meta">{drug.question}</h3>
        <p className="text-center quiz-meta">
          Mode:{" "}
          {drug.mode === "brand-to-generic"
            ? "Brand → Generic"
            : "Generic → Brand"}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter generic name"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={result !== null}
          >
            Submit
          </button>
        </form>

        {result && (
          <div className="mt-4 text-center">
            {result.correct ? (
              <div className="alert alert-success">Correct!</div>
            ) : (
              <div className="alert alert-danger">
                Incorrect — Correct answer: {result.correctAnswer}
              </div>
            )}

            {/* difficulty buttons */}
            <div className="mt-3">
              <button
                type="button"
                className="btn btn-sm btn-outline-success me-2"
                onClick={() => updateDifficulty("easy")}
              >
                Mark Easy
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => updateDifficulty("hard")}
              >
                Mark Hard
              </button>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                if (currentIndex + 1 >= quizDrugs.length) {
                  setQuizFinished(true);
                } else {
                  const nextIndex = currentIndex + 1;

                  setCurrentIndex(nextIndex);
                  setDrug(quizDrugs[nextIndex]);
                  setResult(null);
                  setAnswer("");
                }
              }}
            >
              Next Drug
            </button>
          </div>
        )}
        <div className="row text-center mb-4">
          <div className="col">
            <h5 className="quiz-label">Score</h5>
            <p className="quiz-value">{score}</p>
          </div>
          <div className="col">
            <h5 className="quiz-label">Questions</h5>
            <p className="quiz-value">{questionCount}</p>
          </div>
          <div className="col">
            <h5 className="quiz-label">Streak</h5>
            <p
              className={`quiz-value ${streak >= 5 ? "text-success fw-bold" : ""}`}
            >
              {streak}
            </p>
          </div>
        </div>
        <p className="text-center quiz-meta">
          Accuracy:{" "}
          {questionCount === 0 ? 0 : Math.round((score / questionCount) * 100)}%
        </p>
      </div>
    </div>
  );
}

export default QuizPage;
