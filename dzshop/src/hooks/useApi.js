import { useState, useEffect } from 'react'
import api from '../api/axios'

// Un HOOK PERSONNALISÉ : charge une adresse de l'API et renvoie 3 choses :
// les données, "chargement en cours ?", et l'erreur.
export function useApi(chemin) {
  const [data, setData] = useState(null)
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(
    function () {
      let annule = false

      setChargement(true)
      setErreur('')

      api
        .get(chemin)
        .then(function (reponse) {
          if (!annule) setData(reponse.data)
        })
        .catch(function (err) {
          if (annule) return
          if (err.response && err.response.status === 404) {
            setErreur('introuvable')
          } else {
            setErreur("Serveur injoignable : vérifie que l'API est lancée (npm run dev dans backend).")
          }
        })
        .finally(function () {
          if (!annule) setChargement(false)
        })

      return function () {
        annule = true
      }
    },
    [chemin]
  )

  return { data, chargement, erreur }
}