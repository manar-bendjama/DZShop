import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export function setToken(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function removeToken() {
  delete api.defaults.headers.common["Authorization"];
}

export default api;