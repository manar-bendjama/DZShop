import { createContext, useState, useEffect } from 'react'
import api from '../api/axios'

export const AuthContext = createContext()

function messageErreur(erreur) {
  if (erreur.response && erreur.response.data && erreur.response.data.message) {
    return erreur.response.data.message
  }
  return 'Serveur injoignable, réessaie dans un instant'
}

export function AuthProvider({ children }) {
  // Au démarrage, on relit l'utilisateur sauvegardé : un F5 ne déconnecte plus
  const [user, setUser] = useState(function () {
    try {
      const sauvegarde = localStorage.getItem('user')
      return sauvegarde ? JSON.parse(sauvegarde) : null
    } catch (erreur) {
      return null
    }
  })

  function sauvegarder(donnees) {
    localStorage.setItem('token', donnees.token)
    localStorage.setItem('user', JSON.stringify(donnees.user))
    setUser(donnees.user)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  // Au démarrage, on demande au serveur "qui suis-je ?" : si le token a
  // expiré, on est déconnecté tout de suite (géré par l'intercepteur axios).
  useEffect(function () {
    if (!localStorage.getItem('token')) return

    api
      .get('/auth/me')
      .then(function (reponse) {
        localStorage.setItem('user', JSON.stringify(reponse.data.user))
        setUser(reponse.data.user)
      })
      .catch(function () {
        // Le 401 est déjà géré par l'intercepteur de axios.js
      })
  }, [])

  async function login(email, password) {
    try {
      const reponse = await api.post('/auth/login', { email: email, password: password })
      sauvegarder(reponse.data)
      return reponse.data.user
    } catch (erreur) {
      throw new Error(messageErreur(erreur))
    }
  }

  // Connexion avec Google : on envoie à l'API le jeton reçu de Google, elle le fait vérifier
  async function loginGoogle(credential) {
    try {
      const reponse = await api.post('/auth/google', { credential: credential })
      sauvegarder(reponse.data)
      return reponse.data.user
    } catch (erreur) {
      throw new Error(messageErreur(erreur))
    }
  }

  async function register(nom, email, password) {
    try {
      const reponse = await api.post('/auth/register', { nom: nom, email: email, password: password })
      sauvegarder(reponse.data)
      return reponse.data.user
    } catch (erreur) {
      throw new Error(messageErreur(erreur))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginGoogle,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}