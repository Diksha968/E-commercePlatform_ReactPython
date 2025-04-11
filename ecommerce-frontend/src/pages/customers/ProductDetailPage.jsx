"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

// Import product images
import BakeryProduct from "../../assets/bakeryproducts.jpg"
import masala from "../../assets/masala.webp"
import Homemadejewellery from "../../assets/homemadeje.jpg"
import pickle from "../../assets/SpicyPickle.png"
import thalipithbhajni from "../../assets/thalipithbhajni.jpg"
import herbalproduct from "../../assets/HerbalProduct.jpg"

const cakes = [
  { id: 1, name: "Chocolate Cake", price: 250, weight: "500g", flavor: "Chocolate", image: BakeryProduct },
  { id: 2, name: "Cookies", price: 150, weight: "500g", flavor: "Vanilla", image: BakeryProduct },
]

const masalaProducts = [
  { id: 3, name: "Chilli Powder", price: 100, weight: "100g", image: masala },
  { id: 4, name: "Turmeric Powder", price: 80, weight: "100g", image: masala },
]

const jewelleryProducts = [{ id: 5, name: "Handmade Necklace", price: 300, weight: "N/A", image: Homemadejewellery }]

const pickleProducts = [{ id: 6, name: "Mango Pickle", price: 120, weight: "250g", image: pickle }]

const thalipithProducts = [{ id: 7, name: "Traditional Bhajni", price: 200, weight: "500g", image: thalipithbhajni }]

const herbalProducts = [{ id: 8, name: "Herbal Tea", price: 150, weight: "100g", image: herbalproduct }]

const ProductDetailPage = ({ addToCart, toggleFavorite, favorites = [] }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  // Merge all products
  const allProducts = [
    ...cakes,
    ...masalaProducts,
    ...jewelleryProducts,
    ...pickleProducts,
    ...thalipithProducts,
    ...herbalProducts,
  ]

  const product = allProducts.find((p) => p.id === Number.parseInt(id))

  if (!product) {
    return (
      <div className="pt-24 text-center">
        <h2 className="text-2xl font-bold text-red-600">Product Not Found</h2>
        <p className="mt-4">The product you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Return to Home
        </button>
      </div>
    )
  }

  const isFavorite = favorites.some((fav) => fav.id === product.id)
  const totalPrice = product.price * quantity

  return (
    <>
      <Helmet>
        <title>{product.name} - Gharguti Food</title>
        <meta name="description" content={`${product.name} - ${product.weight} available at Gharguti Food`} />
      </Helmet>

      <div className="pt-24 max-w-4xl mx-auto text-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium mb-4"
        >
          ⬅ Back
        </button>

        <h2 className="text-4xl font-bold text-orange-600">{product.name}</h2>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full max-w-md mx-auto h-auto object-cover rounded-md mt-4"
        />

        {product.flavor && <p className="text-xl text-gray-700 mt-2">Flavor: {product.flavor}</p>}
        <p className="text-lg text-gray-700">Weight: {product.weight}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">₹{product.price}</p>

        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
          >
            ➖
          </button>
          <span className="text-2xl font-bold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
          >
            ➕
          </button>
        </div>

        <p className="text-2xl font-bold text-gray-900 mt-2">Total Price: ₹{totalPrice}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => {
              if (window.confirm(`Add ${quantity}x ${product.name} to cart?`)) {
                addToCart({ ...product, quantity })
                alert(`🛒 ${quantity}x ${product.name} added to cart!`)
              }
            }}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Add to Cart 🛒
          </button>

          <button
            onClick={() => toggleFavorite(product)}
            className={`px-6 py-3 rounded-lg ${isFavorite ? "bg-red-500" : "bg-gray-400"} text-white hover:opacity-80`}
          >
            {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
          </button>
        </div>
      </div>
    </>
  )
}

export default ProductDetailPage
