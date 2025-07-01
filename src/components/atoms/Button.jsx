import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gradient-primary text-white shadow-soft hover:shadow-hover transform hover:scale-105',
    secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200',
    outline: 'border-2 border-primary-500 text-primary-700 hover:bg-primary-50',
    ghost: 'text-primary-700 hover:bg-primary-50',
    accent: 'bg-gradient-accent text-white shadow-soft hover:shadow-hover transform hover:scale-105'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon name={icon} size={16} className="mr-2" />
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} size={16} className="ml-2" />
      )}
    </motion.button>
  )
}

export default Button