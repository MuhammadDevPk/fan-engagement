"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const eventPerformanceData = [
  { name: 'Champions League Final', revenue: 100000, tickets: 500, color: '#ef4444' },
  { name: 'Jazz Night Under Stars', revenue: 11700, tickets: 234, color: '#8b5cf6' },
  { name: 'Modern Art Gallery', revenue: 11250, tickets: 150, color: '#f97316' },
  { name: 'Web3 Dev Summit', revenue: 10680, tickets: 89, color: '#3b82f6' },
  { name: 'Crypto Masterclass', revenue: 0, tickets: 0, color: '#22c55e' },
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
      </div>
    )
  }
  return null
}

export function EventPerformanceChart() {
  return (
    <div className="col-span-12 lg:col-span-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 min-h-[300px]">
      <h3 className="text-xl font-bold text-white mb-2">Event Performance</h3>
      <p className="text-sm text-gray-400 mb-6">Top performing events by revenue</p>
      
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={eventPerformanceData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
            <XAxis 
              type="number" 
              stroke="#6b7280" 
              fontSize={10}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
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
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
              {eventPerformanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
