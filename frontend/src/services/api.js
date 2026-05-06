import axios from "axios";

// 1. Use Environment Variables for the URL (crucial for deployment)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://team-task-manageradvanced-production.up.railway.app/api",
});

// 2. Request Interceptor: Automatically attach the token to all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 3. Response Interceptor: Globally handle 401 Unauthorized errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend says the token is invalid/expired, log them out immediately
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default API;
