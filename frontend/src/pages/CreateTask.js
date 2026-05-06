import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom"; 
import API from "../services/api";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [projectId, setProjectId] = useState(""); 
  const [dueDate, setDueDate] = useState("");     
  const [projects, setProjects] = useState([]);   

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (role === "Admin") {
      API.get("/projects")
        .then(res => {
          setProjects(res.data);
          // ✅ INSURANCE: If projects exist, pre-select the first one
          if (res.data.length > 0) {
            setProjectId(res.data[0]._id);
          }
        })
        .catch(err => console.error(err));
    }
  }, [role]);

  if (role !== "Admin") return <Navigate to="/dashboard"/>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError(""); setIsLoading(true);

    try {
      await API.post("/tasks", { 
        title,
        description, 
        assignedTo, 
        project: projectId.toString(), 
        dueDate 
      });
      setMessage("Task created successfully ✔");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating task ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "50px auto" }}>
      <div className="header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Create Task</h2>
        <Link to="/dashboard" style={{ textDecoration: "none", color: "#007bff" }}>&larr; Back</Link>
      </div>
      <div className="card" style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: "10px" }} />
          
          <select value={projectId} onChange={(e) => setProjectId(e.target.value)} required style={{ padding: "10px" }}>
            <option value="" disabled>Select a Project</option>
            {projects.map(p => (
              <option key={p._id} value={p._id}>{p.title}</option>
            ))}
          </select>

          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" style={{ padding: "10px" }} />
          <input placeholder="Assigned User ID" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required style={{ padding: "10px" }} />
          
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required style={{ padding: "10px" }} />

          <button type="submit" disabled={isLoading} style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
            {isLoading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;