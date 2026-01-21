"use client"

import { useState, useMemo } from "react"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  Eye, 
  CornerUpLeft, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Copy,
  ExternalLink,
  Zap,
  CreditCard,
  Mail,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

// Extended mock data - 15 transactions
const allTransactions = [
  {
    id: "TXN-001234",
    hash: "0xa1b2c3d4e5f6789012345678901234567890abcd",
    date: "Jan 25, 2026",
    time: "19:30",
    event: "Jazz Night",
    category: "Music",
    customer: "0x7a9bc12d34e56f789012345678901234567890ab",
    email: "john@email.com",
    amount: 100,
    crypto: "0.036 ETH",
    fees: 10,
    net: 90,
    method: "Ethereum",
    network: "Mainnet",
    status: "Completed",
    type: "crypto",
    ticketQty: 2
  },
  {
    id: "TXN-001567",
    hash: "0xb2c3d4e5f6a789012345678901234567890bcde",
    date: "Jan 24, 2026",
    time: "09:15",
    event: "Web3 Summit",
    category: "Tech",
    customer: "0x9f3e4a5b6c7d890123456789012345678901cdef",
    email: "alice@web3.io",
    amount: 240,
    crypto: "0.096 ETH",
    fees: 24,
    net: 216,
    method: "Polygon",
    network: "Polygon",
    status: "Completed",
    type: "crypto",
    ticketQty: 2
  },
  {
    id: "TXN-001789",
    hash: "pi_3abc123def456789",
    date: "Jan 23, 2026",
    time: "14:22",
    event: "Art Gallery",
    category: "Art",
    customer: "sarah.williams@gmail.com",
    email: "sarah.williams@gmail.com",
    amount: 225,
    crypto: "N/A",
    fees: 8.33,
    net: 216.67,
    method: "Visa",
    last4: "4242",
    status: "Pending",
    type: "fiat",
    ticketQty: 3
  },
  {
    id: "TXN-001890",
    hash: "0xc3d4e5f6a7b8901234567890123456789012efgh",
    date: "Jan 22, 2026",
    time: "10:05",
    event: "Crypto Conference",
    category: "Tech",
    customer: "0x1a2b3c4d5e6f789012345678901234567890ijkl",
    email: "mike@crypto.com",
    amount: 500,
    crypto: "0.2 ETH",
    fees: 50,
    net: 450,
    method: "BSC",
    network: "BSC",
    status: "Failed",
    type: "crypto",
    ticketQty: 1
  },
  {
    id: "TXN-001999",
    hash: "pi_3xyz789abc123456",
    date: "Jan 21, 2026",
    time: "16:45",
    event: "Indie Rock Fest",
    category: "Music",
    customer: "lisa.chen@music.com",
    email: "lisa.chen@music.com",
    amount: 50,
    crypto: "N/A",
    fees: 2.50,
    net: 47.50,
    method: "Mastercard",
    last4: "8888",
    status: "Refunded",
    type: "fiat",
    ticketQty: 1
  },
  {
    id: "TXN-002001",
    hash: "0xd4e5f6a7b8c9012345678901234567890123mnop",
    date: "Jan 20, 2026",
    time: "11:30",
    event: "NFT Art Exhibition",
    category: "Art",
    customer: "0x2b3c4d5e6f7a890123456789012345678901qrst",
    email: "david@nft.gallery",
    amount: 180,
    crypto: "0.072 ETH",
    fees: 18,
    net: 162,
    method: "Ethereum",
    network: "Mainnet",
    status: "Completed",
    type: "crypto",
    ticketQty: 2
  },
  {
    id: "TXN-002102",
    hash: "0xe5f6a7b8c9d0123456789012345678901234uvwx",
    date: "Jan 19, 2026",
    time: "20:15",
    event: "Electronic Music Festival",
    category: "Music",
    customer: "0x3c4d5e6f7a8b901234567890123456789012yzab",
    email: "emma@edm.fan",
    amount: 350,
    crypto: "0.14 ETH",
    fees: 35,
    net: 315,
    method: "Polygon",
    network: "Polygon",
    status: "Completed",
    type: "crypto",
    ticketQty: 2
  },
  {
    id: "TXN-002203",
    hash: "pi_4def456ghi789012",
    date: "Jan 18, 2026",
    time: "13:45",
    event: "Champions League Final",
    category: "Sports",
    customer: "james.smith@sports.net",
    email: "james.smith@sports.net",
    amount: 800,
    crypto: "N/A",
    fees: 29.60,
    net: 770.40,
    method: "Amex",
    last4: "1234",
    status: "Completed",
    type: "fiat",
    ticketQty: 2
  },
  {
    id: "TXN-002304",
    hash: "0xf6a7b8c9d0e1234567890123456789012345cdef",
    date: "Jan 17, 2026",
    time: "08:20",
    event: "Startup Pitch Competition",
    category: "Tech",
    customer: "0x4d5e6f7a8b9c012345678901234567890123ghij",
    email: "investor@vc.fund",
    amount: 150,
    crypto: "60 USDC",
    fees: 15,
    net: 135,
    method: "USDC",
    network: "Polygon",
    status: "Completed",
    type: "crypto",
    ticketQty: 1
  },
  {
    id: "TXN-002405",
    hash: "0xa7b8c9d0e1f2345678901234567890123456klmn",
    date: "Jan 16, 2026",
    time: "17:00",
    event: "Wine & Crypto Networking",
    category: "Social",
    customer: "0x5e6f7a8b9c0d123456789012345678901234opqr",
    email: "sommelier@wine.club",
    amount: 275,
    crypto: "0.11 ETH",
    fees: 27.50,
    net: 247.50,
    method: "Ethereum",
    network: "Mainnet",
    status: "Completed",
    type: "crypto",
    ticketQty: 1
  },
  {
    id: "TXN-002506",
    hash: "pi_5ghi789jkl012345",
    date: "Jan 15, 2026",
    time: "12:30",
    event: "Blockchain Gaming Tournament",
    category: "Gaming",
    customer: "pro.gamer@esports.gg",
    email: "pro.gamer@esports.gg",
    amount: 95,
    crypto: "N/A",
    fees: 3.52,
    net: 91.48,
    method: "Visa",
    last4: "5678",
    status: "Pending",
    type: "fiat",
    ticketQty: 1
  },
  {
    id: "TXN-002607",
    hash: "0xb8c9d0e1f2a3456789012345678901234567stuv",
    date: "Jan 14, 2026",
    time: "19:45",
    event: "Jazz Night",
    category: "Music",
    customer: "0x6f7a8b9c0d1e234567890123456789012345wxyz",
    email: "melody@jazz.lover",
    amount: 150,
    crypto: "0.06 ETH",
    fees: 15,
    net: 135,
    method: "Ethereum",
    network: "Mainnet",
    status: "Completed",
    type: "crypto",
    ticketQty: 3
  },
  {
    id: "TXN-002708",
    hash: "0xc9d0e1f2a3b4567890123456789012345678abcd",
    date: "Jan 13, 2026",
    time: "15:10",
    event: "Web3 Summit",
    category: "Tech",
    customer: "0x7a8b9c0d1e2f345678901234567890123456efgh",
    email: "developer@dao.org",
    amount: 360,
    crypto: "0.144 ETH",
    fees: 36,
    net: 324,
    method: "Polygon",
    network: "Polygon",
    status: "Completed",
    type: "crypto",
    ticketQty: 3
  },
  {
    id: "TXN-002809",
    hash: "pi_6jkl012mno345678",
    date: "Jan 12, 2026",
    time: "10:00",
    event: "Art Gallery",
    category: "Art",
    customer: "collector@fine.art",
    email: "collector@fine.art",
    amount: 450,
    crypto: "N/A",
    fees: 16.65,
    net: 433.35,
    method: "Mastercard",
    last4: "9999",
    status: "Completed",
    type: "fiat",
    ticketQty: 2
  },
  {
    id: "TXN-002910",
    hash: "0xd0e1f2a3b4c5678901234567890123456789ijkl",
    date: "Jan 11, 2026",
    time: "21:30",
    event: "Electronic Music Festival",
    category: "Music",
    customer: "0x8b9c0d1e2f3a456789012345678901234567mnop",
    email: "raver@party.zone",
    amount: 525,
    crypto: "0.21 ETH",
    fees: 52.50,
    net: 472.50,
    method: "BSC",
    network: "BSC",
    status: "Completed",
    type: "crypto",
    ticketQty: 3
  },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'failed': return 'bg-red-500/10 text-red-500 border-red-500/20'
    case 'refunded': return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTxn, setSelectedTxn] = useState<typeof allTransactions[0] | null>(null)
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false)
  const [isProcessingRefund, setIsProcessingRefund] = useState(false)
  const itemsPerPage = 5

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(txn => {
      const matchesSearch = 
        txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || txn.status.toLowerCase() === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredTransactions.slice(start, start + itemsPerPage)
  }, [filteredTransactions, currentPage])

  // Handlers
  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash)
    toast.success("Transaction hash copied to clipboard")
  }

  const handleViewDetails = (txn: typeof allTransactions[0]) => {
    setSelectedTxn(txn)
  }

  const handleDownloadInvoice = (txn: typeof allTransactions[0]) => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: `Generating invoice for ${txn.id}...`,
        success: `Invoice ${txn.id}.pdf downloaded!`,
        error: "Failed to generate invoice",
      }
    )
  }

  const handleViewOnExplorer = (txn: typeof allTransactions[0]) => {
    const explorers: Record<string, string> = {
      'Mainnet': 'https://etherscan.io/tx/',
      'Polygon': 'https://polygonscan.com/tx/',
      'BSC': 'https://bscscan.com/tx/',
    }
    const baseUrl = explorers[txn.network || 'Mainnet'] || explorers['Mainnet']
    toast.info("Opening block explorer...", {
      description: `${baseUrl}${txn.hash.slice(0, 10)}...`,
    })
    // In real app: window.open(`${baseUrl}${txn.hash}`, '_blank')
  }

  const handleRefund = (txn: typeof allTransactions[0]) => {
    setSelectedTxn(txn)
    setIsRefundDialogOpen(true)
  }

  const processRefund = async () => {
    setIsProcessingRefund(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessingRefund(false)
    setIsRefundDialogOpen(false)
    toast.success("Refund processed successfully!", {
      description: `$${selectedTxn?.amount} will be returned to the customer.`,
    })
  }

  const handleExportAll = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: "Exporting transactions...",
        success: `Exported ${filteredTransactions.length} transactions as CSV`,
        error: "Export failed",
      }
    )
  }

  const handleAdvancedFilters = () => {
    toast.info("Advanced Filters", {
      description: "Date range, amount range, and payment method filters coming soon!",
    })
  }

  // Status counts
  const statusCounts = useMemo(() => ({
    all: allTransactions.length,
    completed: allTransactions.filter(t => t.status === 'Completed').length,
    pending: allTransactions.filter(t => t.status === 'Pending').length,
    failed: allTransactions.filter(t => t.status === 'Failed').length,
    refunded: allTransactions.filter(t => t.status === 'Refunded').length,
  }), [])

  return (
    <>
      <Card className="bg-eureka-card border-eureka-card backdrop-blur-md">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-white">Transactions</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your earnings, refunds, and view detailed transaction history.
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search by hash, event, customer..."
                  className="pl-9 w-[200px] md:w-[300px] bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-primary"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1) // Reset to page 1 on search
                  }}
                />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-black/20 border-white/10 hover:bg-white/10 text-gray-300"
                onClick={handleAdvancedFilters}
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-black/20 border-white/10 hover:bg-white/10 text-gray-300"
                onClick={handleExportAll}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Status Filter Chips */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {(["All", "Completed", "Pending", "Failed", "Refunded"] as const).map((status) => (
              <Badge 
                key={status}
                variant={statusFilter === status.toLowerCase() ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap ${
                  statusFilter === status.toLowerCase() 
                    ? 'bg-brand-primary hover:bg-brand-primary/80' 
                    : 'text-gray-400 border-white/10 hover:bg-white/5'
                }`}
                onClick={() => {
                  setStatusFilter(status.toLowerCase())
                  setCurrentPage(1)
                }}
              >
                {status} ({statusCounts[status.toLowerCase() as keyof typeof statusCounts]})
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-black/20">
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead className="text-gray-400 w-[130px]">Date & Time</TableHead>
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
                {paginatedTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center text-gray-500">
                      No transactions found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedTransactions.map((txn) => (
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
                            {txn.hash.slice(0, 10)}...{txn.hash.slice(-4)}
                            <button 
                              onClick={() => handleCopyHash(txn.hash)}
                              className="hover:text-white transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
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
                          <span className="text-white text-xs font-mono">
                            {txn.customer.includes('@') 
                              ? txn.customer 
                              : `${txn.customer.slice(0, 6)}...${txn.customer.slice(-4)}`}
                          </span>
                          <span className="text-xs text-gray-500">{txn.ticketQty}× tickets</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-white font-medium">${txn.amount.toFixed(2)}</span>
                          <span className="text-xs text-gray-500">
                            Net: <span className="font-bold text-gray-300">${txn.net.toFixed(2)}</span>
                          </span>
                          {txn.crypto !== 'N/A' && (
                            <span className="text-[10px] text-brand-primary">{txn.crypto}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {txn.type === 'crypto' 
                            ? <Zap className="w-4 h-4 text-violet-400" /> 
                            : <CreditCard className="w-4 h-4 text-emerald-400" />
                          }
                          <div className="flex flex-col">
                            <span className="text-white text-sm">{txn.method}</span>
                            <span className="text-xs text-gray-500">
                              {txn.type === 'fiat' ? `•••• ${txn.last4}` : txn.network}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`border ${getStatusColor(txn.status)} flex items-center w-fit`}
                        >
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
                            <DropdownMenuItem 
                              className="focus:bg-white/10 cursor-pointer"
                              onClick={() => handleViewDetails(txn)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="focus:bg-white/10 cursor-pointer"
                              onClick={() => handleDownloadInvoice(txn)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Invoice
                            </DropdownMenuItem>
                            {txn.type === 'crypto' && (
                              <DropdownMenuItem 
                                className="focus:bg-white/10 cursor-pointer"
                                onClick={() => handleViewOnExplorer(txn)}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View on Explorer
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem 
                              className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
                              onClick={() => handleRefund(txn)}
                              disabled={txn.status === 'Refunded' || txn.status === 'Failed'}
                            >
                              <CornerUpLeft className="w-4 h-4 mr-2" />
                              Refund Transaction
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4 text-sm text-gray-400">
            <div>
              Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 bg-transparent border-white/10 hover:bg-white/10"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 bg-transparent border-white/10 hover:bg-white/10"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "secondary" : "outline"}
                      size="sm"
                      className={`h-8 w-8 p-0 ${
                        currentPage === pageNum 
                          ? 'bg-brand-primary text-white' 
                          : 'bg-transparent border-transparent hover:bg-white/10'
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 bg-transparent border-white/10 hover:bg-white/10"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 bg-transparent border-white/10 hover:bg-white/10"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Detail Dialog */}
      <Dialog open={!!selectedTxn && !isRefundDialogOpen} onOpenChange={() => setSelectedTxn(null)}>
        <DialogContent className="bg-[#1a1b26] border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedTxn?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedTxn && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400">Date & Time</div>
                  <div className="text-white">{selectedTxn.date} {selectedTxn.time}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Status</div>
                  <Badge variant="outline" className={`${getStatusColor(selectedTxn.status)} mt-1`}>
                    {getStatusIcon(selectedTxn.status)}
                    {selectedTxn.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-400">Event</div>
                <div className="text-white">{selectedTxn.event} ({selectedTxn.category})</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-400">Customer</div>
                <div className="text-white font-mono text-sm">{selectedTxn.customer}</div>
                <div className="text-gray-400 text-sm">{selectedTxn.email}</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-400">Transaction Hash</div>
                <div className="flex items-center gap-2">
                  <code className="text-brand-primary text-xs bg-white/5 p-2 rounded flex-1 overflow-hidden">
                    {selectedTxn.hash}
                  </code>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8"
                    onClick={() => handleCopyHash(selectedTxn.hash)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg">
                <div className="text-center">
                  <div className="text-xs text-gray-400">Amount</div>
                  <div className="text-lg font-bold text-white">${selectedTxn.amount.toFixed(2)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Fees</div>
                  <div className="text-lg font-bold text-orange-400">-${selectedTxn.fees.toFixed(2)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Net</div>
                  <div className="text-lg font-bold text-green-400">${selectedTxn.net.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-white/10"
                  onClick={() => handleDownloadInvoice(selectedTxn)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Invoice
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-white/10"
                  onClick={() => {
                    toast.info("Email sent", { description: `Receipt sent to ${selectedTxn.email}` })
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Resend Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Refund Confirmation Dialog */}
      <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
        <DialogContent className="bg-[#1a1b26] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-400">Confirm Refund</DialogTitle>
            <DialogDescription className="text-gray-400">
              This action cannot be undone. The customer will receive a full refund.
            </DialogDescription>
          </DialogHeader>
          {selectedTxn && (
            <div className="py-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction</span>
                  <span className="text-white font-mono">{selectedTxn.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Event</span>
                  <span className="text-white">{selectedTxn.event}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer</span>
                  <span className="text-white">{selectedTxn.email}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-red-500/20">
                  <span className="text-gray-400 font-bold">Refund Amount</span>
                  <span className="text-red-400 font-bold">${selectedTxn.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRefundDialogOpen(false)}
              className="border-white/10"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={processRefund}
              disabled={isProcessingRefund}
            >
              {isProcessingRefund ? "Processing..." : "Confirm Refund"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
