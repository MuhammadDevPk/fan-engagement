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
import { toast } from 'sonner';

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

  // Filtering logic
  const filteredData = attendees.filter(attendee => {
     // 1. Search Query
     if (searchQuery) {
         const query = searchQuery.toLowerCase();
         const matches = (
             attendee.name?.toLowerCase().includes(query) ||
             attendee.email?.toLowerCase().includes(query) ||
             attendee.walletAddress.toLowerCase().includes(query) ||
             attendee.tickets.some(t => t.id.toLowerCase().includes(query)) ||
             attendee.tickets.some(t => t.eventName.toLowerCase().includes(query))
         );
         if (!matches) return false;
     }

     // 2. Quick Filters
     if (activeQuickFilter === 'active' && attendee.tickets.length === 0) return false;
     if (activeQuickFilter === 'pending' && attendee.checkInStatus !== 'PENDING') return false;
     if (activeQuickFilter === 'vip' && !attendee.isVip) return false;

     // 3. Advanced Filters
     if (advancedFilters.event !== 'all') {
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
    const newAttendee: Attendee = {
        id: `att-${Date.now()}`,
        walletAddress: data.walletAddress || `0x${Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        name: data.name || 'New Attendee',
        email: data.email || undefined,
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
                id: `TKT-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`,
                eventName: 'Manually Added Event',
                eventThumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
                type: data.ticketType?.toUpperCase() || 'GENERAL',
                purchaseDate: new Date().toISOString(),
                price: '$0.00',
                priceEth: '0',
                quantity: 1,
                tokenId: Math.floor(Math.random() * 10000).toString(),
                network: 'Ethereum',
                contractAddress: `0x${Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
            } as Ticket
        ],
        transactions: [],
        activityLog: [
          { id: '1', action: 'Manually added by admin', timestamp: new Date().toLocaleString(), type: 'SYSTEM' }
        ]
    };
    
    setAttendees([newAttendee, ...attendees]);
    toast.success(`${data.name || 'Attendee'} added successfully!`, {
      description: `Wallet: ${newAttendee.walletAddress.slice(0, 10)}...`
    });
  };

  const handleImport = (count: number) => {
      const names = ['Alex Morgan', 'Jordan Lee', 'Taylor Swift', 'Casey Jones', 'Morgan Freeman', 'Jamie Oliver', 'Riley Cooper', 'Quinn Mitchell', 'Avery Brooks', 'Blake Wilson'];
      const newAttendees: Attendee[] = Array.from({ length: count }).map((_, i) => ({
        id: `imp-${Date.now()}-${i}`,
        walletAddress: `0x${Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        name: names[i % names.length] || `Imported User ${i + 1}`,
        email: `${names[i % names.length]?.toLowerCase().replace(' ', '.')}@import.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Import${i}${Date.now()}`,
        joinDate: new Date().toISOString(),
        isBlocked: false,
        isVip: Math.random() > 0.7,
        checkInStatus: 'PENDING',
        totalSpent: `$${Math.floor(Math.random() * 500)}.00`,
        totalTickets: Math.floor(Math.random() * 3) + 1,
        engagementScore: Math.random() > 0.6 ? 'HIGH' : Math.random() > 0.3 ? 'MEDIUM' : 'LOW',
        lastActivity: 'Imported just now',
        emailOpened: false,
        marketingOptIn: true,
        tickets: [{
          id: `TKT-IMP-${Math.floor(Math.random() * 10000)}`,
          eventName: ['Web3 Summit 2026', 'DeFi Conference 2026', 'NFT Art Gallery'][Math.floor(Math.random() * 3)],
          eventThumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
          type: ['VIP', 'GENERAL', 'EARLY_BIRD'][Math.floor(Math.random() * 3)] as 'VIP' | 'GENERAL' | 'EARLY_BIRD',
          purchaseDate: new Date().toISOString(),
          price: `$${Math.floor(Math.random() * 200) + 50}.00`,
          priceEth: (Math.random() * 0.1).toFixed(3),
          quantity: 1,
          tokenId: Math.floor(Math.random() * 10000).toString(),
          network: ['Ethereum', 'Polygon', 'BSC'][Math.floor(Math.random() * 3)],
          contractAddress: `0x${Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
        }],
        transactions: [],
        activityLog: [
          { id: '1', action: 'Imported via CSV', timestamp: new Date().toLocaleString(), type: 'SYSTEM' }
        ]
      }));

      setAttendees([...newAttendees, ...attendees]);
      toast.success(`${count} attendees imported successfully!`);
  };

  const handleCheckIn = (attendeeId: string) => {
    setAttendees(prev => prev.map(a => 
      a.id === attendeeId 
        ? { 
            ...a, 
            checkInStatus: 'CHECKED_IN', 
            checkInTime: new Date().toISOString(),
            activityLog: [
              { id: `ci-${Date.now()}`, action: 'Checked in by admin', timestamp: new Date().toLocaleString(), type: 'CHECK_IN' },
              ...a.activityLog
            ]
          } 
        : a
    ));
  };

  const handleBlockUser = (attendeeId: string) => {
    setAttendees(prev => prev.map(a => 
      a.id === attendeeId 
        ? { 
            ...a, 
            isBlocked: !a.isBlocked,
            activityLog: [
              { id: `blk-${Date.now()}`, action: a.isBlocked ? 'Unblocked by admin' : 'Blocked by admin', timestamp: new Date().toLocaleString(), type: 'SYSTEM' },
              ...a.activityLog
            ]
          } 
        : a
    ));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveQuickFilter('all');
    setAdvancedFilters({
      event: 'all',
      ticketType: 'all',
      network: 'all',
      walletType: 'all',
      status: 'all'
    });
    setFiltersVisible(false);
    toast.info('Filters cleared');
  };

  // Stats
  const stats = {
    total: attendees.length,
    newToday: attendees.filter(a => {
      const today = new Date().toDateString();
      return new Date(a.joinDate).toDateString() === today;
    }).length,
    pendingCheckIn: attendees.filter(a => a.checkInStatus === 'PENDING').length,
    vipCount: attendees.filter(a => a.isVip).length
  };

  return (
    <div className="space-y-6 pb-20 relative">
      <AttendeesHeader 
        totalAttendees={stats.total}
        newToday={stats.newToday}
        pendingCheckIns={stats.pendingCheckIn}
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
            resultCount={filteredData.length}
            totalCount={attendees.length}
        />
        
        {filtersVisible && (
            <AdvancedFiltersPanel 
                onApply={(filters) => {
                  setAdvancedFilters(filters);
                  toast.success('Filters applied');
                }}
                onReset={handleResetFilters}
            />
        )}
      </div>

      <AttendeesTable 
        data={filteredData} 
        onSelectAttendee={setSelectedAttendee}
        onCheckIn={handleCheckIn}
        onBlockUser={handleBlockUser}
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
