"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const revenueData = [
  { month: 'Jul', revenue: 12400, tickets: 89 },
  { month: 'Aug', revenue: 18200, tickets: 134 },
  { month: 'Sep', revenue: 24500, tickets: 187 },
  { month: 'Oct', revenue: 31200, tickets: 245 },
  { month: 'Nov', revenue: 28900, tickets: 221 },
  { month: 'Dec', revenue: 35600, tickets: 289 },
  { month: 'Jan', revenue: 42350, tickets: 347 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg p-3 shadow-xl">
        <p className="text-white font-medium mb-1">{label} 2026</p>
        <p className="text-purple-400 text-sm">
          Revenue: <span className="font-mono font-bold">${payload[0].value.toLocaleString()}</span>
        </p>
        <p className="text-gray-400 text-xs mt-1">
          {payload[0].payload.tickets} tickets sold
        </p>
      </div>
    )
  }
  return null
}

export function RevenueOverviewChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={revenueData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#6b7280" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#6b7280" 
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
