import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";


function Navbar() {
  const { nbItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark py-3"
      style={{ backgroundColor: "#0b0b0b" }}
    >
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          🛒 DZShop
        </Link>

        {/* Navigation */}
        <div className="navbar-nav me-auto">
          <Link className="nav-link navbar-link" to="/">
            Accueil
          </Link>

          <Link className="nav-link navbar-link" to="/products">
            Produits
          </Link>

          {user?.role === "admin" && (
            <Link className="nav-link navbar-link" to="/admin">
              Admin Dashboard
            </Link>
          )}
        </div>

    

        {/* Panier */}
        <Link
          className="btn btn-outline-light navbar-button position-relative me-2"
          to="/cart"
        >
          🛒 Panier

          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {nbItems}
          </span>
        </Link>

        {/* Authentification */}
        {!user ? (
          <Link className="btn btn-light navbar-button" to="/login">
            Connexion
          </Link>
        ) : (
          <div className="dropdown">
            <button
              className="btn btn-light navbar-button dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              👤 {user.nom}
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/mes-commandes">
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
  );
}

export default Navbar;