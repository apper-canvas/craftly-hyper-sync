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
    console.log('addToCart called:', { 
      productId: product.Id, 
      title: product.title, 
      quantity 
    })
    
    setCartItems(prevItems => {
      console.log('Current cart items before update:', prevItems)
      const existingItem = prevItems.find(item => item.productId === product.Id)
      
      if (existingItem) {
        console.log('Found existing item:', existingItem)
        const updatedItems = prevItems.map(item =>
          item.productId === product.Id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        console.log('Updated cart items:', updatedItems)
        toast.success(`Updated ${product.title} quantity to ${existingItem.quantity + quantity}`)
        return updatedItems
      } else {
        const newItem = {
          productId: product.Id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          quantity: quantity
        }
        console.log('Adding new item:', newItem)
        const newItems = [...prevItems, newItem]
        console.log('New cart items:', newItems)
        toast.success(`Added ${product.title} to cart`)
        return newItems
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