import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/products' },
        { label: 'Home Decor', href: '/products?category=Home%20Decor' },
        { label: 'Kitchenware', href: '/products?category=Kitchenware' },
        { label: 'Clothing', href: '/products?category=Clothing' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '#' },
        { label: 'Shipping Info', href: '#' },
        { label: 'Returns', href: '#' },
        { label: 'Size Guide', href: '#' }
      ]
    }
  ]

  const socialLinks = [
    { icon: 'Instagram', href: '#', label: 'Instagram' },
    { icon: 'Facebook', href: '#', label: 'Facebook' },
    { icon: 'Twitter', href: '#', label: 'Twitter' },
    { icon: 'Mail', href: '#', label: 'Email' }
  ]

  return (
    <footer className="bg-gradient-to-br from-warm-50 to-warm-100 border-t border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <ApperIcon name="Palette" size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Craftly
                </h3>
                <p className="text-sm text-gray-600 -mt-1">Handmade with love</p>
              </div>
            </Link>
            
            <p className="text-gray-600 mb-6">
              Discover unique handcrafted products made by talented artisans. Each piece tells a story and brings warmth to your home.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-soft hover:shadow-hover transition-all duration-200 hover:scale-105"
                  aria-label={social.label}
                >
                  <ApperIcon name={social.icon} size={18} className="text-primary-600" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h4 className="font-display font-semibold text-lg text-gray-900 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-warm-200">
          <div className="bg-gradient-primary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-display font-bold text-white mb-3">
              Stay Connected
            </h3>
            <p className="text-white/90 mb-6 max-w-md mx-auto">
              Get updates on new handcrafted products and exclusive offers from our artisans.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-white text-primary-700 font-medium rounded-lg hover:bg-warm-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-warm-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Craftly. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link to="#" className="hover:text-primary-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-primary-600 transition-colors">
              Terms of Service
            </Link>
            <div className="flex items-center gap-2">
              <ApperIcon name="Heart" size={16} className="text-accent-500" />
              <span>Made with love</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer