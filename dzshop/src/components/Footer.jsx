import { Link } from "react-router-dom";

function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer
  className="text-light mt-5"
  style={{ backgroundColor: "#0b0b0b" }}
>

      {/* Partie principale */}
      <div className="container py-5">
        <div className="row g-4">

          {/* DZShop */}
          <div className="col-lg-5 col-md-6">
            <h3 className="fw-bold mb-3">
              🛒 DZShop
            </h3>

            <p className="text-secondary mb-3">
              Votre boutique électronique en Algérie 🇩🇿
            </p>

            <p className="text-secondary small mb-4">
              Découvrez une sélection de produits électroniques de qualité
              et profitez d'une livraison partout en Algérie.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-secondary px-3 py-2">
                🇩🇿 Livraison en Algérie
              </span>

              <span className="badge bg-secondary px-3 py-2">
                🚚 Livraison rapide
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-6 col-lg-3 col-md-3">
            <h6 className="fw-bold text-uppercase mb-3">
              Navigation
            </h6>

            <ul className="list-unstyled mb-0">

              <li className="mb-3">
                <Link
                  to="/"
                  className="text-secondary text-decoration-none"
                >
                  Accueil
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/products"
                  className="text-secondary text-decoration-none"
                >
                  Produits
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-secondary text-decoration-none"
                >
                  🛒 Panier
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div className="col-6 col-lg-4 col-md-3">
            <h6 className="fw-bold text-uppercase mb-3">
              Contact
            </h6>

            <p className="text-secondary small mb-3">
              📍 Skikda, Algérie
            </p>

            <p className="text-secondary small mb-3">
              📞 +213 XX XX XX XX
            </p>

            <p className="text-secondary small mb-0">
              ✉️ contact@dzshop.dz
            </p>
          </div>

        </div>
      </div>

      {/* Séparation */}
     <div
  className="border-top"
  style={{ borderColor: "#2a2a2a" }}
>
        <div className="container">

          <div className="row align-items-center py-3">

            {/* Copyright */}
            <div className="col-md-6 text-center text-md-start">
              <p className="text-secondary small mb-0">
                © {annee} DZShop — Tous droits réservés
              </p>
            </div>

            {/* Localisation */}
            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
              <p className="text-secondary small mb-0">
                🛒 DZShop — Skikda, Algérie
              </p>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;