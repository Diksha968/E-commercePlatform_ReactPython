"use client"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

const FavoritesPage = ({ favorites = [], setFavorites }) => {
  const navigate = useNavigate()

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id))
  }

  return (
    <>
      <Helmet>
        <title>Your Favorites - Gharguti Food</title>
        <meta name="description" content="View and manage your favorite products at Gharguti Food" />
      </Helmet>

      <div className="pt-24 max-w-4xl mx-auto text-center">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 mb-4"
        >
          Back
        </button>
        <h2 className="text-4xl font-bold text-orange-600">Your Favorites</h2>

        {favorites.length === 0 ? (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <p className="text-gray-700 text-lg">You haven't added any favorites yet.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 px-4">
            {favorites.map((item) => (
              <div key={item.id} className="bg-white shadow-lg rounded-lg p-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
                {item.flavor && <p className="text-gray-700">Flavor: {item.flavor}</p>}
                <p className="text-gray-700">Weight: {item.weight}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">₹{item.price}</p>
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default FavoritesPage
