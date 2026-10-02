import axios from "axios";

// Un SEUL endroit qui connaît l'adresse de l'API.
// En local : http://localhost:5000. En ligne : la variable VITE_API_URL (séance de mise en ligne).
const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api",
});

// Avant CHAQUE requête, on ajoute le token de connexion (s'il existe).
// Il est gardé dans le localStorage : un F5 ne déconnecte plus l'utilisateur.
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

// Si le serveur répond "401" (token expiré ou invalide) alors qu'on avait un
// token : on déconnecte proprement et on renvoie vers la page de connexion.
api.interceptors.response.use(
  function (reponse) {
    return reponse;
  },
  function (erreur) {
    const url = (erreur.config && erreur.config.url) || "";
    const estPageAuth = url.startsWith("/auth/login") || url.startsWith("/auth/register");

    if (erreur.response && erreur.response.status === 401 && localStorage.getItem("token") && !estPageAuth) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(erreur);
  }
);

export default api;