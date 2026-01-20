"use client"

import { motion } from "framer-motion"
import { DollarSign, Wallet, Hourglass, Percent, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function FinancialOverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Card 1 - Total Earnings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="h-full bg-eureka-card border-eureka-card backdrop-blur-md bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Earnings</CardTitle>
            <div className="p-2 bg-purple-500/20 rounded-lg">
                <DollarSign className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">$142,350.00</div>
            <div className="space-y-1 mb-3">
                <p className="text-xs text-brand-secondary flex items-center gap-1">
                    <span>Example: 58.5 ETH</span>
                </p>
                <div className="flex items-center text-xs text-green-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+$23,450 (+19.7%)</span>
                </div>
            </div>
            
          </CardContent>
        </Card>
      </motion.div>

      {/* Card 2 - Available Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="h-full bg-eureka-card border-eureka-card backdrop-blur-md bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Available Balance</CardTitle>
            <div className="p-2 bg-green-500/20 rounded-lg">
                <Wallet className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">$38,250.00</div>
             <div className="space-y-1 mb-4">
                <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Settled</span>
                    <span className="text-white">$38,250</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-gray-400">In Escrow</span>
                    <span className="text-white">$8,210</span>
                </div>
            </div>
            <Button size="sm" className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-8 text-xs">
                Withdraw to Wallet
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Card 3 - Pending Settlement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="h-full bg-eureka-card border-eureka-card backdrop-blur-md bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pending Settlement</CardTitle>
             <div className="p-2 bg-blue-500/20 rounded-lg">
                <Hourglass className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">$15,890.00</div>
             <p className="text-xs text-gray-400 mb-3">Est. settlement: Feb 22, 2026</p>
             <div className="space-y-2">
                <div className="text-xs text-gray-400 flex justify-between">
                    <span>Event breakdown</span>
                    <span>3 Events</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-blue-500 rounded-full" />
                </div>
             </div>
          </CardContent>
        </Card>
      </motion.div>

       {/* Card 4 - Platform Fees */}
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="h-full bg-eureka-card border-eureka-card backdrop-blur-md bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Platform Fees Paid</CardTitle>
             <div className="p-2 bg-orange-500/20 rounded-lg">
                <Percent className="h-4 w-4 text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">$14,235.00</div>
            <div className="space-y-1 mb-3">
                <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Service Fee (8%)</span>
                    <span className="text-white">$11,388</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Processing (2%)</span>
                    <span className="text-white">$2,847</span>
                </div>
            </div>
             <p className="text-xs text-brand-primary cursor-pointer hover:underline text-right mt-2">
                Fee Calculator
             </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
