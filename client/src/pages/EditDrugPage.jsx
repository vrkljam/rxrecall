import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditDrugPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [brandNames, setBrandNames] = useState("");
  const [genericNames, setGenericNames] = useState("");
  const [categories, setCategories] = useState("");
  const [drugClasses, setDrugClasses] = useState("");
  const [difficulty, setDifficulty] = useState("normal");
  const [forSammy, setForSammy] = useState(false);
  const [indications, setIndications] = useState("");
  const [aliases, setAliases] = useState("");
  const [mechanism, setMechanism] = useState("");
  const [sideEffects, setSideEffects] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchDrug();
  }, []);

  const stringToArray = (str) =>
    str
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

  const arrayToString = (arr) => (Array.isArray(arr) ? arr.join(", ") : "");

  const fetchDrug = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/drugs/${id}`);
      const drug = res.data;

      if (!drug) return;

      setBrandNames(arrayToString(drug.brandNames));
      setGenericNames(arrayToString(drug.genericNames));
      setCategories(arrayToString(drug.categories));
      setDrugClasses(arrayToString(drug.drugClasses));
      setDifficulty(drug.difficulty || "normal");
      setIndications(arrayToString(drug.indications));
      setAliases(arrayToString(drug.aliases));
      setMechanism(drug.mechanism || "");
      setSideEffects(arrayToString(drug.sideEffects));
      setNotes(drug.notes || "");
      setForSammy(drug.forSammy || false);
    } catch (error) {
      console.error("Failed to fetch drug:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/drugs/${id}`, {
        brandNames: stringToArray(brandNames),
        genericNames: stringToArray(genericNames),
        categories: stringToArray(categories),
        drugClasses: stringToArray(drugClasses),
        difficulty,
        forSammy,
        indications: stringToArray(indications),
        aliases: stringToArray(aliases),
        mechanism,
        sideEffects: stringToArray(sideEffects),
        notes,
      });

      navigate("/manage-drugs");
    } catch (error) {
      console.error("Failed to update drug:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="mb-4">Edit Drug</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="brandNames" className="form-label">
              Brand Names
            </label>
            <input
              id="brandNames"
              type="text"
              className="form-control"
              placeholder="Brand Names (comma separated)"
              value={brandNames}
              onChange={(e) => setBrandNames(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="genericNames" className="form-label">
              Generic Name
            </label>
            <input
              id="genericNames"
              type="text"
              className="form-control"
              placeholder="Generic Name"
              value={genericNames}
              onChange={(e) => setGenericNames(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="categories" className="form-label">
              Categories
            </label>
            <input
              id="categories"
              type="text"
              className="form-control"
              placeholder="Categories (comma separated)"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="drugClasses" className="form-label">
              Drug Class
            </label>
            <input
              id="drugClasses"
              type="text"
              className="form-control"
              placeholder="Drug Class"
              value={drugClasses}
              onChange={(e) => setDrugClasses(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="difficulty" className="form-label">
              Difficulty
            </label>
            <select
              id="difficulty"
              className="form-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="normal">Normal</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="forSammy"
              checked={forSammy}
              onChange={(e) => setForSammy(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="forSammy">
              Mark as Sammy Drug
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="indications" className="form-label">
              Indications
            </label>
            <input
              id="indications"
              type="text"
              className="form-control"
              placeholder="Indications (comma separated)"
              value={indications}
              onChange={(e) => setIndications(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="aliases" className="form-label">
              Aliases
            </label>
            <input
              id="aliases"
              type="text"
              className="form-control"
              placeholder="Aliases (comma separated)"
              value={aliases}
              onChange={(e) => setAliases(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mechanism" className="form-label">
              Mechanism
            </label>
            <input
              id="mechanism"
              type="text"
              className="form-control"
              placeholder="Mechanism of Action"
              value={mechanism}
              onChange={(e) => setMechanism(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="sideEffects" className="form-label">
              Side Effects
            </label>
            <input
              id="sideEffects"
              type="text"
              className="form-control"
              placeholder="Side Effects (comma separated)"
              value={sideEffects}
              onChange={(e) => setSideEffects(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="notes" className="form-label">
              Notes / PT Concerns
            </label>
            <textarea
              id="notes"
              className="form-control"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditDrugPage;
