"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentSales = [
  {
    id: "1",
    name: "Alice Chen",
    email: "alice@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    event: "Jazz Night Under Stars",
    amount: "$50.00",
    crypto: "0.02 ETH",
    time: "2 min ago",
    walletAddress: "0x7a9B...4c2D"
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@web3.io",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    event: "Web3 Developers Summit",
    amount: "$120.00",
    crypto: "0.048 ETH",
    time: "15 min ago",
    walletAddress: "0x3B2E...8C10"
  },
  {
    id: "3",
    name: "Sarah Williams",
    email: "sarah@design.co",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    event: "Champions League Final",
    amount: "$200.00",
    crypto: "0.08 ETH",
    time: "32 min ago",
    walletAddress: "0x9A1F...2D44"
  },
  {
    id: "4", 
    name: "James Park",
    email: "james@startup.io",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    event: "Jazz Night Under Stars",
    amount: "$50.00",
    crypto: "0.02 ETH",
    time: "1 hour ago",
    walletAddress: "0x5C8D...7E3A"
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma@nft.art",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    event: "Modern Art Gallery Opening",
    amount: "$75.00",
    crypto: "0.03 ETH",
    time: "2 hours ago",
    walletAddress: "0x2F6B...9C1E"
  }
]

export function RecentSalesList() {
  return (
    <div className="space-y-4">
      {recentSales.map((sale) => (
        <div key={sale.id} className="flex items-center gap-4 group">
          <Avatar className="h-10 w-10 border border-white/10">
            <AvatarImage src={sale.avatar} alt={sale.name} />
            <AvatarFallback className="bg-purple-500/20 text-purple-400">
              {sale.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{sale.name}</p>
            <p className="text-xs text-gray-500 truncate">{sale.event}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">{sale.amount}</p>
            <p className="text-xs text-purple-400 font-mono">{sale.crypto}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
