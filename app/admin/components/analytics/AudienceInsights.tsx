"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import GeographicHeatmap from "./GeographicHeatmap"
import { toast } from "sonner"
import { ExternalLink } from "lucide-react"

export default function AudienceInsights() {
  const ageData = [
    { name: "18-24", value: 22, count: 626, color: "#8b5cf6" },
    { name: "25-34", value: 38, count: 1082, color: "#3b82f6" },
    { name: "35-44", value: 25, count: 712, color: "#10b981" },
    { name: "45-54", value: 12, count: 342, color: "#f59e0b" },
    { name: "55+", value: 3, count: 85, color: "#ef4444" },
  ]

  const topCities = [
    { name: "New York", value: 456, country: "USA", flag: "🇺🇸" },
    { name: "Los Angeles", value: 389, country: "USA", flag: "🇺🇸" },
    { name: "London", value: 267, country: "UK", flag: "🇬🇧" },
    { name: "Tokyo", value: 234, country: "JPN", flag: "🇯🇵" },
    { name: "Singapore", value: 198, country: "SGP", flag: "🇸🇬" },
    { name: "Dubai", value: 156, country: "UAE", flag: "🇦🇪" },
    { name: "Sydney", value: 134, country: "AUS", flag: "🇦🇺" },
    { name: "Berlin", value: 112, country: "DEU", flag: "🇩🇪" },
    { name: "Paris", value: 98, country: "FRA", flag: "🇫🇷" },
    { name: "Toronto", value: 87, country: "CAN", flag: "🇨🇦" },
  ]
  
  const walletData = [
    { name: "MetaMask", value: 65, count: 1847, color: "#F6851B", icon: "🦊" },
    { name: "WalletConnect", value: 25, count: 712, color: "#3B99FC", icon: "🔗" },
    { name: "Coinbase Wallet", value: 10, count: 284, color: "#0052FF", icon: "🔵" },
  ]

  const handleViewFullReport = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Generating full audience report...',
        success: 'Full report ready! Downloading...',
        error: 'Failed to generate report',
      }
    )
  }

  const totalAttendees = ageData.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Demographics - Age & Wallet */}
      <Card className="col-span-12 lg:col-span-4 bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Audience Demographics</CardTitle>
          <p className="text-sm text-gray-400">Age distribution & wallet usage</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Age Distribution */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-4">Age Distribution</h4>
            <div className="h-[200px] flex items-center justify-between">
              <div className="h-full w-[55%] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {ageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      formatter={(value: number, name: string, props: any) => [
                        `${value}% (${props.payload.count.toLocaleString()} attendees)`,
                        props.payload.name
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{totalAttendees.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </div>
              </div>
              <div className="w-[45%] space-y-2">
                {ageData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs group cursor-pointer hover:bg-white/5 p-1 rounded transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-400 group-hover:text-white transition-colors">{item.name}</span>
                    </div>
                    <span className="text-white font-mono">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10"></div>

          {/* Wallet Analytics */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-4">Wallet Connection</h4>
            <div className="space-y-4">
              {walletData.map((item, index) => (
                <div key={index} className="space-y-2 group cursor-pointer">
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors">
                      <span>{item.icon}</span>
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-[10px]">{item.count.toLocaleString()}</span>
                      <span className="text-white font-mono">{item.value}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Geographic Heatmap */}
      <Card className="col-span-12 lg:col-span-8 bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-white">Geographic Distribution</CardTitle>
            <p className="text-sm text-gray-400">Global sales performance heatmap</p>
          </div>
          <button 
            onClick={handleViewFullReport}
            className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors px-3 py-1.5 rounded-full bg-violet-500/10 hover:bg-violet-500/20"
          >
            <ExternalLink className="w-3 h-3" />
            View Full Report
          </button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <GeographicHeatmap />
            </div>
            
            {/* Top Cities Sidebar */}
            <div className="w-full lg:w-[220px] space-y-4">
              <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider flex items-center justify-between">
                <span>Top 10 Cities</span>
                <span className="text-xs text-gray-500 font-normal normal-case">tickets sold</span>
              </h4>
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                {topCities.map((city, index) => (
                  <div key={index} className="group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{city.flag}</span>
                        <span className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">{city.name}</span>
                      </span>
                      <span className="text-xs font-mono text-gray-400">{city.value}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${(city.value / 500) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
