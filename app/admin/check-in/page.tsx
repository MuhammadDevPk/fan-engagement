"use client"

import { useState, useMemo, useCallback } from "react"
import CheckInHeader from "./components/CheckInHeader"
import QRScanner from "./components/QRScanner"
import RecentCheckIns, { CheckInRecord } from "./components/RecentCheckIns"
import StatusOverlay, { ScanStatus } from "./components/StatusOverlay"
import AttendeeModal from "./components/AttendeeModal"
import OfflineIndicator from "./components/OfflineIndicator"
import SearchFilterBar from "./components/SearchFilterBar"
import ManualEntryDialog from "./components/ManualEntryDialog"

// Mock Data - Expanded with realistic wallet addresses and timestamps
const MOCK_EVENT = {
  name: "Neon Nights Festival 2026",
  date: "Jan 25, 2026 • Doors 7:00 PM",
  totalAttendees: 500,
}

// Helper to generate realistic wallet addresses
const generateWallet = () => {
  const chars = "0123456789ABCDEF"
  let addr = "0x"
  for (let i = 0; i < 40; i++) {
    addr += chars[Math.floor(Math.random() * 16)]
  }
  return addr
}

// Initial Mock Check-ins to populate list (10+ entries as requested)
const INITIAL_CHECK_INS: CheckInRecord[] = [
  { 
    id: "1", 
    wallet: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", 
    ticketType: "VIP", 
    timestamp: "2 mins ago",
    fullWallet: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    ticketId: "NEON-VIP-001",
    seat: "A12",
    perks: ["Priority Entry", "Backstage Access", "Free Drinks", "Meet & Greet"],
    nftImageUrl: "/placeholder-ticket.png"
  },
  { 
    id: "2", 
    wallet: "0x3B2d8A1B37aA3F3cC6234FC80d8BEc2A1d5847C1", 
    ticketType: "General", 
    timestamp: "5 mins ago",
    fullWallet: "0x3B2d8A1B37aA3F3cC6234FC80d8BEc2A1d5847C1",
    ticketId: "NEON-GA-023",
    seat: "GA Floor",
    perks: ["General Admission"],
    nftImageUrl: "/placeholder-ticket.png"
  },
  { 
    id: "3", 
    wallet: "0x9A1E4F3D2B44c8d9E71F5A23B8C0D456E7F89012", 
    ticketType: "General", 
    timestamp: "8 mins ago",
    fullWallet: "0x9A1E4F3D2B44c8d9E71F5A23B8C0D456E7F89012",
    ticketId: "NEON-GA-045",
    seat: "GA Floor",
    perks: ["General Admission"],
    nftImageUrl: "/placeholder-ticket.png"
  },
  { 
    id: "4", 
    wallet: "0xF4C3B2A1D098E7F654321ABCDEF1234567890ABC", 
    ticketType: "VIP", 
    timestamp: "12 mins ago",
    fullWallet: "0xF4C3B2A1D098E7F654321ABCDEF1234567890ABC",
    ticketId: "NEON-VIP-008",
    seat: "A05",
    perks: ["Priority Entry", "Backstage Access", "Free Drinks", "Meet & Greet"],
    nftImageUrl: "/placeholder-ticket.png"
  },
  { 
    id: "5", 
    wallet: "0x2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B9C0D1E", 
    ticketType: "Staff", 
    timestamp: "15 mins ago",
    fullWallet: "0x2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B9C0D1E",
    ticketId: "NEON-STF-003",
    seat: "N/A",
    perks: ["All Access", "Staff Areas"],
    nftImageUrl: "/placeholder-ticket.png"
  },
  { 
    id: "6", 
    wallet: "0x8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B", 
    ticketType: "General", 
    timestamp: "18 mins ago",
    fullWallet: "0x8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B",
    ticketId: "NEON-GA-067",
    seat: "GA Floor",
    perks: ["General Admission"],
    nftImageUrl: "/placeholder-ticket.png"
  },
  { 
    id: "7", 
    wallet: "0x1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E0F", 
    ticketType: "VIP", 
    timestamp: "22 mins ago",
    fullWallet: "0x1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E0F",
    ticketId: "NEON-VIP-015",
    seat: "A18",
    perks: ["Priority Entry", "Backstage Access", "Free Drinks", "Meet & Greet"],
    nftImageUrl: "/placeholder-ticket.png"
  },
  { 
    id: "8", 
    wallet: "0x5A6B7C8D9E0F1A2B3C4D5E6F7A8B9C0D1E2F3A4B", 
    ticketType: "General", 
    timestamp: "28 mins ago",
    fullWallet: "0x5A6B7C8D9E0F1A2B3C4D5E6F7A8B9C0D1E2F3A4B",
    ticketId: "NEON-GA-089",
    seat: "GA Floor",
    perks: ["General Admission"],
    nftImageUrl: "/placeholder-ticket.png"
  },
  { 
    id: "9", 
    wallet: "0xC0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9", 
    ticketType: "General", 
    timestamp: "35 mins ago",
    fullWallet: "0xC0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9",
    ticketId: "NEON-GA-102",
    seat: "GA Floor",
    perks: ["General Admission"],
    nftImageUrl: "/placeholder-ticket.png",
    isSyncPending: true
  },
  { 
    id: "10", 
    wallet: "0x7E8F9A0B1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F", 
    ticketType: "VIP", 
    timestamp: "42 mins ago",
    fullWallet: "0x7E8F9A0B1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F",
    ticketId: "NEON-VIP-022",
    seat: "A22",
    perks: ["Priority Entry", "Backstage Access", "Free Drinks", "Meet & Greet"],
    nftImageUrl: "/placeholder-ticket.png"
  },
]

export type FilterType = "all" | "checked-in" | "not-checked-in" | "vip"

export default function CheckInPage() {
  const [recentCheckIns, setRecentCheckIns] = useState<CheckInRecord[]>(INITIAL_CHECK_INS)
  const [scanStatus, setScanStatus] = useState<ScanStatus>(null)
  const [scannedDetails, setScannedDetails] = useState<CheckInRecord | null>(null)
  const [selectedAttendee, setSelectedAttendee] = useState<CheckInRecord | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [manualEntryOpen, setManualEntryOpen] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  // Calculate stats
  const totalCheckedIn = recentCheckIns.length + 224 // Base offset for demo
  const vipCount = recentCheckIns.filter(c => c.ticketType === "VIP").length + 35
  const notCheckedInCount = MOCK_EVENT.totalAttendees - totalCheckedIn

  // Filter check-ins based on search and active filter
  const filteredCheckIns = useMemo(() => {
    let filtered = recentCheckIns

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(c => 
        c.wallet.toLowerCase().includes(query) || 
        c.ticketId?.toLowerCase().includes(query) ||
        c.fullWallet?.toLowerCase().includes(query)
      )
    }

    // Apply type filter
    if (activeFilter === "vip") {
      filtered = filtered.filter(c => c.ticketType === "VIP")
    } else if (activeFilter === "checked-in") {
      // All shown are checked in by default
    } else if (activeFilter === "not-checked-in") {
      // For demo, show empty since we only have checked-in records
      filtered = []
    }

    return filtered
  }, [recentCheckIns, searchQuery, activeFilter])

  const handleScan = useCallback((data: string) => {
    if (scanStatus || isScanning) return // Ignore scans while showing status
    
    setIsScanning(true)
    console.log("Scanned:", data)

    // Simulate processing delay
    setTimeout(() => {
      const random = Math.random()
      
      if (data === "error" || random > 0.85) {
        // Invalid ticket
        setScanStatus("invalid")
        setScannedDetails({ 
          id: "invalid",
          wallet: "0x0000...0000", 
          ticketType: "General",
          timestamp: "N/A",
          fullWallet: "0x0000000000000000000000000000000000000000",
          ticketId: "UNKNOWN",
          perks: []
        })
      } else if (data === "used" || random > 0.7) {
        // Already checked in
        setScanStatus("already-checked-in")
        setScannedDetails({ 
          id: "duplicate",
          wallet: "0x555A...1234", 
          ticketType: "General", 
          timestamp: "3:45 PM",
          fullWallet: "0x555A1234567890ABCDEF1234567890ABCDEF1234",
          ticketId: "NEON-GA-025",
          seat: "B42",
          perks: ["General Admission"]
        })
      } else {
        // Success - generate new check-in
        const newWallet = generateWallet()
        const ticketType: "VIP" | "General" | "Staff" = random > 0.3 ? "General" : "VIP"
        const ticketNumber = Math.floor(Math.random() * 500).toString().padStart(3, '0')
        
        const newCheckIn: CheckInRecord = {
          id: Date.now().toString(),
          wallet: `${newWallet.slice(0, 6)}...${newWallet.slice(-4)}`,
          fullWallet: newWallet,
          ticketType,
          timestamp: "Just now",
          ticketId: `NEON-${ticketType === "VIP" ? "VIP" : "GA"}-${ticketNumber}`,
          seat: ticketType === "VIP" ? `A${Math.floor(Math.random() * 30)}` : "GA Floor",
          perks: ticketType === "VIP" 
            ? ["Priority Entry", "Backstage Access", "Free Drinks", "Meet & Greet"]
            : ["General Admission"],
          nftImageUrl: "/placeholder-ticket.png"
        }
        
        setScanStatus("success")
        setScannedDetails(newCheckIn)
        
        // Add to list
        setRecentCheckIns(prev => [newCheckIn, ...prev])
      }
      
      setIsScanning(false)
    }, 800)
  }, [scanStatus, isScanning])

  const handleManualEntry = useCallback((ticketId: string) => {
    setManualEntryOpen(false)
    handleScan(ticketId)
  }, [handleScan])

  const handleItemClick = useCallback((record: CheckInRecord) => {
    setSelectedAttendee(record)
    setModalOpen(true)
  }, [])

  const handleDismissOverlay = useCallback(() => {
    setScanStatus(null)
    setScannedDetails(null)
  }, [])

  const handleOverride = useCallback(() => {
    // Admin override - mark as checked in anyway
    if (scannedDetails) {
      const overrideCheckIn: CheckInRecord = {
        ...scannedDetails,
        id: Date.now().toString(),
        timestamp: "Just now (Override)"
      }
      setRecentCheckIns(prev => [overrideCheckIn, ...prev])
    }
    setScanStatus("success")
  }, [scannedDetails])

  const handleMarkNoShow = useCallback((attendee: CheckInRecord) => {
    setRecentCheckIns(prev => prev.filter(c => c.id !== attendee.id))
    setModalOpen(false)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0 relative overflow-hidden font-sans">
      
      <OfflineIndicator isOffline={isOffline} pendingCount={isOffline ? 5 : 0} />

      <div className="max-w-md mx-auto h-[100dvh] flex flex-col bg-zinc-950 border-x border-zinc-800 shadow-2xl relative">
        <CheckInHeader
          eventName={MOCK_EVENT.name}
          eventDate={MOCK_EVENT.date}
          totalCheckedIn={totalCheckedIn}
          totalAttendees={MOCK_EVENT.totalAttendees}
        />

        {/* Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
            
          <QRScanner 
            onScan={handleScan}
            onManualEntryClick={() => setManualEntryOpen(true)}
            isScanning={isScanning}
          />

          <SearchFilterBar 
            onSearch={setSearchQuery}
            onFilterChange={setActiveFilter}
            activeFilter={activeFilter}
            counts={{
              all: totalCheckedIn,
              checkedIn: totalCheckedIn,
              notCheckedIn: notCheckedInCount,
              vip: vipCount
            }}
          />

          <RecentCheckIns 
            checkIns={filteredCheckIns}
            onItemClick={handleItemClick}
          />

        </div>

        {/* Overlays */}
        <StatusOverlay 
          status={scanStatus}
          details={scannedDetails}
          onDismiss={handleDismissOverlay}
          onOverride={handleOverride}
        />

        <AttendeeModal 
          attendee={selectedAttendee}
          open={modalOpen}
          onOpenChange={setModalOpen}
          onMarkNoShow={handleMarkNoShow}
        />

        <ManualEntryDialog
          open={manualEntryOpen}
          onOpenChange={setManualEntryOpen}
          onSubmit={handleManualEntry}
        />
        
        {/* Toggle Offline Mode Test Button (visible for demo) */}
        <button 
          onClick={() => setIsOffline(!isOffline)}
          className={`absolute top-2 right-2 px-2 py-1 text-[10px] rounded z-50 transition-all ${
            isOffline 
              ? 'bg-yellow-500 text-black' 
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
          }`}
          title="Toggle Offline Mode"
        >
          {isOffline ? '🔴 OFFLINE' : '🟢 ONLINE'}
        </button>

        {/* Demo Scan Buttons (for testing without camera) */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-40">
          <button 
            onClick={() => handleScan("success")}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-full shadow-lg transition-all"
          >
            Demo: Success
          </button>
          <button 
            onClick={() => handleScan("used")}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs rounded-full shadow-lg transition-all"
          >
            Demo: Already Scanned
          </button>
          <button 
            onClick={() => handleScan("error")}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs rounded-full shadow-lg transition-all"
          >
            Demo: Invalid
          </button>
        </div>

      </div>
    </div>
  )
}
