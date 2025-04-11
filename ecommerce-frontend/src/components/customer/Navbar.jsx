import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaUser, FaHeart } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); 
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery(""); 
    }
  };

  return (
    <>
      <header className="bg-orange-500 shadow-md w-full h-20 fixed top-0 z-50">
        {/* Top Announcement Bar */}
        <div className="bg-orange-700 text-center py-1 text-sm text-white">
          🌟 Are you looking for distributorship opportunities? Contact us today! 🌟
        </div>

        {/* Navbar */}
        <nav className="container mx-auto flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="w-12 h-12" />
            <span className="text-lg font-bold text-white">उद्योगकता विकास अभियान</span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-white font-medium">
            <li className="hover:text-black cursor-pointer" onClick={() => navigate("/")}>HOME</li>
            <li className="hover:text-black cursor-pointer" onClick={() => navigate("/order")}>ORDER ONLINE</li>
            <li className="hover:text-black cursor-pointer" onClick={() => navigate("/partner")}>PARTNER WITH US</li>
            <li className="hover:text-black cursor-pointer" onClick={() => navigate("/more")}>MORE ▼</li>
          </ul>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white rounded-lg px-2 py-1">
            <input 
              type="text"
              placeholder="Search cakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-2 py-1 text-black focus:outline-none"
            />
            <button type="submit">
              <FaSearch className="text-orange-500 cursor-pointer" />
            </button>
          </form>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <FaHeart 
              className="text-white cursor-pointer text-xl hover:text-red-500" 
              onClick={() => navigate("/favorites")} 
              title="View Favorites"
            />
            <FaShoppingCart 
              className="text-white cursor-pointer text-xl hover:text-yellow-300" 
              onClick={() => navigate("/cart")} 
              title="View Cart"
            />
            <span className="text-white cursor-pointer flex items-center gap-1" onClick={() => navigate("/login")}>
              <FaUser /> Login
            </span>
            <span className="text-white cursor-pointer flex items-center gap-1" onClick={() => navigate("/signup")}>
              <FaUser /> Signup
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <FaBars 
              className="text-white text-xl cursor-pointer" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
            />
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-orange-600 shadow-md py-2 px-4 absolute w-full top-16 left-0">
            <ul className="space-y-2 text-white font-medium">
              <li className="hover:text-black cursor-pointer" onClick={() => { navigate("/"); setIsMenuOpen(false); }}>HOME</li>
              <li className="hover:text-black cursor-pointer" onClick={() => { navigate("/order"); setIsMenuOpen(false); }}>ORDER ONLINE</li>
              <li className="hover:text-black cursor-pointer" onClick={() => { navigate("/partner"); setIsMenuOpen(false); }}>PARTNER WITH US</li>
              <li className="hover:text-black cursor-pointer" onClick={() => { navigate("/more"); setIsMenuOpen(false); }}>MORE ▼</li>
              <li className="hover:text-black cursor-pointer flex items-center gap-1" onClick={() => { navigate("/favorites"); setIsMenuOpen(false); }}>
                <FaHeart /> Favorites
              </li>
              <li className="hover:text-black cursor-pointer flex items-center gap-1" onClick={() => { navigate("/cart"); setIsMenuOpen(false); }}>
                <FaShoppingCart /> Cart
              </li>
              <li className="hover:text-black cursor-pointer flex items-center gap-1" onClick={() => { navigate("/login"); setIsMenuOpen(false); }}>
                <FaUser /> Login
              </li>
              <li className="hover:text-black cursor-pointer flex items-center gap-1" onClick={() => { navigate("/signup"); setIsMenuOpen(false); }}>
                <FaUser /> Signup
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Add padding to body content to prevent it from being hidden behind navbar */}
      <main className="pt-20">
        {/* Your page content goes here */}
      </main>
    </>
  );
};

export default Navbar;
