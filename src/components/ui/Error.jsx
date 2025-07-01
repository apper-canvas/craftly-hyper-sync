import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-full p-6 mb-6">
        <ApperIcon name="AlertTriangle" size={48} className="text-accent-500" />
      </div>
      
      <h3 className="text-2xl font-display font-semibold text-gray-800 mb-3">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="btn-primary flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" size={18} />
          Try Again
        </motion.button>
      )}
    </motion.div>
  )
}

export default Error