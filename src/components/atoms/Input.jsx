import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  type = 'text',
  label,
  placeholder,
  error,
  icon,
  iconPosition = 'left',
  className = '',
  ...props 
}, ref) => {
  const inputClasses = `
    input-field
    ${icon && iconPosition === 'left' ? 'pl-12' : ''}
    ${icon && iconPosition === 'right' ? 'pr-12' : ''}
    ${error ? 'border-red-500 focus:border-red-500' : ''}
    ${className}
  `
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={inputClasses}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <ApperIcon name="AlertCircle" size={14} />
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input