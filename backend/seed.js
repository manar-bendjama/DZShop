import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './Models/productModel.js'

dotenv.config()

const produits = [
  { nom: 'Casque Bluetooth', prix: 4500, categorie: 'Audio', stock: 12, image: '/images/image.png' },
  { nom: 'Souris sans fil', prix: 2200, categorie: 'Accessoires', stock: 30, image: '/images/souris-sans-fil.jpg' },
  { nom: 'Clavier mécanique', prix: 7800, categorie: 'Accessoires', stock: 8, image: '/images/clavier.jpg' },
  { nom: 'Webcam HD', prix: 3900, categorie: 'Vidéo', stock: 15, image: '/images/webcam-hd.jpg' },
  { nom: 'Enceinte portable', prix: 5600, categorie: 'Audio', stock: 0, image: '/images/enceinte-portable.jpg' },
  { nom: 'Câble USB-C', prix: 800, categorie: 'Accessoires', stock: 50, image: '/images/cable-usb.jpg' },
]

try {
  await mongoose.connect(process.env.MONGO_URI)
  await Product.deleteMany()
  await Product.insertMany(produits)
  console.log('🌱 ' + produits.length + ' produits importés')
} catch (erreur) {
  console.log('❌ Erreur : ' + erreur.message)
} finally {
  await mongoose.disconnect()
}