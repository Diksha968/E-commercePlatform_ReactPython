"use client"
import { Outlet, Link } from "react-router-dom"
import { useTheme } from "../../contexts/ThemeContext"

const AuthLayout = () => {
  const theme = useTheme()

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <header
        style={{
          padding: "20px",
          borderBottom: `1px solid ${theme.colors.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: theme.colors.primary }}>
          <h1 style={{ margin: 0 }}>Grow-Well Marketplace</h1>
        </Link>

        <button
          onClick={theme.toggleDarkMode}
          style={{
            padding: "8px 15px",
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {theme.isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Outlet />
      </main>

      <footer
        style={{
          padding: "20px",
          borderTop: `1px solid ${theme.colors.border}`,
          textAlign: "center",
        }}
      >
        <p>&copy; {new Date().getFullYear()} Grow-Well Marketplace. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default AuthLayout

