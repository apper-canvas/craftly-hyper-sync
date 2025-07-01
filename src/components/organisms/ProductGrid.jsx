import { motion } from 'framer-motion'
import ProductCard from '@/components/molecules/ProductCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const ProductGrid = ({ 
  products, 
  loading, 
  error, 
  onRetry,
  title = "Products"
}) => {
  if (loading) {
    return <Loading type="products" />
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />
  }

  if (!products || products.length === 0) {
    return <Empty type="products" />
  }

  return (
    <div>
      {title && (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-display font-bold text-gray-900 mb-8"
        >
          {title}
        </motion.h2>
      )}
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ProductGrid