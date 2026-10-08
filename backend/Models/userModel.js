import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  // Un compte créé avec Google n'a PAS de mot de passe : il n'est obligatoire
  // que pour les comptes "local" (inscrits avec email + mot de passe).
  password: {
    type: String,
    required: function () {
      return this.provider === 'local'
    }
  },

  // Comment ce compte a été créé : "local" (email + mot de passe) ou "google"
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  googleId: {
    type: String,
    default: null
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

const User = mongoose.model('User', userSchema)


export default User