import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import API from "../services/api";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  if (role !== "Admin") return <Navigate to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      await API.post("/projects", { title, description });
      setMessage("Project created successfully ✅");
      setTitle("");
      setDescription("");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating project ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "50px auto" }}>
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Create Project</h2>
        <Link to="/dashboard" style={{ textDecoration: "none", color: "#007bff" }}>&larr; Back</Link>
      </div>
      <div className="card" style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ padding: "10px" }}
          />
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            style={{ padding: "10px" }}
          />
          <button type="submit" disabled={isLoading} style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
            {isLoading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;