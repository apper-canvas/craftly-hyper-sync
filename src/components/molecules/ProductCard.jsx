import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWishlist(product.Id)) {
      removeFromWishlist(product.Id)
    } else {
      addToWishlist(product)
    }
  }
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={`/products/${product.Id}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300">
          <div className="relative overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
<div className="absolute top-4 left-4">
              <Badge variant="sale" icon="Sparkles">
                Handmade
              </Badge>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWishlistToggle}
                className="bg-white/90 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ApperIcon 
                  name="Heart" 
                  size={16} 
                  className={isInWishlist(product.Id) ? 'text-red-500 fill-red-500' : 'text-gray-600'} 
                />
              </Button>
              {!product.inStock && (
                <Badge variant="error">
                  Out of Stock
                </Badge>
              )}
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-6">
            <div className="mb-2">
              <Badge variant="secondary" size="sm">
                {product.category}
              </Badge>
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
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleWishlistToggle}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <ApperIcon 
                    name="Heart" 
                    size={16} 
                    className={isInWishlist(product.Id) ? 'text-red-500 fill-red-500' : 'text-gray-600'} 
                  />
                </Button>
                
                <Button
                  variant="primary"
                  size="sm"
                  icon="ShoppingCart"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard