import { useNavigate } from "react-router-dom";

function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-5" style={{ maxWidth: "850px" }}>
      <h1 className="mb-4">Privacy Policy</h1>

      <p>
        <em>Last updated: July 5, 2026</em>
      </p>

      <p>RxRecall respects your privacy.</p>

      <h3 className="mt-4">Information We Collect</h3>

      <p>
        At this time, RxRecall does not require user accounts. The application
        is designed to be used without collecting personal information such as
        your name or email address.
      </p>

      <p>
        Some information may be stored locally in your browser, such as your
        selected theme, to improve your experience.
      </p>

      <h3 className="mt-4">Future Features</h3>

      <p>
        If user accounts or additional features are introduced in the future,
        this Privacy Policy will be updated to describe what information is
        collected, how it is used, and how it is protected.
      </p>

      <h3 className="mt-4">Third-Party Services</h3>

      <p>
        RxRecall may be hosted using third-party infrastructure providers. Those
        providers may collect standard technical information, such as IP
        addresses or server logs, necessary to operate their services.
      </p>

      <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
    </div>
  );
}

export default PrivacyPage;
