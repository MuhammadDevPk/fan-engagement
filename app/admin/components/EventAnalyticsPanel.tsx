"use client";

import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
  SheetClose 
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Calendar, MapPin, TrendingUp, Users, Activity, DollarSign, ExternalLink, Copy, Clock, AlertCircle } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart, 
  Bar, 
  Cell
} from 'recharts';
import { Event } from './events-table/types';

interface EventAnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

// Dummy data for charts
const salesOverTimeData = [
  { day: 'Mon', sales: 12 },
  { day: 'Tue', sales: 19 },
  { day: 'Wed', sales: 15 },
  { day: 'Thu', sales: 25 },
  { day: 'Fri', sales: 32 },
  { day: 'Sat', sales: 45 },
  { day: 'Sun', sales: 38 },
];

const ticketTierData = [
  { name: 'VIP', sold: 50, total: 50, color: '#FCD34D' }, // Gold
  { name: 'General', sold: 234, total: 300, color: '#60A5FA' }, // Blue
  { name: 'Early Bird', sold: 150, total: 150, color: '#34D399' }, // Green
];

export function EventAnalyticsPanel({ isOpen, onClose, event }: EventAnalyticsPanelProps) {
  if (!event) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-[600px] border-l border-white/10 bg-[#0A0E27]/98 backdrop-blur-xl p-0 shadow-2xl overflow-y-auto">
        
        {/* Header Section */}
        <div className="relative p-6 border-b border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
          <SheetClose className="absolute right-4 top-4 rounded-full p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </SheetClose>

          <div className="flex gap-4 items-start">
            <div className="h-20 w-20 rounded-xl overflow-hidden border border-white/10 shadow-lg shrink-0">
              <img 
                src={event.thumbnail} 
                alt={event.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between pr-8">
                <div>
                  <h2 className="text-xl font-bold text-white leading-tight">{event.name}</h2>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{event.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <Badge variant="outline" className={`border-0 px-2 py-0 h-5 text-[10px] uppercase tracking-wider font-semibold ${
                      event.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {event.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats Bar */}
              <div className="flex items-center gap-6 pt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Sold</span>
                  <span className="text-sm font-semibold text-white">{event.ticketsSold}/{event.ticketsTotal}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Revenue</span>
                  <span className="text-sm font-semibold text-white">${event.revenue.toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Conversion</span>
                  <span className="text-sm font-semibold text-emerald-400">4.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Content */}
        <div className="p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 w-full justify-start h-11 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 text-gray-400">Overview</TabsTrigger>
              <TabsTrigger value="audience" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 text-gray-400">Audience</TabsTrigger>
              <TabsTrigger value="blockchain" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 text-gray-400">Blockchain</TabsTrigger>
              <TabsTrigger value="revenue" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 text-gray-400">Revenue</TabsTrigger>
            </TabsList>

            {/* TAB 1: SALES OVERVIEW */}
            <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Chart 1: Sales Over Time */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-indigo-400" />
                    Sales Velocity
                  </h3>
                  <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10">
                    {['7D', '30D', 'All'].map((range) => (
                      <button 
                        key={range}
                        className={`text-[10px] px-2.5 py-1 rounded-md font-medium transition-colors ${range === '7D' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="h-[200px] w-full bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesOverTimeData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#818cf8' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Ticket Tier Performance */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  Ticket Segments
                </h3>
                
                <div className="space-y-3">
                  {ticketTierData.map((tier) => {
                    const percentage = Math.round((tier.sold / tier.total) * 100);
                    return (
                      <div key={tier.name} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-300 font-medium">{tier.name}</span>
                          <span className="text-gray-400">{tier.sold} / {tier.total} <span className="text-gray-600 mx-1">|</span> {percentage}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500" 
                            style={{ width: `${percentage}%`, backgroundColor: tier.color }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">Peak Sales Hour</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-orange-400" />
                    <span className="text-sm font-medium text-white">3:00 PM - 6:00 PM</span>
                  </div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">Avg Sale Time</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-blue-400" />
                    <span className="text-sm font-medium text-white">4.2 minutes</span>
                  </div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">Abandonment Rate</span>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                    <span className="text-sm font-medium text-white">12%</span>
                  </div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">Refund Requests</span>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-3.5 w-3.5 text-purple-400" />
                    <span className="text-sm font-medium text-white">3 (1.2%)</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Placeholders for other tabs */}
            <TabsContent value="audience" className="min-h-[200px] flex items-center justify-center text-gray-500 italic">
              Audience insights coming soon
            </TabsContent>
            <TabsContent value="blockchain" className="min-h-[200px] flex items-center justify-center text-gray-500 italic">
              Blockchain activity coming soon
            </TabsContent>
            <TabsContent value="revenue" className="min-h-[200px] flex items-center justify-center text-gray-500 italic">
              Revenue breakdown coming soon
            </TabsContent>

          </Tabs>
        </div>

      </SheetContent>
    </Sheet>
  );
}
