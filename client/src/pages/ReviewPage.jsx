import { useLocation, useNavigate } from "react-router-dom";

function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const wrongDrugs = location.state?.wrongDrugs || [];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Review Mistakes</h2>

      {wrongDrugs.length === 0 ? (
        <p className="text-center">No mistakes 🎉</p>
      ) : (
        wrongDrugs.map((item, i) => (
          <div key={i} className="card p-3 mb-3 shadow-sm">
            <h5 className="mb-2">{item.question}</h5>

            <p className="mb-1">
              <span className="fw-bold">Your answer:</span>{" "}
              <span className="text-danger">{item.userAnswer}</span>
            </p>

            <p className="mb-1">
              <span className="fw-bold">Correct answer:</span>{" "}
              <span className="text-success">{item.correctAnswer}</span>
            </p>

            <p className="text-muted mb-0">Category: {item.category}</p>
          </div>
        ))
      )}

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back to Setup
        </button>
      </div>
    </div>
  );
}

export default ReviewPage;
