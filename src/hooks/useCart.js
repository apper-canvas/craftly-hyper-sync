import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useCart = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem('craftly-cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('craftly-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.Id)
      
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.productId === product.Id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        toast.success(`Updated ${product.title} quantity in cart`)
        return updatedItems
      } else {
        const newItem = {
          productId: product.Id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          quantity: quantity
        }
        toast.success(`Added ${product.title} to cart`)
        return [...prevItems, newItem]
      }
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.productId === productId)
      if (item) {
        toast.info(`Removed ${item.title} from cart`)
      }
      return prevItems.filter(item => item.productId !== productId)
    })
  }

  const clearCart = () => {
    setCartItems([])
    toast.success('Cart cleared')
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount
  }
}