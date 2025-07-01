import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  type = 'products',
  title,
  message,
  actionText,
  actionLink = '/products'
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case 'cart':
        return {
          icon: 'ShoppingCart',
          title: 'Your cart is empty',
          message: 'Discover our beautiful handcrafted products and add some to your cart.',
          actionText: 'Shop Now'
        }
      case 'search':
        return {
          icon: 'Search',
          title: 'No products found',
          message: 'Try adjusting your search terms or browse our categories.',
          actionText: 'Browse All Products'
        }
      case 'category':
        return {
          icon: 'Package',
          title: 'No products in this category',
          message: 'Check back soon for new handcrafted items in this category.',
          actionText: 'View All Products'
        }
      default:
        return {
          icon: 'Package',
          title: title || 'No products available',
          message: message || 'Check back soon for new handcrafted items.',
          actionText: actionText || 'Explore Products'
        }
    }
  }

  const content = getEmptyContent()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-gradient-warm rounded-full p-8 mb-6">
        <ApperIcon name={content.icon} size={64} className="text-primary-600" />
      </div>
      
      <h3 className="text-3xl font-display font-semibold text-gray-800 mb-4">
        {content.title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md text-lg">
        {content.message}
      </p>
      
      <Link to={actionLink}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
        >
          <ApperIcon name="ArrowRight" size={20} />
          {content.actionText}
        </motion.button>
      </Link>
    </motion.div>
  )
}

export default Empty