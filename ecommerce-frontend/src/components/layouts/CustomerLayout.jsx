"use client"
import { Outlet } from "react-router-dom"
import Header from "../customer/Header"
import Footer from "../customer/Footer"
import { useTheme } from "../../contexts/ThemeContext"

const CustomerLayout = () => {
  const theme = useTheme()

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default CustomerLayout

