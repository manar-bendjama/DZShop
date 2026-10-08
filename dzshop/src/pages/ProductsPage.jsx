import { useState } from "react";
import { useApi } from "../hooks/useApi";
import Chargement from "../components/Chargement";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState("");
  const [tri, setTri] = useState("");

  // Les produits viennent de l'API
  const { data, chargement, erreur } = useApi("/products");

  const products = data || [];

  // Récupérer les catégories disponibles
  const categories = [
    ...new Set(
      products.map(function (p) {
        return p.categorie;
      })
    ),
  ];

  // Recherche + filtre par catégorie
  const resultats = products
    .filter(function (p) {
      return p.nom
        .toLowerCase()
        .includes(recherche.toLowerCase());
    })
    .filter(function (p) {
      return categorie === "" || p.categorie === categorie;
    });

  // Tri
  const resultatsTries = [...resultats].sort(function (a, b) {
    if (tri === "prix-asc") {
      return a.prix - b.prix;
    }

    if (tri === "prix-desc") {
      return b.prix - a.prix;
    }

    if (tri === "nom") {
      return a.nom.localeCompare(b.nom);
    }

    return 0;
  });

  return (
    <div className="dzshop">

      {/* Styles de la page */}
      <style>{`
        .dzshop {
          --brand-dark: #0F3D3E;
          --brand-dark-deep: #0A2C2D;
          --brand-accent: #E8743B;
          --brand-accent-dark: #C85F2C;
          --brand-bg: #FAF8F5;
          --brand-ink: #142221;

          font-family: 'Inter', sans-serif;
          color: var(--brand-ink);
        }

        .dzshop h1 {
          font-family: 'Poppins', sans-serif;
        }

        /* Header de la page */
        .dzshop .page-header {
          background: linear-gradient(
            135deg,
            var(--brand-dark) 0%,
            var(--brand-dark-deep) 100%
          );

          padding: 60px 0 !important;
        }

        .dzshop .page-header h1 {
          font-family: 'Poppins', sans-serif;
          font-size: 2.8rem;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .dzshop .page-header p {
          font-size: 1.05rem;
        }

        /* Barre des filtres */
        .dzshop .filter-bar {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(15, 61, 62, 0.06);
        }

        /* Focus des champs */
        .dzshop .form-control:focus,
        .dzshop .form-select:focus {
          border-color: var(--brand-accent);
          box-shadow: 0 0 0 0.2rem rgba(232, 116, 59, 0.15);
        }

        /* Aucun produit */
        .dzshop .empty-state {
          background: #fff;
          border-radius: 16px;
        }
      `}</style>

      {/* Header */}
      <section className="page-header text-white">
        <Container>

          <h1 className="fw-bold mb-2">
            Nos produits
          </h1>

          <p className="mb-0 opacity-75">
            {resultatsTries.length} produit
            {resultatsTries.length > 1 ? "s" : ""} disponible
            {resultatsTries.length > 1 ? "s" : ""}
          </p>

        </Container>
      </section>

      {/* Contenu */}
      <Container className="py-5">

        {/* Chargement */}
        {chargement && <Chargement />}

        {/* Erreur */}
        {erreur && (
          <p className="text-center text-danger">
            Impossible de charger les produits.
          </p>
        )}

        {/* Produits */}
        {!chargement && !erreur && (
          <>
            {/* Filtres */}
            <Row className="filter-bar g-3 p-3 mx-0 mb-5 align-items-center">

              {/* Recherche */}
              <Col md={5}>
                <Form.Control
                  placeholder="Rechercher un produit..."
                  value={recherche}
                  onChange={function (e) {
                    setRecherche(e.target.value);
                  }}
                />
              </Col>

              {/* Catégorie */}
              <Col md={4}>
                <Form.Select
                  value={categorie}
                  onChange={function (e) {
                    setCategorie(e.target.value);
                  }}
                >
                  <option value="">
                    Toutes les catégories
                  </option>

                  {categories.map(function (cat) {
                    return (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>

              {/* Tri */}
              <Col md={3}>
                <Form.Select
                  value={tri}
                  onChange={function (e) {
                    setTri(e.target.value);
                  }}
                >
                  <option value="">
                    Trier par...
                  </option>

                  <option value="prix-asc">
                    Prix croissant
                  </option>

                  <option value="prix-desc">
                    Prix décroissant
                  </option>

                  <option value="nom">
                    Nom A-Z
                  </option>
                </Form.Select>
              </Col>

            </Row>

            {/* Résultats */}
            <Row className="g-4">

              {resultatsTries.length === 0 ? (
                <Col xs={12}>
                  <div className="empty-state text-center text-muted py-5">
                    Aucun produit trouvé.
                  </div>
                </Col>
              ) : (
                resultatsTries.map(function (produit) {
                  return (
                    <Col
                      md={4}
                      key={produit._id}
                    >
                      <ProductCard produit={produit} />
                    </Col>
                  );
                })
              )}

            </Row>
          </>
        )}

      </Container>

    </div>
  );
}

export default ProductsPage;