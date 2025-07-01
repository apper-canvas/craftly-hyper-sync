class WishlistService {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    const savedWishlist = localStorage.getItem('craftly-wishlist')
    return savedWishlist ? JSON.parse(savedWishlist) : []
  }

  async create(product) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const savedWishlist = localStorage.getItem('craftly-wishlist')
    const wishlistItems = savedWishlist ? JSON.parse(savedWishlist) : []
    
    const existingItem = wishlistItems.find(item => item.Id === product.Id)
    if (existingItem) {
      throw new Error('Product already in wishlist')
    }
    
    const updatedWishlist = [...wishlistItems, { ...product }]
    localStorage.setItem('craftly-wishlist', JSON.stringify(updatedWishlist))
    return { ...product }
  }

  async delete(productId) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const savedWishlist = localStorage.getItem('craftly-wishlist')
    const wishlistItems = savedWishlist ? JSON.parse(savedWishlist) : []
    
    const updatedWishlist = wishlistItems.filter(item => item.Id !== parseInt(productId))
    localStorage.setItem('craftly-wishlist', JSON.stringify(updatedWishlist))
    return true
  }

  async clear() {
    await new Promise(resolve => setTimeout(resolve, 100))
    localStorage.removeItem('craftly-wishlist')
    return true
  }
}

export default new WishlistService()