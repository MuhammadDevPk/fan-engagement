"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, User, Loader2 } from "lucide-react"

// Types - Extended with more fields
export interface CheckInRecord {
    id: string
    wallet: string
    fullWallet?: string
    ticketType: "VIP" | "General" | "Staff"
    timestamp: string
    avatarUrl?: string
    isSyncPending?: boolean
    ticketId?: string
    seat?: string
    perks?: string[]
    nftImageUrl?: string
}

interface RecentCheckInsProps {
    checkIns: CheckInRecord[]
    onItemClick: (record: CheckInRecord) => void
}

// Helper to get ticket type colors
const getTicketTypeStyles = (type: string) => {
    switch (type) {
        case "VIP":
            return "bg-purple-500/10 text-purple-400 border-purple-500/30"
        case "Staff":
            return "bg-amber-500/10 text-amber-400 border-amber-500/30"
        default:
            return "bg-blue-500/10 text-blue-400 border-blue-500/30"
    }
}

export default function RecentCheckIns({ checkIns, onItemClick }: RecentCheckInsProps) {
    if (checkIns.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-500">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-zinc-700" />
                </div>
                <p className="text-sm font-medium">No check-ins found</p>
                <p className="text-xs text-gray-600 mt-1">Try adjusting your search or filter</p>
            </div>
        )
    }

    return (
        <div className="flex-1 bg-zinc-950 flex flex-col min-h-0 overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                    Recent Check-ins
                </h3>
                <span className="text-[10px] text-gray-600 font-medium">
                    {checkIns.length} shown
                </span>
            </div>
            
            <ScrollArea className="flex-1">
                <div className="divide-y divide-zinc-900/50">
                    {checkIns.map((record, index) => (
                        <div 
                            key={record.id}
                            className="flex items-center gap-3 p-4 hover:bg-zinc-900/50 active:bg-zinc-900 transition-all cursor-pointer group"
                            onClick={() => onItemClick(record)}
                            style={{
                                animationDelay: `${index * 50}ms`
                            }}
                        >
                            <div className="relative">
                                <Avatar className="h-11 w-11 border-2 border-zinc-800 group-hover:border-zinc-700 transition-colors">
                                    <AvatarImage src={record.avatarUrl} />
                                    <AvatarFallback className="bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-400">
                                        <User className="h-5 w-5" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className={`absolute -bottom-1 -right-1 rounded-full p-0.5 border-2 border-zinc-950 ${
                                    record.isSyncPending 
                                        ? 'bg-amber-500' 
                                        : 'bg-emerald-500'
                                }`}>
                                    {record.isSyncPending ? (
                                        <Loader2 className="h-2.5 w-2.5 text-black animate-spin" />
                                    ) : (
                                        <Check className="h-2.5 w-2.5 text-black stroke-[3]" />
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-mono text-sm text-white truncate max-w-[140px] group-hover:text-eureka-primary transition-colors">
                                        {record.wallet}
                                    </span>
                                    <span className="text-[11px] text-gray-500 ml-2 flex-shrink-0">
                                        {record.timestamp}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`
                                        text-[10px] px-2 py-0.5 rounded-full border font-medium
                                        ${getTicketTypeStyles(record.ticketType)}
                                    `}>
                                        {record.ticketType}
                                    </span>
                                    {record.ticketId && (
                                        <span className="text-[10px] text-gray-600 font-mono">
                                            #{record.ticketId}
                                        </span>
                                    )}
                                    {record.isSyncPending && (
                                        <span className="text-[10px] text-amber-500 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                            Syncing...
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Hover indicator */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}
