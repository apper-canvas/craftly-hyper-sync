import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'
import { useCart } from '@/hooks/useCart'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, getCartCount, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form data
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  })

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const steps = [
    { number: 1, title: 'Shipping', icon: 'Truck' },
    { number: 2, title: 'Payment', icon: 'CreditCard' },
    { number: 3, title: 'Review', icon: 'CheckCircle' }
  ]

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setCurrentStep(2)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setCurrentStep(3)
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    clearCart()
    toast.success('Order placed successfully!')
    navigate('/')
    setLoading(false)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="ShoppingCart" size={64} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">Add some products to checkout</p>
          <Button onClick={() => navigate('/products')} icon="ArrowLeft">
            Continue Shopping
          </Button>
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
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Checkout
          </h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`
                    flex items-center justify-center w-12 h-12 rounded-full font-medium
                    ${currentStep >= step.number
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {currentStep > step.number ? (
                    <ApperIcon name="Check" size={20} />
                  ) : (
                    <ApperIcon name={step.icon} size={20} />
                  )}
                </div>
                <div className="ml-3 text-sm">
                  <p className={`font-medium ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'}`}>
                    Step {step.number}
                  </p>
                  <p className={currentStep >= step.number ? 'text-gray-700' : 'text-gray-400'}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block w-16 h-0.5 bg-gray-200 mx-8" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-card p-8"
              >
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Shipping Information
                </h2>
                
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      value={shippingData.firstName}
                      onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})}
                      required
                    />
                    <Input
                      label="Last Name"
                      value={shippingData.lastName}
                      onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      type="email"
                      label="Email"
                      value={shippingData.email}
                      onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
                      required
                    />
                    <Input
                      type="tel"
                      label="Phone"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                      required
                    />
                  </div>
                  
                  <Input
                    label="Address"
                    value={shippingData.address}
                    onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                    required
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Input
                      label="City"
                      value={shippingData.city}
                      onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                      required
                    />
                    <Input
                      label="State"
                      value={shippingData.state}
                      onChange={(e) => setShippingData({...shippingData, state: e.target.value})}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      value={shippingData.zipCode}
                      onChange={(e) => setShippingData({...shippingData, zipCode: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" icon="ArrowRight" iconPosition="right">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-card p-8"
              >
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Payment Information
                </h2>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <Input
                    label="Card Holder Name"
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                    required
                  />
                  
                  <Input
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={paymentData.expiryDate}
                      onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                      required
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      icon="ArrowLeft"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back to Shipping
                    </Button>
                    <Button type="submit" icon="ArrowRight" iconPosition="right">
                      Review Order
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Shipping Address */}
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">Shipping Address</h3>
                  <div className="text-gray-600">
                    <p>{shippingData.firstName} {shippingData.lastName}</p>
                    <p>{shippingData.address}</p>
                    <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                    <p>{shippingData.email}</p>
                    <p>{shippingData.phone}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(1)}
                    className="mt-4"
                  >
                    Edit
                  </Button>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">Payment Method</h3>
                  <div className="flex items-center gap-3">
                    <ApperIcon name="CreditCard" size={20} className="text-gray-400" />
                    <span className="text-gray-600">
                      **** **** **** {paymentData.cardNumber.slice(-4)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(2)}
                    className="mt-4"
                  >
                    Edit
                  </Button>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.productId} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    icon="ArrowLeft"
                    onClick={() => setCurrentStep(2)}
                  >
                    Back to Payment
                  </Button>
                  <Button
                    icon="Check"
                    onClick={handlePlaceOrder}
                    loading={loading}
                    disabled={loading}
                  >
                    Place Order
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-card p-6 sticky top-8"
            >
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Order Summary
              </h3>
              
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

              {/* Trust Signals */}
              <div className="border-t border-warm-200 pt-6">
                <div className="grid grid-cols-1 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Shield" size={18} className="text-green-500" />
                    <span>SSL encrypted checkout</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ApperIcon name="RotateCcw" size={18} className="text-blue-500" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Truck" size={18} className="text-primary-500" />
                    <span>Free shipping over $50</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout