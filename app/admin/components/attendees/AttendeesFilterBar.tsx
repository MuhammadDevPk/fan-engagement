import React from 'react';
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AttendeesFilterBarProps {
  onSearch: (query: string) => void;
  onToggleFilters: () => void;
  filtersVisible: boolean;
}

export function AttendeesFilterBar({ onSearch, onToggleFilters, filtersVisible }: AttendeesFilterBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center justify-between bg-[#0A0E27]/50 p-2 rounded-xl border border-white/5">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by wallet, email, or ticket ID..." 
            className="pl-9 bg-[#0A0E27] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500/50 h-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Filter Chips & Toggles */}
        <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
               <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer px-3 py-1.5 h-8">All Attendees</Badge>
               <Badge variant="outline" className="border-white/10 text-gray-400 hover:text-white cursor-pointer px-3 py-1.5 h-8 hover:bg-white/5">Active Tickets</Badge>
               <Badge variant="outline" className="border-white/10 text-gray-400 hover:text-white cursor-pointer px-3 py-1.5 h-8 hover:bg-white/5">Check-in Pending</Badge>
               <Badge variant="outline" className="border-white/10 text-gray-400 hover:text-white cursor-pointer px-3 py-1.5 h-8 hover:bg-white/5">VIP Only</Badge>
            </div>

            <div className="h-6 w-px bg-white/10 mx-1 hidden lg:block" />

            <Button 
                variant={filtersVisible ? "secondary" : "ghost"} 
                className={`h-9 border border-transparent ${filtersVisible ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                onClick={onToggleFilters}
            >
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {filtersVisible && <X className="ml-2 h-3.5 w-3.5" />}
            </Button>
        </div>
      </div>
    </div>
  );
}
