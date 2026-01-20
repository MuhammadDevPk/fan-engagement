"use client"

import React, { useState } from 'react';
import { AttendeesHeader } from '../components/attendees/AttendeesHeader';
import { AttendeesFilterBar } from '../components/attendees/AttendeesFilterBar';
import { AdvancedFiltersPanel } from '../components/attendees/AdvancedFiltersPanel';
import { AttendeesTable } from '../components/attendees/AttendeesTable';
import { AttendeeDetailPanel } from '../components/attendees/AttendeeDetailPanel';
import { attendeesData } from '../components/attendees/data';
import { Attendee } from '../components/attendees/types';

export default function AttendeesPage() {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Basic filtering logic
  const filteredData = attendeesData.filter(attendee => {
     if (!searchQuery) return true;
     const query = searchQuery.toLowerCase();
     return (
        attendee.name?.toLowerCase().includes(query) ||
        attendee.email?.toLowerCase().includes(query) ||
        attendee.walletAddress.toLowerCase().includes(query)
     );
  });

  return (
    <div className="space-y-6 pb-20 relative">
      <AttendeesHeader totalAttendees={2847} />
      
      <div className="space-y-4">
        <AttendeesFilterBar 
            onSearch={setSearchQuery} 
            filtersVisible={filtersVisible}
            onToggleFilters={() => setFiltersVisible(!filtersVisible)}
        />
        
        {filtersVisible && <AdvancedFiltersPanel />}
      </div>

      <AttendeesTable 
        data={filteredData} 
        onSelectAttendee={setSelectedAttendee}
      />

      <AttendeeDetailPanel 
        attendee={selectedAttendee} 
        onClose={() => setSelectedAttendee(null)} 
      />
    </div>
  );
}
