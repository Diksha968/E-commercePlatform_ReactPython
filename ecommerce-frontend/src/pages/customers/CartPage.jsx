"use client"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const CartPage = ({ cart = [], setCart }) => {
  const navigate = useNavigate()

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, newQuantity) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // const handleBuyNow = (item) => {
  //   navigate(
  //     `/checkout?name=${encodeURIComponent(item.name)}&price=${item.price * item.quantity}&quantity=${item.quantity}&image=${encodeURIComponent(item.image)}`,
  //   )
  // }
  const handleBuyNow = (item) => {
    navigate(
      `/pay?name=${encodeURIComponent(item.name)}&price=${item.price * item.quantity}&quantity=${item.quantity}&image=${encodeURIComponent(item.image)}`
    );
  };


  // Calculate Grand Total
  const grandTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <>
      {/* <Helmet>
        <title>Your Cart - Gharguti Food</title>
        <meta name="description" content="View and manage your shopping cart at Gharguti Food" />
      </Helmet> */}

      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-400"
      >
        <IoMdArrowRoundBack />
      </button>

      <div className="pt-4 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-orange-600 text-center mb-8">Your Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center mt-8 p-6 bg-gray-100 rounded-lg">
            <p className="text-gray-700 text-lg">Your cart is empty.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Cart Items */}
            <div className="flex-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-6 mb-6"
                >
                  {/* Product Image */}
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    {item.flavor && (
                      <p className="text-sm text-gray-600">Flavor: {item.flavor}</p>
                    )}
                    <p className="text-sm text-gray-600">Weight: {item.weight}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Price: ₹<span className="font-semibold">{item.price}</span>
                    </p>

                    {/* Quantity & Actions */}
                    <div className="mt-4 flex items-center gap-4">
                      {/* Quantity selector */}
                      <div className="flex items-center gap-2 border rounded px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="text-gray-700 hover:text-black"
                        >
                          -
                        </button>
                        <span className="text-lg">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-700 hover:text-black"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:underline text-sm flex items-center gap-1"
                      >
                        <MdDelete className="text-lg" />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-right sm:w-32 font-bold text-lg text-gray-900">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Subtotal Panel */}
            <div className="lg:w-1/3 w-full sticky top-24 self-start">
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h3>
                <p className="text-lg text-gray-700 mb-2">
                  Items: <span className="font-semibold">{cart.length}</span>
                </p>
                <p className="text-xl font-bold text-gray-900">
                  Grand Total: ₹{grandTotal}
                </p>
                {/* <button
                  onClick={() =>
                    navigate(`/checkout?name=All%20Items&price=${grandTotal}&quantity=${cart.length}`)
                  }
                  className="mt-6 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Checkout All Items
                </button> */}
                <button
                  onClick={() =>
                    navigate(`/pay?name=All%20Items&price=${grandTotal}&quantity=${cart.length}`)
                  }
                  className="mt-6 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Checkout All Items
                </button>

              </div>
            </div>
          </div>
        )}
      </div>

    </>
  )
}

export default CartPage
