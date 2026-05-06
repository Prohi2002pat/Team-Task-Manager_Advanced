// import { useState } from "react";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import CreateTask from "./pages/CreateTask";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem("token")
//   );

//   return (
//     <div>
//       {isLoggedIn ? (
//         <>
//           <CreateTask />
//           <Dashboard />
//         </>
//       ) : (
//         <Login setIsLoggedIn={setIsLoggedIn} />
//       )}
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import CreateProject from "./pages/CreateProject";

// ✨ ENTERPRISE UPGRADE: The Private Route Component
// This checks if a token exists. If not, it kicks them back to the login page.
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes (Wrapped in PrivateRoute) */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/create-task" 
            element={
              <PrivateRoute>
                <CreateTask />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/create-project" 
            element={
              <PrivateRoute>
                <CreateProject />
              </PrivateRoute>
            }
          />

          {/* Fallback: If they type a random URL, send them to dashboard (or login if blocked) */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;