
function Footer() {
  
  const annee = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light mt-5 pt-5 pb-3">

      <div className="container">

        <div className="row">

          {/* Logo et description */}
          <div className="col-md-6 mb-4">
            <h4 className="fw-bold">
              🛒 DZShop
            </h4>

            <p className="text-secondary mb-2">
              Votre boutique en ligne en Algérie 🇩🇿
            </p>

            <p className="text-secondary small mb-0">
              Achetez facilement vos produits préférés,
              avec livraison partout en Algérie.
            </p>
          </div>

          {/* Informations */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">
              Navigation
            </h6>

            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="/"
                  className="text-secondary text-decoration-none"
                >
                   Accueil
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="/products"
                  className="text-secondary text-decoration-none"
                >
                   Produits
                </a>
              </li>

              <li>
                <a
                  href="/cart"
                  className="text-secondary text-decoration-none"
                >
                  🛒 Panier
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">
              Contact
            </h6>

            <p className="text-secondary small mb-2">
              📍 Skikda, Algérie
            </p>

            <p className="text-secondary small mb-2">
              📞 +213 XX XX XX XX
            </p>

            <p className="text-secondary small mb-0">
              ✉️ contact@dzshop.dz
            </p>
          </div>

        </div>

        <hr className="border-secondary" />

        {/* Copyright */}
        <div className="text-center pt-2">

          <p className="text-secondary small mb-0">
            🛒 DZShop — Skikda, Algérie
          </p>

          <p className="text-secondary small mb-0 mt-1">
            © {annee} — Tous droits réservés
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer

