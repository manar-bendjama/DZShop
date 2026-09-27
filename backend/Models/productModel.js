import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    nom: { type: String, required: [true, 'Le nom est obligatoire'], trim: true, minlength: 2 },
    description: { type: String, default: '', trim: true },
    prix: { type: Number, required: [true, 'Le prix est obligatoire'], min: [0, 'Le prix ne peut pas être négatif'] },
    categorie: { type: String, default: 'Divers', trim: true },
    stock: { type: Number, default: 0, min: 0 },
    image: { type: String, default: '' },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product