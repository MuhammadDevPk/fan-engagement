"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, TrendingUp, Repeat, Wallet, ExternalLink, Copy, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

// Mock blockchain transaction data
const recentTransactions = [
  { hash: "0x7a3b...f2e1", type: "Mint", amount: "0.05 ETH", time: "2 min ago", status: "confirmed" },
  { hash: "0x9c4d...a3b2", type: "Transfer", amount: "0.02 ETH", time: "5 min ago", status: "confirmed" },
  { hash: "0x1e5f...c4d3", type: "Resale", amount: "0.08 ETH", time: "12 min ago", status: "confirmed" },
  { hash: "0x2f6g...d5e4", type: "Mint", amount: "0.05 ETH", time: "18 min ago", status: "pending" },
  { hash: "0x3g7h...e6f5", type: "Royalty", amount: "0.008 ETH", time: "25 min ago", status: "confirmed" },
]

const gasData = {
  current: 25,
  average24h: 32,
  peak: 85,
  recommended: "Medium",
}

export function Web3MetricsSection() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash)
    toast.success("Transaction hash copied to clipboard")
  }

  const handleViewOnChain = (hash: string) => {
    toast.info("Opening block explorer...", {
      description: `Viewing transaction ${hash}`
    })
    // In production: window.open(`https://etherscan.io/tx/${hash}`, '_blank')
  }

  const handleRefreshGas = async () => {
    setIsRefreshing(true)
    await new Promise(r => setTimeout(r, 1000))
    setIsRefreshing(false)
    toast.success("Gas prices updated")
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Blockchain Transaction Analytics */}
      <Card className="col-span-12 lg:col-span-6 bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Blockchain Transactions
          </CardTitle>
          <p className="text-sm text-gray-400">Real-time on-chain activity</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold text-white font-mono">2,847</div>
              <div className="text-xs text-gray-500">Total Txns</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold text-green-400 font-mono">0.0025</div>
              <div className="text-xs text-gray-500">Avg Gas (ETH)</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold text-white font-mono">12</div>
              <div className="text-xs text-gray-500">Failed (0.4%)</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold text-blue-400 font-mono">2.3m</div>
              <div className="text-xs text-gray-500">Avg Confirm</div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Recent Transactions</h4>
            <div className="space-y-2">
              {recentTransactions.map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${tx.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                    <span className="font-mono text-sm text-gray-300">{tx.hash}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      tx.type === 'Mint' ? 'bg-violet-500/20 text-violet-400' :
                      tx.type === 'Transfer' ? 'bg-blue-500/20 text-blue-400' :
                      tx.type === 'Resale' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>{tx.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white font-mono">{tx.amount}</span>
                    <span className="text-xs text-gray-500">{tx.time}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button onClick={() => handleCopyHash(tx.hash)} className="p-1 hover:bg-white/10 rounded">
                        <Copy className="w-3 h-3 text-gray-400" />
                      </button>
                      <button onClick={() => handleViewOnChain(tx.hash)} className="p-1 hover:bg-white/10 rounded">
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NFT Secondary Market */}
      <Card className="col-span-12 lg:col-span-3 bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Repeat className="w-4 h-4 text-emerald-500" />
            NFT Resales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
              <span className="text-sm text-gray-400">Total Resales</span>
              <span className="text-xl font-bold text-white font-mono">234</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
              <span className="text-sm text-gray-400">Volume</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">23.4 ETH</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
              <span className="text-sm text-gray-400">Royalties Earned</span>
              <span className="text-xl font-bold text-violet-400 font-mono">2.34 ETH</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
              <span className="text-sm text-gray-400">Avg Markup</span>
              <span className="text-xl font-bold text-white font-mono flex items-center gap-1">
                +15%
                <TrendingUp className="w-4 h-4 text-green-500" />
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <h5 className="text-xs text-gray-500 uppercase mb-2">Top Traded Events</h5>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Champions League</span>
                <span className="text-white font-mono">12.5 ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Music Festival</span>
                <span className="text-white font-mono">6.2 ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Jazz Night</span>
                <span className="text-white font-mono">4.7 ETH</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gas & Network Stats */}
      <Card className="col-span-12 lg:col-span-3 bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Wallet className="w-4 h-4 text-blue-500" />
            Gas Tracker
          </CardTitle>
          <button 
            onClick={handleRefreshGas}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <RefreshCw className={`w-4 h-4 text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/20">
            <div className="text-4xl font-bold text-green-400 font-mono">{gasData.current}</div>
            <div className="text-sm text-gray-400">Current Gwei</div>
            <div className="text-xs text-green-400 mt-1">🟢 Low - Good to transact</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <div className="text-lg font-bold text-white font-mono">{gasData.average24h}</div>
              <div className="text-xs text-gray-500">24h Avg</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <div className="text-lg font-bold text-red-400 font-mono">{gasData.peak}</div>
              <div className="text-xs text-gray-500">24h Peak</div>
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Recommended</span>
              <span className="text-sm font-medium text-white">{gasData.recommended}</span>
            </div>
            <div className="flex gap-1">
              <div className="flex-1 h-2 bg-green-500 rounded-l-full"></div>
              <div className="flex-1 h-2 bg-yellow-500"></div>
              <div className="flex-1 h-2 bg-red-500 rounded-r-full opacity-30"></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Slow</span>
              <span>Medium</span>
              <span>Fast</span>
            </div>
          </div>

          <p className="text-[10px] text-gray-500 text-center">
            Best time to transact: 2-4 AM UTC
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
