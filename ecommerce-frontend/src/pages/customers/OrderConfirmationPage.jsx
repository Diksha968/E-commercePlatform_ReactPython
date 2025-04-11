"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import api from "../../services/api"

const OrderConfirmationPage = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}/`)
        setOrder(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching order:", err)
        setError("Failed to load order details. Please try again later.")
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error || "Order not found"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-500 rounded-full mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Order Number</p>
                <p className="font-semibold">{order.order_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                <p className="font-semibold">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="font-semibold">₹{order.total.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Payment Method</p>
                <p className="font-semibold">
                  {order.payment_method === "cod"
                    ? "Cash on Delivery"
                    : order.payment_method === "card"
                      ? "Credit/Debit Card"
                      : order.payment_method === "upi"
                        ? "UPI"
                        : order.payment_method}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                >
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                    {item.product_details.image ? (
                      <img
                        src={item.product_details.image || "/placeholder.svg"}
                        alt={item.product_details.name}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item.product_details.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    ₹{item.total.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
              {order.shipping_address_details && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>{order.user.name}</p>
                  <p>{order.shipping_address_details.address_line1}</p>
                  {order.shipping_address_details.address_line2 && (
                    <p>{order.shipping_address_details.address_line2}</p>
                  )}
                  <p>
                    {order.shipping_address_details.city}, {order.shipping_address_details.state}{" "}
                    {order.shipping_address_details.postal_code}
                  </p>
                  <p>{order.shipping_address_details.country}</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span>₹{order.shipping_cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span>₹{order.tax.toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Discount</span>
                    <span>-₹{order.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700 font-semibold">
                  <span>Total</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              A confirmation email has been sent to your email address.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/orders" className="btn btn-primary">
                View My Orders
              </Link>
              <Link
                to="/products"
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage
