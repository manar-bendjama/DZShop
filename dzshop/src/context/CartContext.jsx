import { createContext, useState,useEffect } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [panier, setPanier] = useState(function() {
    const panierLocalStorage = localStorage.getItem('panier')
    if (panierLocalStorage) {
      return JSON.parse(panierLocalStorage)
    }
    return []
  })

  useEffect(function() {
    localStorage.setItem('panier', JSON.stringify(panier))
  }, [panier])

  function addToCart(produit) {
    setPanier(function (anciens) {
      const existe = anciens.find(function(a) {
        return a._id === produit._id
      })

      if (existe) {
        return anciens.map(function(a) {
          if (a._id === produit._id) {
            return {
              ...a,
              qte: a.qte + 1
            }
          }

          return a
        })
      }

      return [
        ...anciens,
        {
          ...produit,
          qte: 1
        }
      ]
    })
  }

  function removeFromCart(id) {
    setPanier(function (anciens) {
      return anciens.filter(function(a) {
        return a._id !== id
      })
    })
  }

  function updateQty(id, nouvelleQte) {
    setPanier(function (anciens) {
      return anciens.map(function(a) {
        if (a._id === id) {
          return {
            ...a,
            qte: nouvelleQte
          }
        }

        return a
      })
    })
  }

  function clearCart() {
    setPanier([])
  }

  const total = panier.reduce(
    function(s, a) {
      return s + a.prix * a.qte
    },
    0
  )

  const nbItems = panier.reduce(
    function(s, a) {
      return s + a.qte
    },
    0
  )

  let livraison = 500

  if (total >= 10000) {
    livraison = 0
  }

  return (
    <CartContext.Provider
      value={{
        panier,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
        nbItems,
        livraison
      }}
    >
      {children}
    </CartContext.Provider>
  )
}