"use client"

import { useEffect, useCallback, useState } from "react"
import { Check, X, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckInRecord } from "./RecentCheckIns"

export type ScanStatus = "success" | "already-checked-in" | "invalid" | null

interface StatusOverlayProps {
  status: ScanStatus
  details: CheckInRecord | null
  onDismiss: () => void
  onOverride?: () => void
}

export default function StatusOverlay({ 
  status, 
  details, 
  onDismiss, 
  onOverride 
}: StatusOverlayProps) {
  const [countdown, setCountdown] = useState(3)
  
  // Auto-dismiss for success state
  useEffect(() => {
    if (status === "success") {
      setCountdown(3)
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            onDismiss()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [status, onDismiss])

  // Play haptic feedback (if available)
  useEffect(() => {
    if (status && 'vibrate' in navigator) {
      if (status === 'success') {
        navigator.vibrate([50, 50, 50])
      } else if (status === 'invalid') {
        navigator.vibrate([100, 50, 100, 50, 100])
      } else {
        navigator.vibrate([100, 50, 100])
      }
    }
  }, [status])

  if (!status) return null

  const config = {
    success: {
      gradient: "from-emerald-600 via-emerald-500 to-teal-500",
      icon: <Check className="w-20 h-20 text-white stroke-[3]" />,
      title: "Welcome!",
      message: "Check-in Successful",
    },
    "already-checked-in": {
      gradient: "from-amber-600 via-orange-500 to-amber-500",
      icon: <AlertTriangle className="w-20 h-20 text-white stroke-[2]" />,
      title: "Already Checked In",
      message: details?.timestamp ? `Previously scanned ${details.timestamp}` : "This ticket was already scanned",
    },
    invalid: {
      gradient: "from-red-600 via-rose-500 to-red-500",
      icon: <X className="w-20 h-20 text-white stroke-[3]" />,
      title: "Invalid Ticket",
      message: "Ticket not found or expired",
    },
  }[status]

  return (
    <AnimatePresence>
      {status && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-br ${config.gradient}`}
        >
          {/* Animated Icon */}
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
            className="bg-white/20 backdrop-blur-md rounded-full p-8 mb-8 shadow-2xl"
          >
            {config.icon}
          </motion.div>

          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-2 text-center"
          >
            {config.title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 text-lg mb-8 text-center"
          >
            {config.message}
          </motion.p>

          {/* Details Card */}
          {details && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 w-full max-w-sm mb-8 border border-white/20 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Ticket ID</span>
                  <span className="text-white font-mono font-bold text-lg">
                    {details.ticketId || `#${details.wallet?.slice(2, 10)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Type</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    details.ticketType === 'VIP' 
                      ? 'bg-purple-500/30 text-purple-200 border border-purple-400/30'
                      : 'bg-blue-500/30 text-blue-200 border border-blue-400/30'
                  }`}>
                    {details.ticketType}
                  </span>
                </div>
                {details.seat && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">Seat</span>
                    <span className="text-white font-semibold">{details.seat}</span>
                  </div>
                )}
                {details.perks && details.perks.length > 0 && (
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-white/70 text-xs block mb-2">Perks</span>
                    <div className="flex flex-wrap gap-1.5">
                      {details.perks.slice(0, 4).map((perk, i) => (
                        <span key={i} className="text-xs bg-white/10 text-white/90 px-2 py-0.5 rounded">
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-3 w-full max-w-xs"
          >
            {status === "success" ? (
              <Button 
                onClick={onDismiss} 
                className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold h-14 rounded-full shadow-lg text-lg"
              >
                Next Scan ({countdown}s)
              </Button>
            ) : (
              <>
                {status === "already-checked-in" && onOverride && (
                  <Button 
                    onClick={onOverride} 
                    variant="secondary" 
                    className="bg-white/20 hover:bg-white/30 text-white border-none h-12 rounded-full"
                  >
                    Override Check-in (Admin)
                  </Button>
                )}
                <Button 
                  onClick={onDismiss} 
                  className="bg-white text-gray-900 hover:bg-gray-100 font-bold h-14 rounded-full shadow-lg text-lg"
                >
                  {status === "invalid" ? "Try Again" : "Dismiss"}
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
