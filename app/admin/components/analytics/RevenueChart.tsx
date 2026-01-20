"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { time: "00:00", revenue: 4000, tickets: 240 },
  { time: "04:00", revenue: 3000, tickets: 139 },
  { time: "08:00", revenue: 2000, tickets: 980 },
  { time: "12:00", revenue: 2780, tickets: 390 },
  { time: "16:00", revenue: 1890, tickets: 480 },
  { time: "20:00", revenue: 2390, tickets: 380 },
  { time: "23:59", revenue: 3490, tickets: 430 },
]

export default function RevenueChart() {
  const [activeSeries, setActiveSeries] = useState(['revenue', 'tickets'])
  const [period, setPeriod] = useState("daily")

  const toggleSeries = (series: string) => {
    setActiveSeries(prev => 
      prev.includes(series) ? prev.filter(s => s !== series) : [...prev, series]
    )
  }

  return (
    <Card className="col-span-12 lg:col-span-8 bg-eureka-card border-eureka-card backdrop-blur-md bg-white/5 border-white/10">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-white">Revenue Over Time</CardTitle>
          <p className="text-sm text-gray-400">Track your sales performance and ticket volume trends</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex bg-black/20 p-1 rounded-lg">
                {(["hourly", "daily", "weekly", "monthly"] as const).map((p) => (
                    <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${period === p ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                ))}
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280" 
                tick={{fill: '#6b7280'}} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                yAxisId="left" 
                stroke="#8b5cf6" 
                tick={{fill: '#6b7280'}} 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#3b82f6" 
                tick={{fill: '#6b7280'}} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
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
                    name="Revenue (USD)"
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
                    name="Tickets Sold"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center gap-6 mt-6">
            <div 
                className={`flex items-center gap-2 cursor-pointer transition-opacity ${activeSeries.includes('revenue') ? 'opacity-100' : 'opacity-40'}`}
                onClick={() => toggleSeries('revenue')}
            >
                <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                <span className="text-sm font-medium text-gray-300">Total Revenue</span>
            </div>
            <div 
                className={`flex items-center gap-2 cursor-pointer transition-opacity ${activeSeries.includes('tickets') ? 'opacity-100' : 'opacity-40'}`}
                onClick={() => toggleSeries('tickets')}
            >
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-gray-300">Ticket Sales</span>
            </div>
             <div className="flex items-center gap-2 opacity-50 cursor-pointer hover:opacity-100 transition-opacity">
                <div className="w-3 h-3 rounded-full border border-dashed border-gray-400"></div>
                <span className="text-sm font-medium text-gray-300">Avg Ticket Price (Coming Soon)</span>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
