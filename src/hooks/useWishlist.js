import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem('craftly-wishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('craftly-wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.Id === product.Id)
      
      if (existingItem) {
        toast.info(`${product.title} is already in your wishlist`)
        return prevItems
      } else {
        toast.success(`Added ${product.title} to wishlist`)
        return [...prevItems, { ...product }]
      }
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => {
      const item = prevItems.find(item => item.Id === productId)
      if (item) {
        toast.info(`Removed ${item.title} from wishlist`)
      }
      return prevItems.filter(item => item.Id !== productId)
    })
  }

  const clearWishlist = () => {
    setWishlistItems([])
    toast.success('Wishlist cleared')
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.Id === productId)
  }

  const getWishlistCount = () => {
    return wishlistItems.length
  }

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount
  }
}