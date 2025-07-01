import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { useCart } from '@/hooks/useCart'

const CartItem = ({ item, index }) => {
  const { updateQuantity, removeFromCart } = useCart()

  console.log('CartItem render:', { 
    productId: item.productId, 
    title: item.title, 
    quantity: item.quantity,
    index: index 
  })

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return
    console.log('Updating quantity:', { productId: item.productId, newQuantity })
    updateQuantity(item.productId, newQuantity)
  }

  const handleRemove = () => {
    console.log('Removing item:', { productId: item.productId, title: item.title })
    removeFromCart(item.productId)
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-card"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
        <p className="text-lg font-display font-semibold text-primary-600">
          ${item.price}
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center border-2 border-warm-200 rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-2 hover:bg-warm-100 transition-colors"
          >
            <ApperIcon name="Minus" size={16} />
          </button>
          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 hover:bg-warm-100 transition-colors"
          >
            <ApperIcon name="Plus" size={16} />
          </button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          icon="Trash2"
          onClick={handleRemove}
          className="text-red-600 hover:bg-red-50"
        />
      </div>
      
      <div className="text-right">
        <p className="text-lg font-display font-bold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </motion.div>
  )
}

export default CartItem