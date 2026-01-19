"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, User } from "lucide-react"

// Types
export interface CheckInRecord {
    id: string
    wallet: string
    ticketType: "VIP" | "General" | "Staff"
    timestamp: string // or Date, using string for simple display for now
    avatarUrl?: string
    isSyncPending?: boolean
}

interface RecentCheckInsProps {
    checkIns: CheckInRecord[]
    onItemClick: (record: CheckInRecord) => void
}

export default function RecentCheckIns({ checkIns, onItemClick }: RecentCheckInsProps) {
    if (checkIns.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center p-8 text-gray-500 text-sm">
                No recent check-ins
            </div>
        )
    }

    return (
        <div className="flex-1 bg-zinc-950 flex flex-col min-h-0">
            <div className="px-4 py-3 border-b border-zinc-900 bg-zinc-950 sticky top-0 z-10">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                    Recent Check-ins
                </h3>
            </div>
            
            <ScrollArea className="flex-1 h-full">
                <div className="divide-y divide-zinc-900">
                    {checkIns.map((record) => (
                        <div 
                            key={record.id}
                            className="flex items-center gap-3 p-4 hover:bg-zinc-900/50 active:bg-zinc-900 transition-colors cursor-pointer"
                            onClick={() => onItemClick(record)}
                        >
                            <div className="relative">
                                <Avatar className="h-10 w-10 border border-zinc-800">
                                    <AvatarImage src={record.avatarUrl} />
                                    <AvatarFallback className="bg-zinc-800 text-zinc-400">
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-zinc-950">
                                    <Check className="h-2 w-2 text-black stroke-[4]" />
                                </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                    <span className="font-mono text-sm text-white truncate max-w-[120px]">
                                        {record.wallet}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {record.timestamp}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`
                                        text-[10px] px-1.5 py-0.5 rounded border
                                        ${record.ticketType === 'VIP' 
                                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}
                                    `}>
                                        {record.ticketType}
                                    </span>
                                    {record.isSyncPending && (
                                        <span className="text-[10px] text-yellow-500">
                                            • Sync pending
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}
