import { motion } from 'framer-motion'

const Loading = ({ type = 'products' }) => {
  const renderProductSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl overflow-hidden shadow-card"
        >
          <div className="h-64 bg-gradient-to-r from-warm-100 to-warm-200 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gradient-to-r from-warm-100 to-warm-200 rounded animate-pulse" />
            <div className="h-3 bg-gradient-to-r from-warm-100 to-warm-200 rounded w-3/4 animate-pulse" />
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gradient-to-r from-warm-100 to-warm-200 rounded w-20 animate-pulse" />
              <div className="h-10 bg-gradient-to-r from-warm-100 to-warm-200 rounded w-24 animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderDetailSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="h-96 bg-gradient-to-r from-warm-100 to-warm-200 rounded-xl animate-pulse" />
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gradient-to-r from-warm-100 to-warm-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="h-8 bg-gradient-to-r from-warm-100 to-warm-200 rounded animate-pulse" />
        <div className="h-6 bg-gradient-to-r from-warm-100 to-warm-200 rounded w-32 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-warm-100 to-warm-200 rounded animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-warm-100 to-warm-200 rounded animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-warm-100 to-warm-200 rounded w-3/4 animate-pulse" />
        </div>
        <div className="h-12 bg-gradient-to-r from-warm-100 to-warm-200 rounded-lg animate-pulse" />
      </div>
    </div>
  )

  const renderCartSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-card"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-warm-100 to-warm-200 rounded-lg animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gradient-to-r from-warm-100 to-warm-200 rounded animate-pulse" />
            <div className="h-3 bg-gradient-to-r from-warm-100 to-warm-200 rounded w-1/2 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-8 bg-gradient-to-r from-warm-100 to-warm-200 rounded w-20 animate-pulse" />
            <div className="h-6 bg-gradient-to-r from-warm-100 to-warm-200 rounded w-16 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="w-full">
      {type === 'products' && renderProductSkeleton()}
      {type === 'detail' && renderDetailSkeleton()}
      {type === 'cart' && renderCartSkeleton()}
    </div>
  )
}

export default Loading