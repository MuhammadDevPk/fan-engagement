"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchFilterBarProps {
  onSearch: (query: string) => void
  onFilterClick: () => void
  activeFiltersCount: number
}

export default function SearchFilterBar({ onSearch, onFilterClick, activeFiltersCount }: SearchFilterBarProps) {
  return (
    <div className="bg-zinc-950 p-4 pb-2 border-b border-zinc-900 sticky top-0 z-10">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by wallet or ticket ID"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-eureka-primary"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className={`border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-gray-400 hover:text-white relative ${activeFiltersCount > 0 ? 'border-eureka-primary/50 text-eureka-primary' : ''}`}
          onClick={onFilterClick}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {activeFiltersCount > 0 && (
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-eureka-primary rounded-full border-2 border-zinc-950" />
          )}
        </Button>
      </div>
      
      {/* Filter Chips (static for UI demo) */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
         <button className="flex-none px-3 py-1 bg-white text-black text-xs font-semibold rounded-full">All (234)</button>
         <button className="flex-none px-3 py-1 bg-zinc-900 border border-zinc-800 text-gray-400 text-xs font-medium rounded-full">Checked In (178)</button>
         <button className="flex-none px-3 py-1 bg-zinc-900 border border-zinc-800 text-gray-400 text-xs font-medium rounded-full">Not Checked In (56)</button>
         <button className="flex-none px-3 py-1 bg-zinc-900 border border-zinc-800 text-gray-400 text-xs font-medium rounded-full">VIP (45)</button>
      </div>
    </div>
  )
}
