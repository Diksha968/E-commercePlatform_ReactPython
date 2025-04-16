// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { QRCodeCanvas } from "qrcode.react"; // ✅ Fix import

// const UPIDPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);

//   const name = params.get("name");
//   const price = params.get("price");
//   // const upiID = "your-upi-id@upi"; // Replace with actual UPI ID
//   const upiID = "pgawade2977@oksbi"; // Poonam Gpay UPI ID

//   // Generate UPI Payment URL
//   const upiLink = `upi://pay?pa=${upiID}&pn=Shop&mc=&tid=&tr=&tn=Payment for ${name}&am=${price}&cu=INR`;

//   return (
//     <div className="pt-24 max-w-4xl mx-auto text-center">
//       <h2 className="text-4xl font-bold text-orange-500"> Payment Now</h2>

//       <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
//         <h3 className="text-xl font-semibold">Product: {name}</h3>
//         <p className="text-2xl font-bold text-gray-900">Amount: ₹{price}</p>

//         {/* ✅ Show UPI ID */}
//         <p className="text-lg mt-4 text-gray-700">
//           Pay to: <span className="font-bold">{upiID}</span>
//         </p>

//         {/* ✅ Generate QR Code */}
//         <div className="flex justify-center mt-4">
//           <QRCodeCanvas value={upiLink} size={150} /> {/* ✅ Fix applied */}
//         </div>
//         <p className="text-sm text-gray-500 mt-2">Scan this QR code to pay</p>

//         {/* ✅ Payment Link for Mobile */}
//         <a href={upiLink} className="block mt-4 text-blue-600 underline">
//           Click here to pay via UPI app
//         </a>

//         <div className="flex flex-col items-center gap-3 mt-4">
//           <button
//             onClick={() => {
//               alert("Payment Successful! 🎉");
//               navigate("/");
//             }}
//             className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
//           >
//             Confirm Payment ✅
//           </button>

//           <button
//             onClick={() => {
//               const confirmCancel = window.confirm("Are you sure you want to cancel the payment?");
//               if (confirmCancel) navigate("/cart");
//             }}
//             className="px-6 py-3 bg-red-400 text-white rounded-lg hover:bg-red-600"
//           >
//             Cancel Payment ❌
//           </button>
//         </div>


//       </div>
//     </div>
//   );
// };

// export default UPIDPage;




import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const UPIDPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const name = params.get("name");
  const price = params.get("price");
  const upiID = "pgawade2977@oksbi"; // Poonam Gpay UPI ID

  const upiLink = `upi://pay?pa=${upiID}&pn=Shop&mc=&tid=&tr=&tn=Payment for ${name}&am=${price}&cu=INR`;

  const [paymentComplete, setPaymentComplete] = useState(false);

  // Simulate auto-confirm after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPaymentComplete(true);
    }, 300000); // 5 minute

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (paymentComplete) {
    return (
      <div className="pt-24 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h2>
        <p className="text-lg text-gray-700 mb-6">Thank you for your purchase.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Back to Home 🏠
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto text-center">

      <div className="bg-gray-100 shadow-xl rounded-lg p-6 mt-6">
        <h2 className="text-4xl font-bold text-orange-500"> Payment Now</h2>
        {/* <h3 className="text-xl font-semibold">Product: {name}</h3> */}
        <p className="text-2xl font-bold text-gray-900">Amount: ₹{price}</p>

        {/* <p className="text-lg mt-4 text-gray-700">
          Pay to: <span className="font-bold">{upiID}</span>
        </p> */}

        <div className="flex justify-center mt-4">
          <QRCodeCanvas value={upiLink} size={150} />
        </div>
        <p className="text-sm text-gray-500 mt-2">Scan this QR code to pay</p>

        {/* <a href={upiLink} className="block mt-4 text-blue-600 underline">
          Click here to pay via UPI app
        </a> */}

        <div className="flex flex-col items-center gap-3 mt-6">
          <p className="text-gray-600">Waiting for payment confirmation...</p>
          <button
            onClick={() => {
              const confirmCancel = window.confirm("Are you sure you want to cancel the payment?");
              if (confirmCancel) navigate("/cart");
            }}
            className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-red-400"
          >
            Cancel Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UPIDPage;
