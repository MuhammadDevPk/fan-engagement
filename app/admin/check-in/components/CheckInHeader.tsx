"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

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
  const progress = (totalCheckedIn / totalAttendees) * 100

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-eureka-card border-b border-eureka-border p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold text-white">{eventName}</h1>
          <p className="text-sm text-gray-400">{eventDate}</p>
        </div>
        <div className="flex items-center text-sm font-mono text-eureka-primary bg-eureka-primary/10 px-2 py-1 rounded">
          <Clock className="w-4 h-4 mr-1.5" />
          <span>
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Checked In</span>
          <span className="text-white font-medium">
            {totalCheckedIn}/{totalAttendees} ({Math.round(progress)}%)
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-800" indicatorClassName="bg-eureka-primary" />
      </div>
    </div>
  )
}
