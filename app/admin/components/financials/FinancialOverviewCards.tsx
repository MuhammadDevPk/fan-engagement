"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DollarSign, Wallet, Hourglass, Percent, TrendingUp, Calculator, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Animated counter hook
function useAnimatedCounter(targetValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const steps = 60
    const stepValue = targetValue / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += stepValue
      if (current >= targetValue) {
        setCount(targetValue)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [targetValue, duration])
  
  return count
}

// Pending events breakdown data
const pendingEvents = [
  { name: "Jazz Night Festival", amount: 8450, date: "Feb 22, 2026" },
  { name: "Web3 Developers Summit", amount: 4230, date: "Feb 23, 2026" },
  { name: "Art Gallery Opening", amount: 3210, date: "Feb 24, 2026" },
]

export function FinancialOverviewCards() {
  const [showFeeCalculator, setShowFeeCalculator] = useState(false)
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const [showPendingBreakdown, setShowPendingBreakdown] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("38250")
  const [ticketPrice, setTicketPrice] = useState("50")
  const [ticketQty, setTicketQty] = useState("100")
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  // Animated counters
  const totalEarnings = useAnimatedCounter(142350)
  const availableBalance = useAnimatedCounter(38250)
  const pendingSettlement = useAnimatedCounter(15890)
  const platformFees = useAnimatedCounter(14235)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const handleWithdraw = async () => {
    setIsWithdrawing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsWithdrawing(false)
    setShowWithdrawDialog(false)
    toast.success("Withdrawal Initiated!", {
      description: `$${parseFloat(withdrawAmount).toLocaleString()} will be sent to your wallet within 24 hours.`,
    })
  }

  // Fee calculator logic
  const grossRevenue = parseFloat(ticketPrice) * parseFloat(ticketQty) || 0
  const platformFee = grossRevenue * 0.08
  const processingFee = grossRevenue * 0.029 + (parseFloat(ticketQty) || 0) * 0.30
  const netRevenue = grossRevenue - platformFee - processingFee

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 - Total Earnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full bg-eureka-card border-eureka-card backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Earnings</CardTitle>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <DollarSign className="h-4 w-4 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2 font-mono">
                {formatCurrency(totalEarnings)}
              </div>
              <div className="space-y-1 mb-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-violet-400">Ξ 58.5 ETH</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-blue-400">12,340 USDC</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-orange-400">₿ 0.45 BTC</span>
                </div>
                <div className="flex items-center text-xs text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+$23,450 (+19.7%) vs last month</span>
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
          <Card className="h-full bg-eureka-card border-eureka-card backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Available Balance</CardTitle>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Wallet className="h-4 w-4 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2 font-mono">
                {formatCurrency(availableBalance)}
              </div>
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Settled (ready)</span>
                  <span className="text-green-400">$38,250</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Pending (2 days)</span>
                  <span className="text-yellow-400">$15,890</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">In Escrow</span>
                  <span className="text-blue-400">$8,210</span>
                </div>
              </div>
              <Button 
                size="sm" 
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-8 text-xs"
                onClick={() => setShowWithdrawDialog(true)}
              >
                <Wallet className="w-3 h-3 mr-2" />
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
          <Card className="h-full bg-eureka-card border-eureka-card backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Pending Settlement</CardTitle>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Hourglass className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2 font-mono">
                {formatCurrency(pendingSettlement)}
              </div>
              <p className="text-xs text-gray-400 mb-3">Est. settlement: Feb 22, 2026</p>
              
              <button 
                className="w-full flex justify-between items-center text-xs text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowPendingBreakdown(!showPendingBreakdown)}
              >
                <span>Event breakdown ({pendingEvents.length} Events)</span>
                {showPendingBreakdown ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              
              {showPendingBreakdown && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 space-y-2"
                >
                  {pendingEvents.map((event, idx) => (
                    <div key={idx} className="flex justify-between text-xs p-2 bg-white/5 rounded">
                      <span className="text-gray-300 truncate max-w-[120px]">{event.name}</span>
                      <span className="text-white font-mono">${event.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </motion.div>
              )}
              
              <div className="mt-3 space-y-1">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-blue-500 rounded-full" 
                  />
                </div>
                <div className="text-xs text-gray-500 text-right">65% time to settlement</div>
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
          <Card className="h-full bg-eureka-card border-eureka-card backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Platform Fees Paid</CardTitle>
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Percent className="h-4 w-4 text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2 font-mono">
                {formatCurrency(platformFees)}
              </div>
              <div className="text-xs text-gray-500 mb-3">(10% of gross revenue)</div>
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
              <button 
                className="text-xs text-brand-primary cursor-pointer hover:underline flex items-center gap-1"
                onClick={() => setShowFeeCalculator(true)}
              >
                <Calculator className="w-3 h-3" />
                Fee Calculator
                <ArrowRight className="w-3 h-3" />
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Withdraw Dialog */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent className="bg-[#1a1b26] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Withdraw to Wallet</DialogTitle>
            <DialogDescription className="text-gray-400">
              Transfer your available balance to your connected wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Available Balance</Label>
              <div className="text-2xl font-bold text-green-400">$38,250.00</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Withdraw</Label>
              <Input
                id="amount"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-white/5 border-white/10"
                max={38250}
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-brand-primary"
                onClick={() => setWithdrawAmount("38250")}
              >
                Withdraw Max
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Destination Wallet</Label>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 font-mono text-sm">
                0x7a9b...4c2d (Your Primary Wallet)
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Network Fee</span>
                <span>~$2.50</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>You'll receive</span>
                <span className="text-green-400">${(parseFloat(withdrawAmount) - 2.50).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdrawDialog(false)} className="border-white/10">
              Cancel
            </Button>
            <Button onClick={handleWithdraw} disabled={isWithdrawing}>
              {isWithdrawing ? "Processing..." : "Confirm Withdrawal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fee Calculator Dialog */}
      <Dialog open={showFeeCalculator} onOpenChange={setShowFeeCalculator}>
        <DialogContent className="bg-[#1a1b26] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Fee Calculator
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Estimate your earnings after platform fees.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticketPrice">Ticket Price ($)</Label>
                <Input
                  id="ticketPrice"
                  type="number"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticketQty">Quantity</Label>
                <Input
                  id="ticketQty"
                  type="number"
                  value={ticketQty}
                  onChange={(e) => setTicketQty(e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Gross Revenue</span>
                <span className="font-mono">${grossRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Platform Fee (8%)</span>
                <span className="font-mono text-orange-400">-${platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Payment Processing (2.9% + $0.30)</span>
                <span className="font-mono text-orange-400">-${processingFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between font-bold">
                <span>Your Earnings</span>
                <span className="text-green-400 font-mono">${netRevenue.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-500 text-center">
                ({((netRevenue / grossRevenue) * 100 || 0).toFixed(1)}% of gross revenue)
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowFeeCalculator(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
