"use client";

import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetClose 
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  X, Calendar, TrendingUp, Activity, Clock, AlertCircle, 
  Globe, Users, Wallet, ExternalLink, Copy, MapPin 
} from "lucide-react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { Event } from './events-table/types';
import { toast } from 'sonner';

interface EventAnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

// Dummy data for charts
const salesOverTimeData = [
  { day: 'Mon', sales: 12, revenue: 600 },
  { day: 'Tue', sales: 19, revenue: 950 },
  { day: 'Wed', sales: 15, revenue: 750 },
  { day: 'Thu', sales: 25, revenue: 1250 },
  { day: 'Fri', sales: 32, revenue: 1600 },
  { day: 'Sat', sales: 45, revenue: 2250 },
  { day: 'Sun', sales: 38, revenue: 1900 },
];

const ticketTierData = [
  { name: 'VIP', sold: 50, total: 50, color: '#FCD34D', revenue: 5000 },
  { name: 'General', sold: 234, total: 300, color: '#60A5FA', revenue: 11700 },
  { name: 'Early Bird', sold: 150, total: 150, color: '#34D399', revenue: 6000 },
];

const audienceData = [
  { name: '18-24', value: 35, color: '#818cf8' },
  { name: '25-34', value: 40, color: '#34D399' },
  { name: '35-44', value: 15, color: '#FCD34D' },
  { name: '45+', value: 10, color: '#F87171' },
];

const geoData = [
  { country: 'United States', visitors: 2450, percentage: 45 },
  { country: 'United Kingdom', visitors: 890, percentage: 16 },
  { country: 'Germany', visitors: 650, percentage: 12 },
  { country: 'France', visitors: 430, percentage: 8 },
  { country: 'Others', visitors: 1030, percentage: 19 },
];

const blockchainTransactions = [
  { hash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385', type: 'Mint', amount: 0.02, time: '2 min ago' },
  { hash: '0x8a3bfade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91386', type: 'Transfer', amount: 0.02, time: '15 min ago' },
  { hash: '0x9c4cfade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91387', type: 'Mint', amount: 0.048, time: '1 hr ago' },
  { hash: '0xa5ddfade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91388', type: 'Mint', amount: 0.02, time: '2 hrs ago' },
];

const revenueBreakdown = [
  { category: 'Ticket Sales', amount: 18700, percentage: 78 },
  { category: 'VIP Upgrades', amount: 3200, percentage: 13 },
  { category: 'Merchandise', amount: 1500, percentage: 6 },
  { category: 'Donations', amount: 600, percentage: 3 },
];

export function EventAnalyticsPanel({ isOpen, onClose, event }: EventAnalyticsPanelProps) {
  if (!event) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

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

            {/* TAB 2: AUDIENCE */}
            <TabsContent value="audience" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Age Demographics */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-400" />
                  Age Demographics
                </h3>
                
                <div className="flex items-center gap-6">
                  <div className="h-[160px] w-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={audienceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {audienceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 flex-1">
                    {audienceData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-gray-300">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium text-white">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Globe className="h-4 w-4 text-emerald-400" />
                  Geographic Distribution
                </h3>
                
                <div className="space-y-3">
                  {geoData.map((item) => (
                    <div key={item.country} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-300">{item.country}</span>
                          <span className="text-gray-400">{item.visitors.toLocaleString()} ({item.percentage}%)</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                            style={{ width: `${item.percentage}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Device Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Mobile</span>
                  <span className="text-lg font-semibold text-white">68%</span>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Desktop</span>
                  <span className="text-lg font-semibold text-white">28%</span>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Tablet</span>
                  <span className="text-lg font-semibold text-white">4%</span>
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: BLOCKCHAIN */}
            <TabsContent value="blockchain" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Contract Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-indigo-400" />
                  Smart Contract
                </h3>
                
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Contract Address</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-indigo-400 font-mono">0x7f9f...1a91</code>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6 text-gray-400 hover:text-white"
                        onClick={() => copyToClipboard('0x7f9fade1c0d57a7af66ab4ead7c2c2eb7b11a91385')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-400 hover:text-white">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Network</span>
                    <Badge className="bg-purple-500/10 text-purple-400 border-0">Polygon</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Token Standard</span>
                    <span className="text-xs text-white">ERC-721</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Total Minted</span>
                    <span className="text-xs text-white">{event.ticketsSold} NFTs</span>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">Recent Transactions</h3>
                
                <div className="space-y-2">
                  {blockchainTransactions.map((tx, idx) => (
                    <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          tx.type === 'Mint' ? 'bg-emerald-500/10' : 'bg-blue-500/10'
                        }`}>
                          <Wallet className={`h-4 w-4 ${tx.type === 'Mint' ? 'text-emerald-400' : 'text-blue-400'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white">{tx.type}</span>
                            <code className="text-[10px] text-gray-500 font-mono">{tx.hash.slice(0, 10)}...</code>
                          </div>
                          <span className="text-xs text-gray-500">{tx.time}</span>
                        </div>
                      </div>
                      <span className="text-sm font-mono text-indigo-400">{tx.amount} ETH</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* TAB 4: REVENUE */}
            <TabsContent value="revenue" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Revenue Chart */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  Revenue Over Time
                </h3>
                
                <div className="h-[180px] w-full bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesOverTimeData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                        formatter={(value: number) => [`$${value}`, 'Revenue']}
                      />
                      <Bar dataKey="revenue" fill="#34D399" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Revenue Breakdown */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">Revenue Breakdown</h3>
                
                <div className="space-y-3">
                  {revenueBreakdown.map((item) => (
                    <div key={item.category} className="bg-white/[0.02] border border-white/5 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-300">{item.category}</span>
                          <span className="text-white font-medium">${item.amount.toLocaleString()}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" 
                            style={{ width: `${item.percentage}%` }} 
                          />
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 ml-3 w-10 text-right">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl p-4">
                  <span className="text-[10px] text-emerald-400 uppercase tracking-wider block">Total Revenue</span>
                  <span className="text-2xl font-bold text-white">${event.revenue.toLocaleString()}</span>
                  <span className="text-xs text-emerald-400">↑ 23% vs last week</span>
                </div>
                <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-xl p-4">
                  <span className="text-[10px] text-indigo-400 uppercase tracking-wider block">Avg Ticket Price</span>
                  <span className="text-2xl font-bold text-white">${event.priceUsd}</span>
                  <span className="text-xs text-indigo-400">{event.priceEth} ETH</span>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>

      </SheetContent>
    </Sheet>
  );
}
