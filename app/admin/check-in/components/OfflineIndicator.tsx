"use client"

import { WifiOff, CloudOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface OfflineIndicatorProps {
  isOffline: boolean
  pendingCount?: number
}

export default function OfflineIndicator({ isOffline, pendingCount = 0 }: OfflineIndicatorProps) {
  if (!isOffline) return null

  const handleRetrySync = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: "Attempting to sync...",
        success: "Connection restored! Syncing check-ins...",
        error: "Still offline. Will retry automatically."
      }
    )
  }

  return (
    <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white px-4 py-2.5 flex items-center justify-between text-sm font-medium animate-in slide-in-from-top duration-300 shadow-lg">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4" />
        <span className="font-semibold">Offline Mode</span>
        <span className="text-white/80 hidden sm:inline">• Check-ins will sync when online</span>
      </div>
      <div className="flex items-center gap-3">
        {pendingCount > 0 && (
          <div className="flex items-center gap-1.5 text-xs bg-black/20 px-2.5 py-1 rounded-full">
            <CloudOff className="w-3 h-3" />
            <span className="font-medium">{pendingCount} pending</span>
          </div>
        )}
        <Button
          size="sm"
          variant="secondary"
          className="h-7 px-2 bg-white/20 hover:bg-white/30 text-white border-none text-xs"
          onClick={handleRetrySync}
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Retry
        </Button>
      </div>
    </div>
  )
}
