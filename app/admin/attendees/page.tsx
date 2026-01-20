"use client"

import React, { useState } from 'react';
import { AttendeesHeader } from '../components/attendees/AttendeesHeader';
import { AttendeesFilterBar, QuickFilterType } from '../components/attendees/AttendeesFilterBar';
import { AdvancedFiltersPanel, AdvancedFilterState } from '../components/attendees/AdvancedFiltersPanel';
import { ManualAddAttendeeModal } from '../components/attendees/ManualAddAttendeeModal';
import { AttendeesTable } from '../components/attendees/AttendeesTable';
import { AttendeeDetailPanel } from '../components/attendees/AttendeeDetailPanel';
import { attendeesData } from '../components/attendees/data';
import { Attendee } from '../components/attendees/types';

export default function AttendeesPage() {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [isManualAddOpen, setIsManualAddOpen] = useState(false);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<QuickFilterType>('all');
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterState>({
      event: 'all',
      ticketType: 'all',
      network: 'all',
      walletType: 'all',
      status: 'all'
  });

  // Basic filtering logic
  const filteredData = attendeesData.filter(attendee => {
     // 1. Search Query
     if (searchQuery) {
         const query = searchQuery.toLowerCase();
         const matches = (
             attendee.name?.toLowerCase().includes(query) ||
             attendee.email?.toLowerCase().includes(query) ||
             attendee.walletAddress.toLowerCase().includes(query) ||
             attendee.tickets.some(t => t.id.toLowerCase().includes(query))
         );
         if (!matches) return false;
     }

     // 2. Quick Filters
     if (activeQuickFilter === 'active' && attendee.tickets.length === 0) return false;
     if (activeQuickFilter === 'pending' && attendee.checkInStatus !== 'PENDING') return false;
     if (activeQuickFilter === 'vip' && !attendee.isVip) return false;

     // 3. Advanced Filters (Only if panel is visible or filters are applied)
     // Note: We apply them even if hidden if they were previously set.
     if (advancedFilters.event !== 'all') {
         // Simple partial match for mock data context, ideally exact ID
         const hasEvent = attendee.tickets.some(t => t.eventName.toLowerCase().includes(advancedFilters.event.toLowerCase()));
         if (!hasEvent) return false;
     }

     if (advancedFilters.ticketType !== 'all') {
         const hasType = attendee.tickets.some(t => t.type === advancedFilters.ticketType);
         if (!hasType) return false;
     }

     if (advancedFilters.network !== 'all') {
         const hasNetwork = attendee.tickets.some(t => t.network === advancedFilters.network);
         if (!hasNetwork) return false;
     }
     
     if (advancedFilters.status !== 'all') {
         if (attendee.checkInStatus !== advancedFilters.status) return false;
     }

     return true;
  });

  return (
    <div className="space-y-6 pb-20 relative">
      <AttendeesHeader 
        totalAttendees={filteredData.length} 
        onManualAdd={() => setIsManualAddOpen(true)}
      />
      
      <div className="space-y-4">
        <AttendeesFilterBar 
            onSearch={setSearchQuery} 
            filtersVisible={filtersVisible}
            onToggleFilters={() => setFiltersVisible(!filtersVisible)}
            activeFilter={activeQuickFilter}
            onFilterChange={setActiveQuickFilter}
        />
        
        {filtersVisible && (
            <AdvancedFiltersPanel 
                onApply={setAdvancedFilters}
                onReset={() => setAdvancedFilters({
                    event: 'all',
                    ticketType: 'all',
                    network: 'all',
                    walletType: 'all',
                    status: 'all'
                })}
            />
        )}
      </div>

      <AttendeesTable 
        data={filteredData} 
        onSelectAttendee={setSelectedAttendee}
      />

      <AttendeeDetailPanel 
        attendee={selectedAttendee} 
        onClose={() => setSelectedAttendee(null)} 
      />

      <ManualAddAttendeeModal 
        isOpen={isManualAddOpen}
        onClose={() => setIsManualAddOpen(false)}
        onAdd={(data) => {
            console.log("Adding attendee:", data);
            // In real app, would add to state/DB here
        }}
      />
    </div>
  );
}
