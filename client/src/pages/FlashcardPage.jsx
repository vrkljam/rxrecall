import { useEffect, useState } from "react";
import axios from "axios";
import RxSpinner from "../components/RxSpinner";

function FlashcardPage() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [showLimitOverlay, setShowLimitOverlay] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [sammyOnly, setSammyOnly] = useState(false);

  const MAX_FLIPS = 7;

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/drugs");

      const allCategories = new Set();

      res.data.forEach((drug) => {
        (drug.categories || []).forEach((cat) => {
          allCategories.add(cat);
        });
      });

      setCategories(["all", ...Array.from(allCategories)]);
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------- FETCH CARDS ----------------
  const fetchCards = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/drugs?category=${selectedCategory}&forSammy=${sammyOnly}`,
      );

      const formatted = res.data.map((drug) => ({
        front: drug.brandNames[0] || drug.genericNames,
        back: drug.genericNames,
      }));

      setCards(formatted);
      setCurrentIndex(0);
      setFlipped(false);
      setFlipCount(0);
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------- LOAD ON FILTER CHANGE ----------------
  useEffect(() => {
    fetchCards();
  }, [selectedCategory, sammyOnly]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // ---------------- UI LOGIC ----------------
  const handleFlip = () => {
    if (flipCount + 1 >= MAX_FLIPS) {
      setShowLimitOverlay(true);
      return;
    }
    setFlipped(!flipped);
    setFlipCount((prev) => prev + 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 < cards.length ? prev + 1 : 0));
    setFlipped(false);
    setFlipCount(0);
    setShowLimitOverlay(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : cards.length - 1));
    setFlipped(false);
    setFlipCount(0);
    setShowLimitOverlay(false);
  };

  // if (cards.length === 0) return <h2>Loading cards...</h2>;
  if (cards.length === 0) return <RxSpinner variant="light" size={120} />;

  const scale = 1 - flipCount * 0.04;
  const glow = flipCount * 5;

  const cardStyle = {
    cursor: "pointer",
    width: "420px",
    minHeight: "260px",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.8rem",
    background: `radial-gradient(circle at center, rgba(0, 200, 120, ${
      0.1 + flipCount * 0.03
    }) 0%, #fff 100%)`,
    transform: `scale(${scale})`,
    boxShadow: `inset 0 0 ${glow}px rgba(0, 200, 120, ${
      0.3 + flipCount * 0.05
    }), 0 8px 25px rgba(0,0,0,0.15)`,
    transition: "all 0.3s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(255, 0, 50, 0.7)",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3rem",
    fontWeight: "bold",
    zIndex: 1000,
    cursor: "pointer",
    animation: "pulse 0.5s infinite alternate",
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="mb-4">Memory Flashcards</h2>

      {/* CATEGORY SELECT */}
      <select
        className="form-select mb-3"
        style={{ maxWidth: "300px" }}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* SAMMY TOGGLE */}
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={sammyOnly}
          onChange={(e) => setSammyOnly(e.target.checked)}
          id="sammyOnly"
        />
        <label className="form-check-label" htmlFor="sammyOnly">
          Sammy Only
        </label>
      </div>

      {/* CARD */}
      <div onClick={handleFlip} style={cardStyle}>
        {flipped ? cards[currentIndex].back : cards[currentIndex].front}
      </div>

      {/* NAV */}
      <div className="d-flex gap-3 mt-4">
        <button onClick={handlePrevious} className="btn btn-secondary">
          Previous
        </button>
        <button onClick={handleNext} className="btn btn-primary">
          Next
        </button>
      </div>

      <p className="mt-3 text-muted">
        Flip count: {flipCount} | Card {currentIndex + 1} of {cards.length}
      </p>

      {showLimitOverlay && (
        <div style={overlayStyle} onClick={handleNext}>
          MOVE TO NEXT CARD!
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default FlashcardPage;
