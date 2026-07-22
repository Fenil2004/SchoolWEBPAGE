import * as React from "react"

const Button = React.forwardRef(({ className = "", variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]"

  const variants = {
    default: "bg-[#0082AD] text-white hover:bg-[#005F80] shadow-sm hover:shadow-md focus-visible:ring-[#0082AD]",
    secondary: "bg-[#7AA13B] text-white hover:bg-[#8DB843] shadow-sm hover:shadow-md focus-visible:ring-[#7AA13B]",
    destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm focus-visible:ring-red-600",
    outline: "border-2 border-[#0082AD] bg-transparent text-[#0082AD] hover:bg-[#E6F4F8] hover:text-[#005F80]",
    outlineSecondary: "border-2 border-[#7AA13B] bg-transparent text-[#7AA13B] hover:bg-[#F2F7E9] hover:text-[#5E802B]",
    ghost: "text-[#005F80] hover:bg-[#E6F4F8] hover:text-[#0082AD]",
    link: "text-[#0082AD] underline-offset-4 hover:underline hover:text-[#005F80] p-0 h-auto",
  }

  const sizes = {
    default: "h-10 px-5 py-2.5",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-12 rounded-xl px-7 text-base font-bold",
    icon: "h-10 w-10 p-0 rounded-lg",
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

