import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RegisterPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  async function envoyer(e) {
    e.preventDefault();
    setErreur("");

    // Validation du mot de passe
    if (mdp.length < 6) {
      setErreur(
        "Le mot de passe doit faire au moins 6 caractères"
      );
      return;
    }

    // Vérification des deux mots de passe
    if (mdp !== confirmation) {
      setErreur(
        "Les deux mots de passe ne sont pas identiques"
      );
      return;
    }

    setEnvoi(true);

    try {
      await register(nom, email, mdp);
      navigate("/");
    } catch (err) {
      setErreur(err.message);
    }

    setEnvoi(false);
  }

  return (
    <div
      className="register-page"
      style={{
        backgroundColor: "#FAF8F5",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .register-page .register-card {
          background: #ffffff;
          border: 1px solid #eeeeee;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(15, 61, 62, 0.08);
        }

        .register-page .register-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 800;
          color: #142221;
        }

        .register-page .register-subtitle {
          color: #6c757d;
          font-size: 0.95rem;
        }

        .register-page .form-control {
          min-height: 48px;
          border-radius: 10px;
        }

        .register-page .form-control:focus {
          border-color: #E8743B;
          box-shadow: 0 0 0 0.2rem rgba(232, 116, 59, 0.15);
        }

        .register-page .register-button {
          min-height: 48px;
          border-radius: 10px;
          font-weight: 600;
          background-color: #0F3D3E;
          border-color: #0F3D3E;
        }

        .register-page .register-button:hover {
          background-color: #0A2C2D;
          border-color: #0A2C2D;
        }

        .register-page .login-link {
          color: #0F3D3E;
          font-weight: 600;
          text-decoration: none;
        }

        .register-page .login-link:hover {
          color: #E8743B;
        }
      `}</style>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
            <div className="register-card p-4 p-md-5">

              <div className="text-center mb-4">
                <div
                  className="mb-3"
                  style={{
                    fontSize: "2.2rem",
                  }}
                >
                  🛒
                </div>

                <h1 className="register-title h2 mb-2">
                  Créer un compte
                </h1>

                <p className="register-subtitle mb-0">
                  Rejoignez la communauté DZShop
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
                    htmlFor="nom"
                    className="form-label fw-semibold"
                  >
                    Nom
                  </label>

                  <input
                    id="nom"
                    className="form-control"
                    type="text"
                    placeholder="Votre nom"
                    value={nom}
                    onChange={function (e) {
                      setNom(e.target.value);
                    }}
                    required
                  />
                </div>

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

                <div className="mb-3">
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
                    placeholder="Minimum 6 caractères"
                    value={mdp}
                    onChange={function (e) {
                      setMdp(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="confirmation"
                    className="form-label fw-semibold"
                  >
                    Confirmer le mot de passe
                  </label>

                  <input
                    id="confirmation"
                    className="form-control"
                    type="password"
                    placeholder="Retapez votre mot de passe"
                    value={confirmation}
                    onChange={function (e) {
                      setConfirmation(e.target.value);
                    }}
                    required
                  />
                </div>

                <button
                  className="btn btn-primary register-button w-100"
                  type="submit"
                  disabled={envoi}
                >
                  {envoi
                    ? "Création..."
                    : "Créer mon compte"}
                </button>
              </form>

              <p className="text-center text-muted mt-4 mb-0">
                Déjà un compte ?{" "}
                <Link
                  to="/login"
                  className="login-link"
                >
                  Se connecter
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;