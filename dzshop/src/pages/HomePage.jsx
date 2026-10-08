import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="dzshop">
      <style>{`
        .dzshop {
          --brand-dark: #0F3D3E;
          --brand-dark-deep: #0A2C2D;
          --brand-accent: #E8743B;
          --brand-accent-dark: #C85F2C;
          --brand-bg: #FAF8F5;
          --brand-ink: #142221;
          font-family: 'Inter', sans-serif;
          color: var(--brand-ink);
        }

        .dzshop h1,
        .dzshop h2,
        .dzshop h5 {
          font-family: 'Poppins', sans-serif;
        }

        /* =========================
           HERO
        ========================= */

        .dzshop .hero-brand {
          background:
            radial-gradient(
              circle at 85% 20%,
              rgba(232, 116, 59, 0.18),
              transparent 28%
            ),
            linear-gradient(
              135deg,
              var(--brand-dark) 0%,
              var(--brand-dark-deep) 100%
            );
          position: relative;
          overflow: hidden;
        }

        .dzshop .hero-brand::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          top: -220px;
          right: -120px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 0 0 40px rgba(255,255,255,0.02),
            0 0 0 80px rgba(255,255,255,0.015);
        }

        .dzshop .hero-content {
          position: relative;
          z-index: 2;
        }

        .dzshop .hero-title {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .dzshop .hero-text {
          max-width: 650px;
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .dzshop .badge-brand {
          display: inline-block;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff;
          font-weight: 500;
          letter-spacing: 0.2px;
          backdrop-filter: blur(8px);
        }

        /* =========================
           BUTTONS
        ========================= */

        .dzshop .btn-accent {
          background: var(--brand-accent);
          border: 1px solid var(--brand-accent);
          color: #fff;
          transition:
            background 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .dzshop .btn-accent:hover,
        .dzshop .btn-accent:focus {
          background: var(--brand-accent-dark);
          border-color: var(--brand-accent-dark);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(232,116,59,0.25);
        }

        .dzshop .btn-ghost {
          border: 1px solid rgba(255,255,255,0.45);
          color: #fff;
          background: transparent;
          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;
        }

        .dzshop .btn-ghost:hover,
        .dzshop .btn-ghost:focus {
          border-color: #fff;
          background: rgba(255,255,255,0.1);
          color: #fff;
          transform: translateY(-2px);
        }

        /* =========================
           PRODUCT PREVIEW
        ========================= */

        .dzshop .product-preview {
          background: #fff;
          border-radius: 22px;
          overflow: hidden;
          transition: transform 0.25s ease;
        }

        .dzshop .product-preview:hover {
          transform: translateY(-6px);
        }

        .dzshop .product-image {
          height: 190px;
          background: #f5f5f5;
          border-radius: 14px;
          overflow: hidden;
        }

        .dzshop .product-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .dzshop .product-preview:hover .product-image img {
          transform: scale(1.05);
        }

        .dzshop .star {
          color: #F2A93B;
          letter-spacing: 1px;
        }

        .dzshop .price-old {
          text-decoration: line-through;
        }

        /* =========================
           SECTION TITLES
        ========================= */

        .dzshop .section-eyebrow {
          width: 42px;
          height: 3px;
          background: var(--brand-accent);
          border-radius: 2px;
          margin: 0 auto 16px;
        }

        /* =========================
           SERVICES
        ========================= */

        .dzshop .service-card {
          border-radius: 18px;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .dzshop .service-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 14px 30px rgba(15,61,62,0.12) !important;
        }

        .dzshop .service-icon {
          width: 58px;
          height: 58px;
          border-radius: 15px;
          background: rgba(15,61,62,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          margin: 0 auto 18px;
        }

        .dzshop .service-card h5 {
          color: var(--brand-dark);
        }

        /* =========================
           TRUST SECTION
        ========================= */

        .dzshop .trust-item {
          color: var(--brand-dark);
        }

        .dzshop .trust-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(15,61,62,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        /* =========================
           CTA
        ========================= */

        .dzshop .cta-brand {
          background:
            radial-gradient(
              circle at 90% 20%,
              rgba(232,116,59,0.18),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              var(--brand-dark) 0%,
              var(--brand-dark-deep) 100%
            );
          border-radius: 24px;
          overflow: hidden;
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 991px) {
          .dzshop .hero-brand {
            text-align: center;
          }

          .dzshop .hero-text {
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (max-width: 575px) {
          .dzshop .hero-brand .container {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }

          .dzshop .hero-title {
            font-size: 2.3rem;
          }

          .dzshop .hero-text {
            font-size: 1rem;
          }

          .dzshop .hero-buttons {
            flex-direction: column;
            width: 100%;
          }

          .dzshop .hero-buttons .btn {
            width: 100%;
          }

          .dzshop .product-preview {
            max-width: 300px !important;
          }

          .dzshop .cta-brand {
            border-radius: 18px;
            padding: 2rem !important;
          }
        }
      `}</style>

      {/* =========================
          HERO
      ========================= */}

      <section className="hero-brand text-white">
        <div className="container py-5">
          <div className="row align-items-center py-lg-4">
            
            <div className="col-lg-7 hero-content text-center text-lg-start">
              <span className="badge badge-brand mb-4 px-3 py-2 rounded-pill">
                🇩🇿 Boutique 100% Algérienne
              </span>

              <h1 className="hero-title mb-4">
                Bienvenue sur DZShop
              </h1>

              <p className="hero-text lead mb-4 opacity-75">
                Découvrez une sélection de produits électroniques
                de qualité et faites-vous livrer partout en Algérie.
              </p>

              <div className="hero-buttons d-flex justify-content-center justify-content-lg-start gap-3">
                <Link
                  className="btn btn-accent btn-lg fw-semibold px-4"
                  to="/products"
                >
                  Découvrir les produits
                </Link>

                <Link
                  className="btn btn-ghost btn-lg px-4"
                  to="/cart"
                >
                  🛒 Mon panier
                </Link>
              </div>
            </div>

            {/* Produit mis en avant */}
            <div className="col-lg-5 text-center mt-5 mt-lg-0 hero-content">
              <div
                className="product-preview shadow-lg p-4 text-start mx-auto"
                style={{ maxWidth: "300px" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span
                    className="badge"
                    style={{
                      background: "var(--brand-accent)",
                    }}
                  >
                    Offre spéciale
                  </span>

                  <span className="small text-muted">
                    ⭐ 4.8
                  </span>
                </div>

                <div className="product-image mb-3">
                  <img
                    src="/images/image.png"
                    alt="Casque Bluetooth"
                  />
                </div>

                <div className="text-dark fw-semibold">
                  Casque Bluetooth
                </div>

                <div className="d-flex align-items-center gap-1 my-2">
                  <span className="star">
                    ★★★★★
                  </span>

                  <span className="text-muted small">
                    (128)
                  </span>
                </div>

                <div className="d-flex align-items-baseline gap-2">
                  <span
                    className="fw-bold fs-5"
                    style={{ color: "var(--brand-dark)" }}
                  >
                    8 900 DA
                  </span>

                  <span className="text-muted price-old small">
                    10 500 DA
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          SERVICES
      ========================= */}

      <section
        className="py-5"
        style={{ background: "var(--brand-bg)" }}
      >
        <div className="container">

          <div className="text-center mb-5">
            <div className="section-eyebrow" />

            <h2 className="fw-bold">
              Pourquoi choisir DZShop ?
            </h2>

            <p className="text-muted mb-0">
              Une expérience simple, rapide et sécurisée.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="card service-card border-0 shadow-sm h-100 text-center p-4">
                <div className="service-icon">
                  🚚
                </div>

                <h5 className="fw-bold">
                  Livraison partout en Algérie
                </h5>

                <p className="text-muted mb-0">
                  Faites-vous livrer vos commandes partout
                  en Algérie dans les meilleures conditions.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card service-card border-0 shadow-sm h-100 text-center p-4">
                <div className="service-icon">
                  💵
                </div>

                <h5 className="fw-bold">
                  Paiement à la livraison
                </h5>

                <p className="text-muted mb-0">
                  Commandez facilement et payez au moment
                  de la réception de votre commande.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card service-card border-0 shadow-sm h-100 text-center p-4">
                <div className="service-icon">
                  ⭐
                </div>

                <h5 className="fw-bold">
                  Produits de qualité
                </h5>

                <p className="text-muted mb-0">
                  Une sélection de produits électroniques
                  choisis pour répondre à vos besoins.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          TRUST
      ========================= */}

      <section
        className="py-4 border-top border-bottom"
        style={{ background: "#fff" }}
      >
        <div className="container">
          <div className="row g-4">

            <div className="col-md-6">
              <div className="trust-item d-flex align-items-center justify-content-center gap-3">
                <div className="trust-icon">
                  🚚
                </div>

                <div>
                  <div className="fw-semibold">
                    Livraison en Algérie
                  </div>

                  <div className="small text-muted">
                    Des commandes livrées partout en Algérie
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="trust-item d-flex align-items-center justify-content-center gap-3">
                <div className="trust-icon">
                  🛡️
                </div>

                <div>
                  <div className="fw-semibold">
                    Commande sécurisée
                  </div>

                  <div className="small text-muted">
                    Vos informations sont traitées en toute sécurité
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          CALL TO ACTION
      ========================= */}

      <section
        className="py-5"
        style={{ background: "var(--brand-bg)" }}
      >
        <div className="container text-center">

          <div className="cta-brand text-white p-5">

            <h2 className="fw-bold mb-3">
              Prêt à faire vos achats ?
            </h2>

            <p className="opacity-75 mb-4">
              Découvrez tous nos produits disponibles
              et trouvez ce qu'il vous faut.
            </p>

            <Link
              to="/products"
              className="btn btn-accent btn-lg px-5"
            >
              Découvrir la boutique
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}

export default HomePage;