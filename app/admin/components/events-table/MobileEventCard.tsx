"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Eye, Pen, BarChart3, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "./StatusBadge"
import { Event } from "./types"

interface MobileEventCardProps {
  event: Event
  onAnalyticsClick: (event: Event) => void
}

export function MobileEventCard({ event, onAnalyticsClick }: MobileEventCardProps) {
  const [expanded, setExpanded] = useState(false)
  const salesPercentage = Math.round((event.ticketsSold / event.ticketsTotal) * 100)

  // Helper to get progress bar color based on usage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-emerald-500"
    if (percentage > 75) return "bg-emerald-400"
    if (percentage > 40) return "bg-orange-400"
    return "bg-blue-400"
  }

  return (
    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden mb-4">
      {/* Main Card Content (Always Visible) */}
      <div 
        className="p-4 flex gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Left: Thumbnail */}
        <div className="flex-shrink-0">
          <div className="h-20 w-20 rounded-lg overflow-hidden border border-white/10 bg-white/5 relative">
            <img 
              src={event.thumbnail} 
              alt={event.name}
              className="h-full w-full object-cover" 
            />
            <div className="absolute top-0 right-0 p-1 bg-black/60 rounded-bl-lg">
                <StatusBadge status={event.status} showLabel={false} className="h-2 w-2 p-0" />
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
                 <h3 className="text-white font-medium truncate pr-2">{event.name}</h3>
                 <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{event.date} • {event.location}</p>
          </div>
          
          <div className="mt-2">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>{event.ticketsSold}/{event.ticketsTotal} Sold</span>
              <span className="text-white font-medium">{salesPercentage}%</span>
            </div>
            <Progress value={salesPercentage} className="h-1 bg-white/10" indicatorClassName={getProgressColor(salesPercentage)} />
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5 bg-black/20"
          >
            <div className="p-4 space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Revenue</span>
                        <span className="text-sm font-mono text-white">${event.revenue.toLocaleString()}</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Price</span>
                        <span className="text-sm font-mono text-white">${event.priceUsd}</span>
                    </div>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" size="sm" className="flex flex-col items-center justify-center p-2 h-auto gap-1 border-white/10 bg-white/5 hover:bg-white/10">
                        <Eye className="h-4 w-4 text-blue-400" />
                        <span className="text-[10px] text-gray-300">View</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex flex-col items-center justify-center p-2 h-auto gap-1 border-white/10 bg-white/5 hover:bg-white/10">
                        <Pen className="h-4 w-4 text-orange-400" />
                        <span className="text-[10px] text-gray-300">Edit</span>
                    </Button>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex flex-col items-center justify-center p-2 h-auto gap-1 border-white/10 bg-white/5 hover:bg-white/10"
                        onClick={() => onAnalyticsClick(event)}
                    >
                        <BarChart3 className="h-4 w-4 text-purple-400" />
                        <span className="text-[10px] text-gray-300">Data</span>
                    </Button>
                     <Button variant="outline" size="sm" className="flex flex-col items-center justify-center p-2 h-auto gap-1 border-white/10 bg-white/5 hover:bg-white/10">
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="text-[10px] text-gray-300">Delete</span>
                    </Button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
