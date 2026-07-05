import { useNavigate } from "react-router-dom";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-5" style={{ maxWidth: "850px" }}>
      <h1 className="mb-4">About RxRecall</h1>

      <p>
        <strong>Learn medications with confidence.</strong>
      </p>

      <p>
        RxRecall is an educational study tool designed to help students and
        healthcare learners strengthen their medication knowledge through active
        recall.
      </p>

      <p>The application currently offers two primary study modes:</p>

      <ul>
        <li>
          <strong>Flashcards</strong> for self-paced review
        </li>
        <li>
          <strong>Quiz Mode</strong> to reinforce learning through randomized
          questions
        </li>
      </ul>

      <p>
        RxRecall was created with the goal of making medication study more
        engaging, organized, and effective. Whether you're preparing for an
        exam, reviewing pharmacology concepts, or simply refreshing your
        knowledge, RxRecall provides a focused environment for learning.
      </p>

      <h3 className="mt-4">Our Philosophy</h3>

      <p>
        Learning medications takes repetition. RxRecall is built around active
        recall—a study method that encourages retrieving information from memory
        rather than simply rereading notes.
      </p>

      <p>
        The objective is simple: help users study smarter through consistent
        practice.
      </p>

      <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
    </div>
  );
}

export default AboutPage;
