"use client"

import { useState } from "react"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  Eye, 
  CornerUpLeft, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle,
  Copy,
  ExternalLink
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const transactions = [
  {
    id: "TXN-001234",
    hash: "0xabc...123",
    date: "Jan 25, 2026",
    time: "19:30",
    event: "Jazz Night",
    category: "Music",
    customer: "0x7a9b...4c2d",
    email: "john@email.com",
    amount: "$100.00",
    crypto: "0.036 ETH",
    fees: "-$10.00",
    net: "$90.00",
    method: "Ethereum",
    network: "Mainnet",
    status: "Completed",
    type: "crypto"
  },
  {
    id: "TXN-001567",
    hash: "0xdef...456",
    date: "Feb 10, 2026",
    time: "09:15",
    event: "Web3 Summit",
    category: "Tech",
    customer: "0x9f3e...1a7b",
    email: "Anonymous",
    amount: "$120.00",
    crypto: "0.048 ETH",
    fees: "-$12.00",
    net: "$108.00",
    method: "Polygon",
    network: "Polygon",
    status: "Completed",
    type: "crypto"
  },
  {
    id: "TXN-001789",
    hash: "pi_3abc123",
    date: "Feb 12, 2026",
    time: "14:22",
    event: "Art Gallery",
    category: "Art",
    customer: "sarah@email.com",
    email: "sarah@email.com",
    amount: "$225.00",
    crypto: "N/A",
    fees: "-$8.33",
    net: "$216.67",
    method: "Visa",
    last4: "4242",
    status: "Pending",
    type: "fiat"
  },
   {
    id: "TXN-001890",
    hash: "0xghi...789",
    date: "Feb 14, 2026",
    time: "10:05",
    event: "Crypto Conference",
    category: "Tech",
    customer: "0x1a2b...3c4d",
    email: "mike@crypto.com",
    amount: "$500.00",
    crypto: "0.2 ETH",
    fees: "-$50.00",
    net: "$450.00",
    method: "BSC",
    network: "BSC",
    status: "Failed",
    type: "crypto"
  },
  {
    id: "TXN-001999",
    hash: "pi_3xyz789",
    date: "Feb 15, 2026",
    time: "16:45",
    event: "Indie Rock Fest",
    category: "Music",
    customer: "lisa@music.com",
    email: "lisa@music.com",
    amount: "$50.00",
    crypto: "N/A",
    fees: "-$2.50",
    net: "$47.50",
    method: "Mastercard",
    last4: "8888",
    status: "Refunded",
    type: "fiat"
  }
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'pending': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'failed': return 'bg-red-500/10 text-red-500 border-red-500/20'
    case 'refunded': return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    default: return 'bg-gray-500/10 text-gray-500'
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed': return <CheckCircle2 className="w-3 h-3 mr-1" />
    case 'pending': return <Clock className="w-3 h-3 mr-1" />
    case 'failed': return <XCircle className="w-3 h-3 mr-1" />
    case 'refunded': return <CornerUpLeft className="w-3 h-3 mr-1" />
    default: return null
  }
}

export function TransactionsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  return (
    <Card className="bg-eureka-card border-eureka-card backdrop-blur-md bg-white/5 border-white/10">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-white">Transactions</CardTitle>
            <CardDescription className="text-gray-400">Manage your earnings, refunds, and view detailed transaction history.</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by hash, event..."
                className="pl-9 w-[200px] md:w-[300px] bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="bg-black/20 border-white/10 hover:bg-white/10 text-gray-300">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-black/20 border-white/10 hover:bg-white/10 text-gray-300">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Filters Row */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {["All", "Completed", "Pending", "Failed", "Refunded"].map((status) => (
                <Badge 
                    key={status}
                    variant={statusFilter === status.toLowerCase() ? "default" : "outline"}
                    className={`cursor-pointer ${statusFilter === status.toLowerCase() ? 'bg-brand-primary hover:bg-brand-primary/80' : 'text-gray-400 border-white/10 hover:bg-white/5'}`}
                    onClick={() => setStatusFilter(status.toLowerCase())}
                >
                    {status}
                </Badge>
            ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border border-white/10 overflow-hidden">
          <Table>
            <TableHeader className="bg-black/20">
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="text-gray-400 w-[150px]">Date & Time</TableHead>
                <TableHead className="text-gray-400">Transaction ID</TableHead>
                <TableHead className="text-gray-400">Event</TableHead>
                <TableHead className="text-gray-400">Customer</TableHead>
                <TableHead className="text-gray-400 text-right">Amount</TableHead>
                <TableHead className="text-gray-400">Payment</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400 w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                        <span className="font-medium text-white text-sm">{txn.date}</span>
                        <span className="text-xs text-gray-500">{txn.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                        <span className="text-white text-sm font-mono">{txn.id}</span>
                        <div className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                            {txn.hash.substring(0, 8)}...
                            <Copy className="w-3 h-3 cursor-pointer hover:text-white" />
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs text-white uppercase font-bold">
                            {txn.event.substring(0,2)}
                        </div>
                        <div className="flex flex-col">
                             <span className="text-white text-sm">{txn.event}</span>
                             <span className="text-xs text-gray-500">{txn.category}</span>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex flex-col">
                        <span className="text-white text-xs font-mono">{txn.customer}</span>
                        <span className="text-xs text-gray-500">{txn.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                        <span className="text-white font-medium">{txn.amount}</span>
                         <span className="text-xs text-gray-500">Net: <span className="font-bold text-gray-300">{txn.net}</span></span>
                         {txn.crypto !== 'N/A' && <span className="text-[10px] text-brand-primary">{txn.crypto}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                         {txn.type === 'crypto' ? <Zap className="w-4 h-4 text-violet-400" /> : <CreditCard className="w-4 h-4 text-emerald-400" />}
                         <div className="flex flex-col">
                            <span className="text-white text-sm">{txn.method}</span>
                            <span className="text-xs text-gray-500">{txn.type === 'fiat' ? `•••• ${txn.last4}` : txn.network}</span>
                         </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`border ${getStatusColor(txn.status)} flex items-center w-fit`}>
                        {getStatusIcon(txn.status)}
                        {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/10">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#1a1b26] border-white/10 text-gray-300">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                            <Download className="w-4 h-4 mr-2" />
                            Download Invoice
                        </DropdownMenuItem>
                         {txn.type === 'crypto' && (
                             <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View on Explorer
                            </DropdownMenuItem>
                         )}
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer">
                            <CornerUpLeft className="w-4 h-4 mr-2" />
                            Refund Transaction
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination - Basic */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
            <div>Showing 1-5 of 1,847 transactions</div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent border-white/10 hover:bg-white/10" disabled>Previous</Button>
                <div className="flex items-center gap-1">
                    <Button variant="secondary" size="sm" className="h-7 w-7 p-0 text-xs bg-brand-primary text-white">1</Button>
                    <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-xs bg-transparent border-transparent hover:bg-white/10">2</Button>
                    <span className="px-1">...</span>
                    <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-xs bg-transparent border-transparent hover:bg-white/10">74</Button>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent border-white/10 hover:bg-white/10">Next</Button>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
