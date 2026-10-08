import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useApi } from "../hooks/useApi";
import Chargement from "../components/Chargement";
import { CartContext } from "../context/CartContext";

function ProductDetailPage() {
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const [ajoute, setAjoute] = useState(false);

  // Le produit vient de l'API
  const {
    data: produit,
    chargement,
    erreur,
  } = useApi("/products/" + id);

  if (chargement) {
    return <Chargement />;
  }

  if (erreur || !produit) {
    return (
      <div className="container py-5">
        <p className="text-danger">
          Produit introuvable
        </p>

        <Link to="/products" className="btn btn-primary">
          ← Retour aux produits
        </Link>
      </div>
    );
  }

  function ajouterAuPanier() {
    addToCart(produit);
    setAjoute(true);
  }

  return (
    <div
      style={{
        backgroundColor: "#FAF8F5",
        minHeight: "100vh",
      }}
    >
      <div className="container py-5">

        {/* Retour */}
        <Link
          className="btn btn-link px-0 mb-4 text-decoration-none"
          to="/products"
          style={{ color: "#0F3D3E" }}
        >
          ← Retour aux produits
        </Link>

        <div className="row g-5 align-items-center">

          {/* Image */}
          <div className="col-md-6">
            <div
              className="bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-center"
              style={{
                minHeight: "450px",
                border: "1px solid #eeeeee",
              }}
            >
              <img
                src={produit.image}
                alt={produit.nom}
                className="img-fluid"
                style={{
                  maxHeight: "400px",
                  maxWidth: "100%",
                  objectFit: "contain",
                  padding: "25px",
                }}
              />
            </div>
          </div>

          {/* Informations */}
          <div className="col-md-6">

            <p
              className="text-uppercase small fw-bold mb-2"
              style={{ color: "#E8743B" }}
            >
              {produit.categorie}
            </p>

            <h1
              className="fw-bold mb-3"
              style={{
                fontFamily: "Poppins, sans-serif",
                color: "#142221",
              }}
            >
              {produit.nom}
            </h1>

            <p
              className="fs-2 fw-bold mb-4"
              style={{ color: "#0F3D3E" }}
            >
              {produit.prix.toLocaleString("fr-DZ")} DZD
            </p>

            {/* Description */}
            {produit.description && (
              <div className="mb-4">
                <h5 className="fw-bold mb-2">
                  Description
                </h5>

                <p className="text-muted">
                  {produit.description}
                </p>
              </div>
            )}

            {/* Stock */}
            <div className="mb-4">

              {produit.stock > 5 && (
                <p className="text-success fw-bold mb-0">
                  🟢 En stock
                </p>
              )}

              {produit.stock > 0 && produit.stock <= 5 && (
                <p className="text-warning fw-bold mb-0">
                  🟠 Plus que quelques unités disponibles
                </p>
              )}

              {produit.stock === 0 && (
                <p className="text-danger fw-bold mb-0">
                  🔴 Rupture de stock
                </p>
              )}

            </div>

            {/* Bouton */}
            <button
              className="btn btn-primary btn-lg px-4"
              onClick={ajouterAuPanier}
              disabled={produit.stock === 0}
            >
              🛒 Ajouter au panier
            </button>

            {/* Confirmation */}
            {ajoute && (
              <div className="alert alert-success mt-4">
                <div className="mb-2">
                  ✅ Produit ajouté au panier !
                </div>

                <Link
                  to="/cart"
                  className="fw-bold"
                >
                  Voir mon panier →
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;