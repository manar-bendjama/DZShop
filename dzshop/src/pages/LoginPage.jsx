import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import GoogleSignInButton from "../components/GoogleSignInButton";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);

  const { login, loginGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Après la connexion, on retourne là où on voulait aller
  const destination =
    (location.state && location.state.from) || "/";

  async function envoyer(e) {
    e.preventDefault();
    setErreur("");
    setEnvoi(true);

    try {
      await login(email, mdp);
      navigate(destination, { replace: true });
    } catch (err) {
      setErreur(err.message);
    }

    setEnvoi(false);
  }

  // Connexion avec Google
  async function connexionGoogle(credential) {
    setErreur("");

    try {
      await loginGoogle(credential);
      navigate(destination, { replace: true });
    } catch (err) {
      setErreur(err.message);
    }
  }

  return (
    <div
      className="login-page"
      style={{
        backgroundColor: "#FAF8F5",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .login-page .login-card {
          background: #ffffff;
          border: 1px solid #eeeeee;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(15, 61, 62, 0.08);
        }

        .login-page .login-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 800;
          color: #142221;
        }

        .login-page .login-subtitle {
          color: #6c757d;
          font-size: 0.95rem;
        }

        .login-page .form-control {
          min-height: 48px;
          border-radius: 10px;
        }

        .login-page .form-control:focus {
          border-color: #E8743B;
          box-shadow: 0 0 0 0.2rem rgba(232, 116, 59, 0.15);
        }

        .login-page .login-button {
          min-height: 48px;
          border-radius: 10px;
          font-weight: 600;
          background-color: #0F3D3E;
          border-color: #0F3D3E;
        }

        .login-page .login-button:hover {
          background-color: #0A2C2D;
          border-color: #0A2C2D;
        }

        .login-page .register-link {
          color: #0F3D3E;
          font-weight: 600;
          text-decoration: none;
        }

        .login-page .register-link:hover {
          color: #E8743B;
        }

        .login-page .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #999;
          font-size: 0.85rem;
        }

        .login-page .divider::before,
        .login-page .divider::after {
          content: "";
          height: 1px;
          background: #e5e5e5;
          flex: 1;
        }
      `}</style>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
            <div className="login-card p-4 p-md-5">

              <div className="text-center mb-4">
                <div
                  className="mb-3"
                  style={{
                    fontSize: "2.2rem",
                  }}
                >
                  🛒
                </div>

                <h1 className="login-title h2 mb-2">
                  Bienvenue sur DZShop
                </h1>

                <p className="login-subtitle mb-0">
                  Connectez-vous à votre compte
                </p>
              </div>

              {erreur && (
                <div
                  className="alert alert-danger"
                  role="alert"
                >
                  {erreur}
                </div>
              )}

              <form onSubmit={envoyer}>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label fw-semibold"
                  >
                    Adresse email
                  </label>

                  <input
                    id="email"
                    className="form-control"
                    type="email"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={function (e) {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold"
                  >
                    Mot de passe
                  </label>

                  <input
                    id="password"
                    className="form-control"
                    type="password"
                    placeholder="Votre mot de passe"
                    value={mdp}
                    onChange={function (e) {
                      setMdp(e.target.value);
                    }}
                    required
                  />
                </div>

                <button
                  className="btn btn-primary login-button w-100"
                  type="submit"
                  disabled={envoi}
                >
                  {envoi ? "Connexion..." : "Se connecter"}
                </button>
              </form>

              <div className="divider my-4">
                ou continuer avec
              </div>

              <GoogleSignInButton
                onCredential={connexionGoogle}
              />

              <p className="text-center text-muted mt-4 mb-0">
                Pas encore de compte ?{" "}
                <Link
                  to="/register"
                  className="register-link"
                >
                  Créer un compte
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;