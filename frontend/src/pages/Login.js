import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // New Enterprise UX States
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  
  const navigate = useNavigate(); // React Router's teleport tool

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing when you hit 'Enter'
    setError("");
    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Save token and role to browser storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // Successfully logged in! Teleport to the dashboard
      navigate("/dashboard");

    } catch (err) {
      // Safely catch our Zod validation errors or standard server errors
      const errorMsg = err.response?.data?.message || "Invalid email or password.";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Team Task Manager (Full-Stack)</h2>

      {/* Conditionally render the error message if one exists */}
      {error && (
        <div style={{ backgroundColor: "#ffebee", color: "#c62828", padding: "10px", borderRadius: "4px", marginBottom: "15px", textAlign: "center" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            width: "100%", 
            padding: "10px", 
            backgroundColor: isLoading ? "#9e9e9e" : "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "bold"
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
