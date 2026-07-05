import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import api from "../api/api";

function ManageDrugsPage() {
  const [drugs, setDrugs] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const rowRefs = useRef({});

  const sortedDrugs = useMemo(() => {
    return [...drugs].sort((a, b) => {
      if (!sortConfig.key) return 0;

      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (Array.isArray(aValue)) aValue = aValue[0] || "";
      if (Array.isArray(bValue)) bValue = bValue[0] || "";

      if (sortConfig.key === "forSammy") {
        return sortConfig.direction === "asc"
          ? (a.forSammy === true) - (b.forSammy === true)
          : (b.forSammy === true) - (a.forSammy === true);
      }

      if (sortConfig.key === "difficulty") {
        const order = { easy: 1, normal: 2, hard: 3 };
        return sortConfig.direction === "asc"
          ? order[aValue] - order[bValue]
          : order[bValue] - order[aValue];
      }

      aValue = aValue?.toString().toLowerCase() || "";
      bValue = bValue?.toString().toLowerCase() || "";

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;

      return 0;
    });
  }, [drugs, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const highlightText = (text = "") => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");

    return text
      .toString()
      .split(regex)
      .map((part, i) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark key={i}>{part}</mark>
        ) : (
          part
        ),
      );
  };
  useEffect(() => {
    fetchDrugs();
  }, []);
  useEffect(() => {
    if (searchTerm.length < 2) return;

    const match = sortedDrugs.find((drug) =>
      JSON.stringify(drug).toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (match && rowRefs.current[match._id]) {
      const element = rowRefs.current[match._id];
      const yOffset = -120; // adjust if needed
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [searchTerm, sortedDrugs]);

  const fetchDrugs = async () => {
    try {
      const res = await api.get("/api/drugs");
      setDrugs(res.data);
    } catch (error) {
      console.error("Failed to fetch drugs:", error);
    }
  };

  const deleteDrug = async (id) => {
    const confirmDelete = window.confirm("Delete this drug?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/drugs/${id}`);
      fetchDrugs();
    } catch (error) {
      console.error("Failed to delete drug:", error);
    }
  };

  const difficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return <span className="badge bg-success">{difficulty}</span>;
      case "normal":
        return <span className="badge bg-primary">{difficulty}</span>;
      case "hard":
        return <span className="badge bg-danger">{difficulty}</span>;
      default:
        return <span className="badge bg-secondary">{difficulty}</span>;
    }
  };

  return (
    <div>
      {/* <style>{`
      thead th {
        position: sticky;
        top: 500;
        background: white;
        z-index: 100;
        border: 10px solid red
      }
    `}</style> */}
      {/* Sticky Area (full width context) */}
      <div>
        <div className="container">
          <h2 className="mb-2 text-primary">Manage Drugs</h2>

          <p className="adddrug-meta mb-2">
            Total Drugs: <strong>{drugs.length}</strong>
          </p>

          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div
        className="container mt-4"
        // style={{ maxHeight: "75vh", overflowY: "auto" }}
      >
        <div className="card p-4 shadow">
          <table className="table table-striped table-hover align-middle">
            <thead
              className="table-sticky-header"
              // style={{
              //   position: "sticky",
              //   top: 0,
              //   zIndex: 1010,
              //   backgroundColor: "white",
              //   padding: "15px 0",
              //   boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
              // }}
            >
              <tr>
                <th>#</th>

                <th
                  onClick={() => handleSort("brandNames")}
                  style={{ cursor: "pointer" }}
                >
                  Brand Names
                </th>
                <th
                  onClick={() => handleSort("genericNames")}
                  style={{ cursor: "pointer" }}
                >
                  Generic Names
                </th>
                <th
                  onClick={() => handleSort("categories")}
                  style={{ cursor: "pointer" }}
                >
                  Categories
                </th>
                <th
                  onClick={() => handleSort("drugClasses")}
                  style={{ cursor: "pointer" }}
                >
                  Drug Class
                </th>

                <th
                  onClick={() => handleSort("difficulty")}
                  style={{ cursor: "pointer" }}
                >
                  Difficult
                </th>
                <th
                  onClick={() => handleSort("forSammy")}
                  style={{ cursor: "pointer" }}
                >
                  Sammy
                </th>
                <th>Indications</th>
                <th>Aliases</th>
                <th>Mechanism</th>
                <th>Side Effects</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedDrugs.map((drug, index) => (
                <tr
                  key={drug._id}
                  ref={(el) => (rowRefs.current[drug._id] = el)}
                >
                  <td>{index + 1}</td>
                  <td>{highlightText((drug.brandNames || []).join(", "))}</td>
                  <td>{highlightText((drug.genericNames || []).join(", "))}</td>
                  <td>{highlightText((drug.categories || []).join(", "))}</td>
                  <td>
                    {highlightText((drug.drugClasses || []).join(", ")) || "-"}
                  </td>
                  <td>{difficultyBadge(drug.difficulty)}</td>
                  <td>
                    {drug.forSammy ? (
                      <span className="badge bg-info">Yes</span>
                    ) : (
                      <span className="badge">No</span>
                    )}
                  </td>
                  <td>{(drug.indications || []).join(", ") || "-"}</td>
                  <td>{(drug.aliases || []).join(", ") || "-"}</td>
                  <td>{drug.mechanism || "-"}</td>
                  <td>{(drug.sideEffects || []).join(", ") || "-"}</td>
                  <td>{drug.notes || "-"}</td>
                  <td>
                    <Link
                      to={`/edit-drug/${drug._id}`}
                      className="btn btn-warning btn-sm me-2 mb-1"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm mb-1"
                      onClick={() => deleteDrug(drug._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ManageDrugsPage;
