"use client"

import { WifiOff, CloudOff } from "lucide-react"

interface OfflineIndicatorProps {
  isOffline: boolean
  pendingCount?: number
}

export default function OfflineIndicator({ isOffline, pendingCount = 0 }: OfflineIndicatorProps) {
  if (!isOffline) return null

  return (
    <div className="bg-yellow-500/90 text-black px-4 py-2 flex items-center justify-between text-sm font-medium animate-in slide-in-from-top duration-300">
        <div className="flex items-center">
            <WifiOff className="w-4 h-4 mr-2" />
            <span>Offline functionality active</span>
        </div>
        {pendingCount > 0 && (
            <div className="flex items-center text-xs bg-yellow-600/20 px-2 py-0.5 rounded-full border border-yellow-700/10">
                <CloudOff className="w-3 h-3 mr-1.5" />
                {pendingCount} pending syncs
            </div>
        )}
    </div>
  )
}
