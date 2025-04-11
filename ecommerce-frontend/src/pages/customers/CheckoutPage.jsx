"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useCart } from "../../contexts/CartContext"
import { useAuth } from "../../contexts/AuthContext"
import api from "../../services/api"
import { Helmet } from "react-helmet"

const CheckoutPage = () => {
  const { cart, clearCart } = useCart()
  const { currentUser, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get query parameters if coming from "Buy Now"
  const name = params.get("name")
  const price = params.get("price")
  const quantity = params.get("quantity")
  const image = params.get("image")

  // Determine if we're checking out a single item or the whole cart
  const isSingleItemCheckout = Boolean(name && price && quantity)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login?redirect=checkout")
      return
    }

    if (!isSingleItemCheckout && cart.items.length === 0) {
      navigate("/cart")
      return
    }

    const fetchAddresses = async () => {
      try {
        const response = await api.get("/auth/addresses/")
        setAddresses(response.data)

        // Set default address if available
        const defaultAddress = response.data.find((addr) => addr.is_default)
        if (defaultAddress) {
          setSelectedAddress(defaultAddress.id)
        } else if (response.data.length > 0) {
          setSelectedAddress(response.data[0].id)
        }
      } catch (err) {
        console.error("Error fetching addresses:", err)
        setError("Failed to load addresses. Please try again later.")
      }
    }

    fetchAddresses()
  }, [isAuthenticated, navigate, cart.items.length, isSingleItemCheckout])

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setError("Please select a delivery address")
      return
    }

    setLoading(true)
    setError(null)

    try {
      let orderData

      if (isSingleItemCheckout) {
        // Single item checkout
        orderData = {
          shipping_address: selectedAddress,
          billing_address: selectedAddress,
          payment_method: paymentMethod,
          items: [
            {
              product: Number.parseInt(params.get("id") || "0"),
              name: name,
              price: Number.parseFloat(price),
              quantity: Number.parseInt(quantity),
            },
          ],
        }
      } else {
        // Cart checkout
        orderData = {
          shipping_address: selectedAddress,
          billing_address: selectedAddress,
          payment_method: paymentMethod,
          items: cart.items.map((item) => ({
            product: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }
      }

      const response = await api.post("/orders/", orderData)

      // Clear cart after successful order (only if cart checkout)
      if (!isSingleItemCheckout) {
        clearCart()
      }

      // Redirect to order confirmation page
      navigate(`/order-confirmation/${response.data.id}`)
    } catch (err) {
      console.error("Error placing order:", err)
      setError("Failed to place order. Please try again later.")
      setLoading(false)
    }
  }

  // Calculate order totals
  let subtotal, shipping, tax, total

  if (isSingleItemCheckout) {
    subtotal = Number.parseFloat(price)
    shipping = subtotal >= 500 ? 0 : 50
    tax = subtotal * 0.18
    total = subtotal + shipping + tax
  } else {
    subtotal = cart.total
    shipping = subtotal >= 500 ? 0 : 50
    tax = subtotal * 0.18
    total = subtotal + shipping + tax
  }

  return (
    <>
      <Helmet>
        <title>Checkout - Gharguti Food</title>
        <meta name="description" content="Complete your purchase at Gharguti Food" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Delivery Address */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>

              {addresses.length > 0 ? (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 cursor-pointer ${
                        selectedAddress === address.id
                          ? "border-primary bg-primary bg-opacity-5"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => setSelectedAddress(address.id)}
                    >
                      <div className="flex items-start">
                        <input
                          type="radio"
                          name="address"
                          id={`address-${address.id}`}
                          checked={selectedAddress === address.id}
                          onChange={() => setSelectedAddress(address.id)}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <p className="font-medium">{currentUser.name}</p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {address.address_line1}
                            {address.address_line2 && `, ${address.address_line2}`}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {address.city}, {address.state} {address.postal_code}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">{address.country}</p>
                          {address.is_default && (
                            <span className="inline-block mt-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                              Default Address
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">You don't have any saved addresses.</p>
                  <button type="button" className="btn btn-primary" onClick={() => navigate("/profile")}>
                    Add New Address
                  </button>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

              <div className="space-y-4">
                <div
                  className={`border rounded-lg p-4 cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-primary bg-primary bg-opacity-5"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      id="payment-cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Pay when your order is delivered</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary bg-opacity-5"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      id="payment-card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Pay securely with your card</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer ${
                    paymentMethod === "upi"
                      ? "border-primary bg-primary bg-opacity-5"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      id="payment-upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium">UPI</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pay using UPI apps like Google Pay, PhonePe, etc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="max-h-60 overflow-y-auto mb-4">
                {isSingleItemCheckout ? (
                  <div className="flex items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                      {image ? (
                        <img
                          src={image || "/placeholder.svg"}
                          alt={name}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Qty: {quantity}</div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      ₹{Number.parseFloat(price).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                        {item.image ? (
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax (18% GST)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  className="flex-1 btn btn-primary py-3"
                  onClick={handlePlaceOrder}
                  disabled={loading || !selectedAddress}
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>

                <button
                  type="button"
                  className="flex-1 btn bg-gray-500 hover:bg-gray-600 text-white py-3"
                  onClick={() => navigate("/cart")}
                >
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckoutPage
