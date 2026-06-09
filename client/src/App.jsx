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
import { useState, useEffect } from "react";

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      {/* <Navbar /> */}
      {location.pathname !== "/" && (
        <Navbar theme={theme} setTheme={setTheme} />
      )}
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
