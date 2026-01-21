"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, Sector } from "recharts"
import { Activity, CreditCard, Zap, ExternalLink, TrendingUp, Info, ArrowUpRight } from "lucide-react"
import { toast } from "sonner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const paymentData = [
  { name: "ETH", value: 64057, color: "#8b5cf6", change: "+12.3%" },
  { name: "USDC", value: 35587, color: "#3b82f6", change: "+8.7%" },
  { name: "Credit Card", value: 28470, color: "#10b981", change: "+5.2%" },
  { name: "MATIC", value: 8120, color: "#7c3aed", change: "+45.8%" },
  { name: "DAI", value: 6116, color: "#f59e0b", change: "-2.1%" },
]

const networkData = [
  { 
    name: "Ethereum", 
    emoji: "💎",
    percentage: 48, 
    amount: 68328, 
    gas: "$5.75", 
    success: 98.7,
    txCount: 847,
    explorer: "https://etherscan.io"
  },
  { 
    name: "Polygon", 
    emoji: "💜",
    percentage: 35, 
    amount: 49822, 
    gas: "$0.02", 
    success: 99.9,
    txCount: 1234,
    explorer: "https://polygonscan.com"
  },
  { 
    name: "BSC", 
    emoji: "🟡",
    percentage: 17, 
    amount: 24199, 
    gas: "$0.15", 
    success: 99.2,
    txCount: 423,
    explorer: "https://bscscan.com"
  },
]

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props
  
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">
        ${(value / 1000).toFixed(1)}k
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#9ca3af" fontSize="12">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  )
}

export function PaymentMethodsBreakdown() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null)

  const totalRevenue = paymentData.reduce((sum, item) => sum + item.value, 0)
  const cryptoTotal = paymentData.filter(p => p.name !== 'Credit Card').reduce((sum, item) => sum + item.value, 0)
  const fiatTotal = paymentData.filter(p => p.name === 'Credit Card').reduce((sum, item) => sum + item.value, 0)

  const handleExplorer = (network: typeof networkData[0]) => {
    toast.info(`Opening ${network.name} Explorer`, {
      description: network.explorer,
    })
    // In real app: window.open(network.explorer, '_blank')
  }

  const handleViewInsight = () => {
    toast.success("Optimization Tip Applied", {
      description: "Network preference updated to prioritize Polygon for lower gas fees.",
    })
  }

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Chart - Payment Type Distribution */}
        <Card className="bg-eureka-card border-eureka-card backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-white">Payment Distribution</CardTitle>
                <p className="text-sm text-gray-400">Revenue split by payment method</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-mono">
                  ${(totalRevenue / 1000).toFixed(1)}k
                </div>
                <div className="text-xs text-green-400 flex items-center justify-end gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +15.4% this month
                </div>
              </div>
            </div>
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
                    paddingAngle={3}
                    dataKey="value"
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(undefined)}
                  >
                    {paymentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="rgba(0,0,0,0.2)"
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '8px' 
                    }}
                    formatter={(value: number, name: string) => [
                      `$${value.toLocaleString()} (${((value / totalRevenue) * 100).toFixed(1)}%)`,
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Payment method legend with trends */}
            <div className="mt-4 space-y-2">
              {paymentData.map((payment, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseLeave={() => setActiveIndex(undefined)}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: payment.color }}
                    />
                    <span className="text-sm text-white">{payment.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-gray-300">
                      ${payment.value.toLocaleString()}
                    </span>
                    <span className={`text-xs ${
                      payment.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {payment.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary cards */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-violet-500/10 p-3 rounded-lg border border-violet-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-violet-400" />
                  <span className="text-xs text-gray-400">Crypto Total</span>
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  ${cryptoTotal.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  {((cryptoTotal / totalRevenue) * 100).toFixed(1)}% of revenue
                </div>
              </div>
              <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-gray-400">Fiat (Stripe)</span>
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  ${fiatTotal.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  {((fiatTotal / totalRevenue) * 100).toFixed(1)}% of revenue
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Networks */}
        <Card className="bg-eureka-card border-eureka-card backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-white">Blockchain Performance</CardTitle>
                <p className="text-sm text-gray-400">Revenue & Stats by Network</p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Info className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click on a network to see more details</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {networkData.map((network) => (
              <div 
                key={network.name} 
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedNetwork === network.name 
                    ? 'bg-brand-primary/10 border-brand-primary/30' 
                    : 'bg-white/5 border-white/5 hover:border-white/10'
                }`}
                onClick={() => setSelectedNetwork(
                  selectedNetwork === network.name ? null : network.name
                )}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{network.emoji}</span>
                    <span className="font-medium text-white">{network.name}</span>
                    <span className="text-xs text-gray-400">
                      (${network.amount.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{network.percentage}%</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleExplorer(network)
                      }}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full transition-all duration-500" 
                    style={{ width: `${network.percentage}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <div className="flex items-center gap-1">
                    <span>Gas: {network.gas} avg</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-green-500" />
                    <span className="text-green-500">{network.success}% success</span>
                  </div>
                </div>
                
                {/* Expanded details */}
                {selectedNetwork === network.name && (
                  <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-gray-400">Total Transactions</div>
                      <div className="text-white font-mono">{network.txCount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Avg per Transaction</div>
                      <div className="text-white font-mono">
                        ${(network.amount / network.txCount).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Total Gas Spent</div>
                      <div className="text-orange-400 font-mono">
                        ${(parseFloat(network.gas.replace('$', '')) * network.txCount).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Failed Transactions</div>
                      <div className="text-red-400 font-mono">
                        {Math.round(network.txCount * (1 - network.success / 100))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* AI Insight */}
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-400 mb-1">💡 Network Insight</h4>
                  <p className="text-xs text-blue-300/80 mb-3">
                    Switching more traffic to Polygon could save ~<span className="font-bold">$2,450</span> in gas fees 
                    this month while maintaining 99.9% uptime.
                  </p>
                  <Button 
                    size="sm" 
                    className="h-7 text-xs bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30"
                    onClick={handleViewInsight}
                  >
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    Apply Optimization
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
