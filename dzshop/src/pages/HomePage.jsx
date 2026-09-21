import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="dzshop">

      {/* Fonts + brand tokens — move this block into index.css in real usage */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

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

        .dzshop h1, .dzshop h2, .dzshop h5 {
          font-family: 'Poppins', sans-serif;
        }

        .dzshop .hero-brand {
          background: linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-dark-deep) 100%);
          position: relative;
          overflow: hidden;
        }

        .dzshop .hero-brand::before {
          content: '';
          position: absolute;
          top: -120px;
          right: -120px;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,116,59,0.25) 0%, rgba(232,116,59,0) 70%);
        }

        .dzshop .badge-brand {
          background: rgba(255,255,255,0.12);
          color: #fff;
          font-weight: 500;
          letter-spacing: 0.2px;
        }

        .dzshop .btn-accent {
          background: var(--brand-accent);
          border: none;
          color: #fff;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .dzshop .btn-accent:hover {
          background: var(--brand-accent-dark);
          color: #fff;
          transform: translateY(-1px);
        }

        .dzshop .btn-ghost {
          border: 1.5px solid rgba(255,255,255,0.5);
          color: #fff;
          background: transparent;
        }
        .dzshop .btn-ghost:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.08);
          color: #fff;
        }

        .dzshop .product-preview {
          background: #fff;
          border-radius: 20px;
        }

        .dzshop .section-eyebrow {
          width: 40px;
          height: 3px;
          background: var(--brand-accent);
          border-radius: 2px;
          margin: 0 auto 16px;
        }
        .dzshop .section-eyebrow.align-start {
          margin: 0 0 16px;
        }

        .dzshop .service-card {
          border-radius: 16px;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .dzshop .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(15,61,62,0.12) !important;
        }

        .dzshop .service-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: rgba(15,61,62,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          margin: 0 auto 16px;
        }

        .dzshop .cta-brand {
          background: linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-dark-deep) 100%);
          border-radius: 24px;
        }

        .dzshop .star {
          color: #F2A93B;
          letter-spacing: 1px;
        }

        .dzshop .price-old {
          text-decoration: line-through;
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-brand text-white py-5">
        <div className="container py-5">

          <div className="row align-items-center">

            {/* Texte */}
            <div className="col-lg-7 text-center text-lg-start">

              <span className="badge badge-brand mb-3 px-3 py-2 rounded-pill">
                🇩🇿 Boutique 100% Algérienne
              </span>

              <h1 className="display-4 fw-bold mb-3">
                Bienvenue sur DZShop
              </h1>

              <p className="lead mb-4 opacity-75">
                Découvrez notre sélection de produits électroniques
                et faites-vous livrer partout en Algérie.
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start gap-2">

                <Link
                  className="btn btn-accent btn-lg fw-semibold px-4"
                  to="/products"
                >
                  Voir les produits
                </Link>

                <Link
                  className="btn btn-ghost btn-lg px-4"
                  to="/cart"
                >
                  Mon panier
                </Link>

              </div>

            </div>

            {/* Illustration produit */}
            <div className="col-lg-5 text-center mt-5 mt-lg-0">

              <div className="product-preview shadow-lg p-4 text-start mx-auto" style={{ maxWidth: '280px' }}>

                <span className="badge mb-2" style={{ background: 'var(--brand-accent)' }}>
                  -15%
                </span>

                <div
                  className="bg-light rounded-3 d-flex align-items-center justify-content-center mb-3"
                  style={{ height: '180px', overflow : 'hidden' }}
                >
                  <img
                   src="/images/image.png"
                   alt="casque "
                   style={{ height:'100%' , width:'100%', objectFit: 'contain' }}
                    />
                </div>

                <div className="text-dark fw-semibold small">
                  Casque Bluetooth JBL Tune 510BT
                </div>

                <div className="d-flex align-items-center gap-1 my-1">
                  <span className="star">★★★★★</span>
                  <span className="text-muted small ms-1">(128)</span>
                </div>

                <div className="d-flex align-items-baseline gap-2">
                  <span className="fw-bold" style={{ color: 'var(--brand-dark)' }}>
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


      {/* Services */}
      <section className="py-5" style={{ background: 'var(--brand-bg)' }}>

        <div className="container">

          <div className="text-center mb-5">
            <div className="section-eyebrow" />
            <h2 className="fw-bold">
              Pourquoi choisir DZShop ?
            </h2>

            <p className="text-muted">
              Une expérience simple, rapide et sécurisée.
            </p>
          </div>


          <div className="row g-4">

            {/* Livraison */}
            <div className="col-md-4">

              <div className="card service-card border-0 shadow-sm h-100 text-center p-4">

                <div className="service-icon">
                  🚚
                </div>

                <h5 className="fw-bold">
                  Livraison partout en Algérie
                </h5>

                <p className="text-muted mb-0">
                  Nous livrons vos commandes dans les
                  58 wilayas, sous 2 à 5 jours ouvrables.
                </p>

              </div>

            </div>


            {/* Paiement */}
            <div className="col-md-4">

              <div className="card service-card border-0 shadow-sm h-100 text-center p-4">

                <div className="service-icon">
                  💵
                </div>

                <h5 className="fw-bold">
                  Paiement à la livraison
                </h5>

                <p className="text-muted mb-0">
                  Payez en espèces ou par carte au
                  moment de la réception.
                </p>

              </div>

            </div>


            {/* Qualité */}
            <div className="col-md-4">

              <div className="card service-card border-0 shadow-sm h-100 text-center p-4">

                <div className="service-icon">
                  ⭐
                </div>

                <h5 className="fw-bold">
                  Produits de qualité
                </h5>

                <p className="text-muted mb-0">
                  Produits neufs et garantis, testés
                  avant expédition.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Réassurance */}
      <section className="border-top py-4" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row g-3 text-center">
            <div className="col-md-6 d-flex align-items-center justify-content-center gap-2">
              <span className="fs-5">🚚</span>
              <span className="small fw-medium">Livraison suivie dans toute l'Algérie</span>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center gap-2">
              <span className="fs-5">🛡️</span>
              <span className="small fw-medium">Échange possible sous 7 jours</span>
            </div>
          </div>
        </div>
      </section>


      {/* Call To Action */}
      <section className="py-5" style={{ background: 'var(--brand-bg)' }}>

        <div className="container text-center">

          <div className="cta-brand text-white p-5">
            <h2 className="fw-bold mb-3">
              Prêt à faire vos achats ?
            </h2>

            <p className="opacity-75 mb-4">
              Découvrez tous nos produits disponibles.
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
  )
}

export default HomePage