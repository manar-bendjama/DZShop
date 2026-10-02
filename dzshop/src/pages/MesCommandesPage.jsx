import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

function MesCommandesPage() {
  const [commandes, setCommandes] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(function () {
    async function chargerCommandes() {
      try {
        const reponse = await api.get('/orders/my')
        setCommandes(reponse.data)
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setErreur(err.response.data.message)
        } else {
          setErreur('Impossible de charger vos commandes')
        }
      }

      setChargement(false)
    }

    chargerCommandes()
  }, [])

  if (chargement) {
    return (
      <div className="container py-5 text-center">
        <p>Chargement de vos commandes...</p>
      </div>
    )
  }

  if (erreur) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {erreur}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Mes commandes</h1>

      {commandes.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">
            Vous n'avez pas encore passé de commande.
          </p>

          <Link to="/products" className="btn btn-primary">
            Voir les produits
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {commandes.map(function (commande) {
            return (
              <div className="col-12" key={commande._id}>
                <div className="card">
                  <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h5 className="mb-1">
                          Commande #{commande._id.slice(-6)}
                        </h5>

                        <small className="text-muted">
                          {new Date(commande.createdAt).toLocaleDateString('fr-DZ')}
                        </small>
                      </div>

                      <span className="badge bg-secondary">
                        {commande.statut}
                      </span>
                    </div>

                    <hr />

                    {commande.articles.map(function (article) {
                      return (
                        <div
                          key={article.produit}
                          className="d-flex justify-content-between mb-2"
                        >
                          <span>
                            {article.nom} × {article.quantite}
                          </span>

                          <span>
                            {(article.prix * article.quantite).toLocaleString('fr-DZ')} DZD
                          </span>
                        </div>
                      )
                    })}

                    <hr />

                    <div className="d-flex justify-content-between">
                      <span>Sous-total</span>
                      <span>
                        {commande.sousTotal.toLocaleString('fr-DZ')} DZD
                      </span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Livraison</span>
                      <span>
                        {commande.livraison === 0
                          ? 'Gratuite'
                          : commande.livraison.toLocaleString('fr-DZ') + ' DZD'}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between fw-bold mt-2">
                      <span>Total</span>
                      <span>
                        {commande.total.toLocaleString('fr-DZ')} DZD
                      </span>
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

export default MesCommandesPage