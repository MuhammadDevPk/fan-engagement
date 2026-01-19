"use client"

import { useEffect } from "react"
import { Check, X, AlertTriangle, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export type ScanStatus = "success" | "already-checked-in" | "invalid" | null

interface AttendeeDetails {
  wallet: string
  ticketType: string
  seat?: string
  checkInTime?: string
  reason?: string // For invalid/already checked in
}

interface StatusOverlayProps {
  status: ScanStatus
  details?: AttendeeDetails
  onDismiss: () => void
  onOverride?: () => void
}

export default function StatusOverlay({ 
  status, 
  details, 
  onDismiss, 
  onOverride 
}: StatusOverlayProps) {
  
  // Auto-dismiss for success state only
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        onDismiss()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [status, onDismiss])

  if (!status) return null

  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          bg: "bg-emerald-500", // Fallback
          gradient: "from-emerald-500 to-emerald-700",
          icon: <Check className="w-16 h-16 text-white" />,
          title: "Welcome!",
          message: "Check-in Successful",
          sound: "success.mp3" 
        }
      case "already-checked-in":
        return {
           bg: "bg-orange-500",
           gradient: "from-orange-500 to-orange-700",
           icon: <AlertTriangle className="w-16 h-16 text-white" />,
           title: "Already Checked In",
           message: details?.checkInTime ? `Scanned at ${details.checkInTime}` : "Previously scanned",
           sound: "warning.mp3"
        }
      case "invalid":
        return {
           bg: "bg-red-500",
           gradient: "from-red-500 to-red-700",
           icon: <X className="w-16 h-16 text-white" />,
           title: "Invalid Ticket",
           message: details?.reason || "Ticket not recognized or expired",
           sound: "error.mp3"
        }
    }
  }

  const config = getStatusConfig()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-br ${config?.gradient}`}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-full p-6 mb-6 shadow-xl animate-bounce-subtle">
           {config?.icon}
        </div>

        <h2 className="text-3xl font-bold text-white mb-2 text-center">{config?.title}</h2>
        <p className="text-white/90 text-lg mb-8 text-center">{config?.message}</p>

        {details && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full max-w-sm mb-8 border border-white/20">
             <div className="space-y-3">
                <div className="flex justify-between">
                   <span className="text-white/60">Ticket</span>
                   <span className="text-white font-mono font-medium truncate ml-4">#{details.wallet.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-white/60">Type</span>
                   <span className="text-white font-medium">{details.ticketType}</span>
                </div>
                {details.seat && (
                    <div className="flex justify-between">
                       <span className="text-white/60">Seat</span>
                       <span className="text-white font-medium">{details.seat}</span>
                    </div>
                )}
             </div>
          </div>
        )}

        <div className="flex flex-col gap-3 w-full max-w-xs">
           {status === "success" ? (
             <Button onClick={onDismiss} className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold h-12 rounded-full shadow-lg">
                Next Scan (3s)
             </Button>
           ) : (
             <>
               {status === "already-checked-in" && onOverride && (
                 <Button onClick={onOverride} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none h-12">
                   Override Check-in (Admin)
                 </Button>
               )}
               <Button onClick={onDismiss} className="bg-white text-gray-900 hover:bg-gray-100 font-bold h-12 rounded-full shadow-lg">
                 {status === "invalid" ? "Scan Again" : "Dismiss"}
               </Button>
             </>
           )}
        </div>

      </motion.div>
    </AnimatePresence>
  )
}
