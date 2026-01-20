"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Keyboard, Ticket } from "lucide-react"

interface ManualEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (ticketId: string) => void
}

export default function ManualEntryDialog({ 
  open, 
  onOpenChange, 
  onSubmit 
}: ManualEntryDialogProps) {
  const [ticketId, setTicketId] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    const trimmed = ticketId.trim()
    if (!trimmed) {
      setError("Please enter a ticket ID or wallet address")
      return
    }
    if (trimmed.length < 6) {
      setError("Ticket ID must be at least 6 characters")
      return
    }
    setError("")
    onSubmit(trimmed)
    setTicketId("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        setTicketId("")
        setError("")
      }
      onOpenChange(isOpen)
    }}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-eureka-primary" />
            Manual Ticket Entry
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the ticket ID or wallet address to check in manually
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="relative">
            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input 
              type="text"
              value={ticketId}
              onChange={(e) => {
                setTicketId(e.target.value)
                setError("")
              }}
              onKeyDown={handleKeyDown}
              placeholder="NEON-VIP-001 or 0x71C7..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-eureka-primary/50 focus:border-eureka-primary font-mono"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          <p className="text-xs text-gray-500">
            Format: Ticket ID (e.g., NEON-VIP-001) or full wallet address (0x...)
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-zinc-700 text-gray-300 hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-eureka-primary hover:bg-eureka-primary/90 text-white"
          >
            Check In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
