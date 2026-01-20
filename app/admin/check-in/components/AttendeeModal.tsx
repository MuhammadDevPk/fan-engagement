"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckInRecord } from "./RecentCheckIns"
import { ExternalLink, Copy, UserX, MessageSquare, Check, Shield, Ticket } from "lucide-react"
import { toast } from "sonner"

interface AttendeeModalProps {
  attendee: CheckInRecord | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onMarkNoShow?: (attendee: CheckInRecord) => void
}

export default function AttendeeModal({ 
  attendee, 
  open, 
  onOpenChange,
  onMarkNoShow 
}: AttendeeModalProps) {
  const [copied, setCopied] = useState(false)

  if (!attendee) return null

  const handleCopyAddress = async () => {
    const address = attendee.fullWallet || attendee.wallet
    await navigator.clipboard.writeText(address)
    setCopied(true)
    toast.success("Wallet address copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleViewOnBlockchain = () => {
    // Mock blockchain explorer link
    const txHash = `0x${Math.random().toString(16).slice(2, 66)}`
    toast.info("Opening blockchain explorer...", {
      description: `Tx: ${txHash.slice(0, 10)}...${txHash.slice(-8)}`
    })
    // In production: window.open(`https://polygonscan.com/tx/${txHash}`)
  }

  const handleContact = () => {
    toast.info("Contact feature coming soon", {
      description: "This will allow sending notifications to attendees"
    })
  }

  const handleMarkNoShow = () => {
    if (onMarkNoShow && attendee) {
      onMarkNoShow(attendee)
      toast.success("Marked as No-Show", {
        description: `${attendee.ticketId || attendee.wallet} has been removed from check-ins`
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-eureka-primary" />
            Attendee Details
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Ticket #{attendee.ticketId || attendee.wallet.slice(0, 10)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* NFT Ticket Preview */}
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/60 via-indigo-900/40 to-blue-900/60 border border-zinc-800">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <span className="text-5xl mb-3">🎫</span>
              <p className="font-bold text-xl text-white">{attendee.ticketType} Pass</p>
              <p className="text-sm text-gray-300 mt-1">{attendee.ticketId || "NFT Ticket"}</p>
              {attendee.seat && (
                <p className="text-xs text-gray-400 mt-2 bg-black/30 px-3 py-1 rounded-full">
                  Seat: {attendee.seat}
                </p>
              )}
            </div>
            {/* Blockchain verified badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-xs border border-emerald-500/30">
              <Shield className="w-3 h-3" />
              Verified
            </div>
          </div>

          {/* Wallet Address */}
          <div className="p-4 bg-zinc-900/70 rounded-xl border border-zinc-800">
            <label className="text-xs text-gray-500 uppercase font-semibold mb-2 block">
              Wallet Address
            </label>
            <div className="flex items-center justify-between gap-2">
              <code className="text-sm text-eureka-primary font-mono break-all flex-1">
                {attendee.fullWallet || attendee.wallet}
              </code>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-gray-400 hover:text-white flex-shrink-0"
                onClick={handleCopyAddress}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-zinc-900/70 rounded-xl border border-zinc-800">
              <label className="text-xs text-gray-500 uppercase font-semibold mb-2 block">
                Status
              </label>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-white font-medium">Checked In</span>
              </div>
            </div>
            <div className="p-4 bg-zinc-900/70 rounded-xl border border-zinc-800">
              <label className="text-xs text-gray-500 uppercase font-semibold mb-2 block">
                Time
              </label>
              <span className="text-sm text-white font-medium">{attendee.timestamp}</span>
            </div>
          </div>

          {/* Perks Section */}
          {attendee.perks && attendee.perks.length > 0 && (
            <div className="p-4 bg-zinc-900/70 rounded-xl border border-zinc-800">
              <label className="text-xs text-gray-500 uppercase font-semibold mb-3 block">
                Ticket Perks
              </label>
              <div className="flex flex-wrap gap-2">
                {attendee.perks.map((perk, i) => (
                  <span 
                    key={i} 
                    className="text-xs bg-purple-500/10 text-purple-300 px-3 py-1.5 rounded-full border border-purple-500/20"
                  >
                    ✓ {perk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <Button 
              onClick={handleViewOnBlockchain}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 h-11"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Blockchain
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                onClick={handleContact}
                className="border-zinc-800 text-gray-300 hover:bg-zinc-900 hover:text-white h-11"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact
              </Button>
              <Button 
                variant="outline" 
                onClick={handleMarkNoShow}
                className="border-red-900/40 text-red-400 hover:bg-red-950/30 hover:text-red-300 h-11"
              >
                <UserX className="w-4 h-4 mr-2" />
                No-Show
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
