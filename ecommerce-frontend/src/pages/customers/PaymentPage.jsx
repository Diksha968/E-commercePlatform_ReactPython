"use client"
import { useSearchParams, useNavigate } from "react-router-dom"
import QRCode from "qrcode.react"

const PaymentPage = () => {
  const searchParams = useSearchParams()
  const navigate = useNavigate()

  const name = searchParams.get("name")
  const price = searchParams.get("price")
  const quantity = searchParams.get("quantity")

  const upiString = `upi://pay?pa=your-upi-id@upi&pn=Gharguti%20Food&am=${price}&cu=INR`

  return (
    <div className="max-w-xl mx-auto p-8 mt-12 bg-white shadow rounded">
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Scan to Pay</h2>

      <div className="flex flex-col items-center gap-4">
        <p className="text-lg text-gray-800">Amount: ₹{price}</p>
        <QRCode value={upiString} size={256} />
        <p className="text-sm text-gray-600 mt-4">Scan this QR using any UPI app to pay</p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default PaymentPage
