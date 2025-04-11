"use client"
import { Link } from "react-router-dom"
import { useCart } from "../../contexts/CartContext"
import { useTheme } from "../../contexts/ThemeContext"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const theme = useTheme()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images && product.images.length > 0 ? product.images[0].image : null,
      },
      1,
    )

    // Show a small notification
    alert(`${product.name} added to cart!`)
  }

  // Determine the image path based on product name
  const getImagePath = () => {
    if (product.name.toLowerCase().includes("turmeric")) {
      return "/src/assets/images/turmeric.png"
    } else if (product.name.toLowerCase().includes("wheat") || product.name.toLowerCase().includes("flour")) {
      return "/src/assets/images/wheat-flour.png"
    } else if (product.name.toLowerCase().includes("tea")) {
      return "/src/assets/images/herbal-tea.png"
    } else if (product.name.toLowerCase().includes("cookie")) {
      return "/src/assets/images/cookies.png"
    } else if (product.name.toLowerCase().includes("cleaner")) {
      return "/src/assets/images/floor-cleaner.png"
    } else if (product.name.toLowerCase().includes("honey")) {
      return "/src/assets/images/honey.png"
    } else {
      return "/src/assets/images/placeholder.png"
    }
  }

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-56 overflow-hidden">
          <img
            src={getImagePath() || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {product.discount_percentage > 0 && (
            <div className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold rounded-full text-white bg-primary">
              {product.discount_percentage}% OFF
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-1">{product.vendor_details.name}</p>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${star <= product.average_rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-gray-600">({product.reviews ? product.reviews.length : 0})</span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
              {product.compare_price && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ₹{product.compare_price.toLocaleString()}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3 text-white font-medium rounded-md transition-colors bg-primary hover:bg-primary-dark"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
