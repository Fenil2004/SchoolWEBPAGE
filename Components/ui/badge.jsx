import * as React from "react"

const Badge = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  const variants = {
    default: "border-transparent bg-[#0A94B8] text-white hover:bg-[#056C8C]",
    secondary: "border-transparent bg-[#E8F1F4] text-[#056C8C] hover:bg-[#D9EEF4]",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
    outline: "text-[#056C8C] border-[#0A94B8]",
    success: "border-transparent bg-[#76A440] text-white hover:bg-[#8FC85C]",
    warning: "border-transparent bg-yellow-600 text-white hover:bg-yellow-700",
  }
  
  const variantClass = variants[variant] || variants.default
  
  return (
    <div
      ref={ref}
      className={`${baseStyles} ${variantClass} ${className}`}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
