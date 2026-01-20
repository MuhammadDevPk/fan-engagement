"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { DollarSign, Ticket, Radio, Filter,  TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"

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
}

const MetricCard = ({ title, value, subValue, icon: Icon, trend, trendUp, index, color }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ translateY: -4 }}
      className="group"
    >
      <Card className="h-full relative overflow-hidden bg-white/5 backdrop-blur-md border-white/10 rounded-2xl hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-300">
        <div className={`absolute inset-0 border-2 border-transparent group-hover:${color} rounded-2xl transition-all duration-300 pointer-events-none opacity-20`} />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-300`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center text-xs font-medium ${trendUp ? 'text-green-400' : 'text-red-400'} bg-black/20 px-2 py-1 rounded-full`}>
              {trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <Activity className="w-3 h-3 mr-1" />}
              {trend}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl font-bold font-mono text-white tracking-tight">{value}</h3>
            <p className="text-sm text-gray-400 font-inter">{title}</p>
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
  const metrics = [
    {
      title: "Total Revenue",
      value: "$142,350",
      icon: DollarSign,
      trend: "23% vs last period",
      trendUp: true,
      color: "border-purple-500",
      subValue: (
        <div className="text-xs text-gray-400 flex flex-col gap-1">
            <div className="flex justify-between">
                <span>USD: $142,350</span>
                <span>58.5 ETH</span>
            </div>
             <div className="flex justify-between">
                <span>Other: 12,340 USDC</span>
            </div>
        </div>
      )
    },
    {
      title: "Total Tickets Sold",
      value: "2,847",
      icon: Ticket,
      trend: "156 this week",
      trendUp: true,
      color: "border-blue-500",
      subValue: (
        <div className="space-y-2 mt-1">
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
                <span>Used: 1,234</span>
                <span>Pending: 1,523</span>
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
      color: "border-emerald-500",
      subValue: (
        <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live: 3</span>
            </div>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                 <span>Upcoming: 5</span>
            </div>
        </div>
      )
    },
    {
      title: "Conversion Rate",
      value: "34.8%",
      icon: Filter,
      trend: "4.2% improvement",
      trendUp: true,
      color: "border-orange-500",
      subValue: (
          <div className="flex justify-between items-end text-xs text-gray-400 h-8">
              <div className="flex flex-col items-center gap-1 group/bar">
                  <div className="w-2 h-4 bg-white/10 rounded-t-sm group-hover/bar:bg-white/20 transition-colors"></div>
                  <span>Visits</span>
              </div>
              <div className="flex flex-col items-center gap-1 group/bar">
                   <div className="w-2 h-3 bg-white/10 rounded-t-sm group-hover/bar:bg-white/20 transition-colors"></div>
                  <span>Cart</span>
              </div>
               <div className="flex flex-col items-center gap-1 group/bar">
                   <div className="w-2 h-2 bg-orange-500 rounded-t-sm shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                  <span className="text-white">Sale</span>
              </div>
          </div>
      )
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard key={index} index={index} {...metric} />
      ))}
    </div>
  )
}
