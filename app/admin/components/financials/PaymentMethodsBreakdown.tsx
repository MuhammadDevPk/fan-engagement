"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts"
import { Activity, CreditCard, Zap } from "lucide-react"

const paymentData = [
  { name: "ETH", value: 64057, color: "#8b5cf6" }, // Violet
  { name: "USDC", value: 35587, color: "#3b82f6" }, // Blue
  { name: "Credit Card", value: 28470, color: "#10b981" }, // Emerald
  { name: "Other Crypto", value: 14235, color: "#f59e0b" }, // Amber
]

const networkData = [
    { name: "Ethereum", percentage: 48, amount: "$68,328", gas: "$5.75 avg", success: "98.7%" },
    { name: "Polygon", percentage: 35, amount: "$49,822", gas: "$0.02 avg", success: "99.9%" },
    { name: "BSC", percentage: 17, amount: "$24,199", gas: "$0.15 avg", success: "99.2%" },
]

export function PaymentMethodsBreakdown() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Chart - Payment Type Distribution */}
      <Card className="bg-eureka-card border-eureka-card backdrop-blur-md bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Payment Distribution</CardTitle>
          <p className="text-sm text-gray-400">Revenue split by payment method</p>
        </CardHeader>
        <CardContent>
            <div className="h-[250px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={paymentData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {paymentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.1)" />
                            ))}
                        </Pie>
                        <RechartsTooltip 
                             contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                             itemStyle={{ color: '#fff' }}
                        />
                        <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ paddingLeft: '20px' }}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-gray-400">Fiat (Stripe)</span>
                    </div>
                    <div className="text-lg font-bold text-white">20%</div>
                    <div className="text-xs text-gray-500">$28,470</div>
                 </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-4 h-4 text-violet-400" />
                        <span className="text-xs text-gray-400">Crypto Total</span>
                    </div>
                    <div className="text-lg font-bold text-white">80%</div>
                    <div className="text-xs text-gray-500">$113,880</div>
                 </div>
            </div>
        </CardContent>
      </Card>

      {/* Blockchain Networks */}
      <Card className="bg-eureka-card border-eureka-card backdrop-blur-md bg-white/5 border-white/10">
        <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Blockchain Performance</CardTitle>
            <p className="text-sm text-gray-400">Revenue & Stats by Network</p>
        </CardHeader>
        <CardContent className="space-y-6">
            {networkData.map((network) => (
                <div key={network.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{network.name}</span>
                            <span className="text-xs text-gray-400">({network.amount})</span>
                        </div>
                         <div className="text-right">
                             <div className="text-white font-bold">{network.percentage}%</div>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         <div 
                            className="h-full bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full" 
                            style={{ width: `${network.percentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <span>Gas: {network.gas}</span>
                        </div>
                         <div className="flex items-center gap-1">
                            <Activity className="w-3 h-3 text-green-500" />
                            <span className="text-green-500">{network.success} success</span>
                        </div>
                    </div>
                </div>
            ))}
            
             <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-1">Network Insight</h4>
                    <p className="text-xs text-blue-300/80">
                        Switching more traffic to Polygon could save ~43% in gas fees while maintaining 99.9% uptime.
                    </p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
