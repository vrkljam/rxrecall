import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import QuizPage from "./pages/QuizPage";
import AddDrugPage from "./pages/AddDrugPage";
import ManageDrugsPage from "./pages/ManageDrugsPage";
import EditDrugPage from "./pages/EditDrugPage";
import ReviewPage from "./pages/ReviewPage";
import QuizSetupPage from "./pages/QuizSetupPage";
import FlashcardPage from "./pages/FlashcardPage";
import "./app.css";
import { useState, useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import DisclaimerPage from "./pages/DisclaimerPage";

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const hideNavbar = ["/"];

  return (
    <>
      {/* <Navbar /> */}
      {!hideNavbar.includes(location.pathname) && (
        <Navbar theme={theme} setTheme={setTheme} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<DashboardPage />} />
        <Route path="/quiz-setup" element={<QuizSetupPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/add-drug" element={<AddDrugPage />} />
        <Route path="/manage-drugs" element={<ManageDrugsPage />} />
        <Route path="/edit-drug/:id" element={<EditDrugPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/flashcards" element={<FlashcardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
