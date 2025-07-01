import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductGrid from "@/components/organisms/ProductGrid";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import productService from "@/services/api/productService";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true)
      setError('')
      const products = await productService.getFeatured()
      setFeaturedProducts(products)
    } catch (err) {
      setError('Failed to load featured products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const categories = [
    { name: 'Home Decor', icon: 'Home', color: 'primary' },
    { name: 'Kitchenware', icon: 'ChefHat', color: 'secondary' },
    { name: 'Clothing', icon: 'Shirt', color: 'accent' },
    { name: 'Bath & Body', icon: 'Sparkles', color: 'primary' }
  ]

  const features = [
    {
      icon: 'Heart',
      title: 'Handcrafted with Love',
      description: 'Each product is carefully made by skilled artisans who pour their heart into every piece.'
    },
    {
      icon: 'Leaf',
      title: 'Sustainable Materials',
      description: 'We use eco-friendly, sustainable materials to create beautiful products that are kind to the earth.'
    },
    {
      icon: 'Users',
      title: 'Support Artisans',
      description: 'Your purchase directly supports independent artisans and helps preserve traditional crafts.'
    },
    {
      icon: 'Gift',
      title: 'Unique & Special',
      description: 'Find one-of-a-kind pieces that tell a story and make perfect gifts for your loved ones.'
    }
  ]

  return (
    <div>
{/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-warm-50 via-white to-warm-100 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23D2691E%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="sale" size="md" icon="Sparkles" className="mb-6">
                Handmade Marketplace
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 mb-6 leading-tight">
                Beautiful
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Handcrafted
                </span>
                Products
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover unique, handmade treasures crafted with love by talented artisans. 
                Each piece tells a story and brings warmth to your home.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" icon="ShoppingBag" className="w-full sm:w-auto">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" icon="Info" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop"
                  alt="Handcrafted products"
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-hover">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                      <ApperIcon name="Award" size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-2xl text-gray-900">500+</p>
                      <p className="text-sm text-gray-600">Happy Customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated collections of handmade products
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="block bg-white rounded-2xl p-8 text-center shadow-card hover:shadow-hover transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 bg-gradient-${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <ApperIcon name={category.icon} size={32} className="text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Handcrafted {category.name.toLowerCase()}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most loved handcrafted pieces
            </p>
          </motion.div>
          
          <ProductGrid 
            products={featuredProducts.slice(0, 4)}
            loading={loading}
            error={error}
            onRetry={loadFeaturedProducts}
          />
          
          {!loading && !error && featuredProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/products">
                <Button size="lg" variant="outline" icon="ArrowRight">
                  View All Products
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose Craftly?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every purchase supports artisans and celebrates the beauty of handmade craftsmanship
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name={feature.icon} size={32} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Ready to Find Something Special?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers who have found the perfect handcrafted pieces for their homes.
            </p>
            <Link to="/products">
              <Button size="lg" variant="secondary" icon="ShoppingBag" className="bg-white text-primary-700 hover:bg-warm-50">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home