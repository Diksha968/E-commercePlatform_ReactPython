"use client"

import { useState } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme } from "../../contexts/ThemeContext"

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { logout, currentUser } = useAuth()
  const theme = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/auth/login")
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? "250px" : "70px",
          backgroundColor: theme.colors.primary,
          color: "#fff",
          transition: "width 0.3s ease",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ margin: 0 }}>{sidebarOpen ? "Admin Dashboard" : "AD"}</h2>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {sidebarOpen ? "← Collapse" : "→"}
        </button>

        <nav style={{ marginTop: "20px" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link
                to="/admin"
                style={{
                  display: "block",
                  padding: "15px 20px",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                style={{
                  display: "block",
                  padding: "15px 20px",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                style={{
                  display: "block",
                  padding: "15px 20px",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/customers"
                style={{
                  display: "block",
                  padding: "15px 20px",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Customers
              </Link>
            </li>
            <li>
              <Link
                to="/admin/vendors"
                style={{
                  display: "block",
                  padding: "15px 20px",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Vendors
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                style={{
                  display: "block",
                  padding: "15px 20px",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            backgroundColor: theme.colors.surface,
            padding: "15px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${theme.colors.border}`,
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Admin Panel</h1>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span>Welcome, {currentUser?.name || "Admin"}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 15px",
                backgroundColor: theme.colors.secondary,
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: "20px", overflow: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

