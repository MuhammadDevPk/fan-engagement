"use client"

import React from 'react';
import { Search, LayoutGrid, List, Download, Calendar, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface EventsFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  totalEvents: number;
  filteredCount: number;
}

export function EventsFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  totalEvents,
  filteredCount
}: EventsFilterBarProps) {
  
  const handleExport = () => {
    toast.success("Export started", {
      description: "Your events CSV is being generated..."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📋</span> All Events
        </h2>
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Showing {filteredCount} of {totalEvents} events</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center justify-between bg-[#0A0E27]/50 p-1 rounded-xl">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search events..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-[#0A0E27] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500/50"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[130px] bg-[#0A0E27] border-white/10 text-gray-300">
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#0A0E27] border-white/10 text-gray-300">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Live">Live</SelectItem>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Ended">Ended</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Sold Out">Sold Out</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="7days">
            <SelectTrigger className="w-[150px] bg-[#0A0E27] border-white/10 text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                <SelectValue placeholder="Date Range" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#0A0E27] border-white/10 text-gray-300">
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="month">This month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[140px] bg-[#0A0E27] border-white/10 text-gray-300">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#0A0E27] border-white/10 text-gray-300">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Music">Music</SelectItem>
              <SelectItem value="Tech">Tech</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
              <SelectItem value="Art">Art</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Gaming">Gaming</SelectItem>
              <SelectItem value="Social">Social</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View & Actions */}
        <div className="flex items-center gap-2 border-l border-white/10 pl-2 ml-2 lg:ml-0">
          <div className="flex items-center bg-[#0A0E27] rounded-lg p-1 border border-white/10">
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md bg-white/10 text-white">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-gray-400 hover:text-white">
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            className="h-9 border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
}

