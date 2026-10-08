import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

function AdminDashboardPage() {
  const [produits, setProduits] = useState([])
  const [commandes, setCommandes] = useState([])
  const [utilisateurs, setUtilisateurs] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(function () {
    chargerDashboard()
  }, [])

  async function chargerDashboard() {
    try {
      setChargement(true)
      setErreur('')

      const [produitsResponse, commandesResponse, utilisateursResponse] =
        await Promise.all([
          api.get('/products'),
          api.get('/orders'),
          api.get('/auth/users')
        ])

      setProduits(produitsResponse.data)
      setCommandes(commandesResponse.data)
      setUtilisateurs(utilisateursResponse.data)
    } catch (error) {
      console.error(error)
      setErreur(
        error.response?.data?.message ||
        'Impossible de charger les données du dashboard.'
      )
    } finally {
      setChargement(false)
    }
  }

  const chiffreAffaires = commandes.reduce(function (total, commande) {
    return total + Number(commande.total || 0)
  }, 0)

  const stockTotal = produits.reduce(function (total, produit) {
    return total + Number(produit.stock || 0)
  }, 0)

  const produitsRupture = produits.filter(function (produit) {
    return Number(produit.stock || 0) === 0
  }).length

  function formaterPrix(prix) {
    return Number(prix || 0).toLocaleString('fr-FR') + ' DA'
  }

  function formaterDate(date) {
    if (!date) return '-'

    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (chargement) {
    return (
      <div
        className="py-5 text-center"
        style={{
          background: '#FAF8F5',
          minHeight: '100vh',
          color: '#142221'
        }}
      >
        <div
          className="spinner-border"
          role="status"
          style={{ color: '#0F3D3E' }}
        >
          <span className="visually-hidden">Chargement...</span>
        </div>

        <p className="mt-3 text-muted">
          Chargement du dashboard...
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        background: '#FAF8F5',
        minHeight: '100vh',
        color: '#142221',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

        .admin-dashboard h1,
        .admin-dashboard h2,
        .admin-dashboard h5 {
          font-family: 'Poppins', sans-serif;
        }

        .admin-dashboard .dashboard-header {
          background: linear-gradient(
            135deg,
            #0F3D3E 0%,
            #0A2C2D 100%
          );
          position: relative;
          overflow: hidden;
        }

        .admin-dashboard .dashboard-header::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          right: -100px;
          top: -150px;
          background: radial-gradient(
            circle,
            rgba(232,116,59,0.25) 0%,
            rgba(232,116,59,0) 70%
          );
        }

        .admin-dashboard .stat-card {
          background: #fff;
          border: none;
          border-radius: 18px;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .admin-dashboard .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(15,61,62,0.12) !important;
        }

        .admin-dashboard .stat-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          background: rgba(15,61,62,0.08);
        }

        .admin-dashboard .dashboard-section {
          background: #fff;
          border: none;
          border-radius: 18px;
        }

        .admin-dashboard .dashboard-link {
          border: 1.5px solid #0F3D3E;
          color: #0F3D3E;
          background: transparent;
          transition: all 0.15s ease;
        }

        .admin-dashboard .dashboard-link:hover {
          background: #0F3D3E;
          color: #fff;
        }

        .admin-dashboard .accent-link {
          background: #E8743B;
          border: 1.5px solid #E8743B;
          color: #fff;
          transition: all 0.15s ease;
        }

        .admin-dashboard .accent-link:hover {
          background: #C85F2C;
          border-color: #C85F2C;
          color: #fff;
          transform: translateY(-1px);
        }

        .admin-dashboard .table thead th {
          background: #0F3D3E;
          color: #fff;
          border: none;
          font-weight: 600;
        }

        .admin-dashboard .table tbody tr {
          vertical-align: middle;
        }

        .admin-dashboard .badge-brand {
          background: rgba(15,61,62,0.09);
          color: #0F3D3E;
        }

        .admin-dashboard .badge-accent {
          background: rgba(232,116,59,0.12);
          color: #C85F2C;
        }
      `}</style>

      <div className="admin-dashboard">

        {/* Header */}
        <section className="dashboard-header text-white py-5">
          <div className="container position-relative" style={{ zIndex: 1 }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

              <div>
                <span className="badge rounded-pill px-3 py-2 mb-3">
                  🇩🇿 DZShop Administration
                </span>

                <h1 className="fw-bold mb-2">
                  Admin Dashboard
                </h1>

                <p className="mb-0 opacity-75">
                  Gérez votre boutique, vos produits, vos commandes et vos utilisateurs.
                </p>
              </div>

              <button
                onClick={chargerDashboard}
                className="btn btn-light fw-semibold px-4"
              >
                🔄 Actualiser
              </button>

            </div>
          </div>
        </section>

        <main className="container py-5">

          {/* Erreur */}
          {erreur && (
            <div className="alert alert-danger">
              {erreur}
            </div>
          )}

          {/* Statistiques */}
          <div className="row g-4 mb-5">

            {/* Produits */}
            <div className="col-md-6 col-xl-3">
              <div className="stat-card shadow-sm h-100 p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">
                      Produits
                    </p>

                    <h2
                      className="fw-bold mb-0"
                      style={{ color: '#0F3D3E' }}
                    >
                      {produits.length}
                    </h2>
                  </div>

                  <div className="stat-icon">
                    📦
                  </div>
                </div>

                <Link
                  to="/admin/products"
                  className="btn dashboard-link btn-sm mt-4"
                >
                  Gérer les produits
                </Link>
              </div>
            </div>

            {/* Commandes */}
            <div className="col-md-6 col-xl-3">
              <div className="stat-card shadow-sm h-100 p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">
                      Commandes
                    </p>

                    <h2
                      className="fw-bold mb-0"
                      style={{ color: '#0F3D3E' }}
                    >
                      {commandes.length}
                    </h2>
                  </div>

                  <div className="stat-icon">
                    🛒
                  </div>
                </div>

                <Link
                  to="/admin/orders"
                  className="btn dashboard-link btn-sm mt-4"
                >
                  Voir les commandes
                </Link>
              </div>
            </div>

            {/* Utilisateurs */}
            <div className="col-md-6 col-xl-3">
              <div className="stat-card shadow-sm h-100 p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">
                      Utilisateurs
                    </p>

                    <h2
                      className="fw-bold mb-0"
                      style={{ color: '#0F3D3E' }}
                    >
                      {utilisateurs.length}
                    </h2>
                  </div>

                  <div className="stat-icon">
                    👥
                  </div>
                </div>

                <Link
                  to="/admin/users"
                  className="btn dashboard-link btn-sm mt-4"
                >
                  Gérer les utilisateurs
                </Link>
              </div>
            </div>

            {/* Chiffre d'affaires */}
            <div className="col-md-6 col-xl-3">
              <div className="stat-card shadow-sm h-100 p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">
                      Chiffre d'affaires
                    </p>

                    <h2
                      className="fw-bold mb-0"
                      style={{
                        color: '#E8743B',
                        fontSize: '1.5rem'
                      }}
                    >
                      {formaterPrix(chiffreAffaires)}
                    </h2>
                  </div>

                  <div
                    className="stat-icon"
                    style={{
                      background: 'rgba(232,116,59,0.10)'
                    }}
                  >
                    💰
                  </div>
                </div>

                <small className="text-muted d-block mt-4">
                  Total des commandes
                </small>
              </div>
            </div>

          </div>

          {/* Stock */}
          <div className="row g-4 mb-5">

            <div className="col-md-6">
              <div className="dashboard-section shadow-sm p-4 h-100">
                <div className="d-flex align-items-center gap-3">
                  <div className="stat-icon">
                    📊
                  </div>

                  <div>
                    <p className="text-muted mb-1">
                      Stock total
                    </p>

                    <h2
                      className="fw-bold mb-0"
                      style={{ color: '#0F3D3E' }}
                    >
                      {stockTotal}
                    </h2>

                    <small className="text-muted">
                      unités disponibles
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="dashboard-section shadow-sm p-4 h-100">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="stat-icon"
                    style={{
                      background: produitsRupture > 0
                        ? 'rgba(232,116,59,0.12)'
                        : 'rgba(15,61,62,0.08)'
                    }}
                  >
                    {produitsRupture > 0 ? '⚠️' : '✅'}
                  </div>

                  <div>
                    <p className="text-muted mb-1">
                      Produits en rupture
                    </p>

                    <h2
                      className="fw-bold mb-0"
                      style={{
                        color: produitsRupture > 0
                          ? '#C85F2C'
                          : '#0F3D3E'
                      }}
                    >
                      {produitsRupture}
                    </h2>

                    <small className="text-muted">
                      produit(s) avec stock = 0
                    </small>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Actions rapides */}
          <section className="dashboard-section shadow-sm p-4 mb-5">

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
              <div>
                <h5 className="fw-bold mb-1">
                  Actions rapides
                </h5>

                <p className="text-muted mb-0">
                  Accédez rapidement aux principales fonctions d'administration.
                </p>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2">

              <Link
                to="/admin/products"
                className="btn dashboard-link"
              >
                📦 Produits
              </Link>

              <Link
                to="/admin/orders"
                className="btn dashboard-link"
              >
                🛒 Commandes
              </Link>

              <Link
                to="/admin/users"
                className="btn dashboard-link"
              >
                👥 Utilisateurs
              </Link>

              <Link
                to="/products"
                className="btn accent-link"
              >
                🛍️ Voir la boutique
              </Link>

            </div>

          </section>

          {/* Commandes récentes */}
          <section className="dashboard-section shadow-sm p-4">

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

              <div>
                <h5 className="fw-bold mb-1">
                  Commandes récentes
                </h5>

                <p className="text-muted mb-0">
                  Les dernières commandes enregistrées.
                </p>
              </div>

              <Link
                to="/admin/orders"
                className="btn dashboard-link btn-sm"
              >
                Voir toutes les commandes
              </Link>

            </div>

            {commandes.length === 0 ? (

              <div className="text-center py-5">
                <div style={{ fontSize: '3rem' }}>
                  🛒
                </div>

                <h5 className="mt-3 fw-bold">
                  Aucune commande
                </h5>

                <p className="text-muted mb-0">
                  Les commandes des clients apparaîtront ici.
                </p>
              </div>

            ) : (

              <div className="table-responsive">

                <table className="table table-hover mb-0">

                  <thead>
                    <tr>
                      <th>Commande</th>
                      <th>Date</th>
                      <th>Client</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>

                    {commandes.slice(0, 5).map(function (commande) {

                      return (
                        <tr key={commande._id}>

                          <td>
                            <span className="badge badge-brand">
                              #{String(commande._id).slice(-6).toUpperCase()}
                            </span>
                          </td>

                          <td>
                            {formaterDate(commande.createdAt)}
                          </td>

                          <td>
                            <div className="fw-semibold">
                              {commande.client || 'Client'}
                            </div>

                            {commande.telephone && (
                              <small className="text-muted">
                                {commande.telephone}
                              </small>
                            )}
                          </td>

                          <td>
                            <span className="fw-bold">
                              {formaterPrix(commande.total)}
                            </span>
                          </td>

                        </tr>
                      )

                    })}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        </main>
      </div>
    </div>
  )
}

export default AdminDashboardPage