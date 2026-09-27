import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  if (!user) {
    // On retient la page demandée pour y revenir après la connexion
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}

export default PrivateRoute