import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import "../app.css";

function AddDrugPage() {
  const navigate = useNavigate(); // <-- add this
  const [brandNames, setBrandNames] = useState("");
  const [genericNames, setGenericNames] = useState("");
  const [categories, setCategories] = useState("");
  const [drugClasses, setDrugClasses] = useState("");
  const [difficulty, setDifficulty] = useState("normal");
  const [indications, setIndications] = useState("");
  const [aliases, setAliases] = useState("");
  const [mechanism, setMechanism] = useState("");
  const [sideEffects, setSideEffects] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/drugs", {
        brandNames: brandNames.split(",").map((b) => b.trim()),
        genericNames: genericNames.split(",").map((g) => g.trim()),
        categories: categories.split(",").map((c) => c.trim()),
        drugClasses,
        difficulty,
        indications: indications.split(",").map((i) => i.trim()),
        aliases: aliases.split(",").map((a) => a.trim()),
        mechanism,
        sideEffects: sideEffects.split(",").map((s) => s.trim()),
        notes,
      });

      alert("Drug added!");
      navigate("/manage-drugs"); // <-- redirect to Manage Drugs page

      // Reset form
      setBrandNames("");
      setGenericNames("");
      setCategories("");
      setDrugClasses("");
      setDifficulty("normal");
      setIndications("");
      setAliases("");
      setMechanism("");
      setSideEffects("");
      setNotes("");
    } catch (error) {
      console.error("Failed to add drug:", error);
      alert("Error adding drug. Check console for details.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold adddrug-title">
            Add New Drug
          </h2>

          <form onSubmit={handleSubmit}>
            {/* ================= BASIC INFO ================= */}
            <h5 className="text-uppercase adddrug-section mb-3">
              Basic Information
            </h5>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold adddrug-label">
                  Brand Names
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Lipitor, Zocor"
                  value={brandNames}
                  onChange={(e) => setBrandNames(e.target.value)}
                  required
                />
                <div className="form-text adddrug-meta">
                  Separate multiple names with commas.
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold adddrug-label">
                  Generic Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Atorvastatin"
                  value={genericNames}
                  onChange={(e) => setGenericNames(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold adddrug-label">
                  Categories
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Cardiology, Lipid Lowering"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold adddrug-label">
                  Drug Class
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: HMG-CoA Reductase Inhibitor"
                  value={drugClasses}
                  onChange={(e) => setDrugClasses(e.target.value)}
                />
              </div>
            </div>

            {/* ================= CLINICAL INFO ================= */}
            <hr className="my-4" />
            <h5 className="text-uppercase adddrug-section mb-3">
              Clinical Information
            </h5>

            <div className="mb-3">
              <label className="form-label fw-semibold adddrug-label">
                Indications
              </label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Ex: Hyperlipidemia, MI prevention"
                value={indications}
                onChange={(e) => setIndications(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold adddrug-label">
                Mechanism of Action
              </label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Brief mechanism..."
                value={mechanism}
                onChange={(e) => setMechanism(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold adddrug-label">
                Side Effects
              </label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Ex: Myopathy, elevated LFTs"
                value={sideEffects}
                onChange={(e) => setSideEffects(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold adddrug-label">
                Aliases
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Other known names"
                value={aliases}
                onChange={(e) => setAliases(e.target.value)}
              />
            </div>

            {/* ================= DIFFICULTY ================= */}
            <hr className="my-4" />

            <div className="row align-items-center">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold adddrug-label">
                  Difficulty
                </label>
                <select
                  className="form-select"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="easy">Easy</option>
                  <option value="normal">Normal</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold adddrug-label">
                Notes / Patient Concerns
              </label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Important counseling points..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button className="btn btn-primary btn-lg w-100">Add Drug</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDrugPage;
