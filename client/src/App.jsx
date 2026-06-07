import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import QuizPage from "./pages/QuizPage";
import AddDrugPage from "./pages/AddDrugPage";
import ManageDrugsPage from "./pages/ManageDrugsPage";
import EditDrugPage from "./pages/EditDrugPage";
import ReviewPage from "./pages/ReviewPage";
import QuizSetupPage from "./pages/QuizSetupPage";
import FlashcardPage from "./pages/FlashcardPage";
import HomePage from "./pages/HomePage";
import "./app.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <button
        className="btn btn-sm btn-outline-secondary position-fixed top-0 end-0 m-3"
        onClick={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
      {/* <Navbar /> */}
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz-setup" element={<QuizSetupPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/add-drug" element={<AddDrugPage />} />
        <Route path="/manage-drugs" element={<ManageDrugsPage />} />
        <Route path="/edit-drug/:id" element={<EditDrugPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/flashcards" element={<FlashcardPage />} />
      </Routes>
    </>
  );
}

export default App;
