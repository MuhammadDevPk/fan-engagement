"use client"

import React from 'react';
import { Plus, Download, Users, UserPlus, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AttendeesHeaderProps {
  totalAttendees: number;
  newToday?: number;
  pendingCheckIns?: number;
  onManualAdd: () => void;
  onImportCSV: () => void;
}

export function AttendeesHeader({ 
  totalAttendees, 
  newToday = 0,
  pendingCheckIns = 0,
  onManualAdd, 
  onImportCSV 
}: AttendeesHeaderProps) {
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
            <Button 
                variant="outline" 
                className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                onClick={onImportCSV}
            >
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0A0E27]/50 rounded-xl p-4 border border-white/5 flex items-center justify-between hover:border-indigo-500/20 transition-colors">
            <div>
                <p className="text-sm text-gray-400 mb-1">Total Attendees</p>
                <p className="text-2xl font-bold text-white">{totalAttendees.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-lg">
                <Users className="h-5 w-5 text-indigo-400" />
            </div>
        </div>

        <div className="bg-[#0A0E27]/50 rounded-xl p-4 border border-white/5 flex items-center justify-between hover:border-emerald-500/20 transition-colors">
            <div>
                 <p className="text-sm text-gray-400 mb-1">New Today</p>
                 <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-emerald-400">+{newToday}</p>
                    {newToday > 0 && (
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <TrendingUp className="h-3 w-3" /> new
                      </span>
                    )}
                 </div>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-lg">
                <UserPlus className="h-5 w-5 text-emerald-400" />
            </div>
        </div>

        <div className="bg-[#0A0E27]/50 rounded-xl p-4 border border-white/5 flex items-center justify-between hover:border-orange-500/20 transition-colors">
            <div>
                <p className="text-sm text-gray-400 mb-1">Pending Check-ins</p>
                <p className="text-2xl font-bold text-orange-400">{pendingCheckIns.toLocaleString()}</p>
            </div>
             <div className="p-3 bg-orange-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-orange-400" />
            </div>
        </div>

        <div className="bg-[#0A0E27]/50 rounded-xl p-4 border border-white/5 flex items-center justify-between hover:border-amber-500/20 transition-colors">
            <div>
                <p className="text-sm text-gray-400 mb-1">VIP Attendees</p>
                <p className="text-2xl font-bold text-amber-400">
                  {Math.round((pendingCheckIns / totalAttendees) * 100) || 0}%
                </p>
            </div>
             <div className="p-3 bg-amber-500/10 rounded-lg">
                <span className="text-amber-400 font-bold text-sm">VIP</span>
            </div>
        </div>
      </div>
    </div>
  );
}
