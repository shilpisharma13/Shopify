'use client'

import { createCart, addLineToCart } from '@/utils/shopify'
import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

const ShopProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [cartLoading, setCartLoading] = useState(false)
  const [checkoutURL, setCheckoutURL] = useState('')
  const [cartId, setCartId] = useState('')

  useEffect(() => {
    if (localStorage.cart_id) {
      const cartObject = JSON.parse(localStorage.cart_id)

      if (cartObject[0].id) {
        setCart([cartObject[0]])
      } else if (cartObject[0].length > 0) {
        setCart(...[cartObject[0]])
      }
      setCartId(cartObject[1].id)
      setCheckoutURL(cartObject[1].checkoutURL)
    }
  }, [])

  const addToCart = async (addedItem) => {
    const newItem = { ...addedItem }
   
    setCartOpen(true)

    if (cart.length === 0) {
      setCart([newItem])

      const savedCart = await createCart(
        addedItem.id,
        addedItem.variantQuantity
      )
      
      setCartId(savedCart?.cartCreate.cart.id)
      setCheckoutURL(savedCart?.cartCreate.cart.checkoutUrl)
     
      localStorage.setItem(
        'cart_id',
        JSON.stringify([newItem, savedCart.cartCreate.cart])
      )
    } else {
      let newCart = []
      let added = false

      cart.map((item) => {
        if (item.id === newItem.id) {
          item.variantQuantity++
          newCart = [...cart]
          added = true
        }
      })

      if (!added) {
        newCart = [...cart, newItem]
      }
     
      setCart(newCart)
      
      const newSavedCart = await addLineToCart(cartId, newItem)
      localStorage.setItem(
        'cart_id',
        JSON.stringify([newCart, newSavedCart.cartLinesAdd.cart])
      )
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        cart,
        cartLoading,
        addToCart,
        checkoutURL,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useShopContext = () => useContext(CartContext)
export { useShopContext, ShopProvider }
