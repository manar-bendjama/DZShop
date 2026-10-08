import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function MesCommandesPage() {
  const [commandes, setCommandes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(function () {
    async function chargerCommandes() {
      try {
        const reponse = await api.get("/orders/my");
        setCommandes(reponse.data);
      } catch (err) {
        if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          setErreur(err.response.data.message);
        } else {
          setErreur("Impossible de charger vos commandes");
        }
      }

      setChargement(false);
    }

    chargerCommandes();
  }, []);

  function obtenirClasseStatut(statut) {
    if (statut === "Livrée") {
      return "status-livree";
    }

    if (statut === "Expédiée") {
      return "status-expediee";
    }

    if (statut === "Confirmée") {
      return "status-confirmee";
    }

    if (statut === "Annulée") {
      return "status-annulee";
    }

    return "status-attente";
  }

  if (chargement) {
    return (
      <div
        style={{
          backgroundColor: "#FAF8F5",
          minHeight: "100vh",
        }}
      >
        <div className="container py-5 text-center">
          <div
            className="spinner-border"
            style={{ color: "#0F3D3E" }}
            role="status"
          >
            <span className="visually-hidden">Chargement...</span>
          </div>

          <p className="text-muted mt-3">
            Chargement de vos commandes...
          </p>
        </div>
      </div>
    );
  }

  if (erreur) {
    return (
      <div
        style={{
          backgroundColor: "#FAF8F5",
          minHeight: "100vh",
        }}
      >
        <div className="container py-5">
          <div className="alert alert-danger">
            {erreur}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mes-commandes-page"
      style={{
        backgroundColor: "#FAF8F5",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .mes-commandes-page {
          color: #142221;
        }

        .mes-commandes-page .page-header {
          background: linear-gradient(
            135deg,
            #0F3D3E 0%,
            #0A2C2D 100%
          );
          padding: 55px 0;
        }

        .mes-commandes-page .page-header h1 {
          font-family: 'Poppins', sans-serif;
          font-weight: 800;
          font-size: 2.5rem;
        }

        .commande-card {
          background: #ffffff;
          border: 1px solid #eeeeee;
          border-radius: 18px;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .commande-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(15, 61, 62, 0.08);
        }

        .commande-header {
          background: #ffffff;
          padding: 22px 24px;
          border-bottom: 1px solid #eeeeee;
        }

        .commande-id {
          color: #0F3D3E;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
        }

        .status-badge {
          display: inline-block;
          padding: 7px 12px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .status-attente {
          background: #fff3cd;
          color: #856404;
        }

        .status-confirmee {
          background: #d1ecf1;
          color: #0c5460;
        }

        .status-expediee {
          background: #dbeafe;
          color: #1e40af;
        }

        .status-livree {
          background: #d1e7dd;
          color: #146c43;
        }

        .status-annulee {
          background: #f8d7da;
          color: #842029;
        }

        .article-row {
          padding: 14px 0;
          border-bottom: 1px solid #f1f1f1;
        }

        .article-row:last-child {
          border-bottom: none;
        }

        .article-name {
          font-weight: 600;
        }

        .article-price {
          color: #0F3D3E;
          font-weight: 600;
        }

        .order-total {
          color: #0F3D3E;
          font-size: 1.25rem;
          font-weight: 800;
        }

        .delivery-free {
          color: #198754;
          font-weight: 600;
        }

        .empty-orders {
          background: #ffffff;
          border-radius: 20px;
          padding: 60px 25px;
          border: 1px solid #eeeeee;
        }

        .empty-orders-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }
      `}</style>

      <section className="page-header text-white">
        <div className="container">
          <p className="text-uppercase small fw-bold mb-2 opacity-75">
            Mon espace
          </p>

          <h1 className="mb-2">
            Mes commandes
          </h1>

          <p className="mb-0 opacity-75">
            Retrouvez ici l'historique de vos commandes.
          </p>
        </div>
      </section>

      <div className="container py-5">
        {commandes.length === 0 ? (
          <div className="empty-orders text-center">
            <div className="empty-orders-icon">
              📦
            </div>

            <h3
              className="fw-bold mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Aucune commande pour le moment
            </h3>

            <p className="text-muted mb-4">
              Vous n'avez pas encore passé de commande.
              Découvrez nos produits et trouvez ce qu'il vous faut.
            </p>

            <Link
              to="/products"
              className="btn btn-primary px-4"
            >
              Découvrir les produits
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {commandes.map(function (commande) {
              return (
                <div
                  className="col-12"
                  key={commande._id}
                >
                  <div className="commande-card">
                    <div className="commande-header">
                      <div className="row align-items-center g-3">
                        <div className="col-md-8">
                          <div className="commande-id">
                            Commande #
                            {commande._id.slice(-6)}
                          </div>

                          <small className="text-muted">
                            Passée le{" "}
                            {new Date(
                              commande.createdAt
                            ).toLocaleDateString("fr-DZ")}
                          </small>
                        </div>

                        <div className="col-md-4 text-md-end">
                          <span
                            className={
                              "status-badge " +
                              obtenirClasseStatut(
                                commande.statut
                              )
                            }
                          >
                            {commande.statut}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3">
                        Produits commandés
                      </h6>

                      <div>
                        {commande.articles.map(function (article) {
                          return (
                            <div
                              key={article.produit}
                              className="article-row d-flex justify-content-between align-items-center gap-3"
                            >
                              <div>
                                <div className="article-name">
                                  {article.nom}
                                </div>

                                <small className="text-muted">
                                  Quantité : {article.quantite}
                                </small>
                              </div>

                              <div className="article-price text-end">
                                {(
                                  article.prix *
                                  article.quantite
                                ).toLocaleString("fr-DZ")}{" "}
                                DZD
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="row mt-4 g-4">
                        <div className="col-md-6">
                          <div
                            className="p-3 rounded-3"
                            style={{
                              backgroundColor: "#FAF8F5",
                            }}
                          >
                            <h6 className="fw-bold mb-2">
                              📍 Livraison
                            </h6>

                            <p className="mb-1 small">
                              <strong>Wilaya :</strong>{" "}
                              {commande.wilaya}
                            </p>

                            {commande.commune && (
                              <p className="mb-1 small">
                                <strong>Commune :</strong>{" "}
                                {commande.commune}
                              </p>
                            )}

                            <p className="mb-0 small text-muted">
                              Livraison à l'adresse indiquée
                            </p>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div
                            className="p-3 rounded-3"
                            style={{
                              backgroundColor: "#FAF8F5",
                            }}
                          >
                            <div className="d-flex justify-content-between mb-2">
                              <span className="text-muted">
                                Sous-total
                              </span>

                              <span>
                                {commande.sousTotal.toLocaleString(
                                  "fr-DZ"
                                )}{" "}
                                DZD
                              </span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                              <span className="text-muted">
                                Livraison
                              </span>

                              <span
                                className={
                                  commande.livraison === 0
                                    ? "delivery-free"
                                    : ""
                                }
                              >
                                {commande.livraison === 0
                                  ? "Gratuite"
                                  : commande.livraison.toLocaleString(
                                      "fr-DZ"
                                    ) + " DZD"}
                              </span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fw-bold">
                                Total
                              </span>

                              <span className="order-total">
                                {commande.total.toLocaleString(
                                  "fr-DZ"
                                )}{" "}
                                DZD
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MesCommandesPage;