"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { DollarSign, Ticket, Radio, Filter, TrendingUp, Activity, Clock, Wallet } from "lucide-react"
import { toast } from "sonner"

// Types for our cards
interface MetricCardProps {
  title: string
  value: string
  subValue?: React.ReactNode
  icon: any
  trend: string
  trendUp: boolean
  index: number
  color: string
  onClick?: () => void
}

const MetricCard = ({ title, value, subValue, icon: Icon, trend, trendUp, index, color, onClick }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ translateY: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="h-full relative overflow-hidden bg-white/5 backdrop-blur-md border-white/10 rounded-2xl hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 hover:border-white/20">
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
        </div>
        
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center text-xs font-medium ${trendUp ? 'text-green-400' : 'text-red-400'} bg-black/20 px-2.5 py-1 rounded-full`}>
              {trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <Activity className="w-3 h-3 mr-1" />}
              {trend}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl font-bold font-mono text-white tracking-tight">{value}</h3>
            <p className="text-sm text-gray-400">{title}</p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5">
           {subValue}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function MetricsCards() {
  const handleCardClick = (title: string) => {
    toast.info(`Opening ${title} details`, {
      description: "Loading detailed analytics..."
    })
  }

  const metrics = [
    {
      title: "Total Revenue",
      value: "$142,350",
      icon: DollarSign,
      trend: "+23% vs last period",
      trendUp: true,
      color: "from-violet-500 to-purple-600",
      subValue: (
        <div className="text-xs text-gray-400 flex flex-col gap-1.5">
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Crypto
            </span>
            <span className="text-white font-mono">58.5 ETH</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Stablecoins
            </span>
            <span className="text-white font-mono">12,340 USDC</span>
          </div>
        </div>
      )
    },
    {
      title: "Total Tickets Sold",
      value: "2,847",
      icon: Ticket,
      trend: "+156 this week",
      trendUp: true,
      color: "from-blue-500 to-cyan-600",
      subValue: (
        <div className="space-y-2 mt-1">
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '71%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>✓ Used: <span className="text-white">2,024</span></span>
            <span>⏳ Pending: <span className="text-white">823</span></span>
          </div>
        </div>
      )
    },
    {
      title: "Active Events",
      value: "8",
      icon: Radio,
      trend: "3 live now",
      trendUp: true,
      color: "from-emerald-500 to-green-600",
      subValue: (
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live: <span className="text-white font-medium">3</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Upcoming: <span className="text-white font-medium">5</span></span>
          </div>
        </div>
      )
    },
    {
      title: "Conversion Rate",
      value: "34.8%",
      icon: Filter,
      trend: "+4.2% improvement",
      trendUp: true,
      color: "from-orange-500 to-amber-600",
      subValue: (
        <div className="flex justify-between items-end text-xs text-gray-400 h-10">
          <div className="flex flex-col items-center gap-1 group/bar">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-4 bg-white/10 rounded-t group-hover/bar:bg-white/20 transition-colors"
            />
            <span>Visits</span>
          </div>
          <div className="flex flex-col items-center gap-1 group/bar">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 14 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-4 bg-white/10 rounded-t group-hover/bar:bg-white/20 transition-colors"
            />
            <span>Cart</span>
          </div>
          <div className="flex flex-col items-center gap-1 group/bar">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 10 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-4 bg-gradient-to-t from-orange-500 to-amber-400 rounded-t shadow-[0_0_10px_rgba(249,115,22,0.5)]"
            />
            <span className="text-white">Sale</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-50">
            <div className="w-4 h-[6px] border border-dashed border-gray-500 rounded-t" />
            <span>Avg</span>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard 
          key={index} 
          index={index} 
          {...metric} 
          onClick={() => handleCardClick(metric.title)}
        />
      ))}
    </div>
  )
}
