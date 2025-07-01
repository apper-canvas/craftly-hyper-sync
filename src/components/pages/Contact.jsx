import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const contactInfo = [
    {
      icon: 'Mail',
      title: 'Email Us',
      details: 'hello@craftly.com',
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Monday to Friday, 9AM to 6PM EST'
    },
    {
      icon: 'MapPin',
      title: 'Visit Us',
      details: '123 Artisan Street, Creative District, NY 10001',
      description: 'Our showroom is open by appointment'
    },
    {
      icon: 'Clock',
      title: 'Business Hours',
      details: 'Mon - Fri: 9AM - 6PM',
      description: 'Weekend support via email only'
    }
  ]

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-7 business days. Express shipping is available for 1-3 business days.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship worldwide! International shipping times vary by location, typically 7-14 business days.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused items in original condition. Custom items are non-returnable.'
    },
    {
      question: 'How do I become an artisan partner?',
      answer: 'We\'d love to work with you! Please email us at partners@craftly.com with your portfolio and product information.'
    },
    {
      question: 'Are all products really handmade?',
      answer: 'Yes! Every product is carefully vetted to ensure it meets our handmade standards and quality requirements.'
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('Message sent successfully! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Have a question about our products, need help with an order, or want to become an artisan partner? 
              We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={info.icon} size={32} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="font-medium text-primary-600 mb-2">
                  {info.details}
                </p>
                <p className="text-sm text-gray-600">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-card p-8"
            >
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  icon="Send"
                  loading={loading}
                  disabled={loading}
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Map/Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                <div className="text-center">
                  <ApperIcon name="MapPin" size={48} className="text-primary-600 mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                    Visit Our Showroom
                  </h3>
                  <p className="text-gray-600">
                    123 Artisan Street<br />
                    Creative District, NY 10001
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors">
                    <ApperIcon name="FileText" size={18} />
                    Shipping & Returns Policy
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors">
                    <ApperIcon name="Shield" size={18} />
                    Privacy Policy
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors">
                    <ApperIcon name="Users" size={18} />
                    Become an Artisan Partner
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors">
                    <ApperIcon name="Gift" size={18} />
                    Corporate Gifts
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-primary rounded-2xl p-6 text-white text-center">
                <h3 className="font-display font-semibold text-lg mb-4">
                  Follow Our Journey
                </h3>
                <p className="text-white/90 mb-6">
                  Stay updated with new artisan features and product launches
                </p>
                <div className="flex justify-center gap-4">
                  {['Instagram', 'Facebook', 'Twitter', 'Pinterest'].map(social => (
                    <button
                      key={social}
                      className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <ApperIcon name={social === 'Pinterest' ? 'Image' : social} size={18} />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our products and services
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-card p-6"
              >
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <ApperIcon name="HelpCircle" size={20} className="text-primary-500" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6">
              Didn't find what you were looking for?
            </p>
            <Button icon="MessageCircle">
              Ask a Question
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact