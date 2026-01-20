"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Different data sets for different periods
const dataByPeriod = {
  hourly: [
    { time: "00:00", revenue: 4000, tickets: 24 },
    { time: "04:00", revenue: 3000, tickets: 13 },
    { time: "08:00", revenue: 2000, tickets: 98 },
    { time: "12:00", revenue: 7800, tickets: 39 },
    { time: "16:00", revenue: 5890, tickets: 48 },
    { time: "20:00", revenue: 4390, tickets: 38 },
    { time: "23:00", revenue: 3490, tickets: 43 },
  ],
  daily: [
    { time: "Mon", revenue: 12400, tickets: 240 },
    { time: "Tue", revenue: 13000, tickets: 289 },
    { time: "Wed", revenue: 9200, tickets: 180 },
    { time: "Thu", revenue: 14780, tickets: 390 },
    { time: "Fri", revenue: 18890, tickets: 480 },
    { time: "Sat", revenue: 22390, tickets: 580 },
    { time: "Sun", revenue: 19490, tickets: 430 },
  ],
  weekly: [
    { time: "Week 1", revenue: 45000, tickets: 890 },
    { time: "Week 2", revenue: 52000, tickets: 1020 },
    { time: "Week 3", revenue: 48000, tickets: 940 },
    { time: "Week 4", revenue: 61000, tickets: 1180 },
  ],
  monthly: [
    { time: "Jan", revenue: 125000, tickets: 2450 },
    { time: "Feb", revenue: 118000, tickets: 2310 },
    { time: "Mar", revenue: 142000, tickets: 2780 },
    { time: "Apr", revenue: 156000, tickets: 3050 },
    { time: "May", revenue: 168000, tickets: 3290 },
    { time: "Jun", revenue: 142350, tickets: 2847 },
  ],
}

interface RevenueChartProps {
  dateRange?: string
}

export default function RevenueChart({ dateRange = "30d" }: RevenueChartProps) {
  const [activeSeries, setActiveSeries] = useState(['revenue', 'tickets'])
  const [period, setPeriod] = useState<keyof typeof dataByPeriod>("daily")

  const data = useMemo(() => dataByPeriod[period], [period])

  const toggleSeries = (series: string) => {
    setActiveSeries(prev => 
      prev.includes(series) ? prev.filter(s => s !== series) : [...prev, series]
    )
  }

  // Calculate totals for display
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const totalTickets = data.reduce((sum, item) => sum + item.tickets, 0)

  return (
    <Card className="col-span-12 lg:col-span-8 bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-white">Revenue Over Time</CardTitle>
          <p className="text-sm text-gray-400">
            Track your sales performance and ticket volume trends
          </p>
          <div className="flex gap-4 mt-2">
            <div className="text-xs">
              <span className="text-gray-500">Total Revenue: </span>
              <span className="text-violet-400 font-mono font-bold">${totalRevenue.toLocaleString()}</span>
            </div>
            <div className="text-xs">
              <span className="text-gray-500">Total Tickets: </span>
              <span className="text-blue-400 font-mono font-bold">{totalTickets.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-black/20 p-1 rounded-lg">
            {(["hourly", "daily", "weekly", "monthly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  period === p 
                    ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280" 
                tick={{fill: '#6b7280', fontSize: 11}} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                yAxisId="left" 
                stroke="#8b5cf6" 
                tick={{fill: '#6b7280', fontSize: 11}} 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#3b82f6" 
                tick={{fill: '#6b7280', fontSize: 11}} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '12px',
                  padding: '12px'
                }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: '#9ca3af', marginBottom: '8px' }}
                formatter={(value: number, name: string) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value.toLocaleString(),
                  name === 'revenue' ? 'Revenue' : 'Tickets'
                ]}
              />
              
              {activeSeries.includes('revenue') && (
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  name="revenue"
                  animationDuration={500}
                />
              )}
              {activeSeries.includes('tickets') && (
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="tickets" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTickets)" 
                  name="tickets"
                  animationDuration={500}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center gap-6 mt-6">
          <button 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
              activeSeries.includes('revenue') 
                ? 'bg-violet-500/20 text-violet-400' 
                : 'bg-white/5 text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => toggleSeries('revenue')}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-violet-500"></div>
            <span className="text-sm font-medium">Revenue</span>
          </button>
          <button 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
              activeSeries.includes('tickets') 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-white/5 text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => toggleSeries('tickets')}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium">Tickets</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-gray-500">
            <div className="w-2.5 h-2.5 rounded-full border border-dashed border-gray-500"></div>
            <span className="text-sm font-medium">Avg Price (Soon)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
