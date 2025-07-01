import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductGrid from '@/components/organisms/ProductGrid'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'
import wishlistService from '@/services/api/wishlistService'

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { clearWishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const loadWishlistProducts = async () => {
    try {
      setLoading(true)
      setError('')
      const products = await wishlistService.getAll()
      setWishlistProducts(products)
    } catch (err) {
      setError('Failed to load wishlist')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWishlistProducts()
  }, [])

  const handleClearWishlist = async () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        await wishlistService.clear()
        clearWishlist()
        setWishlistProducts([])
      } catch (err) {
        setError('Failed to clear wishlist')
      }
    }
  }

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await wishlistService.delete(productId)
      removeFromWishlist(productId)
      setWishlistProducts(prev => prev.filter(product => product.Id !== productId))
    } catch (err) {
      setError('Failed to remove item from wishlist')
    }
  }

  const handleAddAllToCart = () => {
    wishlistProducts.forEach(product => {
      if (product.inStock) {
        addToCart(product)
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-card">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <ApperIcon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={loadWishlistProducts} icon="RefreshCw">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!wishlistProducts || wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">
              My Wishlist
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Save your favorite products for later
            </p>
            
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <span>Home</span>
              <ApperIcon name="ChevronRight" size={14} />
              <span className="text-primary-600">Wishlist</span>
            </nav>
          </motion.div>

          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <ApperIcon name="Heart" size={64} className="text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8">
                Discover amazing handmade products and save your favorites here
              </p>
              <Link to="/products">
                <Button size="lg" icon="ShoppingBag">
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">
            My Wishlist
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
          </p>
          
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <span>Home</span>
            <ApperIcon name="ChevronRight" size={14} />
            <span className="text-primary-600">Wishlist</span>
          </nav>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              icon="ShoppingCart"
              onClick={handleAddAllToCart}
              disabled={wishlistProducts.every(p => !p.inStock)}
            >
              Add All to Cart
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon="Trash2"
              onClick={handleClearWishlist}
              className="text-red-600 hover:text-red-700 hover:border-red-300"
            >
              Clear Wishlist
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <Link to={`/products/${product.Id}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleRemoveFromWishlist(product.Id)
                        }}
                        className="bg-white/90 hover:bg-white shadow-sm"
                      >
                        <ApperIcon name="X" size={16} className="text-gray-600" />
                      </Button>
                    </div>
                    {!product.inStock && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          Out of Stock
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-2">
                      <div className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium inline-block">
                        {product.category}
                      </div>
                    </div>
                    
                    <h3 className="font-display text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                      
                      <Button
                        variant="primary"
                        size="sm"
                        icon="ShoppingCart"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        disabled={!product.inStock}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist