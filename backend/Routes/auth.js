import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import User from '../Models/userModel.js'
import authMiddleware from '../Middlware/authMiddleware.js'

const router = express.Router()
const googleClient = new OAuth2Client()

function creerToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

router.post('/register', async function (req, res) {
  try {
    const { nom, email, password } = req.body

    if (!nom || !email || !password) {
      return res.status(400).json({ message: 'Nom, email et mot de passe obligatoires' })
    }
    if (String(password).length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit faire au moins 6 caractères' })
    }

    const userExiste = await User.findOne({ email: String(email).toLowerCase().trim() })

    if (userExiste) {
      return res.status(400).json({
        message: 'Email déjà utilisé'
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
      nom,
      email: String(email).toLowerCase().trim(),
      password: passwordHash
      // le "role" n'est jamais pris depuis req.body : sinon un visiteur pourrait
      // s'inscrire directement en tant qu'admin en l'ajoutant à la requête !
    })

    res.status(201).json({
      message: 'Compte créé avec succès',
      token: creerToken(user),
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

// Login
router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: String(email || '').toLowerCase().trim() })

    // Compte créé avec Google : il n'a pas de mot de passe, on l'explique
    if (user && !user.password) {
      return res.status(400).json({ message: 'Ce compte utilise la connexion Google. Clique sur « Continuer avec Google ».' })
    }

    if (!user) {
      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      })
    }

    const passwordCorrect = await bcrypt.compare(
      String(password || ''),
      user.password
    )

    if (!passwordCorrect) {
      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      })
    }

    res.json({
      message: 'Connexion réussie',
      token: creerToken(user),
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({
      message: 'Erreur serveur',
      error: error.message
    })
  }
})

// CONNEXION AVEC GOOGLE  →  POST /api/auth/google
// Le site reçoit un "credential" (un jeton signé par Google) et nous l'envoie.
// Google seul peut dire s'il est authentique : on le fait VÉRIFIER, jamais cru sur parole.
router.post('/google', async function (req, res) {
  try {
    const { credential } = req.body

    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(503).json({ message: "La connexion Google n'est pas configurée" })
    }
    if (!credential || typeof credential !== 'string') {
      return res.status(400).json({ message: 'Jeton Google manquant' })
    }

    // verifyIdToken vérifie la signature de Google ET que le jeton est bien destiné à NOTRE application
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    const infos = ticket.getPayload()

    if (!infos || !infos.email || !infos.email_verified) {
      return res.status(401).json({ message: 'Compte Google non valide' })
    }

    const email = infos.email.toLowerCase().trim()
    let user = await User.findOne({ email: email })

    if (!user) {
      // Première connexion Google : on crée le compte automatiquement (sans mot de passe)
      user = await User.create({
        nom: infos.name || email.split('@')[0],
        email: email,
        provider: 'google',
        googleId: infos.sub
      })
    } else if (!user.googleId) {
      // Le compte existait déjà (email + mot de passe) : on associe Google, sans créer de doublon
      user.googleId = infos.sub
      await user.save()
    }

    res.json({
      message: 'Connexion réussie',
      token: creerToken(user),
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Erreur Google Auth :', error.message)
    res.status(401).json({ message: 'Authentification Google impossible' })
  }
})

// QUI SUIS-JE ?  →  GET /api/auth/me  (le site s'en sert pour vérifier que le token est encore valable)
router.get('/me', authMiddleware, async function (req, res) {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(401).json({ message: 'Compte introuvable' })
    }
    res.json({
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router