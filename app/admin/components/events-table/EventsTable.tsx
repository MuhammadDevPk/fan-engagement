"use client"

import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Eye, Pen, BarChart3, Ticket, Plus } from "lucide-react";
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
import { toast } from "sonner";

import { eventsData } from './data';
import { EventsFilterBar } from './EventsFilterBar';
import { StatusBadge } from './StatusBadge';
import { ActionMenu } from './ActionMenu';
import { TablePagination } from './TablePagination';
import { EventAnalyticsPanel } from '../EventAnalyticsPanel';
import { Event, SortField, SortDirection, SortConfig } from './types';
import { MobileEventCard } from './MobileEventCard';

export default function EventsTable() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [analyticsEvent, setAnalyticsEvent] = useState<Event | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // View state
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Sorting state
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'date', direction: 'desc' });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filtered data with memoization
  const filteredEvents = useMemo(() => {
    let result = eventsData.filter(event => {
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

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortConfig.field) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'price':
          comparison = a.priceUsd - b.priceUsd;
          break;
        case 'sold':
          comparison = (a.ticketsSold / a.ticketsTotal) - (b.ticketsSold / b.ticketsTotal);
          break;
        case 'revenue':
          comparison = a.revenue - b.revenue;
          break;
      }
      
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, statusFilter, categoryFilter, sortConfig]);

  // Paginated data
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredEvents.slice(startIndex, endIndex);
  }, [filteredEvents, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredEvents.length / rowsPerPage);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, categoryFilter, rowsPerPage]);

  const handleSort = (field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="ml-2 h-4 w-4 text-indigo-400" />
      : <ArrowDown className="ml-2 h-4 w-4 text-indigo-400" />;
  };

  const toggleSelectAll = () => {
    if (selectedEvents.length === paginatedEvents.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(paginatedEvents.map(e => e.id));
    }
  };

  const toggleSelectEvent = (id: string) => {
    if (selectedEvents.includes(id)) {
      setSelectedEvents(selectedEvents.filter(e => e !== id));
    } else {
      setSelectedEvents([...selectedEvents, id]);
    }
  };

  // Action handlers
  const handleView = (event: Event) => {
    toast.info(`Viewing "${event.name}"`, {
      description: "Opening event details..."
    });
  };

  const handleEdit = (event: Event) => {
    toast.info(`Editing "${event.name}"`, {
      description: "Opening event editor..."
    });
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
    if (percentage > 75) return "bg-emerald-400";
    if (percentage > 40) return "bg-orange-400";
    return "bg-blue-400";
  };

  // Empty State Component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        {/* Ticket booth illustration */}
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
          <Ticket className="w-12 h-12 text-indigo-400/60" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <Plus className="w-4 h-4 text-gray-500" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No events yet</h3>
      <p className="text-gray-400 text-center max-w-sm mb-6">
        {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
          ? "No events match your current filters. Try adjusting your search criteria."
          : "Create your first event to get started selling tickets on the blockchain."}
      </p>
      {!searchQuery && statusFilter === 'all' && categoryFilter === 'all' && (
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      )}
    </div>
  );

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
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* --- DESKTOP TABLE VIEW --- */}
      <div className="hidden md:block rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
        {paginatedEvents.length === 0 ? (
          <EmptyState />
        ) : (
          <Table>
            <TableHeader className="bg-[#0A0E27]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0E27]/80 sticky top-0 z-10">
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="w-[40px] pl-4">
                  <Checkbox 
                    checked={selectedEvents.length === paginatedEvents.length && paginatedEvents.length > 0}
                    onCheckedChange={toggleSelectAll}
                    className="border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                  />
                </TableHead>
                <TableHead className="w-[80px]">Thumbnail</TableHead>
                <TableHead className="min-w-[200px]">
                  <Button 
                    variant="ghost" 
                    className="h-8 -ml-3 hover:bg-transparent text-gray-400 hover:text-white font-medium"
                    onClick={() => handleSort('name')}
                  >
                    Event Name
                    {getSortIcon('name')}
                  </Button>
                </TableHead>
                <TableHead className="min-w-[140px]">
                  <Button 
                    variant="ghost" 
                    className="h-8 -ml-3 hover:bg-transparent text-gray-400 hover:text-white font-medium"
                    onClick={() => handleSort('date')}
                  >
                    Date & Time
                    {getSortIcon('date')}
                  </Button>
                </TableHead>
                <TableHead className="text-gray-400 font-medium">Location</TableHead>
                <TableHead className="min-w-[120px]">
                  <Button 
                    variant="ghost" 
                    className="h-8 -ml-3 hover:bg-transparent text-gray-400 hover:text-white font-medium"
                    onClick={() => handleSort('price')}
                  >
                    Price
                    {getSortIcon('price')}
                  </Button>
                </TableHead>
                <TableHead className="w-[160px]">
                  <Button 
                    variant="ghost" 
                    className="h-8 -ml-3 hover:bg-transparent text-gray-400 hover:text-white font-medium"
                    onClick={() => handleSort('sold')}
                  >
                    Sold / Total
                    {getSortIcon('sold')}
                  </Button>
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <Button 
                    variant="ghost" 
                    className="h-8 -ml-3 hover:bg-transparent text-gray-400 hover:text-white font-medium"
                    onClick={() => handleSort('revenue')}
                  >
                    Revenue
                    {getSortIcon('revenue')}
                  </Button>
                </TableHead>
                <TableHead className="w-[100px] text-gray-400 font-medium">Status</TableHead>
                <TableHead className="w-[160px] text-right text-gray-400 font-medium pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEvents.map((event) => {
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
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10" 
                          title="View"
                          onClick={() => handleView(event)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10" 
                          title="Edit"
                          onClick={() => handleEdit(event)}
                        >
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
                        <ActionMenu eventId={event.id} eventName={event.name} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        
        {paginatedEvents.length > 0 && (
          <TablePagination 
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalItems={filteredEvents.length}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        )}
      </div>

      {/* --- MOBILE CARD LIST VIEW --- */}
      <div className="md:hidden space-y-4">
        {paginatedEvents.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {paginatedEvents.map((event) => (
              <MobileEventCard key={event.id} event={event} onAnalyticsClick={setAnalyticsEvent} />
            ))}
            <TablePagination 
              currentPage={currentPage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalItems={filteredEvents.length}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          </>
        )}
      </div>

      <EventAnalyticsPanel 
        isOpen={!!analyticsEvent} 
        onClose={() => setAnalyticsEvent(null)} 
        event={analyticsEvent} 
      />
    </div>
  );
}
