import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function login(email, password) {
    if (
      email === 'admin@dzshop.dz' &&
      password === '123456'
    ) {
      setUser({
        nom: 'Admin'
      })

      return true
    }

    return false
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}