import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductGrid from '@/components/organisms/ProductGrid'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import productService from '@/services/api/productService'

const Products = () => {
  const location = useLocation()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 200 })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  const categories = productService.getCategories()
  const priceRange = productService.getPriceRange()

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const category = params.get('category') || ''
    const search = params.get('search') || ''
    
    setSelectedCategory(category)
    setSearchQuery(search)
  }, [location.search])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')
      
      let result = []
      
      if (searchQuery) {
        result = await productService.search(searchQuery)
      } else if (selectedCategory) {
        result = await productService.getByCategory(selectedCategory)
      } else {
        result = await productService.getAll()
      }
      
      setProducts(result)
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [selectedCategory, searchQuery])

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= selectedPriceRange.min && 
      product.price <= selectedPriceRange.max
    )

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    setFilteredProducts(filtered)
  }, [products, selectedPriceRange, sortBy])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSearchQuery('')
    window.history.pushState({}, '', category ? `/products?category=${encodeURIComponent(category)}` : '/products')
  }

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range)
  }

  const handleClearFilters = () => {
    setSelectedCategory('')
    setSelectedPriceRange(priceRange)
    setSearchQuery('')
    setSortBy('featured')
    window.history.pushState({}, '', '/products')
  }

  const getPageTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`
    if (selectedCategory) return selectedCategory
    return 'All Products'
  }

  const getPageDescription = () => {
    if (searchQuery) return `Found ${filteredProducts.length} products matching "${searchQuery}"`
    if (selectedCategory) return `Handcrafted ${selectedCategory.toLowerCase()} made with love`
    return 'Discover our complete collection of handmade products'
  }

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' }
  ]

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">
            {getPageTitle()}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {getPageDescription()}
          </p>
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <span>Home</span>
            <ApperIcon name="ChevronRight" size={14} />
            <span>Products</span>
            {selectedCategory && (
              <>
                <ApperIcon name="ChevronRight" size={14} />
                <span className="text-primary-600">{selectedCategory}</span>
              </>
            )}
          </nav>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              icon="Filter"
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden"
            >
              Filters
            </Button>
            
            <p className="text-gray-600">
              {filteredProducts.length} products
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-warm-200 rounded-lg px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

<div className="flex gap-8">
          {/* Sidebar - handles both desktop and mobile responsive behavior */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              selectedPriceRange={selectedPriceRange}
              onPriceRangeChange={handlePriceRangeChange}
              onClearFilters={handleClearFilters}
              isOpen={false}
            />
          </div>

{/* Mobile Filter Overlay - Only render when open */}
          {isFilterOpen && (
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              selectedPriceRange={selectedPriceRange}
              onPriceRangeChange={handlePriceRangeChange}
              onClearFilters={handleClearFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          )}
          {/* Products Grid */}
          <div className="flex-1">
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              error={error}
              onRetry={loadProducts}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products