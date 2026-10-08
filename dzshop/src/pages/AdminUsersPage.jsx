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
    setNom(utilisateur.nom || '')
    setEmail(utilisateur.email || '')
    setRole(utilisateur.role || 'user')

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

    if (!utilisateurEnEdition) {
      return
    }

    try {
      setOperationEnCours(true)
      setErreur('')
      setMessage('')

      await api.put(
        `/auth/users/${utilisateurEnEdition._id}`,
        {
          nom,
          email,
          role
        }
      )

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

    if (!confirmation) {
      return
    }

    try {
      setErreur('')
      setMessage('')

      await api.delete(
        `/auth/users/${utilisateur._id}`
      )

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
      <div
        className="admin-users-page"
        style={{
          backgroundColor: '#FAF8F5',
          minHeight: '100vh'
        }}
      >
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
            Chargement des utilisateurs...
          </p>

        </div>
      </div>
    )
  }

  return (
    <div
      className="admin-users-page"
      style={{
        backgroundColor: '#FAF8F5',
        minHeight: '100vh'
      }}
    >
      <style>{`
        .admin-users-page {
          color: #142221;
          font-family: 'Inter', sans-serif;
        }

        .admin-users-page h1,
        .admin-users-page h5 {
          font-family: 'Poppins', sans-serif;
        }

        .admin-users-page .page-title {
          color: #142221;
          font-weight: 800;
        }

        .admin-users-page .back-link {
          color: #6c757d;
          transition: color 0.15s ease;
        }

        .admin-users-page .back-link:hover {
          color: #E8743B;
        }

        .admin-users-page .admin-card {
          border: none;
          border-radius: 18px;
          overflow: hidden;
        }

        .admin-users-page .form-control,
        .admin-users-page .form-select {
          border-radius: 10px;
        }

        .admin-users-page .form-control:focus,
        .admin-users-page .form-select:focus {
          border-color: #E8743B;
          box-shadow: 0 0 0 0.2rem rgba(232, 116, 59, 0.15);
        }

        .admin-users-page .table thead th {
          background: #0F3D3E;
          color: #fff;
          border: none;
          font-weight: 600;
          white-space: nowrap;
        }

        .admin-users-page .table tbody tr {
          vertical-align: middle;
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
              Gestion des utilisateurs
            </h1>

            <p className="text-muted mb-0">
              Gérer les comptes utilisateurs et leurs rôles.
            </p>
          </div>

          <button
            className="btn btn-outline-primary"
            onClick={chargerUtilisateurs}
          >
            ↻ Actualiser
          </button>

        </div>

        {/* Messages */}
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

        {/* Formulaire de modification */}
        {utilisateurEnEdition && (
          <div className="card admin-card shadow-sm mb-4">

            <div className="card-header bg-white border-0 p-4 pb-0">
              <h5 className="mb-0 fw-bold">
                Modifier l'utilisateur
              </h5>
            </div>

            <div className="card-body p-4">

              <form onSubmit={modifierUtilisateur}>

                <div className="row g-3">

                  {/* Nom */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Nom
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={nom}
                      onChange={(event) =>
                        setNom(event.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Rôle */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Rôle
                    </label>

                    <select
                      className="form-select"
                      value={role}
                      onChange={(event) =>
                        setRole(event.target.value)
                      }
                    >
                      <option value="user">
                        User
                      </option>

                      <option value="admin">
                        Admin
                      </option>
                    </select>
                  </div>

                </div>

                {/* Boutons */}
                <div className="mt-4">

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
                    className="btn btn-outline-secondary"
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

        {/* Aucun utilisateur */}
        {utilisateurs.length === 0 ? (

          <div className="card admin-card shadow-sm">
            <div className="card-body text-center py-5">

              <div className="fs-1 mb-3">
                👥
              </div>

              <h5 className="fw-bold">
                Aucun utilisateur
              </h5>

              <p className="text-muted mb-0">
                Aucun utilisateur trouvé.
              </p>

            </div>
          </div>

        ) : (

          /* Tableau */
          <div className="card admin-card shadow-sm">

            <div className="card-body p-0">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead>
                    <tr>
                      <th className="px-4">
                        Nom
                      </th>

                      <th>
                        Email
                      </th>

                      <th>
                        Provider
                      </th>

                      <th>
                        Rôle
                      </th>

                      <th className="text-end px-4">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {utilisateurs.map(function (utilisateur) {

                      const estAdmin =
                        utilisateur.role === 'admin'

                      return (
                        <tr key={utilisateur._id}>

                          {/* Nom */}
                          <td className="px-4">
                            <strong>
                              {utilisateur.nom}
                            </strong>
                          </td>

                          {/* Email */}
                          <td>
                            {utilisateur.email}
                          </td>

                          {/* Provider */}
                          <td>
                            <span className="badge bg-secondary">
                              {utilisateur.provider || 'local'}
                            </span>
                          </td>

                          {/* Rôle */}
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

                          {/* Actions */}
                          <td className="text-end px-4">

                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() =>
                                ouvrirModification(
                                  utilisateur
                                )
                              }
                            >
                              Modifier
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                supprimerUtilisateur(
                                  utilisateur
                                )
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
          </div>
        )}

      </div>
    </div>
  )
}