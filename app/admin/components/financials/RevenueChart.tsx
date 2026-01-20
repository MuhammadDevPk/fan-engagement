"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { time: "Jan 1", gross: 4000, net: 2400, refunds: 100, fees: 320 },
  { time: "Jan 5", gross: 3000, net: 1398, refunds: 200, fees: 240 },
  { time: "Jan 10", gross: 2000, net: 9800, refunds: 0, fees: 160 },
  { time: "Jan 15", gross: 2780, net: 3908, refunds: 50, fees: 220 },
  { time: "Jan 20", gross: 1890, net: 4800, refunds: 300, fees: 150 },
  { time: "Jan 25", gross: 2390, net: 3800, refunds: 120, fees: 190 },
  { time: "Jan 30", gross: 3490, net: 4300, refunds: 80, fees: 280 },
]

export function RevenueChart() {
  const [activeSeries, setActiveSeries] = useState(['gross', 'net'])
  const [period, setPeriod] = useState("daily")

  const toggleSeries = (series: string) => {
    setActiveSeries(prev => 
      prev.includes(series) ? prev.filter(s => s !== series) : [...prev, series]
    )
  }

  return (
    <Card className="bg-eureka-card border-eureka-card backdrop-blur-md bg-white/5 border-white/10">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-white">Revenue Analytics</CardTitle>
          <p className="text-sm text-gray-400">Visualize your income streams and financial health</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex bg-black/20 p-1 rounded-lg">
                {(["daily", "weekly", "monthly", "yearly"] as const).map((p) => (
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
                <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRefunds" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
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
                stroke="#8b5cf6" 
                tick={{fill: '#6b7280'}} 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              
              {activeSeries.includes('gross') && (
                <Area 
                    type="monotone" 
                    dataKey="gross" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorGross)" 
                    name="Gross Revenue"
                />
              )}
              {activeSeries.includes('net') && (
                <Area 
                    type="monotone" 
                    dataKey="net" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorNet)" 
                    name="Net Revenue"
                />
              )}
               {activeSeries.includes('refunds') && (
                <Area 
                    type="monotone" 
                    dataKey="refunds" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRefunds)" 
                    name="Refunds"
                />
              )}
              {activeSeries.includes('fees') && (
                <Area 
                    type="monotone" 
                    dataKey="fees" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorFees)" 
                    name="Platform Fees"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div 
                className={`flex items-center gap-2 cursor-pointer transition-opacity ${activeSeries.includes('gross') ? 'opacity-100' : 'opacity-40'}`}
                onClick={() => toggleSeries('gross')}
            >
                <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                <span className="text-sm font-medium text-gray-300">Gross Revenue</span>
            </div>
            <div 
                className={`flex items-center gap-2 cursor-pointer transition-opacity ${activeSeries.includes('net') ? 'opacity-100' : 'opacity-40'}`}
                onClick={() => toggleSeries('net')}
            >
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-gray-300">Net Revenue</span>
            </div>
             <div 
                className={`flex items-center gap-2 cursor-pointer transition-opacity ${activeSeries.includes('refunds') ? 'opacity-100' : 'opacity-40'}`}
                onClick={() => toggleSeries('refunds')}
            >
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium text-gray-300">Refunds</span>
            </div>
            <div 
                className={`flex items-center gap-2 cursor-pointer transition-opacity ${activeSeries.includes('fees') ? 'opacity-100' : 'opacity-40'}`}
                onClick={() => toggleSeries('fees')}
            >
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm font-medium text-gray-300">Platform Fees</span>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
