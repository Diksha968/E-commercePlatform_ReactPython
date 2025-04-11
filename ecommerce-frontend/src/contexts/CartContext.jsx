"use client"

import { createContext, useState, useContext, useEffect } from "react"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 }
  })

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex((item) => item.id === product.id)

      let newItems
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        newItems = [...prevCart.items]
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        }
      } else {
        // Add new item
        newItems = [...prevCart.items, { ...product, quantity }]
      }

      // Calculate new total
      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return { items: newItems, total: newTotal }
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) => (item.id === productId ? { ...item, quantity } : item))

      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return { items: newItems, total: newTotal }
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== productId)

      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return { items: newItems, total: newTotal }
    })
  }

  const clearCart = () => {
    setCart({ items: [], total: 0 })
  }

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

