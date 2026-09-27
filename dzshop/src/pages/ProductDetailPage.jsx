import { useParams, Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { useApi } from '../hooks/useApi'
import Chargement from '../components/Chargement'
import { CartContext } from '../context/CartContext'

function ProductDetailPage() {

  const { id } = useParams()

  const { addToCart } = useContext(CartContext)

  const [ajoute, setAjoute] = useState(false)

  // Le produit vient maintenant de l'API (plus du fichier data/products.js)
  const { data: produit, chargement, erreur } = useApi('/products/' + id)

  if (chargement) {
    return <Chargement />
  }

  if (erreur || !produit) {
    return (
      <p className="container py-5">
        Produit introuvable
      </p>
    )
  }

  function ajouterAuPanier() {
    addToCart(produit)
    setAjoute(true)
  }

  return (
    <div className="container py-5">

      <Link
        className="btn btn-link px-0 mb-3"
        to="/products"
      >
        ← Retour
      </Link>

      <div className="row">


        <div className="col-md-6 text-center">
          <img
            src={produit.image}
            alt={produit.nom}
            className="img-fluid"
            style={{
              height: "400px",
              width: "100%",
              objectFit: "contain",
              padding: "20px"
            }}
          />
        </div>


        <div className="col-md-6">

          <h1>
            {produit.nom}
          </h1>

          <p className="text-muted">
            {produit.categorie}
          </p>

          <p className="fs-3 text-primary fw-bold">
            {produit.prix.toLocaleString('fr-DZ')} DZD
          </p>

          <p>
            Stock disponible : <strong>
{produit.stock > 5 && (
  <p className="text-success fw-bold">
    🟢 En stock
  </p>
)}

{produit.stock > 0 && produit.stock <= 5 && (
  <p className="text-warning fw-bold">
    🟠 Plus que quelques unités disponibles
  </p>
)}

{produit.stock === 0 && (
  <p className="text-danger fw-bold">
    🔴 Rupture de stock
  </p>
)}
</strong>
          </p>

          <button
            className="btn btn-primary btn-lg"
            onClick={ajouterAuPanier}
            disabled={produit.stock === 0}
          >
            🛒 Ajouter au panier
          </button>

          {ajoute && (
            <div className="alert alert-success mt-3">
              ✅ Ajouté au panier !
              {' '}
              <Link to="/cart">
                Voir mon panier
              </Link>
            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default ProductDetailPage