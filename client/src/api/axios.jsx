import axios from "axios";

const api = axios.create({
  baseURL: "https://hospital-management-shz4.onrender.com/api",
  withCredentials: true,
});

export default api;