"use client"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

const CartPage = ({ cart = [], setCart }) => {
  const navigate = useNavigate()

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, newQuantity) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const handleBuyNow = (item) => {
    navigate(
      `/checkout?name=${encodeURIComponent(item.name)}&price=${item.price * item.quantity}&quantity=${item.quantity}&image=${encodeURIComponent(item.image)}`,
    )
  }

  // Calculate Grand Total
  const grandTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <>
      <Helmet>
        <title>Your Cart - Gharguti Food</title>
        <meta name="description" content="View and manage your shopping cart at Gharguti Food" />
      </Helmet>

      <div className="pt-24 max-w-4xl mx-auto text-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium"
        >
          ⬅ Back to Shop
        </button>

        <h2 className="text-4xl font-bold text-orange-600">Your Cart</h2>

        {cart.length === 0 ? (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <p className="text-gray-700 text-lg">Your cart is empty.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="mt-6 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-white shadow-lg rounded-lg p-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
                  {item.flavor && <p className="text-gray-700">Flavor: {item.flavor}</p>}
                  <p className="text-gray-700">Weight: {item.weight}</p>
                  <p className="text-lg font-bold text-gray-900">Price: ₹{item.price}</p>
                  <p className="text-lg font-bold text-gray-900">Total: ₹{item.price * item.quantity}</p>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
                    >
                      ➖
                    </button>
                    <span className="text-xl font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
                    >
                      ➕
                    </button>
                  </div>

                  <div className="mt-4 flex justify-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>

                    <button
                      onClick={() => handleBuyNow(item)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Buy Now 💳
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Grand Total */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900">Grand Total: ₹{grandTotal}</h3>
              <button
                onClick={() => navigate(`/checkout?name=All%20Items&price=${grandTotal}&quantity=${cart.length}`)}
                className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Checkout All Items
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CartPage
