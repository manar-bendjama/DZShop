
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const { nbItems } = useContext(CartContext)
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🛒 DZShop</Link>

        <div className="navbar-nav me-auto">
          <Link className="nav-link" to="/">Accueil</Link>
          <Link className="nav-link" to="/products">Produits</Link>
         {user?.role === 'admin' && (
        <li className="nav-item">
        <Link className="nav-link" to="/admin">
        Admin Dashboard
        </Link>
        </li>
)}
        </div>

        <Link className="btn btn-outline-light position-relative me-2" to="/cart">
          🛒 Panier
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {nbItems}
          </span>
        </Link>

        {!user ? (
          <Link className="btn btn-light" to="/login">
            Connexion
          </Link>
        ) : (
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              👤 {user.nom}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
  <li>
    <Link className="dropdown-item" to="/orders">
      Mes commandes
    </Link>
  </li>

  <li>
    <hr className="dropdown-divider" />
  </li>

  <li>
    <button className="dropdown-item" onClick={logout}>
      Déconnexion
    </button>
  </li>
</ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

