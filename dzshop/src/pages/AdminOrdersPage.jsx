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
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status"></div>

        <p className="mt-3">
          Chargement des commandes...
        </p>
      </div>
    )
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Gestion des commandes</h1>

          <p className="text-muted">
            Liste de toutes les commandes des clients.
          </p>
        </div>

        <button
          className="btn btn-outline-primary"
          onClick={chargerCommandes}
        >
          Actualiser
        </button>
      </div>

      {erreur && (
        <div className="alert alert-danger">
          {erreur}
        </div>
      )}

      {commandes.length === 0 ? (
        <div className="alert alert-info">
          Aucune commande pour le moment.
        </div>
      ) : (
        <div className="row g-4">

          {commandes.map(function (commande) {
            return (
              <div
                className="col-12"
                key={commande._id}
              >

                <div className="card shadow-sm">

                  <div className="card-header d-flex justify-content-between align-items-center">

                    <div>
                      <strong>
                        Commande #{commande._id.slice(-6)}
                      </strong>

                      <div className="text-muted small">
                        {commande.createdAt
                          ? new Date(commande.createdAt).toLocaleString('fr-DZ')
                          : ''}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">

                      <span
                        className={`badge bg-${couleurStatut(
                          commande.statut || 'En attente'
                        )}`}
                      >
                        {commande.statut || 'En attente'}
                      </span>

                      <span className="badge bg-primary">
                        {formatPrix(commande.total)}
                      </span>

                    </div>

                  </div>

                  <div className="card-body">

                    {/* STATUT DE LA COMMANDE */}

                    <div className="alert alert-light border mb-4">

                      <div className="row align-items-center">

                        <div className="col-md-4">
                          <strong>
                            Statut de la commande
                          </strong>
                        </div>

                        <div className="col-md-8">

                          <select
                            className={`form-select border-${couleurStatut(
                              commande.statut || 'En attente'
                            )}`}
                            value={commande.statut || 'En attente'}
                            disabled={modification === commande._id}
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

                    <div className="row mb-4">

                      <div className="col-md-4">

                        <h6>Client</h6>

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

                      <div className="col-md-4">

                        <h6>Livraison</h6>

                        <p className="mb-1">
                          <strong>Wilaya :</strong>{' '}
                          {commande.wilaya}
                        </p>

                        <p className="mb-1">
                          <strong>Commune :</strong>{' '}
                          {commande.commune || '-'}
                        </p>

                        <p className="mb-0">
                          <strong>Adresse :</strong>{' '}
                          {commande.adresse}
                        </p>

                      </div>

                      <div className="col-md-4">

                        <h6>Montant</h6>

                        <p className="mb-1">
                          Sous-total :{' '}
                          {formatPrix(commande.sousTotal)}
                        </p>

                        <p className="mb-1">
                          Livraison :{' '}
                          {commande.livraison === 0
                            ? 'Gratuite'
                            : formatPrix(commande.livraison)}
                        </p>

                        <p className="mb-0">

                          <strong>
                            Total : {formatPrix(commande.total)}
                          </strong>

                        </p>

                      </div>

                    </div>

                    <h6 className="mb-3">
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
                                    article.produit || index
                                  }
                                >

                                  <td>
                                    {article.nom}
                                  </td>

                                  <td>
                                    {formatPrix(article.prix)}
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
  )
}