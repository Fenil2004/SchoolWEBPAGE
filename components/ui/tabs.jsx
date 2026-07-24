import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className = "", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`inline-flex h-auto items-center justify-center rounded-xl bg-[#F1F5F9] p-1.5 text-slate-600 flex-wrap gap-1 ${className}`}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className = "", ...props }, ref) => {
  const hasCustomActiveBg = className.includes('data-[state=active]:bg-') || className.includes('data-[state=active]:bg[');
  const hasCustomActiveText = className.includes('data-[state=active]:text-') || className.includes('data-[state=active]:text[');
  
  const activeBgClass = hasCustomActiveBg ? '' : 'data-[state=active]:bg-white';
  const activeTextClass = hasCustomActiveText ? '' : 'data-[state=active]:text-[#0082AD]';

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0082AD] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeBgClass} ${activeTextClass} data-[state=active]:shadow-md cursor-pointer ${className}`}
      {...props}
    />
  );
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0082AD] focus-visible:ring-offset-2 ${className}`}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
