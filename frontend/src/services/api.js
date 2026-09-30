import axios from "axios";

const api = axios.create({
  baseURL:  "https://brewhouse-backend.onrender.com/api",
});

export default api;