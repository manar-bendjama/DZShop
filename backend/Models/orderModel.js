import mongoose from 'mongoose'

const ligneSchema = new mongoose.Schema(
{
produit: {
type: mongoose.Schema.Types.ObjectId,
ref: 'Product',
required: true
},


// Nom du produit au moment de la commande
nom: {
  type: String,
  required: true,
  trim: true
},

// Prix du produit au moment de la commande
prix: {
  type: Number,
  required: true,
  min: 0
},

quantite: {
  type: Number,
  required: true,
  min: 1,
  validate: {
    validator: Number.isInteger,
    message: 'La quantité doit être un nombre entier'
  }
}


},
{
_id: false
}
)

const orderSchema = new mongoose.Schema(
{
// Utilisateur qui a passé la commande
user: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
required: true,
index: true
},


client: {
  type: String,
  required: true,
  trim: true,
  minlength: 2,
  maxlength: 100
},

articles: {
  type: [ligneSchema],
  required: true,
  validate: {
    validator: function (lignes) {
      return Array.isArray(lignes) && lignes.length > 0
    },
    message: 'La commande doit contenir au moins un produit'
  }
},

sousTotal: {
  type: Number,
  required: true,
  min: 0
},

livraison: {
  type: Number,
  required: true,
  min: 0
},

total: {
  type: Number,
  required: true,
  min: 0
},

telephone: {
  type: String,
  required: true,
  trim: true,
  match: /^(0)(5|6|7)[0-9]{8}$/
},

// Code + nom de la wilaya
wilaya: {
  type: String,
  required: true,
  trim: true
},

commune: {
  type: String,
  trim: true,
  maxlength: 100,
  default: ''
},

adresse: {
  type: String,
  required: true,
  trim: true,
  minlength: 5,
  maxlength: 300
},

statut: {
  type: String,
  enum: [
    'En attente',
    'Confirmée',
    'Expédiée',
    'Livrée',
    'Annulée'
  ],
  default: 'En attente'
}


},
{
timestamps: true
}
)

const Order = mongoose.model('Order', orderSchema)

export default Order
