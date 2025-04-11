"use client"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const ProtectedRoute = ({ children, role }) => {
  const { currentUser, loading, isAuthenticated, isAdmin, isVendor, isCustomer } = useAuth()

  if (loading) {
    return <div className="loading-spinner">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  // Check role-based access
  if (role === "admin" && !isAdmin) {
    return <Navigate to="/" replace />
  }

  if (role === "vendor" && !isVendor) {
    return <Navigate to="/" replace />
  }

  if (role === "customer" && !isCustomer) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute

