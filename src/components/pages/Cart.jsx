import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CartItem from '@/components/molecules/CartItem'
import Button from '@/components/atoms/Button'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { useCart } from '@/hooks/useCart'

const Cart = () => {
  const { cartItems, getCartTotal, getCartCount, clearCart } = useCart()

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Empty type="cart" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              icon="Trash2"
              onClick={clearCart}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Clear Cart
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
className="space-y-4"
            >
              {cartItems.map((item, index) => {
                console.log('Rendering cart item:', { 
                  productId: item.productId, 
                  title: item.title, 
                  quantity: item.quantity,
                  index 
                })
                return (
                  <motion.div
                    key={`cart-item-${item.productId}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CartItem item={item} index={index} />
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getCartCount()} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <hr className="border-warm-200" />
                
                <div className="flex justify-between text-xl font-display font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Free shipping banner */}
              {subtotal < 50 && (
                <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-accent-700">
                    <ApperIcon name="Truck" size={18} />
                    <span className="text-sm font-medium">
                      Add ${(50 - subtotal).toFixed(2)} for free shipping!
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Link to="/checkout" className="block">
                  <Button size="lg" icon="CreditCard" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Link to="/products" className="block">
                  <Button variant="outline" size="lg" icon="ArrowLeft" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="mt-6 pt-6 border-t border-warm-200">
                <div className="grid grid-cols-2 gap-4 text-center text-sm text-gray-600">
                  <div className="flex flex-col items-center gap-2">
                    <ApperIcon name="Shield" size={20} className="text-green-500" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ApperIcon name="RotateCcw" size={20} className="text-blue-500" />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Cart