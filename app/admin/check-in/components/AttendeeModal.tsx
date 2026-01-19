"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckInRecord } from "./RecentCheckIns"
import { ExternalLink, Copy, UserX, MessageSquare } from "lucide-react"

interface AttendeeModalProps {
  attendee: CheckInRecord | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AttendeeModal({ attendee, open, onOpenChange }: AttendeeModalProps) {
  if (!attendee) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-eureka-card border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Attendee Details</DialogTitle>
          <DialogDescription>
            Ticket information and blockchain verification
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Ticket Preview */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-zinc-800 flex items-center justify-center">
             <div className="text-center p-4">
                <span className="text-4xl">🎟️</span>
                <p className="font-bold text-lg mt-2">{attendee.ticketType} Pass</p>
                <p className="text-sm text-gray-400">NFT Ticket Preview</p>
             </div>
          </div>

          <div className="space-y-4">
             {/* Wallet Address */}
             <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <label className="text-xs text-gray-500 uppercase font-semibold mb-1 block">Wallet Address</label>
                <div className="flex items-center justify-between">
                   <code className="text-sm text-eureka-primary font-mono truncate mr-2">
                      {attendee.wallet}
                   </code>
                   <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
                      <Copy className="h-3 w-3" />
                   </Button>
                </div>
             </div>

             {/* Info Grid */}
             <div className="grid grid-cols-2 gap-3">
                 <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <label className="text-xs text-gray-500 uppercase font-semibold mb-1 block">Status</label>
                    <div className="flex items-center text-sm">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                       Checked In
                    </div>
                 </div>
                 <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <label className="text-xs text-gray-500 uppercase font-semibold mb-1 block">Time</label>
                    <span className="text-sm text-white">{attendee.timestamp}</span>
                 </div>
             </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
              <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700">
                 <ExternalLink className="w-4 h-4 mr-2" />
                 View on Blockchain
              </Button>
              <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="border-zinc-800 text-gray-300 hover:bg-zinc-900 hover:text-white">
                     <MessageSquare className="w-4 h-4 mr-2" />
                     Contact
                  </Button>
                  <Button variant="outline" className="border-red-900/30 text-red-400 hover:bg-red-950/30 hover:text-red-300">
                     <UserX className="w-4 h-4 mr-2" />
                     Mark No-Show
                  </Button>
              </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
