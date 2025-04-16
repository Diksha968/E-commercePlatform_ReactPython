"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// Import slider images
import slide1 from "../../assets/home.webp"
import slide2 from "../../assets/home1.webp"
import slide3 from "../../assets/home3.webp"

// Import product images
import BakeryProduct from "../../assets/bakeryproducts.jpg"
import masala from "../../assets/masala.webp"
import Homemadejewellery from "../../assets/homemadeje.jpg"
import pickle from "../../assets/SpicyPickle.png"
import thalipithbhajni from "../../assets/thalipithbhajni.jpg"
import herbalproduct from "../../assets/HerbalProduct.jpg"

const Home = () => {
  const navigate = useNavigate()
  const images = [slide1, slide2, slide3]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto image slider logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [images.length])

  // Product categories with navigation
  const categories = [
    { id: "bakery", name: "Bakery Products", image: BakeryProduct },
    { id: "masala", name: "Masala", image: masala },
    { id: "jewellery", name: "Home Made Jewellery", image: Homemadejewellery },
    { id: "pickle", name: "Pickle", image: pickle },
    { id: "thalipith", name: "Thalipith Bhajni", image: thalipithbhajni },
    { id: "herbal", name: "Herbal Products", image: herbalproduct },
  ]

  return (
    <div className="w-full text-center">
      <h1 className="text-4xl font-bold text-orange-600">Welcome to Gharguti Food</h1>
      <p className="text-xl">Taste the tradition with every bite!</p>

      {/* Image Slider */}
      <div className="w-full mx-auto mt-6 relative">
        <img
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={`Slide ${currentImageIndex + 1}`}
          className="w-full h-96 object-cover rounded-lg transition-opacity duration-1000"
        />
      </div>

      {/* Product Categories */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 px-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="mt-4 text-xl font-semibold">{category.name}</h3>
              <button
                className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                onClick={() => navigate(`/products/${category.id}`)}
              >
                View More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
