import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'

const Header = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { getCartCount } = useCart()
  const { getWishlistCount } = useWishlist()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Shop All' },
    { path: '/wishlist', label: 'Wishlist' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 bg-white/95 backdrop-blur-md shadow-soft z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <ApperIcon name="Palette" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
                Craftly
              </h1>
              <p className="text-xs text-gray-600 -mt-1">Handmade with love</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative font-medium transition-colors duration-200
                  ${isActive(item.path) 
                    ? 'text-primary-700' 
                    : 'text-gray-700 hover:text-primary-600'
                  }
                `}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-6 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar onSearch={onSearch} />
          </div>

{/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search */}
            <Button 
              variant="ghost" 
              size="sm" 
              icon="Search"
              className="md:hidden"
            />
            
            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="relative">
                <ApperIcon name="Heart" size={20} />
                {getWishlistCount() > 0 && (
                  <div className="absolute -top-2 -right-2">
                    <Badge variant="accent" size="sm">
                      {getWishlistCount()}
                    </Badge>
                  </div>
                )}
              </Button>
            </Link>
            
            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ApperIcon name="ShoppingCart" size={20} />
                {getCartCount() > 0 && (
                  <div className="absolute -top-2 -right-2">
                    <Badge variant="accent" size="sm">
                      {getCartCount()}
                    </Badge>
                  </div>
                )}
              </Button>
            </Link>
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              icon={isMobileMenuOpen ? "X" : "Menu"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden border-t border-warm-200 py-4"
          >
            <nav className="space-y-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-lg font-medium transition-colors
                    ${isActive(item.path) 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'text-gray-700 hover:bg-warm-100'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header