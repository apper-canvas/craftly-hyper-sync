import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ onSearch, placeholder = "Search handmade products..." }) => {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    if (e.target.value.length > 2) {
      onSearch(e.target.value)
    }
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="relative flex-1 max-w-md"
      whileFocus={{ scale: 1.02 }}
    >
      <div className="relative">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full pl-12 pr-4 py-3 rounded-full border-2 transition-all duration-200
            ${isFocused 
              ? 'border-primary-500 shadow-lg bg-white' 
              : 'border-warm-200 bg-warm-50 hover:bg-white hover:border-primary-300'
            }
            focus:outline-none focus:border-primary-500
          `}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              onSearch('')
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" size={18} />
          </button>
        )}
      </div>
    </motion.form>
  )
}

export default SearchBar