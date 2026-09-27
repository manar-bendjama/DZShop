import { useState, useContext } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import GoogleSignInButton from '../components/GoogleSignInButton'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [mdp, setMdp] = useState('')
  const [erreur, setErreur] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const { login, loginGoogle } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  // Après la connexion, on retourne là où on voulait aller (ou à l'accueil)
  const destination = (location.state && location.state.from) || '/'

  async function envoyer(e) {
    e.preventDefault()
    setErreur('')
    setEnvoi(true)
    try {
      await login(email, mdp)
      navigate(destination, { replace: true })
    } catch (err) {
      setErreur(err.message)
    }
    setEnvoi(false)
  }

  // Appelée par le bouton Google avec le jeton reçu de Google
  async function connexionGoogle(credential) {
    setErreur('')
    try {
      await loginGoogle(credential)
      navigate(destination, { replace: true })
    } catch (err) {
      setErreur(err.message)
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: '400px' }}>
      <h1 className="mb-4">Connexion</h1>

      {erreur && <div className="alert alert-danger">{erreur}</div>}

      <form onSubmit={envoyer}>
        <input className="form-control mb-3" type="email" placeholder="Email"
          value={email} onChange={function(e){setEmail(e.target.value)}} required />
        <input className="form-control mb-3" type="password" placeholder="Mot de passe"
          value={mdp} onChange={function(e){setMdp(e.target.value)}} required />
        <button className="btn btn-primary w-100" disabled={envoi}>
          {envoi ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <div className="text-center text-muted my-3">— ou —</div>
      <GoogleSignInButton onCredential={connexionGoogle} />

      <p className="text-center mt-3 mb-0">
        Pas de compte ? <Link to="/register">Créer un compte</Link>
      </p>
    </div>
  )
}

export default LoginPage