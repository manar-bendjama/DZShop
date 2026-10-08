import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function AdminUsersPage() {
  const [utilisateurs, setUtilisateurs] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')
  const [message, setMessage] = useState('')

  const [utilisateurEnEdition, setUtilisateurEnEdition] = useState(null)
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')
  const [operationEnCours, setOperationEnCours] = useState(false)

  async function chargerUtilisateurs() {
    try {
      setChargement(true)
      setErreur('')

      const reponse = await api.get('/auth/users')
      setUtilisateurs(reponse.data)
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        'Impossible de charger les utilisateurs.'
      )
    } finally {
      setChargement(false)
    }
  }

  useEffect(function () {
    chargerUtilisateurs()
  }, [])

  function ouvrirModification(utilisateur) {
    setUtilisateurEnEdition(utilisateur)
    setNom(utilisateur.nom)
    setEmail(utilisateur.email)
    setRole(utilisateur.role)
    setErreur('')
    setMessage('')
  }

  function fermerModification() {
    setUtilisateurEnEdition(null)
    setNom('')
    setEmail('')
    setRole('user')
  }

  async function modifierUtilisateur(event) {
    event.preventDefault()

    try {
      setOperationEnCours(true)
      setErreur('')
      setMessage('')

      await api.put(`/auth/users/${utilisateurEnEdition._id}`, {
        nom,
        email,
        role
      })

      setMessage('Utilisateur modifié avec succès.')

      fermerModification()
      await chargerUtilisateurs()
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        'Impossible de modifier l’utilisateur.'
      )
    } finally {
      setOperationEnCours(false)
    }
  }

  async function supprimerUtilisateur(utilisateur) {
    const confirmation = window.confirm(
      `Voulez-vous vraiment supprimer "${utilisateur.nom}" ?`
    )

    if (!confirmation) return

    try {
      setErreur('')
      setMessage('')

      await api.delete(`/auth/users/${utilisateur._id}`)

      setMessage('Utilisateur supprimé avec succès.')

      await chargerUtilisateurs()
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        'Impossible de supprimer l’utilisateur.'
      )
    }
  }

  if (chargement) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status"></div>
        <p className="mt-3">Chargement des utilisateurs...</p>
      </div>
    )
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Gestion des utilisateurs</h1>
          <p className="text-muted mb-0">
            Gérer les comptes utilisateurs et leurs rôles.
          </p>
        </div>

        <button
          className="btn btn-outline-primary"
          onClick={chargerUtilisateurs}
        >
          Actualiser
        </button>
      </div>

      {erreur && (
        <div className="alert alert-danger">
          {erreur}
        </div>
      )}

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      {utilisateurEnEdition && (
        <div className="card shadow-sm mb-4">
          <div className="card-header">
            <h5 className="mb-0">Modifier l'utilisateur</h5>
          </div>

          <div className="card-body">

            <form onSubmit={modifierUtilisateur}>

              <div className="row g-3">

                <div className="col-md-4">
                  <label className="form-label">
                    Nom
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={nom}
                    onChange={(event) => setNom(event.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">
                    Rôle
                  </label>

                  <select
                    className="form-select"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

              </div>

              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-primary me-2"
                  disabled={operationEnCours}
                >
                  {operationEnCours
                    ? 'Modification...'
                    : 'Enregistrer'}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={fermerModification}
                  disabled={operationEnCours}
                >
                  Annuler
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {utilisateurs.length === 0 ? (
        <div className="alert alert-info">
          Aucun utilisateur trouvé.
        </div>
      ) : (
        <div className="card shadow-sm">

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Provider</th>
                  <th>Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {utilisateurs.map(function (utilisateur) {

                  const estAdmin =
                    utilisateur.role === 'admin'

                  return (
                    <tr key={utilisateur._id}>

                      <td>
                        <strong>
                          {utilisateur.nom}
                        </strong>
                      </td>

                      <td>
                        {utilisateur.email}
                      </td>

                      <td>
                        <span className="badge bg-secondary">
                          {utilisateur.provider}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            estAdmin
                              ? 'badge bg-danger'
                              : 'badge bg-primary'
                          }
                        >
                          {utilisateur.role}
                        </span>
                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() =>
                            ouvrirModification(utilisateur)
                          }
                        >
                          Modifier
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            supprimerUtilisateur(utilisateur)
                          }
                          disabled={estAdmin}
                        >
                          Supprimer
                        </button>

                      </td>

                    </tr>
                  )
                })}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  )
}