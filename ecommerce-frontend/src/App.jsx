"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import { ThemeProvider } from "./contexts/ThemeContext"

// Layouts
import CustomerLayout from "./components/layouts/CustomerLayout"
import AdminLayout from "./components/layouts/AdminLayout"
import VendorLayout from "./components/layouts/VendorLayout"
import AuthLayout from "./components/layouts/AuthLayout"

// Customer Pages
import Home from "./pages/customers/Home"
import ProductListPage from "./pages/customers/ProductListPage"
import ProductDetailPage from "./pages/customers/ProductDetailPage"
import CartPage from "./pages/customers/CartPage"
import CheckoutPage from "./pages/customers/CheckoutPage"
import OrderConfirmationPage from "./pages/customers/OrderConfirmationPage"
import ProfilePage from "./pages/customers/ProfilePage"
import OrdersPage from "./pages/customers/OrdersPage"
import CategoryPage from "./pages/customers/CategoryPage"
import FavoritesPage from "./pages/customers/FavoritesPage"
import More from "./pages/customers/More"
import OrderOnline from "./pages/customers/OrderOnline"
import UPIDPage from "./pages/customers/UPIDPage"

// Auth Pages
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProducts from "./pages/admin/Products"
import AdminOrders from "./pages/admin/Orders"
import AdminCustomers from "./pages/admin/Customers"
import AdminVendors from "./pages/admin/Vendors"
import AdminSettings from "./pages/admin/Settings"

// Vendor Pages
import VendorDashboard from "./pages/vendor/Dashboard"
import VendorProducts from "./pages/vendor/Products"
import VendorOrders from "./pages/vendor/Orders"

// Protected Route
import ProtectedRoute from "./components/common/ProtectedRoute"

function App() {
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id)
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item,
        ),
      )
    } else {
      setCart([...cart, { ...product, quantity: product.quantity || 1 }])
    }
  }

  const toggleFavorite = (product) => {
    const isFavorite = favorites.some((fav) => fav.id === product.id)
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== product.id))
    } else {
      setFavorites([...favorites, product])
    }
  }

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={<CustomerLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<ProductListPage />} />
                <Route path="products/:category" element={<CategoryPage />} />
                <Route
                  path="product/:id"
                  element={
                    <ProductDetailPage addToCart={addToCart} toggleFavorite={toggleFavorite} favorites={favorites} />
                  }
                />
                <Route path="cart" element={<CartPage cart={cart} setCart={setCart} />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="favorites" element={<FavoritesPage favorites={favorites} setFavorites={setFavorites} />} />
                <Route path="more" element={<More />} />
                <Route path="order-online" element={<OrderOnline />}/>
                <Route path="upid" element={<UPIDPage />}  />

                {/* Protected Customer Routes */}
                <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="orders" element={<OrdersPage />} />
                </Route>
              </Route>

              {/* Auth Routes */}
              <Route path="/" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="vendors" element={<AdminVendors />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Route>

              {/* Vendor Routes */}
              <Route element={<ProtectedRoute allowedRoles={["vendor"]} />}>
                <Route path="/vendor" element={<VendorLayout />}>
                  <Route index element={<VendorDashboard />} />
                  <Route path="products" element={<VendorProducts />} />
                  <Route path="orders" element={<VendorOrders />} />
                </Route>
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
