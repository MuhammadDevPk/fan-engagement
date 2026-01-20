"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, MapPin } from "lucide-react"

interface CheckInHeaderProps {
  eventName: string
  eventDate: string
  totalCheckedIn: number
  totalAttendees: number
}

export default function CheckInHeader({
  eventName,
  eventDate,
  totalCheckedIn,
  totalAttendees,
}: CheckInHeaderProps) {
  const [time, setTime] = useState(new Date())
  const progress = Math.min((totalCheckedIn / totalAttendees) * 100, 100)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Format time with seconds for live feel
  const formattedTime = time.toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit",
    second: "2-digit"
  })

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800 p-4 space-y-4">
      {/* Event Info Row */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-white truncate">{eventName}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-0.5">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{eventDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-mono bg-eureka-primary/10 text-eureka-primary px-3 py-1.5 rounded-lg border border-eureka-primary/20">
          <Clock className="w-4 h-4" />
          <span className="tabular-nums">{formattedTime}</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="w-4 h-4" />
            <span>Total Checked In</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg tabular-nums">
              {totalCheckedIn.toLocaleString()}
            </span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-400">{totalAttendees.toLocaleString()}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
              progress >= 80 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : progress >= 50 
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-blue-500/20 text-blue-400'
            }`}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-eureka-primary to-purple-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* Animated shine effect */}
          <div 
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            style={{ 
              width: `${progress}%`,
              animationDuration: '2s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite'
            }}
          />
        </div>
      </div>
    </div>
  )
}
