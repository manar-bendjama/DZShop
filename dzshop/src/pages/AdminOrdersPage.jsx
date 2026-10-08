import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function AdminOrdersPage() {
  const [commandes, setCommandes] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')
  const [modification, setModification] = useState(null)

  const statuts = [
    'En attente',
    'Confirmée',
    'Expédiée',
    'Livrée',
    'Annulée'
  ]

  async function chargerCommandes() {
    try {
      setChargement(true)
      setErreur('')

      const reponse = await api.get('/orders')

      setCommandes(reponse.data)
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        'Impossible de charger les commandes.'
      )
    } finally {
      setChargement(false)
    }
  }

  useEffect(function () {
    chargerCommandes()
  }, [])

  function formatPrix(prix) {
    return Number(prix).toLocaleString('fr-DZ') + ' DZD'
  }

  async function modifierStatut(id, nouveauStatut) {
    try {
      setModification(id)
      setErreur('')

      await api.put(`/orders/${id}/status`, {
        statut: nouveauStatut
      })

      setCommandes(function (anciennesCommandes) {
        return anciennesCommandes.map(function (commande) {
          if (commande._id === id) {
            return {
              ...commande,
              statut: nouveauStatut
            }
          }

          return commande
        })
      })
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        'Impossible de modifier le statut de la commande.'
      )
    } finally {
      setModification(null)
    }
  }

  function couleurStatut(statut) {
    if (statut === 'En attente') return 'warning'
    if (statut === 'Confirmée') return 'primary'
    if (statut === 'Expédiée') return 'info'
    if (statut === 'Livrée') return 'success'
    if (statut === 'Annulée') return 'danger'

    return 'secondary'
  }

  if (chargement) {
    return (
      <div className="admin-orders-page">
        <div className="container py-5 text-center">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Chargement...
            </span>
          </div>

          <p className="mt-3 text-muted">
            Chargement des commandes...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="admin-orders-page"
      style={{
        backgroundColor: '#FAF8F5',
        minHeight: '100vh'
      }}
    >
      <style>{`
        .admin-orders-page {
          color: #142221;
          font-family: 'Inter', sans-serif;
        }

        .admin-orders-page h1,
        .admin-orders-page h5,
        .admin-orders-page h6 {
          font-family: 'Poppins', sans-serif;
        }

        .admin-orders-page .page-title {
          color: #142221;
          font-weight: 800;
        }

        .admin-orders-page .order-card {
          border: none;
          border-radius: 18px;
          overflow: hidden;
        }

        .admin-orders-page .order-header {
          background: #0F3D3E;
          color: white;
        }

        .admin-orders-page .status-box {
          background: #FAF8F5;
          border-radius: 12px;
        }

        .admin-orders-page .info-title {
          color: #0F3D3E;
          font-weight: 700;
        }

        .admin-orders-page .table thead th {
          white-space: nowrap;
        }

        .admin-orders-page .back-link {
          color: #6c757d;
          transition: color 0.15s ease;
        }

        .admin-orders-page .back-link:hover {
          color: #E8743B;
        }
      `}</style>

      <div className="container py-5">

        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

          <div>
            <a
              href="/admin"
              className="text-decoration-none back-link"
            >
              ← Retour au Dashboard
            </a>

            <h1 className="page-title mt-2 mb-1">
              Gestion des commandes
            </h1>

            <p className="text-muted mb-0">
              Liste de toutes les commandes des clients.
            </p>
          </div>

          <button
            className="btn btn-outline-primary"
            onClick={chargerCommandes}
          >
            ↻ Actualiser
          </button>
        </div>

        {/* Erreur */}
        {erreur && (
          <div className="alert alert-danger">
            {erreur}
          </div>
        )}

        {/* Aucune commande */}
        {commandes.length === 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">

              <div className="fs-1 mb-3">
                📦
              </div>

              <h5 className="fw-bold">
                Aucune commande
              </h5>

              <p className="text-muted mb-0">
                Aucune commande pour le moment.
              </p>

            </div>
          </div>
        ) : (

          /* Liste des commandes */
          <div className="row g-4">

            {commandes.map(function (commande) {
              const statutActuel =
                commande.statut || 'En attente'

              return (
                <div
                  className="col-12"
                  key={commande._id}
                >

                  <div className="card shadow-sm order-card">

                    {/* Header commande */}
                    <div className="card-header order-header py-3">

                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                        <div>
                          <strong>
                            Commande #{commande._id.slice(-6)}
                          </strong>

                          <div className="small opacity-75">
                            {commande.createdAt
                              ? new Date(
                                  commande.createdAt
                                ).toLocaleString('fr-DZ')
                              : ''}
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">

                          <span
                            className={`badge bg-${couleurStatut(
                              statutActuel
                            )}`}
                          >
                            {statutActuel}
                          </span>

                          <span className="badge bg-light text-dark">
                            {formatPrix(commande.total)}
                          </span>

                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="card-body p-4">

                      {/* Statut */}
                      <div className="status-box border p-3 mb-4">

                        <div className="row align-items-center">

                          <div className="col-md-4 mb-2 mb-md-0">
                            <strong>
                              Statut de la commande
                            </strong>
                          </div>

                          <div className="col-md-8">

                            <select
                              className={`form-select border-${couleurStatut(
                                statutActuel
                              )}`}
                              value={statutActuel}
                              disabled={
                                modification === commande._id
                              }
                              onChange={function (event) {
                                modifierStatut(
                                  commande._id,
                                  event.target.value
                                )
                              }}
                            >
                              {statuts.map(function (statut) {
                                return (
                                  <option
                                    key={statut}
                                    value={statut}
                                  >
                                    {statut}
                                  </option>
                                )
                              })}
                            </select>

                            {modification === commande._id && (
                              <small className="text-muted">
                                Modification en cours...
                              </small>
                            )}

                          </div>
                        </div>
                      </div>

                      {/* Informations */}
                      <div className="row mb-4">

                        {/* Client */}
                        <div className="col-md-4 mb-4 mb-md-0">

                          <h6 className="info-title mb-3">
                            Client
                          </h6>

                          <p className="mb-1">
                            <strong>
                              {commande.user?.nom ||
                                commande.client ||
                                'Client'}
                            </strong>
                          </p>

                          {commande.user?.email && (
                            <p className="mb-1 text-muted">
                              {commande.user.email}
                            </p>
                          )}

                          <p className="mb-0">
                            📞 {commande.telephone}
                          </p>

                        </div>

                        {/* Livraison */}
                        <div className="col-md-4 mb-4 mb-md-0">

                          <h6 className="info-title mb-3">
                            Livraison
                          </h6>

                          <p className="mb-1">
                            <strong>
                              Wilaya :
                            </strong>{' '}
                            {commande.wilaya}
                          </p>

                          <p className="mb-1">
                            <strong>
                              Commune :
                            </strong>{' '}
                            {commande.commune || '-'}
                          </p>

                          <p className="mb-0">
                            <strong>
                              Adresse :
                            </strong>{' '}
                            {commande.adresse}
                          </p>

                        </div>

                        {/* Montant */}
                        <div className="col-md-4">

                          <h6 className="info-title mb-3">
                            Montant
                          </h6>

                          <p className="mb-1">
                            Sous-total :{' '}
                            {formatPrix(
                              commande.sousTotal
                            )}
                          </p>

                          <p className="mb-1">
                            Livraison :{' '}
                            {commande.livraison === 0
                              ? 'Gratuite'
                              : formatPrix(
                                  commande.livraison
                                )}
                          </p>

                          <p className="mb-0">
                            <strong>
                              Total :{' '}
                              {formatPrix(
                                commande.total
                              )}
                            </strong>
                          </p>

                        </div>
                      </div>

                      {/* Produits commandés */}
                      <h6 className="info-title mb-3">
                        Produits commandés
                      </h6>

                      <div className="table-responsive">

                        <table className="table table-bordered align-middle">

                          <thead className="table-light">
                            <tr>
                              <th>Produit</th>
                              <th>Prix</th>
                              <th>Quantité</th>
                              <th>Sous-total</th>
                            </tr>
                          </thead>

                          <tbody>

                            {commande.articles?.map(
                              function (article, index) {
                                return (
                                  <tr
                                    key={
                                      article.produit ||
                                      index
                                    }
                                  >

                                    <td>
                                      {article.nom}
                                    </td>

                                    <td>
                                      {formatPrix(
                                        article.prix
                                      )}
                                    </td>

                                    <td>
                                      {article.quantite}
                                    </td>

                                    <td>
                                      {formatPrix(
                                        article.prix *
                                          article.quantite
                                      )}
                                    </td>

                                  </tr>
                                )
                              }
                            )}

                          </tbody>

                        </table>

                      </div>

                    </div>
                  </div>

                </div>
              )
            })}

          </div>
        )}
      </div>
    </div>
  )
}