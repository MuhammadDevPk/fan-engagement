"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Download, Calendar, TrendingUp, TrendingDown } from "lucide-react"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Data for different time periods
const dailyData = [
  { time: "Mon", gross: 4200, net: 3780, refunds: 120, fees: 336 },
  { time: "Tue", gross: 3800, net: 3420, refunds: 80, fees: 304 },
  { time: "Wed", gross: 5100, net: 4590, refunds: 150, fees: 408 },
  { time: "Thu", gross: 4500, net: 4050, refunds: 200, fees: 360 },
  { time: "Fri", gross: 6200, net: 5580, refunds: 100, fees: 496 },
  { time: "Sat", gross: 8500, net: 7650, refunds: 250, fees: 680 },
  { time: "Sun", gross: 7200, net: 6480, refunds: 180, fees: 576 },
]

const weeklyData = [
  { time: "Week 1", gross: 25000, net: 22500, refunds: 800, fees: 2000 },
  { time: "Week 2", gross: 32000, net: 28800, refunds: 1200, fees: 2560 },
  { time: "Week 3", gross: 28500, net: 25650, refunds: 950, fees: 2280 },
  { time: "Week 4", gross: 35000, net: 31500, refunds: 1100, fees: 2800 },
]

const monthlyData = [
  { time: "Aug", gross: 85000, net: 76500, refunds: 3200, fees: 6800 },
  { time: "Sep", gross: 92000, net: 82800, refunds: 2800, fees: 7360 },
  { time: "Oct", gross: 78500, net: 70650, refunds: 4100, fees: 6280 },
  { time: "Nov", gross: 105000, net: 94500, refunds: 3500, fees: 8400 },
  { time: "Dec", gross: 125000, net: 112500, refunds: 4200, fees: 10000 },
  { time: "Jan", gross: 142350, net: 128115, refunds: 3800, fees: 11388 },
]

const yearlyData = [
  { time: "2022", gross: 450000, net: 405000, refunds: 18000, fees: 36000 },
  { time: "2023", gross: 680000, net: 612000, refunds: 25000, fees: 54400 },
  { time: "2024", gross: 920000, net: 828000, refunds: 32000, fees: 73600 },
  { time: "2025", gross: 1150000, net: 1035000, refunds: 38000, fees: 92000 },
  { time: "2026", gross: 142350, net: 128115, refunds: 3800, fees: 11388 },
]

const dataByPeriod: Record<string, typeof dailyData> = {
  daily: dailyData,
  weekly: weeklyData,
  monthly: monthlyData,
  yearly: yearlyData,
}

export function RevenueChart() {
  const [activeSeries, setActiveSeries] = useState(['gross', 'net'])
  const [period, setPeriod] = useState("monthly")
  const [dateRange, setDateRange] = useState("30d")

  const data = useMemo(() => dataByPeriod[period] || dailyData, [period])

  const toggleSeries = (series: string) => {
    setActiveSeries(prev => 
      prev.includes(series) ? prev.filter(s => s !== series) : [...prev, series]
    )
  }

  // Calculate totals
  const totals = useMemo(() => {
    return data.reduce((acc, item) => ({
      gross: acc.gross + item.gross,
      net: acc.net + item.net,
      refunds: acc.refunds + item.refunds,
      fees: acc.fees + item.fees,
    }), { gross: 0, net: 0, refunds: 0, fees: 0 })
  }, [data])

  // Calculate trend (compare last 2 periods)
  const trend = useMemo(() => {
    if (data.length < 2) return 0
    const last = data[data.length - 1].gross
    const prev = data[data.length - 2].gross
    return ((last - prev) / prev) * 100
  }, [data])

  const handleExport = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: "Exporting chart data...",
        success: "Chart data exported as CSV!",
        error: "Failed to export data",
      }
    )
  }

  return (
    <Card className="bg-eureka-card border-eureka-card backdrop-blur-md">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 gap-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-white">Revenue Analytics</CardTitle>
          <p className="text-sm text-gray-400">Visualize your income streams and financial health</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="text-2xl font-bold text-white font-mono">
              ${totals.gross.toLocaleString()}
            </div>
            <div className={`flex items-center text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[130px] bg-black/20 border-white/10 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1b26] border-white/10">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex bg-black/20 p-1 rounded-lg">
            {(["daily", "weekly", "monthly", "yearly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  period === p 
                    ? 'bg-brand-primary text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-black/20 border-white/10 hover:bg-white/10 text-gray-300"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
            <div className="text-xs text-gray-400">Gross Revenue</div>
            <div className="text-lg font-bold text-violet-400 font-mono">${totals.gross.toLocaleString()}</div>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-xs text-gray-400">Net Revenue</div>
            <div className="text-lg font-bold text-blue-400 font-mono">${totals.net.toLocaleString()}</div>
          </div>
          <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="text-xs text-gray-400">Refunds</div>
            <div className="text-lg font-bold text-red-400 font-mono">${totals.refunds.toLocaleString()}</div>
          </div>
          <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="text-xs text-gray-400">Platform Fees</div>
            <div className="text-lg font-bold text-orange-400 font-mono">${totals.fees.toLocaleString()}</div>
          </div>
        </div>

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
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '8px',
                  padding: '12px'
                }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                labelStyle={{ color: '#9ca3af', marginBottom: '8px' }}
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
        
        {/* Series toggles */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {[
            { key: 'gross', label: 'Gross Revenue', color: 'bg-violet-500' },
            { key: 'net', label: 'Net Revenue', color: 'bg-blue-500' },
            { key: 'refunds', label: 'Refunds', color: 'bg-red-500' },
            { key: 'fees', label: 'Platform Fees', color: 'bg-orange-500' },
          ].map(({ key, label, color }) => (
            <button
              key={key}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                activeSeries.includes(key) 
                  ? 'bg-white/10 opacity-100' 
                  : 'opacity-40 hover:opacity-70'
              }`}
              onClick={() => toggleSeries(key)}
            >
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-sm font-medium text-gray-300">{label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
