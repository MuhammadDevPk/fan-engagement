"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type FilterType = "all" | "checked-in" | "not-checked-in" | "vip"

interface SearchFilterBarProps {
  onSearch: (query: string) => void
  onFilterChange: (filter: FilterType) => void
  activeFilter: FilterType
  counts: {
    all: number
    checkedIn: number
    notCheckedIn: number
    vip: number
  }
}

export default function SearchFilterBar({ 
  onSearch, 
  onFilterChange, 
  activeFilter,
  counts 
}: SearchFilterBarProps) {
  const [sortBy, setSortBy] = useState<"time" | "name" | "type">("time")

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "checked-in", label: "Checked In", count: counts.checkedIn },
    { key: "not-checked-in", label: "Not Checked In", count: counts.notCheckedIn },
    { key: "vip", label: "VIP", count: counts.vip },
  ]

  return (
    <div className="bg-zinc-950 p-4 pb-2 border-b border-zinc-900 sticky top-0 z-10">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by wallet or ticket ID"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-eureka-primary transition-all"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-gray-400 hover:text-white gap-1 px-3"
            >
              Sort
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
            <DropdownMenuItem 
              className={`${sortBy === "time" ? "text-eureka-primary" : "text-gray-300"} hover:bg-zinc-800`}
              onClick={() => setSortBy("time")}
            >
              Time
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={`${sortBy === "name" ? "text-eureka-primary" : "text-gray-300"} hover:bg-zinc-800`}
              onClick={() => setSortBy("name")}
            >
              Wallet
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={`${sortBy === "type" ? "text-eureka-primary" : "text-gray-300"} hover:bg-zinc-800`}
              onClick={() => setSortBy("type")}
            >
              Ticket Type
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Filter Chips */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map(filter => (
          <button 
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`flex-none px-3 py-1 text-xs font-medium rounded-full transition-all ${
              activeFilter === filter.key
                ? 'bg-white text-black font-semibold'
                : 'bg-zinc-900 border border-zinc-800 text-gray-400 hover:bg-zinc-800 hover:text-gray-300'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>
    </div>
  )
}
