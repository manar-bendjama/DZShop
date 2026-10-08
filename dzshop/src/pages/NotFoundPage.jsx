import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div
      className="not-found-page"
      style={{
        backgroundColor: "#FAF8F5",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .not-found-page .error-number {
          font-family: 'Poppins', sans-serif;
          font-size: 7rem;
          line-height: 1;
          font-weight: 800;
          color: #0F3D3E;
        }

        .not-found-page .error-title {
          font-family: 'Poppins', sans-serif;
          color: #142221;
          font-weight: 700;
        }

        .not-found-page .error-text {
          color: #6c757d;
          max-width: 500px;
          margin: 0 auto;
        }

        .not-found-page .home-button {
          background-color: #0F3D3E;
          border-color: #0F3D3E;
          border-radius: 10px;
          font-weight: 600;
          padding: 12px 24px;
        }

        .not-found-page .home-button:hover {
          background-color: #0A2C2D;
          border-color: #0A2C2D;
        }
      `}</style>

      <div className="container">
        <div
          className="text-center d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "70vh" }}
        >
          <div className="error-number mb-3">
            404
          </div>

          <h1 className="error-title h2 mb-3">
            Page introuvable
          </h1>

          <p className="error-text mb-4">
            Désolé, la page que vous recherchez
            n'existe pas ou a été déplacée.
          </p>

          <Link
            className="btn btn-primary home-button"
            to="/"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;