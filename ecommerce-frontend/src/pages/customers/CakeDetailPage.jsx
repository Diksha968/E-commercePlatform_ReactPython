// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import BakeryProduct from "../assets/bakeryproducts.jpg";

// const cakes = [
//   { id: 1, name: "Chocolate Cake", price: "₹250", weight: "500g", flavor: "Chocolate", image: BakeryProduct },
//   { id: 2, name: "Vanilla Cake", price: "₹200", weight: "500g", flavor: "Vanilla", image: BakeryProduct },
//   { id: 3, name: "Strawberry Cake", price: "₹220", weight: "500g", flavor: "Strawberry", image: BakeryProduct }
// ];

// const CakeDetailPage = ({ addToCart, toggleFavorite, favorites = [] }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const cake = cakes.find((c) => c.id === parseInt(id));

//   if (!cake) {
//     return <div className="text-center text-xl text-red-600 mt-10">Cake not found.</div>;
//   }

//   const isFavorite = favorites.some((fav) => fav.id === cake.id);

//   return (
//     <div className="pt-24 max-w-4xl mx-auto text-center">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium"
//         >
//           ⬅ 
//         </button>

//       <h2 className="text-4xl font-bold text-orange-600">{cake.name}</h2>
//       <img src={cake.image} alt={cake.name} className="w-full h-64 object-cover rounded-md mt-4" />
//       <p className="text-xl text-gray-700 mt-2">Flavor: {cake.flavor}</p>
//       <p className="text-lg text-gray-700">Weight: {cake.weight}</p>
//       <p className="text-3xl font-bold text-gray-900 mt-2">{cake.price}</p>

//       <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
//         {/* ✅ Add to Cart with Notification */}
//         <button
//           onClick={() => {
//             addToCart(cake);
//             window.alert(`${cake.name} added to cart! 🛒`); // ✅ Alert notification
//           }}
//           className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//         >
//           Add to Cart 🛒
//         </button>

//         {/* ✅ Favorite Toggle with Notification */}
//         <button
//           onClick={() => {
//             toggleFavorite(cake);
//             window.alert(isFavorite ? `${cake.name} removed from favorites ❌` : `${cake.name} added to favorites ❤️`);
//           }}
//           className={`px-6 py-3 rounded-lg ${isFavorite ? "bg-red-500" : "bg-gray-400"} text-white hover:opacity-80`}
//         >
//           {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CakeDetailPage;
// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import BakeryProduct from "../assets/bakeryproducts.jpg";

// const cakes = [
//   { id: 1, name: "Chocolate Cake", price: "₹250", weight: "500g", flavor: "Chocolate", image: BakeryProduct },
//   { id: 2, name: "Vanilla Cake", price: "₹200", weight: "500g", flavor: "Vanilla", image: BakeryProduct },
//   { id: 3, name: "Strawberry Cake", price: "₹220", weight: "500g", flavor: "Strawberry", image: BakeryProduct }
// ];

// const CakeDetailPage = ({ addToCart, toggleFavorite, favorites = [] }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const cake = cakes.find((c) => c.id === parseInt(id));

//   if (!cake) {
//     return <div className="text-center text-xl text-red-600 mt-10">Cake not found.</div>;
//   }

//   const isFavorite = favorites.some((fav) => fav.id === cake.id);

//   const showAlert = (message) => {
//     window.confirm(message); // ✅ Alert with Close button
//   };

//   return (
//     <div className="pt-24 max-w-4xl mx-auto text-center">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium"
//       >
//         ⬅ 
//       </button>

//       <h2 className="text-4xl font-bold text-orange-600">{cake.name}</h2>
//       <img src={cake.image} alt={cake.name} className="w-full h-64 object-cover rounded-md mt-4" />
//       <p className="text-xl text-gray-700 mt-2">Flavor: {cake.flavor}</p>
//       <p className="text-lg text-gray-700">Weight: {cake.weight}</p>
//       <p className="text-3xl font-bold text-gray-900 mt-2">{cake.price}</p>

//       <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
//         {/* ✅ Add to Cart with Notification */}
//          <button
//           onClick={() => {
//             addToCart(cake);
//             showAlert(`${cake.name} added to cart! 🛒`);
//           }}
//           className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//         >
//           Add to Cart 🛒
//         </button> 
        


//         {/* ✅ Favorite Toggle with Notification */}
//         <button
//           onClick={() => {
//             toggleFavorite(cake);
//             showAlert(isFavorite ? `${cake.name} removed from favorites ❌` : `${cake.name} added to favorites ❤️`);
//           }}
//           className={`px-6 py-3 rounded-lg ${isFavorite ? "bg-red-500" : "bg-gray-400"} text-white hover:opacity-80`}
//         >
//           {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CakeDetailPage;
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import BakeryProduct from "../assets/bakeryproducts.jpg";

// const cakes = [
//   { id: 1, name: "Chocolate Cake", price: 250, weight: "500g", flavor: "Chocolate", image: BakeryProduct },
//   { id: 2, name: "Vanilla Cake", price: 200, weight: "500g", flavor: "Vanilla", image: BakeryProduct },
//   { id: 3, name: "Strawberry Cake", price: 220, weight: "500g", flavor: "Strawberry", image: BakeryProduct }
// ];

// const CakeDetailPage = ({ addToCart, toggleFavorite, favorites = [] }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1); // ✅ Quantity State

//   const cake = cakes.find((c) => c.id === parseInt(id));

//   if (!cake) {
//     return <div className="text-center text-xl text-red-600 mt-10">Cake not found.</div>;
//   }

//   const isFavorite = favorites.some((fav) => fav.id === cake.id);

//   // ✅ Handle Quantity Change
//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   return (
//     <div className="pt-24 max-w-4xl mx-auto text-center">
//       {/* ✅ Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium mb-4"
//       >
//         ⬅ Back
//       </button>

//       <h2 className="text-4xl font-bold text-orange-600">{cake.name}</h2>
//       <img src={cake.image} alt={cake.name} className="w-full h-64 object-cover rounded-md mt-4" />
//       <p className="text-xl text-gray-700 mt-2">Flavor: {cake.flavor}</p>
//       <p className="text-lg text-gray-700">Weight: {cake.weight}</p>
//       <p className="text-3xl font-bold text-gray-900 mt-2">₹{cake.price}</p>

//       {/* ✅ Quantity Selector */}
//       <div className="flex items-center justify-center gap-4 mt-4">
//         <button
//           onClick={decreaseQuantity}
//           className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
//         >
//           ➖
//         </button>
//         <span className="text-2xl font-bold">{quantity}</span>
//         <button
//           onClick={increaseQuantity}
//           className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
//         >
//           ➕
//         </button>
//       </div>

//       <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
//         {/* ✅ Add to Cart with Quantity */}
//         <button
//           onClick={() => {
//             addToCart({ ...cake, quantity });
//             alert(`🛒 ${quantity}x ${cake.name} added to cart!`);
//           }}
//           className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//         >
//           Add to Cart 🛒
//         </button>

//         {/* ✅ Favorite Toggle */}
//         <button
//           onClick={() => toggleFavorite(cake)}
//           className={`px-6 py-3 rounded-lg ${isFavorite ? "bg-red-500" : "bg-gray-400"} text-white hover:opacity-80`}
//         >
//           {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CakeDetailPage;
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import BakeryProduct from "../assets/bakeryproducts.jpg";

// const cakes = [
//   { id: 1, name: "Chocolate Cake", price: 250, weight: "500g", flavor: "Chocolate", image: BakeryProduct },
//   { id: 2, name: "Vanilla Cake", price: 200, weight: "500g", flavor: "Vanilla", image: BakeryProduct },
//   { id: 3, name: "Strawberry Cake", price: 220, weight: "500g", flavor: "Strawberry", image: BakeryProduct }
// ];

// const CakeDetailPage = ({ addToCart, toggleFavorite, favorites = [] }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);

//   const cake = cakes.find((c) => c.id === parseInt(id));

//   if (!cake) {
//     return <div className="text-center text-xl text-red-600 mt-10">Cake not found.</div>;
//   }

//   const isFavorite = favorites.some((fav) => fav.id === cake.id);

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   // ✅ Calculate Total Price
//   const totalPrice = cake.price * quantity;

//   return (
//     <div className="pt-24 max-w-4xl mx-auto text-center">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium mb-4"
//       >
//         ⬅ Back
//       </button>

//       <h2 className="text-4xl font-bold text-orange-600">{cake.name}</h2>
//       <img src={cake.image} alt={cake.name} className="w-full h-64 object-cover rounded-md mt-4" />
//       <p className="text-xl text-gray-700 mt-2">Flavor: {cake.flavor}</p>
//       <p className="text-lg text-gray-700">Weight: {cake.weight}</p>
//       <p className="text-3xl font-bold text-gray-900 mt-2">₹{cake.price}</p>

//       <div className="flex items-center justify-center gap-4 mt-4">
//         <button
//           onClick={decreaseQuantity}
//           className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
//         >
//           ➖
//         </button>
//         <span className="text-2xl font-bold">{quantity}</span>
//         <button
//           onClick={increaseQuantity}
//           className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
//         >
//           ➕
//         </button>
//       </div>

//       {/* ✅ Show Total Price */}
//       <p className="text-2xl font-bold text-gray-900 mt-2">Total Price: ₹{totalPrice}</p>

//       <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
//         <button
//           onClick={() => {
//             addToCart({ ...cake, quantity });
//             alert(`🛒 ${quantity}x ${cake.name} added to cart!`);
//           }}
//           className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//         >
//           Add to Cart 🛒
//         </button>

//         <button
//           onClick={() => toggleFavorite(cake)}
//           className={`px-6 py-3 rounded-lg ${isFavorite ? "bg-red-500" : "bg-gray-400"} text-white hover:opacity-80`}
//         >
//           {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CakeDetailPage;
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import BakeryProduct from "../assets/bakeryproducts.jpg";

// const cakes = [
//   { id: 1, name: "Chocolate Cake", price: 250, weight: "500g", flavor: "Chocolate", image:"https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c4a033c0-6dfa-4743-a740-856695740133.png" },
//   { id: 2, name: "Vanilla Cake", price: 200, weight: "500g", flavor: "Vanilla", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0f8b9d25-653c-4ab9-b37a-d92ea0da2b5e.png" },
//   { id: 3, name: "Strawberry Cake", price: 220, weight: "500g", flavor: "Strawberry", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d8c0b733-8ea3-404f-ab31-10df7fa18084.png" },
//     { id: 4, name: "Butterscotch Cake", price: 230, weight: "500g", flavor: "Butterscotch", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6b0ab7f0-a9e6-4303-bc10-6c3f71f06ced.png" },
//      { id: 5, name: "Rasmalai Cake", price: 240, weight: "500g", flavor: "Rasmalai", image: "https://www.indiaspedia.com/wp-content/uploads/2024/11/Rasmalai-Cake.webp" },
//      { id: 6, name: "Fruit Cake", price: 300, weight: "500g", flavor: "Fruit", image: "https://www.indiaspedia.com/wp-content/uploads/2024/11/Fruit-Cake.webp" },
//      { id: 7, name: " Pineapple Cake", price: 290, weight: "500g", flavor: "Pineapple",image: "https://www.indiaspedia.com/wp-content/uploads/2024/11/Pineapple-Cake.webp" },
//      { id: 8, name: "Coffee Cake", price: 400, weight: "500g", flavor: "Coffee", image: "https://www.indiaspedia.com/wp-content/uploads/2024/11/Coffee-Cake.webp" },
//      { id: 9, name: "Cheesecake", price: 500, weight: "500g", flavor: "Cheese", image: "https://www.indiaspedia.com/wp-content/uploads/2024/11/Cheesecake.webp"},
//      { id: 10, name: "Ferrero Rocher Cake", price: 450, weight: "500g", flavor: "Ferrero Rocher", image: "https://www.indiaspedia.com/wp-content/uploads/2024/11/Ferrero-Rocher-Cake.webp" }
// ];

// const CakeDetailPage = ({ addToCart, toggleFavorite, favorites = [] }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);

//   const cake = cakes.find((c) => c.id === parseInt(id));

//   if (!cake) {
//     return <div className="text-center text-xl text-red-600 mt-10">Cake not found.</div>;
//   }

//   const isFavorite = favorites.some((fav) => fav.id === cake.id);

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   // ✅ Calculate Total Price
//   const totalPrice = cake.price * quantity;

//   return (
//     <div className="pt-24 max-w-4xl mx-auto text-center">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium mb-4"
//       >
//         ⬅ Back
//       </button>

//       <h2 className="text-4xl font-bold text-orange-600">{cake.name}</h2>
//       <img src={cake.image} alt={cake.name} className="w-full h-auto object-cover rounded-md mt-4" />
//       <p className="text-xl text-gray-700 mt-2">Flavor: {cake.flavor}</p>
//       <p className="text-lg text-gray-700">Weight: {cake.weight}</p>
//       <p className="text-3xl font-bold text-gray-900 mt-2">₹{cake.price}</p>

//       <div className="flex items-center justify-center gap-4 mt-4">
//         <button
//           onClick={decreaseQuantity}
//           className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
//         >
//           ➖
//         </button>
//         <span className="text-2xl font-bold">{quantity}</span>
//         <button
//           onClick={increaseQuantity}
//           className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
//         >
//           ➕
//         </button>
//       </div>

//       {/* ✅ Show Total Price */}
//       <p className="text-2xl font-bold text-gray-900 mt-2">Total Price: ₹{totalPrice}</p>

//       <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
//         <button
//           onClick={() => {
//             const confirmAdd = window.confirm(`Add ${quantity}x ${cake.name} to cart?`);
//             if (confirmAdd) {
//               addToCart({ ...cake, quantity });
//               alert(`🛒 ${quantity}x ${cake.name} added to cart!`);
//             }
//           }}
//           className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//         >
//           Add to Cart 🛒
//         </button>

//         <button
//           onClick={() => toggleFavorite(cake)}
//           className={`px-6 py-3 rounded-lg ${isFavorite ? "bg-red-500" : "bg-gray-400"} text-white hover:opacity-80`}
//         >
//           {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CakeDetailPage;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const cakes = [
  { id: 1, name: "Chocolate Cake", price: 250, weight: "500g", flavor: "Chocolate", image:"https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c4a033c0-6dfa-4743-a740-856695740133.png" },
  { id: 2, name: "Vanilla Cake", price: 200, weight: "500g", flavor: "Vanilla", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0f8b9d25-653c-4ab9-b37a-d92ea0da2b5e.png" },
  { id: 3, name: "Strawberry Cake", price: 220, weight: "500g", flavor: "Strawberry", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d8c0b733-8ea3-404f-ab31-10df7fa18084.png" },
    { id: 4, name: "Butterscotch Cake", price: 230, weight: "500g", flavor: "Butterscotch", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6b0ab7f0-a9e6-4303-bc10-6c3f71f06ced.png" },
     { id: 5, name: "Rasmalai Cake", price: 240, weight: "500g", flavor: "Rasmalai", image: "https://www.indiaspedia.com/wp-content/uploads/2024/11/Rasmalai-Cake.webp" },
     { id: 6, name: "Fruit Cake", price: 300, weight: "500g", flavor: "Fruit", image: "https://www.indiaspedia.com/wp-content/uploads/2024/11/Fruit-Cake.webp" },
     { id: 7, name: " Pineapple Cake", price: 290, weight: "500g", flavor: "Pineapple",image: "https://www.indiaspedia.com/wp-content/uploads/2024/11/Pineapple-Cake.webp" },
     { id: 8, name: "Coffee Cake", price: 400, weight: "500g", flavor: "Coffee", image: "https://www.indiaspedia.com/wp-content/uploads/2024/11/Coffee-Cake.webp" },
     { id: 9, name: "Cheesecake", price: 500, weight: "500g", flavor: "Cheese", image: "https://www.indiaspedia.com/wp-content/uploads/2024/11/Cheesecake.webp"},
     { id: 10, name: "Ferrero Rocher Cake", price: 450, weight: "500g", flavor: "Ferrero Rocher", image: "https://www.indiaspedia.com/wp-content/uploads/2024/11/Ferrero-Rocher-Cake.webp" }
];

const masalaProducts = [
  { id: 11, name: "Sabji Masala", price: 150, weight: "500g",  image:"https://m.media-amazon.com/images/I/71OgisLCmJL._SY741_.jpg" },
  { id: 12, name: "Garam Masala", price: 200, weight: "500g",  image: "https://m.media-amazon.com/images/I/71sPgGyrmCL._SX679_.jpg" },
  { id: 13, name: "Shahi Biryani Masala ", price: 220, weight: "500g",  image: "https://m.media-amazon.com/images/I/71wK9rUJQCL._SY741_.jpg" },
    { id: 14, name: "Kitchen King Mixed Masala", price: 230, weight: "500g",  image: "https://m.media-amazon.com/images/I/61XATWnz2fL._SY741_.jpg" },
     { id: 15, name: "Chat Masala", price: 240, weight: "500g",  image: "https://m.media-amazon.com/images/I/51uK3chXq+L._SX679_.jpg" },
     { id: 16, name: "Shahi Paneer Masala", price: 300, weight: "500g",  image: "https://m.media-amazon.com/images/I/71u5eIB+gML._SL1500_.jpg" },
     { id: 17, name: " Pav Bhaji Masala", price: 290, weight: "500g", image: "https://m.media-amazon.com/images/I/61S3ruJG7ZL._SY741_.jpg" },
     { id: 18, name: "Meat Masala", price: 400, weight: "500g",  image: "https://m.media-amazon.com/images/I/61phnc-A-2L._SX679_.jpg" },
     { id: 19, name: "Chana Masala", price: 500, weight: "500g",  image: "https://m.media-amazon.com/images/I/71tXYYscTQL._SX679_PIbundle-12,TopRight,0,0_AA679SH20_.jpg"},
     { id: 20, name: "Chhole Masala", price: 450, weight: "500g",  image: "https://m.media-amazon.com/images/I/81GxkRow-lL._SY741_PIbundle-4,TopRight,0,0_SX515SY741SH20_.jpg" }
];

const jewelleryProducts = [
  { id: 11, name: "Sabji Masala", price: 150, weight: "500g",  image:"https://m.media-amazon.com/images/I/71OgisLCmJL._SY741_.jpg" },
  { id: 12, name: "Garam Masala", price: 200, weight: "500g",  image: "https://m.media-amazon.com/images/I/71sPgGyrmCL._SX679_.jpg" },
  { id: 13, name: "Shahi Biryani Masala ", price: 220, weight: "500g",  image: "https://m.media-amazon.com/images/I/71wK9rUJQCL._SY741_.jpg" },
    { id: 14, name: "Kitchen King Mixed Masala", price: 230, weight: "500g",  image: "https://m.media-amazon.com/images/I/61XATWnz2fL._SY741_.jpg" },
     { id: 15, name: "Chat Masala", price: 240, weight: "500g",  image: "https://m.media-amazon.com/images/I/51uK3chXq+L._SX679_.jpg" },
     { id: 16, name: "Shahi Paneer Masala", price: 300, weight: "500g",  image: "https://m.media-amazon.com/images/I/71u5eIB+gML._SL1500_.jpg" },
     { id: 17, name: " Pav Bhaji Masala", price: 290, weight: "500g", image: "https://m.media-amazon.com/images/I/61S3ruJG7ZL._SY741_.jpg" },
     { id: 18, name: "Meat Masala", price: 400, weight: "500g",  image: "https://m.media-amazon.com/images/I/61phnc-A-2L._SX679_.jpg" },
     { id: 19, name: "Chana Masala", price: 500, weight: "500g",  image: "https://m.media-amazon.com/images/I/71tXYYscTQL._SX679_PIbundle-12,TopRight,0,0_AA679SH20_.jpg"},
     { id: 20, name: "Chhole Masala", price: 450, weight: "500g",  image: "https://m.media-amazon.com/images/I/81GxkRow-lL._SY741_PIbundle-4,TopRight,0,0_SX515SY741SH20_.jpg" }
];

// const masalaProduct = [
//   { id: 11, name: "Sabji Masala", price: 150, weight: "500g",  image:"https://m.media-amazon.com/images/I/71OgisLCmJL._SY741_.jpg" },
//   { id: 12, name: "Garam Masala", price: 200, weight: "500g",  image: "https://m.media-amazon.com/images/I/71sPgGyrmCL._SX679_.jpg" },
//   { id: 13, name: "Shahi Biryani Masala ", price: 220, weight: "500g",  image: "https://m.media-amazon.com/images/I/71wK9rUJQCL._SY741_.jpg" },
//     { id: 14, name: "Kitchen King Mixed Masala", price: 230, weight: "500g",  image: "https://m.media-amazon.com/images/I/61XATWnz2fL._SY741_.jpg" },
//      { id: 15, name: "Chat Masala", price: 240, weight: "500g",  image: "https://m.media-amazon.com/images/I/51uK3chXq+L._SX679_.jpg" },
// ];


const CakeDetailPage = ({ addToCart, toggleFavorite, favorites = [] }) => {
  const { id, category } = useParams(); // Get category
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Merge both categories
  const allProducts = [...cakes, ...masalaProducts,...jewelleryProducts];

  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center text-xl text-red-600 mt-10">Product not found.</div>;
  }

  const isFavorite = favorites.some((fav) => fav.id === product.id);
  const totalPrice = product.price * quantity;

  return (
    <div className="pt-24 max-w-4xl mx-auto text-center">
      <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-gray-900 font-medium mb-4">
        ⬅ Back
      </button>

      <h2 className="text-4xl font-bold text-orange-600">{product.name}</h2>
      <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md mt-4" />
      <p className="text-xl text-gray-700 mt-2">Weight: {product.weight}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">₹{product.price}</p>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 bg-gray-300 rounded-lg">
          ➖
        </button>
        <span className="text-2xl font-bold">{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 bg-gray-300 rounded-lg">
          ➕
        </button>
      </div>

      <p className="text-2xl font-bold text-gray-900 mt-2">Total Price: ₹{totalPrice}</p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <button
          onClick={() => {
            if (window.confirm(`Add ${quantity}x ${product.name} to cart?`)) {
              addToCart({ ...product, quantity });
              alert(`🛒 ${quantity}x ${product.name} added to cart!`);
            }
          }}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg"
        >
          Add to Cart 🛒
        </button>

        <button
          onClick={() => toggleFavorite(product)}
          className={`px-6 py-3 rounded-lg ${isFavorite ? "bg-red-500" : "bg-gray-400"} text-white`}
        >
          {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default CakeDetailPage;
