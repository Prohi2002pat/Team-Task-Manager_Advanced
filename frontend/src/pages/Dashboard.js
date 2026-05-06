// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../App.css";

// function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const url =
//           role === "Admin"
//             ? "http://localhost:5000/api/tasks"
//             : "http://localhost:5000/api/tasks/my";

//         const res = await axios.get(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setTasks(res.data);
//       } catch (error) {
//         console.log(error.response?.data || error.message);
//       }
//     };

//     fetchTasks();
//   }, [role]);

//   const updateStatus = async (taskId) => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.patch(
//         `http://localhost:5000/api/tasks/${taskId}`,
//         { status: "Completed" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Task updated");
//       window.location.reload();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error updating");
//     }
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(
//         `http://localhost:5000/api/tasks/${taskId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Task deleted");
//       window.location.reload();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error deleting");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter(
//     (t) => t.status === "Completed"
//   ).length;
//   const pendingTasks = tasks.filter(
//     (t) => t.status !== "Completed"
//   ).length;

//   return (
//     <div className="container">

//       <div className="header">
//         <h2>Dashboard</h2>
//         <button className="btn-danger" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="stats">
//         <div className="stat-box">
//           <h4>Total</h4>
//           <p>{totalTasks}</p>
//         </div>

//         <div className="stat-box">
//           <h4>Completed</h4>
//           <p>{completedTasks}</p>
//         </div>

//         <div className="stat-box">
//           <h4>Pending</h4>
//           <p>{pendingTasks}</p>
//         </div>
//       </div>

//       <h3>Tasks</h3>

//       {tasks.map((task) => (
//         <div className="card" key={task._id}>
//           <h3>{task.title}</h3>
//           <p>{task.description}</p>

//           <p>
//             Status:{" "}
//             <span
//               className={
//                 task.status === "Completed"
//                   ? "status-completed"
//                   : "status-pending"
//               }
//             >
//               {task.status}
//             </span>
//           </p>

//           {role === "Member" && task.status !== "Completed" && (
//             <button
//               className="btn-success"
//               onClick={() => updateStatus(task._id)}
//             >
//               Mark Completed
//             </button>
//           )}

//           {role === "Admin" && (
//             <button
//               className="btn-danger"
//               onClick={() => deleteTask(task._id)}
//               style={{ marginLeft: "10px" }}
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Dashboard;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../App.css";

// function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);   // ✅ NEW
//   const [message, setMessage] = useState("");     // ✅ NEW

//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const url =
//           role === "Admin"
//             ? "http://localhost:5000/api/tasks"
//             : "http://localhost:5000/api/tasks/my";

//         const res = await axios.get(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setTasks(res.data);
//       } catch (error) {
//         console.log(error.response?.data || error.message);
//       } finally {
//         setLoading(false); // ✅ stop loading
//       }
//     };

//     fetchTasks();
//   }, [role]);

//   // ✅ Update Task Status
//   const updateStatus = async (taskId) => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.patch(
//         `http://localhost:5000/api/tasks/${taskId}`,
//         { status: "Completed" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessage("Task marked as completed ✅");
//       setTasks((prev) =>
//         prev.map((t) =>
//           t._id === taskId ? { ...t, status: "Completed" } : t
//         )
//       );

//     } catch (err) {
//       setMessage("Error updating task ❌");
//     }
//   };

//   // ✅ Delete Task
//   const deleteTask = async (taskId) => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(
//         `http://localhost:5000/api/tasks/${taskId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessage("Task deleted successfully 🗑️");
//       setTasks((prev) => prev.filter((t) => t._id !== taskId));

//     } catch (err) {
//       setMessage("Error deleting task ❌");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   // 📊 Stats
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter((t) => t.status === "Completed").length;
//   const pendingTasks = tasks.filter((t) => t.status !== "Completed").length;

//   return (
//     <div className="container">

//       <div className="header">
//         <h2>Dashboard</h2>
//         <button className="btn-danger" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       {/* ✅ MESSAGE */}
//       {message && (
//         <p style={{ color: "green", marginTop: "10px" }}>
//           {message}
//         </p>
//       )}

//       {/* 📊 STATS */}
//       <div className="stats">
//         <div className="stat-box">
//           <h4>Total</h4>
//           <p>{totalTasks}</p>
//         </div>

//         <div className="stat-box">
//           <h4>Completed</h4>
//           <p>{completedTasks}</p>
//         </div>

//         <div className="stat-box">
//           <h4>Pending</h4>
//           <p>{pendingTasks}</p>
//         </div>
//       </div>

//       <h3>Tasks</h3>

//       {/* ✅ LOADING */}
//       {loading && <p>Loading tasks...</p>}

//       {/* ✅ EMPTY STATE */}
//       {!loading && tasks.length === 0 && (
//         <p>No tasks available 📭</p>
//       )}

//       {/* TASK LIST */}
//       {!loading &&
//         tasks.map((task) => (
//           <div className="card" key={task._id}>
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>

//             <p>
//               Status:{" "}
//               <span
//                 className={
//                   task.status === "Completed"
//                     ? "status-completed"
//                     : "status-pending"
//                 }
//               >
//                 {task.status}
//               </span>
//             </p>

//             {/* MEMBER */}
//             {role === "Member" && task.status !== "Completed" && (
//               <button
//                 className="btn-success"
//                 style={{ marginRight: "10px" }}
//                 onClick={() => updateStatus(task._id)}
//               >
//                 Mark Completed
//               </button>
//             )}

//             {/* ADMIN */}
//             {role === "Admin" && (
//               <button
//                 className="btn-danger"
//                 onClick={() => deleteTask(task._id)}
//               >
//                 Delete
//               </button>
//             )}
//           </div>
//         ))}
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api"; // ✅ USING OUR CUSTOM INTERCEPTOR!
import "../App.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const role = localStorage.getItem("role");
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Look how clean this is! No localhost, no manual headers!
        const url = role === "Admin" ? "/tasks" : "/tasks/my";
        const res = await API.get(url);
        
        setTasks(res.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [role]);

  const updateStatus = async (taskId) => {
    try {
      // Again, incredibly clean API call
      await API.patch(`/tasks/${taskId}`, { status: "Completed" });

      setMessage("Task marked as completed ✅");
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: "Completed" } : t))
      );
    } catch (err) {
      setMessage("Error updating task ❌");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);

      setMessage("Task deleted successfully 🗑️");
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      setMessage("Error deleting task ❌");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login"); // ✅ Enterprise routing instead of window.reload()
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status !== "Completed").length;
  const overdueTasks = tasks.filter((t) => {
    return t.status !== "Completed" && new Date(t.dueDate) < new Date();
  }).length;

  return (
    <div className="container" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Dashboard</h2>
        <div>
          {role === "Admin" && (
            <>
              <Link to="/create-project">
                <button 
                  style={{ marginRight: "10px", backgroundColor: "#007bff", color: "white", padding: "10px 15px", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                  + New Project
                </button>
              </Link>
              <Link to="/create-task">
                <button className="btn-success" style={{ marginRight: "10px", padding: "10px 15px", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                  + New Task
                </button>
              </Link>
            </>
          )}
          <button className="btn-danger" onClick={handleLogout} style={{ padding: "10px 15px", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            Logout
          </button>
        </div>
      </div>

      {message && (
        <p style={{ padding: "10px", backgroundColor: "#e8f5e9", color: "#2e7d32", borderRadius: "5px" }}>
          {message}
        </p>
      )}

      {/* STATS */}
      <div className="stats" style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div className="stat-box" style={{ flex: 1, padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px", textAlign: "center" }}>
          <h4>Total</h4><p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalTasks}</p>
        </div>
        <div className="stat-box" style={{ flex: 1, padding: "15px", backgroundColor: "#e3f2fd", borderRadius: "8px", textAlign: "center" }}>
          <h4>Completed</h4><p style={{ fontSize: "24px", fontWeight: "bold", color: "#1565c0" }}>{completedTasks}</p>
        </div>
        <div className="stat-box" style={{ flex: 1, padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px", textAlign: "center" }}>
          <h4>Pending</h4><p style={{ fontSize: "24px", fontWeight: "bold", color: "#e65100" }}>{pendingTasks}</p>
        </div>
        <div className="stat-box" style={{ flex: 1, padding: "15px", backgroundColor: "#ffebee", borderRadius: "8px", textAlign: "center" }}>
          <h4>Overdue</h4><p style={{ fontSize: "24px", fontWeight: "bold", color: "#c62828" }}>{overdueTasks}</p>
        </div>
      </div>

      <h3>Tasks</h3>

      {loading && <p>Loading tasks...</p>}
      {!loading && tasks.length === 0 && <p>No tasks available 📭</p>}

      {!loading &&
        tasks.map((task) => (
          <div className="card" key={task._id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "15px" }}>
            <h3 style={{ margin: "0 0 10px 0" }}>{task.title}</h3>
            <p style={{ color: "#555" }}>{task.description}</p>
            <p>
              Status: <strong>{task.status}</strong>
            </p>

            <div style={{ marginTop: "15px" }}>
              {role === "Member" && task.status !== "Completed" && (
                <button className="btn-success" onClick={() => updateStatus(task._id)}>
                  Mark Completed
                </button>
              )}

              {role === "Admin" && (
                <button className="btn-danger" onClick={() => deleteTask(task._id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;