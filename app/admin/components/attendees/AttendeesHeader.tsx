import React from 'react';
import { Plus, Download, Users, UserPlus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AttendeesHeaderProps {
  totalAttendees: number;
  onManualAdd: () => void;
}

export function AttendeesHeader({ totalAttendees, onManualAdd }: AttendeesHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Users className="h-8 w-8 text-indigo-400" />
            Attendees
          </h1>
          <p className="text-gray-400">Manage and communicate with your ticket holders</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white">
                <Download className="mr-2 h-4 w-4" />
                Import CSV
            </Button>
            <Button 
              onClick={onManualAdd}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
            >
                <Plus className="mr-2 h-4 w-4" />
                Manual Add
            </Button>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0A0E27]/50 rounded-xl p-4 border border-white/5 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-400 mb-1">Total Attendees</p>
                <p className="text-2xl font-bold text-white">{totalAttendees.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-lg">
                <Users className="h-5 w-5 text-indigo-400" />
            </div>
        </div>

        <div className="bg-[#0A0E27]/50 rounded-xl p-4 border border-white/5 flex items-center justify-between">
            <div>
                 <p className="text-sm text-gray-400 mb-1">New Today</p>
                 <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-emerald-400">+34</p>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">↑ 12%</span>
                 </div>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-lg">
                <UserPlus className="h-5 w-5 text-emerald-400" />
            </div>
        </div>

        <div className="bg-[#0A0E27]/50 rounded-xl p-4 border border-white/5 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-400 mb-1">Check-ins Pending</p>
                <p className="text-2xl font-bold text-orange-400">1,523</p>
            </div>
             <div className="p-3 bg-orange-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-orange-400" />
            </div>
        </div>
      </div>
    </div>
  );
}
