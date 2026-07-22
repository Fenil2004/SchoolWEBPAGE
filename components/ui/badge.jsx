import * as React from "react"

const Badge = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  const variants = {
    default: "border-transparent bg-[#0082AD] text-white hover:bg-[#005F80]",
    secondary: "border-transparent bg-[#E6F4F8] text-[#005F80] hover:bg-[#D4ECF3]",
    destructive: "border-transparent bg-rose-600 text-white hover:bg-rose-700",
    outline: "text-[#0082AD] border-[#0082AD]",
    success: "border-transparent bg-[#7AA13B] text-white hover:bg-[#8DB843]",
    warning: "border-transparent bg-amber-500 text-white hover:bg-amber-600",
    greenTint: "border-transparent bg-[#F2F7E9] text-[#5E802B]",
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

