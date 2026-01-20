"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import GeographicHeatmap from "./GeographicHeatmap"

export default function AudienceInsights() {
  const ageData = [
    { name: "18-24", value: 22, color: "#8b5cf6" },
    { name: "25-34", value: 38, color: "#3b82f6" },
    { name: "35-44", value: 25, color: "#10b981" },
    { name: "45-54", value: 12, color: "#f59e0b" },
    { name: "55+", value: 3, color: "#ef4444" },
  ]

  const topCities = [
    { name: "New York", value: 456, country: "USA" },
    { name: "Los Angeles", value: 389, country: "USA" },
    { name: "London", value: 267, country: "UK" },
    { name: "Tokyo", value: 234, country: "JPN" },
    { name: "Singapore", value: 198, country: "SGP" },
  ]
  
  const walletData = [
    { name: "MetaMask", value: 65, color: "#F6851B" },
    { name: "WalletConnect", value: 25, color: "#3B99FC" },
    { name: "Coinbase", value: 10, color: "#0052FF" },
    { name: "Other", value: 1, color: "#A0A0A0" },
  ]

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Demographics - Age & Wallet */}
      <Card className="col-span-12 lg:col-span-4 bg-eureka-card border-eureka-card backdrop-blur-md bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Audience Demographics</CardTitle>
          <p className="text-sm text-gray-400">Age distribution & wallet usage</p>
        </CardHeader>
        <CardContent className="space-y-8">
            {/* Age Distribution */}
            <div>
                <h4 className="text-sm font-medium text-gray-300 mb-4">Age Distribution</h4>
                <div className="h-[200px] flex items-center justify-between">
                    <div className="h-full w-[60%]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={ageData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {ageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-[40%] space-y-2">
                        {ageData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-gray-400">{item.name}</span>
                                </div>
                                <span className="text-white font-mono">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 pt-6"></div>

            {/* Wallet Analytics */}
            <div>
                <h4 className="text-sm font-medium text-gray-300 mb-4">Wallet Connection</h4>
                <div className="space-y-4">
                    {walletData.map((item, index) => (
                        <div key={index} className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="flex items-center gap-2 text-gray-400">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                    {item.name}
                                </span>
                                <span className="text-white">{item.value}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div 
                                    className="h-full rounded-full" 
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
      <Card className="col-span-12 lg:col-span-8 bg-eureka-card border-eureka-card backdrop-blur-md bg-white/5 border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
                <CardTitle className="text-xl font-bold text-white">Geographic Distribution</CardTitle>
                <p className="text-sm text-gray-400">Global sales performance heatmap</p>
            </div>
             <div className="flex items-center gap-2">
                <button className="text-xs text-brand-primary hover:text-brand-primary/80 transition-colors">
                    View Full Report
                </button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                   <GeographicHeatmap />
                </div>
                
                {/* Top Cities Sidebar */}
                <div className="w-full lg:w-[200px] space-y-4">
                    <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Top Cities</h4>
                    <div className="space-y-3">
                        {topCities.map((city, index) => (
                            <div key={index} className="group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-white group-hover:text-brand-primary transition-colors">{city.name}</span>
                                    <span className="text-xs text-gray-500">{city.country}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="h-1 w-20 bg-white/5 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-brand-start to-brand-end rounded-full"
                                            style={{ width: `${(city.value / 500) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-mono text-gray-400">{city.value}</span>
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
