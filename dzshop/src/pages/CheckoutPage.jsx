import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
const wilayas = [
  "01 - Adrar",
  "02 - Chlef",
  "03 - Laghouat",
  "04 - Oum El Bouaghi",
  "05 - Batna",
  "06 - Béjaïa",
  "07 - Biskra",
  "08 - Béchar",
  "09 - Blida",
  "10 - Bouira",
  "11 - Tamanrasset",
  "12 - Tébessa",
  "13 - Tlemcen",
  "14 - Tiaret",
  "15 - Tizi Ouzou",
  "16 - Alger",
  "17 - Djelfa",
  "18 - Jijel",
  "19 - Sétif",
  "20 - Saïda",
  "21 - Skikda",
  "22 - Sidi Bel Abbès",
  "23 - Annaba",
  "24 - Guelma",
  "25 - Constantine",
  "26 - Médéa",
  "27 - Mostaganem",
  "28 - M'Sila",
  "29 - Mascara",
  "30 - Ouargla",
  "31 - Oran",
  "32 - El Bayadh",
  "33 - Illizi",
  "34 - Bordj Bou Arréridj",
  "35 - Boumerdès",
  "36 - El Tarf",
  "37 - Tindouf",
  "38 - Tissemsilt",
  "39 - El Oued",
  "40 - Khenchela",
  "41 - Souk Ahras",
  "42 - Tipaza",
  "43 - Mila",
  "44 - Aïn Defla",
  "45 - Naâma",
  "46 - Aïn Témouchent",
  "47 - Ghardaïa",
  "48 - Relizane",
  "49 - Timimoun",
  "50 - Bordj Badji Mokhtar",
  "51 - Ouled Djellal",
  "52 - Béni Abbès",
  "53 - In Salah",
  "54 - In Guezzam",
  "55 - Touggourt",
  "56 - Djanet",
  "57 - El Meghaier",
  "58 - El Meniaa",
];

function CheckoutPage() {
  const {
    total,
    livraison,
    clearCart,
    panier,
  } = useContext(CartContext);

  const { user } = useContext(AuthContext);

  const [nom, setNom] = useState(user ? user.nom : "");
  const [telephone, setTelephone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [adresse, setAdresse] = useState("");

  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [commande, setCommande] = useState(null);

  async function commander(e) {
    e.preventDefault();

    setErreur("");
    setEnvoi(true);

    try {
      const reponse = await api.post("/orders", {
        articles: panier.map(function (ligne) {
          return {
            produit: ligne._id,
            quantite: ligne.qte,
          };
        }),

        client: nom,
        telephone: telephone,
        wilaya: wilaya,
        commune: commune,
        adresse: adresse,
      });

      setCommande(reponse.data);
      clearCart();
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setErreur(err.response.data.message);
      } else {
        setErreur(
          "Serveur injoignable, réessaie dans un instant"
        );
      }
    }

    setEnvoi(false);
  }

  /* Confirmation */
  if (commande) {
    return (
      <div
        style={{
          backgroundColor: "#FAF8F5",
          minHeight: "100vh",
        }}
      >
        <div className="container py-5">
          <div
            className="bg-white rounded-4 shadow-sm text-center p-5 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <div
              className="mb-3"
              style={{ fontSize: "4rem" }}
            >
              ✅
            </div>

            <h1
              className="fw-bold mb-3"
              style={{
                fontFamily: "Poppins, sans-serif",
                color: "#0F3D3E",
              }}
            >
              Commande confirmée !
            </h1>

            <p className="text-muted mb-4">
              Merci {nom}, votre commande a bien été enregistrée.
            </p>

            <div className="alert alert-light border mb-4">
              <strong>Total :</strong>{" "}
              {commande.total.toLocaleString("fr-DZ")} DZD
            </div>

            <p className="text-muted small mb-4">
              Vous serez livré sous 48h.
            </p>

            <Link
              className="btn btn-primary px-4"
              to="/products"
            >
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* Panier vide */
  if (panier.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#FAF8F5",
          minHeight: "100vh",
        }}
      >
        <div className="container py-5">
          <div
            className="bg-white rounded-4 shadow-sm text-center p-5 mx-auto"
            style={{ maxWidth: "550px" }}
          >
            <div
              className="mb-3"
              style={{ fontSize: "3rem" }}
            >
              🛒
            </div>

            <h2
              className="fw-bold mb-3"
              style={{ color: "#0F3D3E" }}
            >
              Votre panier est vide
            </h2>

            <p className="text-muted mb-4">
              Ajoutez des produits à votre panier avant de
              passer une commande.
            </p>

            <Link
              className="btn btn-primary"
              to="/products"
            >
              Voir nos produits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* Formulaire */
  return (
    <div
      style={{
        backgroundColor: "#FAF8F5",
        minHeight: "100vh",
      }}
    >
      <div className="container py-5">

        <div className="mb-4">
          <Link
            to="/cart"
            className="text-decoration-none"
            style={{ color: "#0F3D3E" }}
          >
            ← Retour au panier
          </Link>

          <h1
            className="fw-bold mt-3 mb-1"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "#142221",
            }}
          >
            Livraison
          </h1>

          <p className="text-muted">
            Renseignez vos informations pour recevoir votre commande.
          </p>
        </div>

        {erreur && (
          <div className="alert alert-danger mb-4">
            {erreur}
          </div>
        )}

        <form onSubmit={commander}>
          <div className="row g-4">

            {/* Informations de livraison */}
            <div className="col-lg-7">

              <div className="bg-white rounded-4 shadow-sm p-4">

                <h4
                  className="fw-bold mb-4"
                  style={{ color: "#0F3D3E" }}
                >
                  Informations de livraison
                </h4>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Nom complet
                  </label>

                  <input
                    className="form-control"
                    placeholder="Votre nom complet"
                    value={nom}
                    onChange={function (e) {
                      setNom(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Téléphone
                  </label>

                  <input
                    className="form-control"
                    type="tel"
                    placeholder="05 XX XX XX XX"
                    value={telephone}
                    onChange={function (e) {
                      setTelephone(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Wilaya
                    </label>

                   <select
  className="form-select"
  value={wilaya}
  onChange={function (e) {
    setWilaya(e.target.value);
  }}
  required
>
  <option value="">
    Sélectionner une wilaya
  </option>

  {wilayas.map(function (w) {
    return (
      <option key={w} value={w}>
        {w}
      </option>
    );
  })}
</select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Commune
                    </label>

                    <input
                      className="form-control"
                      placeholder="Votre commune"
                      value={commune}
                      onChange={function (e) {
                        setCommune(e.target.value);
                      }}
                    />
                  </div>

                </div>

                <div className="mt-3">
                  <label className="form-label fw-semibold">
                    Adresse détaillée
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Adresse complète de livraison"
                    value={adresse}
                    onChange={function (e) {
                      setAdresse(e.target.value);
                    }}
                    required
                  ></textarea>
                </div>

              </div>
            </div>

            {/* Résumé */}
            <div className="col-lg-5">

              <div className="bg-white rounded-4 shadow-sm p-4">

                <h4
                  className="fw-bold mb-4"
                  style={{ color: "#0F3D3E" }}
                >
                  Résumé de la commande
                </h4>

                <div className="mb-4">
                  {panier.map(function (ligne) {
                    return (
                      <div
                        key={ligne._id}
                        className="d-flex justify-content-between align-items-start border-bottom py-3"
                      >
                        <div className="pe-3">
                          <div className="fw-semibold">
                            {ligne.nom}
                          </div>

                          <small className="text-muted">
                            Quantité : {ligne.qte}
                          </small>
                        </div>

                        <div className="fw-semibold text-nowrap">
                          {(ligne.prix * ligne.qte).toLocaleString(
                            "fr-DZ"
                          )}{" "}
                          DZD
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Sous-total</span>

                  <span>
                    {total.toLocaleString("fr-DZ")} DZD
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Livraison</span>

                  <span
                    className={
                      livraison === 0
                        ? "text-success fw-semibold"
                        : ""
                    }
                  >
                    {livraison === 0
                      ? "Gratuite 🎉"
                      : livraison.toLocaleString("fr-DZ") +
                        " DZD"}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fs-5 fw-bold mb-4">
                  <span>Total à payer</span>

                  <span style={{ color: "#0F3D3E" }}>
                    {(total + livraison).toLocaleString(
                      "fr-DZ"
                    )}{" "}
                    DZD
                  </span>
                </div>

                <p className="text-muted small mb-3">
                  Le total final est recalculé par le serveur.
                </p>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={envoi}
                >
                  {envoi
                    ? "Envoi en cours..."
                    : "Confirmer la commande"}
                </button>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
}

export default CheckoutPage;