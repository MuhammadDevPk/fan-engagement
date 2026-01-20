"use client"

import { motion } from "framer-motion"
import { Calendar, Ticket, DollarSign, Activity, Radio, TrendingUp, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

// Types
interface StatCardProps {
  title: string
  value: string | number
  subValue?: string
  icon: any
  trend?: string
  trendUp?: boolean
  description?: string
  index: number
  type?: 'default' | 'progress' | 'chart' | 'live' | 'conversion'
  progress?: number
  chartData?: number[]
}

const StatCard = ({ title, value, subValue, icon: Icon, trend, trendUp = true, description, index, type = 'default', progress }: StatCardProps) => {
  const [count, setCount] = useState(0)
  
  // Parse numeric value for animation if possible
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value
  const isTargetNumeric = !isNaN(numericValue)

  useEffect(() => {
    if (isTargetNumeric) {
      const duration = 2000
      const steps = 60
      const stepValue = numericValue / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += stepValue
        if (current >= numericValue) {
          setCount(numericValue)
          clearInterval(timer)
        } else {
          setCount(current)
        }
      }, duration / steps)
      
      return () => clearInterval(timer)
    }
  }, [numericValue, isTargetNumeric])

  // Display value formatting
  const displayValue = isTargetNumeric ? 
    (typeof value === 'string' && value.includes('$') ? `$${count.toLocaleString(undefined, {maximumFractionDigits: 0})}` : 
     typeof value === 'string' && value.includes('%') ? `${count.toFixed(1)}%` : 
     Math.floor(count).toLocaleString()) 
    : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ translateY: -4 }}
      className="group"
    >
      <Card className="h-full relative overflow-hidden bg-white/5 backdrop-blur-[20px] border-white/10 rounded-2xl hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-300">
        {/* Gradient border effect on hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-primary/20 rounded-2xl transition-all duration-300 pointer-events-none" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-brand-start/20 to-brand-end/20 group-hover:from-brand-start/30 group-hover:to-brand-end/30 transition-all duration-300">
              <Icon className="w-6 h-6 text-brand-text-accent" />
            </div>
            {trend && (
              <div className={`flex items-center text-xs font-medium ${trendUp ? 'text-green-400' : 'text-red-400'} bg-black/20 px-2 py-1 rounded-full`}>
                {trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <Activity className="w-3 h-3 mr-1" />}
                {trend}
              </div>
            )}
            {type === 'live' && (
              <div className="flex items-center text-xs font-medium text-red-500 bg-red-500/10 px-2 py-1 rounded-full animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                LIVE
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl font-bold font-mono text-white tracking-tight">
              {type === 'default' || type === 'progress' || type === 'live' || type === 'conversion' || type === 'chart' ? (
                // If it's the ETH card or specifically formatted, we might want to handle it differently, 
                // but for now simple numeric animation or direct string fallbacks work.
                // Special handling for Crypto card to show exact string if not purely numeric adaptable
                 value.toString().includes('ETH') ? value : displayValue
              ) : value}
            </h3>
            <p className="text-sm text-gray-400 font-inter">{title}</p>
          </div>

          {description && (
            <p className="mt-4 text-xs text-gray-500 border-t border-white/5 pt-3">
              {description}
            </p>
          )}

          {subValue && (
            <div className="mt-2 text-sm text-gray-400">
              {subValue}
            </div>
          )}

          {type === 'progress' && progress !== undefined && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-brand-start to-brand-end rounded-full"
                />
              </div>
            </div>
          )}
          
          {type === 'conversion' && (
             <div className="absolute right-4 bottom-4 opacity-20">
               <Activity className="w-16 h-16" />
             </div>
          )}

          {type === 'chart' && (
             <div className="absolute right-0 bottom-0 opacity-10">
               <Activity className="w-24 h-12" />
             </div>
          )}

        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function AnalyticsOverview() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const cardWidth = container.clientWidth * 0.85 // 85vw
    const index = Math.round(container.scrollLeft / cardWidth)
    setActiveIndex(Math.min(Math.max(0, index), 5)) // Clamp between 0 and 5
  }

  const cards = [
    {
      title: "Total Events",
      value: "12",
      icon: Calendar,
      trend: "12% from last mo",
      trendUp: true,
      description: "Total scheduled events",
      type: 'chart' as const
    },
    {
      title: "Tickets Sold",
      value: "847",
      icon: Ticket,
      trend: "23%",
      trendUp: true,
      type: 'progress' as const,
      progress: 84.7,
      description: "847/1000 Total Capacity"
    },
    {
      title: "Revenue (USD)",
      value: "$42,350",
      icon: DollarSign,
      subValue: "+$5,230 this week",
      type: 'chart' as const
    },
    {
      title: "Revenue (Crypto)",
      value: "18.5 ETH",
      icon: Activity, // Fallback for Ethereum logo if not available, or use a custom SVG
      subValue: "≈ $42,350 USD",
      trend: "Success",
      trendUp: true
    },
    {
      title: "Active Events",
      value: "5",
      icon: Radio,
      type: 'live' as const,
      description: "View all active events"
    },
    {
      title: "Conversion Rate",
      value: "34.5%",
      icon: ArrowUpRight,
      trend: "+4.2% avg",
      trendUp: true,
      type: 'conversion' as const
    }
  ]

  return (
    <>
      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden">
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide"
          onScroll={handleScroll}
        >
          {cards.map((card, index) => (
            <div key={index} className="min-w-[85vw] snap-center">
              <StatCard {...card} index={index} />
            </div>
          ))}
        </div>
        
        {/* Swipe Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {cards.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-5 bg-gradient-to-r from-brand-start to-brand-end' : 'w-1.5 bg-white/20'}`} 
            />
          ))}
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <StatCard key={index} {...card} index={index} />
        ))}
      </div>
    </>
  )
}
