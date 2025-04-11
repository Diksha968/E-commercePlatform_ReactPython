"use client"

import { createContext, useState, useContext, useEffect } from "react"
import api from "../services/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    if (token) {
      fetchUserData(token)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserData = async (token) => {
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      const response = await api.get("/auth/me/")
      setCurrentUser(response.data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching user data:", err)
      localStorage.removeItem("token")
      setError("Session expired. Please login again.")
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await api.post("/auth/login/", { email, password })
      const { token, user } = response.data

      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(user)
      setError(null)
      return user
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      const response = await api.post("/auth/register/", userData)
      const { token, user } = response.data

      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(user)
      setError(null)
      return user
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    delete api.defaults.headers.common["Authorization"]
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === "admin",
    isVendor: currentUser?.role === "vendor",
    isCustomer: currentUser?.role === "customer",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

