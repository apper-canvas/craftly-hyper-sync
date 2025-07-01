import ApperIcon from '@/components/ApperIcon'

const Badge = ({ 
  variant = 'primary', 
  size = 'sm', 
  children, 
  icon,
  className = '' 
}) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    accent: 'bg-accent-100 text-accent-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    sale: 'bg-gradient-accent text-white'
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  const badgeClasses = `
    inline-flex items-center font-medium rounded-full
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `
  
  return (
    <span className={badgeClasses}>
      {icon && (
        <ApperIcon name={icon} size={12} className="mr-1" />
      )}
      {children}
    </span>
  )
}

export default Badge