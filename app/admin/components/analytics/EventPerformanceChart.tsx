"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { toast } from "sonner"

const eventPerformanceData = [
  { name: 'Champions League Final', revenue: 100000, tickets: 500, trend: 'up', change: '+15%', color: '#ef4444' },
  { name: 'Electronic Music Festival', revenue: 164383, tickets: 1580, trend: 'up', change: '+28%', color: '#8b5cf6' },
  { name: 'NFT Art Exhibition', revenue: 12510, tickets: 156, trend: 'up', change: '+8%', color: '#f97316' },
  { name: 'Jazz Night Under Stars', revenue: 11700, tickets: 234, trend: 'down', change: '-3%', color: '#3b82f6' },
  { name: 'Modern Art Gallery', revenue: 11250, tickets: 150, trend: 'up', change: '+5%', color: '#22c55e' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg p-3 shadow-xl">
        <p className="text-white font-medium mb-1 text-sm">{label}</p>
        <p className="text-purple-400 text-sm">
          Revenue: <span className="font-mono font-bold">${payload[0].value.toLocaleString()}</span>
        </p>
        <p className="text-gray-400 text-xs mt-1">
          {payload[0].payload.tickets} tickets sold
        </p>
        <p className={`text-xs mt-1 flex items-center gap-1 ${payload[0].payload.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {payload[0].payload.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {payload[0].payload.change} vs previous period
        </p>
      </div>
    )
  }
  return null
}

export function EventPerformanceChart() {
  const [sortBy, setSortBy] = useState<'revenue' | 'tickets'>('revenue')
  
  const sortedData = [...eventPerformanceData].sort((a, b) => 
    sortBy === 'revenue' ? b.revenue - a.revenue : b.tickets - a.tickets
  )

  const handleViewEvent = (eventName: string) => {
    toast.info(`Opening ${eventName}`, {
      description: "Navigating to event details..."
    })
  }

  return (
    <div className="col-span-12 lg:col-span-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 min-h-[300px]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-white">Event Performance</h3>
        <div className="flex bg-black/20 p-0.5 rounded-lg">
          <button
            onClick={() => setSortBy('revenue')}
            className={`px-2 py-1 text-xs rounded transition-all ${sortBy === 'revenue' ? 'bg-violet-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Revenue
          </button>
          <button
            onClick={() => setSortBy('tickets')}
            className={`px-2 py-1 text-xs rounded transition-all ${sortBy === 'tickets' ? 'bg-violet-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Tickets
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-4">Top performing events by {sortBy}</p>
      
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
            <XAxis 
              type="number" 
              stroke="#6b7280" 
              fontSize={10}
              tickFormatter={(value) => sortBy === 'revenue' ? `$${(value / 1000).toFixed(0)}k` : value.toString()}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              stroke="#6b7280" 
              fontSize={10}
              width={100}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.length > 15 ? value.substring(0, 12) + '...' : value}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            <Bar dataKey={sortBy} radius={[0, 4, 4, 0]} animationDuration={300}>
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
        <div className="text-center p-2 bg-white/5 rounded-lg">
          <div className="text-lg font-bold text-white font-mono">
            ${(sortedData.reduce((sum, e) => sum + e.revenue, 0) / 1000).toFixed(0)}k
          </div>
          <div className="text-[10px] text-gray-500">Total Revenue</div>
        </div>
        <div className="text-center p-2 bg-white/5 rounded-lg">
          <div className="text-lg font-bold text-white font-mono">
            {sortedData.reduce((sum, e) => sum + e.tickets, 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-gray-500">Total Tickets</div>
        </div>
      </div>

      <button 
        onClick={() => handleViewEvent('All Events')}
        className="mt-3 w-full text-xs text-violet-400 hover:text-violet-300 flex items-center justify-center gap-1 py-2 hover:bg-white/5 rounded-lg transition-colors"
      >
        View All Events <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  )
}
