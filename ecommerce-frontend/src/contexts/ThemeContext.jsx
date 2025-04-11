"use client"

import { createContext, useState, useContext, useEffect } from "react"

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  // Define theme colors with orange/white scheme
  const theme = {
    colors: {
      primary: "#ff7700", // Vibrant orange as primary color
      secondary: "#ff9a3c", // Lighter orange as secondary color
      accent: "#ffffff", // White as accent color
      background: darkMode ? "#121212" : "#ffffff",
      surface: darkMode ? "#1e1e1e" : "#f8f8f8",
      text: darkMode ? "#ffffff" : "#333333",
      textSecondary: darkMode ? "#b0b0b0" : "#666666",
      border: darkMode ? "#333333" : "#e0e0e0",
    },
    toggleDarkMode: () => setDarkMode(!darkMode),
    isDarkMode: darkMode,
  }

  useEffect(() => {
    // Apply theme to document body
    document.body.style.backgroundColor = theme.colors.background
    document.body.style.color = theme.colors.text
  }, [darkMode, theme.colors.background, theme.colors.text])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
