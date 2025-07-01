import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const FilterSidebar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  priceRange, 
  selectedPriceRange, 
  onPriceRangeChange,
  onClearFilters,
  isOpen,
  onClose
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(selectedPriceRange)

  const handlePriceChange = (type, value) => {
    const newRange = { ...localPriceRange, [type]: parseFloat(value) }
    setLocalPriceRange(newRange)
    onPriceRangeChange(newRange)
  }

  const sidebarClasses = `
    fixed lg:relative top-0 left-0 h-full w-80 lg:w-auto bg-white lg:bg-transparent 
    transform transition-transform duration-300 ease-in-out z-40
    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    lg:transform-none lg:block
  `

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <motion.div className={sidebarClasses}>
        <div className="p-6 lg:p-0 h-full overflow-y-auto">
          {/* Mobile header */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-display font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" icon="X" onClick={onClose} />
          </div>

          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-white lg:bg-warm-50 rounded-xl p-6">
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <ApperIcon name="Grid3X3" size={20} />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => onCategoryChange('')}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg transition-colors
                    ${selectedCategory === '' 
                      ? 'bg-primary-100 text-primary-800 font-medium' 
                      : 'hover:bg-warm-100'
                    }
                  `}
                >
                  All Products
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg transition-colors
                      ${selectedCategory === category 
                        ? 'bg-primary-100 text-primary-800 font-medium' 
                        : 'hover:bg-warm-100'
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white lg:bg-warm-50 rounded-xl p-6">
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <ApperIcon name="DollarSign" size={20} />
                Price Range
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={localPriceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      className="w-full px-3 py-2 border border-warm-200 rounded-lg focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={localPriceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      className="w-full px-3 py-2 border border-warm-200 rounded-lg focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory || selectedPriceRange.min > priceRange.min || selectedPriceRange.max < priceRange.max) && (
              <div className="bg-white lg:bg-warm-50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display font-semibold text-lg">Active Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-red-600"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory && (
                    <Badge variant="primary">
                      {selectedCategory}
                    </Badge>
                  )}
                  {(selectedPriceRange.min > priceRange.min || selectedPriceRange.max < priceRange.max) && (
                    <Badge variant="secondary">
                      ${selectedPriceRange.min} - ${selectedPriceRange.max}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default FilterSidebar