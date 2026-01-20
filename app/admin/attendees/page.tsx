"use client"

import React, { useState } from 'react';
import { AttendeesHeader } from '../components/attendees/AttendeesHeader';
import { AttendeesFilterBar, QuickFilterType } from '../components/attendees/AttendeesFilterBar';
import { AdvancedFiltersPanel, AdvancedFilterState } from '../components/attendees/AdvancedFiltersPanel';
import { ManualAddAttendeeModal } from '../components/attendees/ManualAddAttendeeModal';
import { ImportAttendeesModal } from '../components/attendees/ImportAttendeesModal';
import { AttendeesTable } from '../components/attendees/AttendeesTable';
import { AttendeeDetailPanel } from '../components/attendees/AttendeeDetailPanel';
import { attendeesData } from '../components/attendees/data';
import { Attendee, Ticket } from '../components/attendees/types';

export default function AttendeesPage() {
  const [attendees, setAttendees] = useState<Attendee[]>(attendeesData);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [isManualAddOpen, setIsManualAddOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  
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
  const filteredData = attendees.filter(attendee => {
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

  // Handlers
  const handleAddAttendee = (data: any) => {
    // Generate mock new attendee
    const newAttendee: Attendee = {
        id: `att-${Date.now()}`,
        walletAddress: data.walletAddress || `0x${Math.random().toString(16).slice(2, 42)}`,
        name: data.name || 'New Attendee',
        email: data.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        joinDate: new Date().toISOString(),
        isBlocked: false,
        isVip: data.ticketType === 'vip',
        checkInStatus: 'PENDING',
        totalSpent: '$0.00',
        totalTickets: 1,
        engagementScore: 'LOW',
        lastActivity: 'Just now',
        emailOpened: false,
        marketingOptIn: true,
         tickets: [
            {
                id: `TKT-${Math.floor(Math.random() * 10000)}`,
                eventName: 'Manual Entry Event',
                eventThumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop', // Placeholder
                type: data.ticketType?.toUpperCase() || 'GENERAL',
                purchaseDate: new Date().toISOString(),
                price: '$0.00',
                priceEth: '0',
                quantity: 1,
                tokenId: '0',
                network: 'Ethereum',
                contractAddress: '0x000...000'
            } as Ticket
         ],
        transactions: [],
        activityLog: []
    };
    
    setAttendees([newAttendee, ...attendees]);
  };

  const handleImport = (count: number) => {
      // Simulate adding X number of random attendees
      const newAttendees: Attendee[] = Array.from({ length: count }).map((_, i) => ({
        id: `imp-${Date.now()}-${i}`,
        walletAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
        name: `Imported User ${i + 1}`,
        email: `user${i}@import.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Imp${i}`,
        joinDate: new Date().toISOString(),
        isBlocked: false,
        isVip: Math.random() > 0.8,
        checkInStatus: 'PENDING',
        totalSpent: '$100.00',
        totalTickets: 1,
        engagementScore: 'LOW',
        lastActivity: 'Imported just now',
        emailOpened: false,
        marketingOptIn: true,
        tickets: [],
        transactions: [],
        activityLog: []
      }));

      setAttendees([...newAttendees, ...attendees]);
  };

  return (
    <div className="space-y-6 pb-20 relative">
      <AttendeesHeader 
        totalAttendees={attendees.length} 
        onManualAdd={() => setIsManualAddOpen(true)}
        onImportCSV={() => setIsImportModalOpen(true)}
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
        onAdd={handleAddAttendee}
      />

      <ImportAttendeesModal 
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImport={handleImport}
      />
    </div>
  );
}
