import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function CartPage() {
  const {
    panier,
    updateQty,
    removeFromCart,
    clearCart,
    total,
    livraison,
    nbItems,
  } = useContext(CartContext);

  // CAS 1 : panier vide
  if (panier.length === 0) {
    return (
      <div
        className="container py-5 text-center d-flex flex-column justify-content-center"
        style={{ minHeight: "calc(100vh - 180px)" }}
      >
        <div className="fs-1 mb-3">
          🛒
        </div>

        <h3 className="fw-bold mb-2">
          Votre panier est vide
        </h3>

        <p className="text-muted mb-4">
          Découvrez nos produits et ajoutez vos articles préférés à votre panier.
        </p>

        <Link
          className="btn btn-primary mx-auto px-4"
          to="/products"
        >
          Voir nos produits
        </Link>
      </div>
    );
  }

  // CAS 2 : panier plein
  return (
    <div
      className="container py-5"
      style={{ minHeight: "calc(100vh - 180px)" }}
    >
      <h1 className="mb-4">
        Votre panier{" "}
        <span className="text-muted fs-5">
          ({nbItems} article{nbItems > 1 ? "s" : ""})
        </span>
      </h1>

      <table className="table align-middle">
        <tbody>
          {panier.map(function (a) {
            return (
              <tr key={a._id}>

                <td>
                  {a.nom}
                </td>

                <td>
                  {a.prix.toLocaleString("fr-DZ")} DZD
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={function () {
                      updateQty(a._id, a.qte - 1);
                    }}
                    disabled={a.qte <= 1}
                  >
                    −
                  </button>

                  <span className="mx-2 fw-bold">
                    {a.qte}
                  </span>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={function () {
                      updateQty(a._id, a.qte + 1);
                    }}
                  >
                    +
                  </button>
                </td>

                <td>
                  {(a.prix * a.qte).toLocaleString("fr-DZ")} DZD
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={function () {
                      removeFromCart(a._id);
                    }}
                  >
                    Supprimer
                  </button>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Récapitulatif */}
      <ul className="list-group mb-3">

        <li className="list-group-item d-flex justify-content-between">
          <span>
            Sous-total
          </span>

          <span>
            {total.toLocaleString("fr-DZ")} DZD
          </span>
        </li>

        <li className="list-group-item d-flex justify-content-between">
          <span>
            Livraison
          </span>

          <span>
            {livraison === 0
              ? "Gratuite 🎉"
              : livraison.toLocaleString("fr-DZ") + " DZD"}
          </span>
        </li>

        <li className="list-group-item d-flex justify-content-between fw-bold fs-5">
          <span>
            Total à payer
          </span>

          <span>
            {(total + livraison).toLocaleString("fr-DZ")} DZD
          </span>
        </li>

      </ul>

      <Link
        className="btn btn-success w-100 mb-2"
        to="/checkout"
      >
        Passer la commande
      </Link>

      <button
        className="btn btn-outline-danger w-100"
        onClick={clearCart}
      >
        Vider le panier
      </button>
    </div>
  );
}

export default CartPage;