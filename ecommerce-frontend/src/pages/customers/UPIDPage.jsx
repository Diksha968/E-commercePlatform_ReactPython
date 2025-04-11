// import React from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Fix import

const UPIDPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const name = params.get("name");
  const price = params.get("price");
  const upiID = "your-upi-id@upi"; // Replace with actual UPI ID

  // Generate UPI Payment URL
  const upiLink = `upi://pay?pa=${upiID}&pn=Shop&mc=&tid=&tr=&tn=Payment for ${name}&am=${price}&cu=INR`;

  return (
    <div className="pt-24 max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-blue-600"> Payment Now</h2>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold">Product: {name}</h3>
        <p className="text-2xl font-bold text-gray-900">Amount: ₹{price}</p>
        
        {/* ✅ Show UPI ID */}
        <p className="text-lg mt-4 text-gray-700">
          Pay to: <span className="font-bold">{upiID}</span>
        </p>

        {/* ✅ Generate QR Code */}
        <div className="flex justify-center mt-4">
          <QRCodeCanvas value={upiLink} size={150} /> {/* ✅ Fix applied */}
        </div>
        <p className="text-sm text-gray-500 mt-2">Scan this QR code to pay</p>

        {/* ✅ Payment Link for Mobile */}
        <a href={upiLink} className="block mt-4 text-blue-600 underline">
          Click here to pay via UPI app
        </a>

        {/* ✅ Confirm Payment Button */}
        <button
          onClick={() => {
            alert("Payment Successful! 🎉");
            navigate("/");
          }}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 mt-4"
        >
          Confirm Payment ✅
        </button>
      </div>
    </div>
  );
};

export default UPIDPage;
