'use client'

import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

const ShopProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <CartContext.Provider value={{ cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, ShopProvider }
