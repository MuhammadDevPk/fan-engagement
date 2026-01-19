"use client"

import { useState } from "react"
import CheckInHeader from "./components/CheckInHeader"
import QRScanner from "./components/QRScanner"
import RecentCheckIns, { CheckInRecord } from "./components/RecentCheckIns"
import StatusOverlay, { ScanStatus } from "./components/StatusOverlay"
import AttendeeModal from "./components/AttendeeModal"
import OfflineIndicator from "./components/OfflineIndicator"
import SearchFilterBar from "./components/SearchFilterBar"

// Mock Data
const MOCK_EVENT = {
  name: "Neon Nights Festival 2024",
  date: "Oct 15, 2024 • Doors 8:00 PM",
  totalAttendees: 500,
}

// Initial Mock Check-ins to populate list
const INITIAL_CHECK_INS: CheckInRecord[] = [
    { id: "1", wallet: "0x71C...9A21", ticketType: "VIP", timestamp: "2 mins ago" },
    { id: "2", wallet: "0x3B2...8C10", ticketType: "General", timestamp: "5 mins ago" },
    { id: "3", wallet: "0x9A1...2D44", ticketType: "General", timestamp: "12 mins ago" },
]

export default function CheckInPage() {
  const [recentCheckIns, setRecentCheckIns] = useState<CheckInRecord[]>(INITIAL_CHECK_INS)
  const [scanStatus, setScanStatus] = useState<ScanStatus>(null)
  const [scannedDetails, setScannedDetails] = useState<any>(null)
  const [selectedAttendee, setSelectedAttendee] = useState<CheckInRecord | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isOffline, setIsOffline] = useState(false) // Toggle this for testing

  const totalCheckedIn = recentCheckIns.length + 231 // Base offset

  const handleScan = (data: string) => {
      // Simulate Logic based on scanned data
      // For demo purposes, we randomly trigger different states or use specific keywords
      
      console.log("Scanned:", data)

      if (scanStatus) return // Ignore scans while showing status

      // Simulate processing delay
      setTimeout(() => {
        const _random = Math.random()
        
        if (data === "error" || _random > 0.8) {
             setScanStatus("invalid")
             setScannedDetails({ wallet: "Unknown", ticketType: "Unknown", reason: "Ticket signature invalid" })
        } else if (data === "used" || _random > 0.6) {
             setScanStatus("already-checked-in")
             setScannedDetails({ 
                 wallet: "0x555...1234", 
                 ticketType: "General", 
                 checkInTime: "3:45 PM",
                 seat: "B42"
             })
        } else {
             // Success
             const newCheckIn: CheckInRecord = {
                 id: Date.now().toString(),
                 wallet: `0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}...`,
                 ticketType: Math.random() > 0.2 ? "General" : "VIP",
                 timestamp: "Just now"
             }
             
             setScanStatus("success")
             setScannedDetails({ 
                 wallet: newCheckIn.wallet, 
                 ticketType: newCheckIn.ticketType,
                 seat: "A" + Math.floor(Math.random() * 100) 
             })
             
             // Add to list
             setRecentCheckIns(prev => [newCheckIn, ...prev])
        }
      }, 500)
  }

  const handleManualEntry = () => {
      // For demo, just trigger a success scan
      handleScan("manual-entry-success")
  }

  const handleItemClick = (record: CheckInRecord) => {
      setSelectedAttendee(record)
      setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0 relative overflow-hidden font-sans">
      
      <OfflineIndicator isOffline={isOffline} pendingCount={5} />

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
                onManualEntryClick={handleManualEntry}
             />

             {/* Filter/Search Bar Placeholder - Optional enhancement */}
             {/* <div className="h-12 bg-zinc-900 border-b border-zinc-800 flex items-center px-4"><Search className="w-4 h-4 text-gray-500 mr-2" /><span className="text-gray-500 text-sm">Search attendees...</span></div> */}

             <SearchFilterBar 
                 onSearch={(q) => console.log(q)}
                 onFilterClick={() => console.log("filter")}
                 activeFiltersCount={0}
             />

            <RecentCheckIns 
                checkIns={recentCheckIns}
                onItemClick={handleItemClick}
            />

        </div>

        {/* Overlays */}
        <StatusOverlay 
            status={scanStatus}
            details={scannedDetails}
            onDismiss={() => setScanStatus(null)}
            onOverride={() => {
                // Admin override logic
                setScanStatus("success")
            }}
        />

        <AttendeeModal 
            attendee={selectedAttendee}
            open={modalOpen}
            onOpenChange={setModalOpen}
        />
        
        {/* Toggle Offline Mode Test Button (hidden in prod) */}
        <button 
           onClick={() => setIsOffline(!isOffline)}
           className="absolute top-0 right-0 w-4 h-4 opacity-0 hover:opacity-50 bg-red-500 z-50 text-[6px]"
           title="Toggle Offline Mode"
        >
            OFF
        </button>

      </div>
    </div>
  )
}
