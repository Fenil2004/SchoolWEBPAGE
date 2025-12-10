import * as React from "react"

const Button = React.forwardRef(({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-[#0A94B8] text-white hover:bg-[#056C8C] focus-visible:ring-[#0A94B8]",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
    outline: "border border-[#0A94B8] bg-white hover:bg-[#E8F1F4] text-[#056C8C]",
    secondary: "bg-[#76A440] text-white hover:bg-[#8FC85C] focus-visible:ring-[#76A440]",
    ghost: "hover:bg-[#E8F1F4] text-[#056C8C]",
    link: "text-[#0A94B8] underline-offset-4 hover:underline hover:text-[#056C8C]",
  }
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }
  
  const variantClass = variants[variant] || variants.default
  const sizeClass = sizes[size] || sizes.default
  
  return (
    <button
      className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
