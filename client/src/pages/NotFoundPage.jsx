import { Link } from "react-router-dom";
import RxRecallLogo from "../components/RxRecallLogo";

function NotFoundPage() {
  return (
    <div className="container text-center py-5">
      <RxRecallLogo size={100} />

      <h1 className="display-1 fw-bold mt-4">404</h1>

      <h2 className="mb-3">Prescription Not Found</h2>

      <p className="lead mb-4">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link to="/app" className="btn btn-primary me-3">
        Return to Dashboard
      </Link>

      <Link to="/" className="btn btn-outline-secondary">
        Landing Page
      </Link>
    </div>
  );
}

export default NotFoundPage;
