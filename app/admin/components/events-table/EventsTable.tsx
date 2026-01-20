"use client"

import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Eye, Pen, BarChart3, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { eventsData } from './data';
import { EventsFilterBar } from './EventsFilterBar';
import { StatusBadge } from './StatusBadge';
import { ActionMenu } from './ActionMenu';
import { TablePagination } from './TablePagination';
import { EventAnalyticsPanel } from '../EventAnalyticsPanel';
import { Event } from './types';

import { MobileEventCard } from './MobileEventCard';

export default function EventsTable() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [analyticsEvent, setAnalyticsEvent] = useState<Event | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filtered data with memoization
  const filteredEvents = useMemo(() => {
    return eventsData.filter(event => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      
      // Category filter  
      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const toggleSelectAll = () => {
    if (selectedEvents.length === filteredEvents.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(filteredEvents.map(e => e.id));
    }
  };

  const toggleSelectEvent = (id: string) => {
    if (selectedEvents.includes(id)) {
      setSelectedEvents(selectedEvents.filter(e => e !== id));
    } else {
      setSelectedEvents([...selectedEvents, id]);
    }
  };

  // Helper to get category tag color classes
  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      red: 'bg-red-500/10 text-red-400 border-red-500/20',
      orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      gray: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    return colors[color] || colors.gray;
  };

  // Helper to get progress bar color based on usage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-emerald-500";
    if (percentage > 75) return "bg-emerald-400"; // High sales
    if (percentage > 40) return "bg-orange-400";  // Medium sales
    return "bg-blue-400"; // Low/Starting sales
  };

  return (
    <div className="space-y-4">
      <EventsFilterBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        totalEvents={eventsData.length}
        filteredCount={filteredEvents.length}
      />

      {/* --- DESKTOP TABLE VIEW --- */}
      <div className="hidden md:block rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-[#0A0E27]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0E27]/80 sticky top-0 z-10">
            <TableRow className="hover:bg-transparent border-white/10">
              <TableHead className="w-[40px] pl-4">
                <Checkbox 
                  checked={selectedEvents.length === filteredEvents.length && filteredEvents.length > 0}
                  onCheckedChange={toggleSelectAll}
                  className="border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                />
              </TableHead>
              <TableHead className="w-[80px]">Thumbnail</TableHead>
              <TableHead className="min-w-[200px]">
                <Button variant="ghost" className="h-8 -ml-3 hover:bg-transparent text-gray-400 hover:text-white font-medium">
                  Event Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="min-w-[140px]">
                <Button variant="ghost" className="h-8 -ml-3 hover:bg-transparent text-gray-400 hover:text-white font-medium">
                  Date & Time
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-gray-400 font-medium">Location</TableHead>
              <TableHead className="min-w-[120px]">
                <Button variant="ghost" className="h-8 -ml-3 hover:bg-transparent text-gray-400 hover:text-white font-medium">
                  Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[160px]">
                <Button variant="ghost" className="h-8 -ml-3 hover:bg-transparent text-gray-400 hover:text-white font-medium">
                  Sold / Total
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="min-w-[100px]">
                <Button variant="ghost" className="h-8 -ml-3 hover:bg-transparent text-gray-400 hover:text-white font-medium">
                  Revenue
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px] text-gray-400 font-medium">Status</TableHead>
              <TableHead className="w-[160px] text-right text-gray-400 font-medium pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => {
              const salesPercentage = Math.round((event.ticketsSold / event.ticketsTotal) * 100);
              const isSelected = selectedEvents.includes(event.id);

              return (
                <TableRow 
                  key={event.id}
                  className={`
                    group border-white/[0.05] transition-all duration-200 h-[80px]
                    hover:bg-white/[0.05] relative
                    ${isSelected ? 'bg-indigo-500/5 hover:bg-indigo-500/10' : ''}
                  `}
                >
                  {/* Left Gradient Border Effect on Hover/Selected */}
                  <TableCell className="pl-4 py-3 relative">
                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-200 ${isSelected ? 'bg-indigo-500' : 'bg-transparent group-hover:bg-indigo-500/50'}`} />
                    <Checkbox 
                      checked={isSelected}
                      onCheckedChange={() => toggleSelectEvent(event.id)}
                      className="border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                    />
                  </TableCell>
                  
                  <TableCell className="py-3">
                    <div className="h-12 w-12 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                      <img 
                        src={event.thumbnail} 
                        alt={event.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-medium text-white text-[15px]">{event.name}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold border w-fit ${getCategoryColor(event.categoryColor)}`}>
                        {event.category}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-3 text-gray-300 text-sm">
                    <div className="flex flex-col">
                      <span className="text-white">{event.date}</span>
                      <span className="text-gray-500 font-mono text-xs">{event.time}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-3 text-gray-300 text-sm truncate max-w-[150px]">
                    {event.location}
                  </TableCell>
                  
                  <TableCell className="py-3">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">${event.priceUsd}</span>
                      <span className="text-indigo-400 text-xs font-mono">{event.priceEth} ETH</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-3">
                    <div className="flex flex-col gap-1.5 w-full max-w-[140px]">
                      <div className="flex justify-between text-xs">
                        <span className="text-white font-medium">{event.ticketsSold}/{event.ticketsTotal}</span>
                        <span className="text-gray-400">{salesPercentage}%</span>
                      </div>
                      <Progress value={salesPercentage} className="h-1.5 bg-white/10" indicatorClassName={getProgressColor(salesPercentage)} />
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-3">
                    <span className="text-white font-medium font-mono">
                      ${event.revenue.toLocaleString()}
                    </span>
                  </TableCell>
                  
                  <TableCell className="py-3">
                    <StatusBadge status={event.status} />
                  </TableCell>
                  
                  <TableCell className="py-3 text-right pr-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10" title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10" title="Edit">
                        <Pen className="h-4 w-4" />
                      </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10" 
                          title="Analytics"
                          onClick={() => setAnalyticsEvent(event)}
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      <ActionMenu />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        <TablePagination />
      </div>

      {/* --- MOBILE CARD LIST VIEW --- */}
      <div className="md:hidden space-y-4">
          {filteredEvents.map((event) => (
             <MobileEventCard key={event.id} event={event} onAnalyticsClick={setAnalyticsEvent} />
          ))}
          <TablePagination />
      </div>

      <EventAnalyticsPanel 
        isOpen={!!analyticsEvent} 
        onClose={() => setAnalyticsEvent(null)} 
        event={analyticsEvent} 
      />
    </div>
  );
}
