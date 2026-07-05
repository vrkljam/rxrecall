import { useNavigate } from "react-router-dom";

function DisclaimerPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-5" style={{ maxWidth: "850px" }}>
      <h1 className="mb-4">Disclaimer</h1>

      <p>RxRecall is an educational study aid.</p>

      <p>
        The information presented within this application is intended solely for
        learning and review purposes.
      </p>

      <p>
        RxRecall is <strong>not</strong> intended to provide:
      </p>

      <ul>
        <li>Medical advice</li>
        <li>Medical diagnosis</li>
        <li>Treatment recommendations</li>
        <li>Clinical decision support</li>
        <li>Emergency guidance</li>
      </ul>

      <p>
        Although reasonable efforts are made to present accurate educational
        information, no guarantee is made regarding the completeness, accuracy,
        or timeliness of the content.
      </p>

      <p>
        Healthcare professionals and students should always consult current
        clinical references, official prescribing information, institutional
        guidelines, and qualified medical professionals when making patient-care
        decisions.
      </p>

      <p>
        By using RxRecall, you acknowledge that the application is provided as
        an educational resource and should not be relied upon as the sole source
        of medical or pharmacological information.
      </p>

      <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
    </div>
  );
}

export default DisclaimerPage;
