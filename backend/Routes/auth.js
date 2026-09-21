import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const router = express.Router()

router.post('/register', async function (req, res) {
  try {
    const { nom, email, password } = req.body

    const userExiste = await User.findOne({ email })

    if (userExiste) {
      return res.status(400).json({
        message: 'Email déjà utilisé'
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
      nom,
      email,
      password: passwordHash
    })

    res.status(201).json({
      message: 'Compte créé avec succès',
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

// Login
router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: 'Email ou mot de passe incorrect'
      })
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordCorrect) {
      return res.status(400).json({
        message: 'Email ou mot de passe incorrect'
      })
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )

    res.json({
      message: 'Connexion réussie',
      token,
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


export default router