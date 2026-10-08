import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function AdminProductsPage() {
  const [produits, setProduits] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')
  const [message, setMessage] = useState('')

  const [afficherFormulaire, setAfficherFormulaire] = useState(false)
  const [modeEdition, setModeEdition] = useState(false)
  const [produitEnEdition, setProduitEnEdition] = useState(null)

  const [nom, setNom] = useState('')
  const [description, setDescription] = useState('')
  const [prix, setPrix] = useState('')
  const [categorie, setCategorie] = useState('')
  const [stock, setStock] = useState('')
  const [image, setImage] = useState('')

  const [operationEnCours, setOperationEnCours] = useState(false)

  async function chargerProduits() {
    try {
      setChargement(true)
      setErreur('')

      const reponse = await api.get('/products')
      setProduits(reponse.data)
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        'Impossible de charger les produits.'
      )
    } finally {
      setChargement(false)
    }
  }

  useEffect(() => {
    chargerProduits()
  }, [])

  function formatPrix(prix) {
    return Number(prix).toLocaleString('fr-DZ') + ' DZD'
  }

  function reinitialiserFormulaire() {
    setNom('')
    setDescription('')
    setPrix('')
    setCategorie('')
    setStock('')
    setImage('')
    setModeEdition(false)
    setProduitEnEdition(null)
  }

  function ouvrirAjout() {
    reinitialiserFormulaire()
    setAfficherFormulaire(true)
    setErreur('')
    setMessage('')
  }

  function ouvrirModification(produit) {
    setNom(produit.nom || '')
    setDescription(produit.description || '')
    setPrix(produit.prix ?? '')
    setCategorie(produit.categorie || '')
    setStock(produit.stock ?? '')
    setImage(produit.image || '')

    setProduitEnEdition(produit)
    setModeEdition(true)
    setAfficherFormulaire(true)

    setErreur('')
    setMessage('')
  }

  function fermerFormulaire() {
    reinitialiserFormulaire()
    setAfficherFormulaire(false)
  }

  async function ajouterProduit(event) {
    event.preventDefault()

    try {
      setOperationEnCours(true)
      setErreur('')
      setMessage('')

      await api.post('/products', {
        nom,
        description,
        prix: Number(prix),
        categorie,
        stock: Number(stock),
        image
      })

      setMessage('Produit ajouté avec succès.')

      reinitialiserFormulaire()
      setAfficherFormulaire(false)

      await chargerProduits()
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        'Impossible d’ajouter le produit.'
      )
    } finally {
      setOperationEnCours(false)
    }
  }

  async function modifierProduit(event) {
    event.preventDefault()

    if (!produitEnEdition) return

    try {
      setOperationEnCours(true)
      setErreur('')
      setMessage('')

      await api.put(`/products/${produitEnEdition._id}`, {
        nom,
        description,
        prix: Number(prix),
        categorie,
        stock: Number(stock),
        image
      })

      setMessage('Produit modifié avec succès.')

      reinitialiserFormulaire()
      setAfficherFormulaire(false)

      await chargerProduits()
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        'Impossible de modifier le produit.'
      )
    } finally {
      setOperationEnCours(false)
    }
  }
    async function supprimerProduit(produit) {
  const confirmation = window.confirm(
    `Voulez-vous vraiment supprimer "${produit.nom}" ?`
  )

  if (!confirmation) return

  try {
    setErreur('')
    setMessage('')

    await api.delete(`/products/${produit._id}`)

    setMessage('Produit supprimé avec succès.')

    await chargerProduits()
  } catch (error) {
    setErreur(
      error.response?.data?.message ||
      'Impossible de supprimer le produit.'
    )
  }
}

  return (
    <div className="container py-5">

      

      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

        <div>
          <Link
            to="/admin"
            className="text-decoration-none text-muted"
          >
            ← Retour au Dashboard
          </Link>

          <h1 className="fw-bold mt-2 mb-1">
            Gestion des produits
          </h1>

          <p className="text-muted mb-0">
            Consultez et gérez les produits de votre boutique DZShop.
          </p>
        </div>

        <div className="d-flex gap-2">

          <button
            className="btn btn-outline-secondary"
            onClick={chargerProduits}
          >
            ↻ Actualiser
          </button>

          <button
            className="btn btn-primary"
            onClick={ouvrirAjout}
          >
            + Ajouter un produit
          </button>

        </div>
      </div>

      {/* Messages */}
      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      {erreur && (
        <div className="alert alert-danger">
          {erreur}
        </div>
      )}

      {/* Formulaire */}
      {afficherFormulaire && (
        <div className="card border-0 shadow-sm mb-4">

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h4 className="fw-bold mb-0">
                {modeEdition
                  ? 'Modifier le produit'
                  : 'Ajouter un nouveau produit'}
              </h4>

              {modeEdition && (
                <span className="badge bg-warning text-dark">
                  Mode modification
                </span>
              )}

            </div>

            <form
              onSubmit={
                modeEdition
                  ? modifierProduit
                  : ajouterProduit
              }
            >

              <div className="row g-3">

                {/* Nom */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Nom du produit
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Ex: Casque Bluetooth"
                    required
                  />
                </div>

                {/* Catégorie */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Catégorie
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    placeholder="Ex: Audio"
                    required
                  />
                </div>

                {/* Description */}
                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description du produit..."
                  />
                </div>

                {/* Prix */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Prix (DZD)
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    min="0"
                    required
                  />
                </div>

                {/* Stock */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Stock
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    min="0"
                    required
                  />
                </div>

                {/* Image */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Image
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/images/produit.jpg"
                  />

                  <small className="text-muted">
                    Chemin ou URL de l'image
                  </small>
                </div>

              </div>

              {/* Boutons */}
              <div className="d-flex justify-content-end gap-2 mt-4">

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={fermerFormulaire}
                  disabled={operationEnCours}
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={operationEnCours}
                >
                  {operationEnCours
                    ? 'Enregistrement...'
                    : modeEdition
                      ? 'Enregistrer les modifications'
                      : 'Ajouter le produit'}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* Chargement */}
      {chargement ? (

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Chargement...
            </span>
          </div>

          <p className="text-muted mt-3">
            Chargement des produits...
          </p>

        </div>

      ) : (

        <>

          {/* Résumé */}
          <div className="card border-0 shadow-sm mb-4">

            <div className="card-body p-4">

              <div className="row align-items-center">

                <div className="col-md-8">

                  <h5 className="fw-bold mb-1">
                    Produits de la boutique
                  </h5>

                  <p className="text-muted mb-0">
                    {produits.length} produit(s) enregistré(s)
                    dans MongoDB.
                  </p>

                </div>

                <div className="col-md-4 text-md-end mt-3 mt-md-0">

                  <span className="badge bg-primary fs-6 px-3 py-2">
                    {produits.length} Produits
                  </span>

                </div>

              </div>

            </div>
          </div>

          {/* Aucun produit */}
          {produits.length === 0 ? (

            <div className="text-center py-5">

              <div className="fs-1 mb-3">
                📦
              </div>

              <h4 className="fw-bold">
                Aucun produit
              </h4>

              <p className="text-muted">
                Aucun produit n'est disponible pour le moment.
              </p>

            </div>

          ) : (

            /* Tableau */
            <div className="card border-0 shadow-sm">

              <div className="card-body p-0">

                <div className="table-responsive">

                  <table className="table table-hover align-middle mb-0">

                    <thead className="table-light">

                      <tr>

                        <th className="px-4">
                          Produit
                        </th>

                        <th>
                          Catégorie
                        </th>

                        <th>
                          Prix
                        </th>

                        <th>
                          Stock
                        </th>

                        <th className="text-end px-4">
                          Actions
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {produits.map((produit) => (

                        <tr key={produit._id}>

                          {/* Produit */}
                          <td className="px-4">

                            <div className="d-flex align-items-center gap-3">

                              {produit.image ? (

                                <img
                                  src={produit.image}
                                  alt={produit.nom}
                                  width="60"
                                  height="60"
                                  className="rounded"
                                  style={{
                                    objectFit: 'cover'
                                  }}
                                />

                              ) : (

                                <div
                                  className="bg-light rounded d-flex align-items-center justify-content-center"
                                  style={{
                                    width: '60px',
                                    height: '60px'
                                  }}
                                >
                                  📦
                                </div>

                              )}

                              <div>

                                <div className="fw-bold">
                                  {produit.nom}
                                </div>

                                <small className="text-muted">
                                  ID : {produit._id}
                                </small>

                              </div>

                            </div>

                          </td>

                          {/* Catégorie */}
                          <td>
                            <span className="badge bg-secondary">
                              {produit.categorie}
                            </span>
                          </td>

                          {/* Prix */}
                          <td>
                            <strong>
                              {formatPrix(produit.prix)}
                            </strong>
                          </td>

                          {/* Stock */}
                          <td>

                            {produit.stock === 0 ? (

                              <span className="badge bg-danger">
                                Rupture
                              </span>

                            ) : produit.stock <= 5 ? (

                              <span className="badge bg-warning text-dark">
                                {produit.stock} restant(s)
                              </span>

                            ) : (

                              <span className="badge bg-success">
                                {produit.stock} en stock
                              </span>

                            )}

                          </td>

                          {/* Actions */}
                          <td className="text-end px-4">

                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() =>
                                ouvrirModification(produit)
                              }
                            >
                              Modifier
                            </button>

                            <button
                       className="btn btn-sm btn-outline-danger"
                            onClick={() => supprimerProduit(produit)}
>
      Supprimer
</button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          )}

        </>
      )}

    </div>
  )
} 