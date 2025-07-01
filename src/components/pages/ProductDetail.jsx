import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { useCart } from '@/hooks/useCart'
import productService from '@/services/api/productService'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const loadProduct = async () => {
    try {
      setLoading(true)
      setError('')
      const productData = await productService.getById(id)
      setProduct(productData)
      
      // Load related products from same category
      const related = await productService.getByCategory(productData.category)
      setRelatedProducts(related.filter(p => p.Id !== productData.Id).slice(0, 4))
    } catch (err) {
      setError('Product not found')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading type="detail" />
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadProduct} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <ApperIcon name="ChevronRight" size={14} />
          <Link to="/products" className="hover:text-primary-600">Products</Link>
          <ApperIcon name="ChevronRight" size={14} />
          <Link 
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-primary-600"
          >
            {product.category}
          </Link>
          <ApperIcon name="ChevronRight" size={14} />
          <span className="text-primary-600 truncate">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-card">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`
                      aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors
                      ${selectedImage === index 
                        ? 'border-primary-500' 
                        : 'border-warm-200 hover:border-primary-300'
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Badge variant="secondary" size="md" className="mb-4">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ${product.price}
                </span>
                <Badge variant="sale" icon="Sparkles">
                  Handmade
                </Badge>
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <ApperIcon 
                name={product.inStock ? "CheckCircle" : "XCircle"} 
                size={20} 
                className={product.inStock ? "text-green-500" : "text-red-500"} 
              />
              <span className={`font-medium ${product.inStock ? "text-green-700" : "text-red-700"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border-2 border-warm-200 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-3 hover:bg-warm-100 transition-colors"
                    >
                      <ApperIcon name="Minus" size={16} />
                    </button>
                    <span className="px-6 py-3 font-medium min-w-[4rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-3 hover:bg-warm-100 transition-colors"
                    >
                      <ApperIcon name="Plus" size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    icon="ShoppingCart"
                    onClick={handleAddToCart}
                    className="flex-1"
                  >
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    icon="Heart"
                    className="sm:w-auto"
                  >
                    Save for Later
                  </Button>
                </div>
              </div>
            )}

            {/* Product Features */}
            <div className="bg-warm-50 rounded-xl p-6 space-y-4">
              <h3 className="font-display font-semibold text-lg text-gray-900">
                Product Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <ApperIcon name="Heart" size={18} className="text-accent-500" />
                  <span className="text-gray-700">Handcrafted with love</span>
                </div>
                <div className="flex items-center gap-3">
                  <ApperIcon name="Leaf" size={18} className="text-green-500" />
                  <span className="text-gray-700">Eco-friendly materials</span>
                </div>
                <div className="flex items-center gap-3">
                  <ApperIcon name="Award" size={18} className="text-primary-500" />
                  <span className="text-gray-700">Premium quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <ApperIcon name="Users" size={18} className="text-secondary-500" />
                  <span className="text-gray-700">Supports artisans</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-warm-200 pt-16"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-display font-bold text-gray-900">
                Related Products
              </h2>
              <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
                <Button variant="outline" icon="ArrowRight" iconPosition="right">
                  View All {product.category}
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/products/${relatedProduct.Id}`}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 group">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                          {relatedProduct.title}
                        </h3>
                        <p className="text-lg font-display font-semibold text-primary-600">
                          ${relatedProduct.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}

export default ProductDetail