"use client";

import React, { useState } from 'react';
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
  Globe, Users, Wallet, ExternalLink, Copy, Download, CheckCircle2,
  Loader2, DollarSign, ArrowUpRight, CreditCard, RefreshCw
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
  ComposedChart,
  Legend,
} from 'recharts';
import { Event } from './events-table/types';
import { toast } from 'sonner';

interface EventAnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

// Sales data for different time ranges
const salesData7D = [
  { day: 'Mon', sales: 12, revenue: 600 },
  { day: 'Tue', sales: 19, revenue: 950 },
  { day: 'Wed', sales: 15, revenue: 750 },
  { day: 'Thu', sales: 25, revenue: 1250 },
  { day: 'Fri', sales: 32, revenue: 1600 },
  { day: 'Sat', sales: 45, revenue: 2250 },
  { day: 'Sun', sales: 38, revenue: 1900 },
];

const salesData30D = [
  { day: 'Week 1', sales: 86, revenue: 4300 },
  { day: 'Week 2', sales: 124, revenue: 6200 },
  { day: 'Week 3', sales: 98, revenue: 4900 },
  { day: 'Week 4', sales: 156, revenue: 7800 },
];

const salesDataAll = [
  { day: 'Jan', sales: 245, revenue: 12250 },
  { day: 'Feb', sales: 312, revenue: 15600 },
  { day: 'Mar', sales: 189, revenue: 9450 },
  { day: 'Apr', sales: 421, revenue: 21050 },
  { day: 'May', sales: 367, revenue: 18350 },
  { day: 'Jun', sales: 298, revenue: 14900 },
];

const ticketTierData = [
  { name: 'VIP', sold: 50, total: 50, color: '#FCD34D', revenue: 5000 },
  { name: 'General', sold: 234, total: 300, color: '#60A5FA', revenue: 11700 },
  { name: 'Early Bird', sold: 150, total: 150, color: '#34D399', revenue: 6000 },
];

// Audience Demographics
const audienceData = [
  { name: '18-24', value: 35, color: '#818cf8' },
  { name: '25-34', value: 40, color: '#34D399' },
  { name: '35-44', value: 15, color: '#FCD34D' },
  { name: '45+', value: 10, color: '#F87171' },
];

const geoData = [
  { country: 'United States', flag: '🇺🇸', visitors: 2450, percentage: 45 },
  { country: 'United Kingdom', flag: '🇬🇧', visitors: 890, percentage: 16 },
  { country: 'Germany', flag: '🇩🇪', visitors: 650, percentage: 12 },
  { country: 'France', flag: '🇫🇷', visitors: 430, percentage: 8 },
  { country: 'Canada', flag: '🇨🇦', visitors: 380, percentage: 7 },
];

// Wallet type distribution
const walletTypeData = [
  { name: 'MetaMask', percentage: 65, color: '#F6851B', icon: '🦊' },
  { name: 'WalletConnect', percentage: 25, color: '#3B99FC', icon: '🔗' },
  { name: 'Coinbase Wallet', percentage: 10, color: '#0052FF', icon: '🔵' },
];

// Blockchain transactions with more details
const blockchainTransactions = [
  { 
    hash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385', 
    type: 'Minted', 
    wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    amount: 0.02, 
    time: '2 min ago',
    status: 'confirmed',
    block: 18956234
  },
  { 
    hash: '0x8a3bfade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91386', 
    type: 'Transferred', 
    wallet: '0x1234567890abcdef1234567890abcdef12345678',
    amount: 0.02, 
    time: '15 min ago',
    status: 'confirmed',
    block: 18956198
  },
  { 
    hash: '0x9c4cfade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91387', 
    type: 'Minted', 
    wallet: '0xabcdef1234567890abcdef1234567890abcdef12',
    amount: 0.048, 
    time: '1 hr ago',
    status: 'confirmed',
    block: 18956102
  },
  { 
    hash: '0xa5ddfade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91388', 
    type: 'Checked-in', 
    wallet: '0xfedcba0987654321fedcba0987654321fedcba09',
    amount: 0, 
    time: '2 hrs ago',
    status: 'confirmed',
    block: 18955987
  },
  { 
    hash: '0xb6eefade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91389', 
    type: 'Minted', 
    wallet: '0x9876543210fedcba9876543210fedcba98765432',
    amount: 0.02, 
    time: '3 hrs ago',
    status: 'pending',
    block: null
  },
  { 
    hash: '0xc7fffade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91390', 
    type: 'Transferred', 
    wallet: '0x5678901234abcdef5678901234abcdef56789012',
    amount: 0.02, 
    time: '4 hrs ago',
    status: 'confirmed',
    block: 18955654
  },
];

// Revenue breakdown data for stacked area chart
const revenueStackedData = [
  { day: 'Mon', primary: 500, royalties: 50, fees: 55 },
  { day: 'Tue', primary: 850, royalties: 85, fees: 93 },
  { day: 'Wed', primary: 650, royalties: 65, fees: 72 },
  { day: 'Thu', primary: 1100, royalties: 110, fees: 121 },
  { day: 'Fri', primary: 1400, royalties: 140, fees: 154 },
  { day: 'Sat', primary: 2000, royalties: 200, fees: 220 },
  { day: 'Sun', primary: 1650, royalties: 165, fees: 182 },
];

export function EventAnalyticsPanel({ isOpen, onClose, event }: EventAnalyticsPanelProps) {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | 'All'>('7D');
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  if (!event) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const handleExport = (chartName: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Exporting ${chartName} data...`,
        success: `${chartName} exported as CSV`,
        error: 'Export failed',
      }
    );
  };

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2500)),
      {
        loading: 'Processing withdrawal to wallet...',
        success: 'Withdrawal initiated! Funds will arrive in 5-10 minutes.',
        error: 'Withdrawal failed',
      }
    );
    setTimeout(() => setIsWithdrawing(false), 2500);
  };

  const openBlockExplorer = (hash: string) => {
    toast.info('Opening Polygonscan...', { duration: 2000 });
    // In production: window.open(`https://polygonscan.com/tx/${hash}`, '_blank');
  };

  // Get sales data based on time range
  const getSalesData = () => {
    switch (timeRange) {
      case '7D': return salesData7D;
      case '30D': return salesData30D;
      case 'All': return salesDataAll;
      default: return salesData7D;
    }
  };

  // Calculate financial summary
  const grossRevenue = event.revenue;
  const platformFees = Math.round(grossRevenue * 0.10);
  const netRevenue = grossRevenue - platformFees;
  const pendingWithdrawals = Math.round(netRevenue * 0.3);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-[600px] border-l border-white/10 bg-[#0A0E27]/98 backdrop-blur-xl p-0 shadow-2xl overflow-y-auto">
        
        {/* Header Section */}
        <div className="relative p-6 border-b border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
          <SheetClose className="absolute right-4 top-4 rounded-full p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-10">
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
                      event.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400' : 
                      event.status === 'Sold Out' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-gray-500/10 text-gray-400'
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
                  <span className="text-sm font-semibold text-emerald-400">{((event.ticketsSold / event.ticketsTotal) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Content */}
        <div className="p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 w-full justify-start h-11 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 text-gray-400 text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="audience" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 text-gray-400 text-xs sm:text-sm">Audience</TabsTrigger>
              <TabsTrigger value="blockchain" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 text-gray-400 text-xs sm:text-sm">Blockchain</TabsTrigger>
              <TabsTrigger value="revenue" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 text-gray-400 text-xs sm:text-sm">Revenue</TabsTrigger>
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
                  <div className="flex items-center gap-2">
                    <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10">
                      {(['7D', '30D', 'All'] as const).map((range) => (
                        <button 
                          key={range}
                          onClick={() => setTimeRange(range)}
                          className={`text-[10px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                            timeRange === range ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-7 w-7 text-gray-500 hover:text-white"
                      onClick={() => handleExport('Sales Velocity')}
                    >
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                
                <div className="h-[200px] w-full bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getSalesData()}>
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
                        formatter={(value: number) => [`${value} tickets`, 'Sales']}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Ticket Tier Performance */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Activity className="h-4 w-4 text-emerald-400" />
                    Ticket Tier Performance
                  </h3>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 text-gray-500 hover:text-white"
                    onClick={() => handleExport('Ticket Tiers')}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {ticketTierData.map((tier) => {
                    const percentage = Math.round((tier.sold / tier.total) * 100);
                    return (
                      <div key={tier.name} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-300 font-medium flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
                            {tier.name}
                          </span>
                          <span className="text-gray-400">
                            {tier.sold} / {tier.total} 
                            <span className="text-gray-600 mx-1.5">|</span> 
                            <span className={percentage >= 100 ? 'text-emerald-400 font-medium' : ''}>{percentage}%</span>
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500 relative" 
                            style={{ width: `${percentage}%`, backgroundColor: tier.color }} 
                          >
                            {percentage >= 100 && (
                              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] font-bold text-black/70">SOLD OUT</span>
                            )}
                          </div>
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
                    <RefreshCw className="h-3.5 w-3.5 text-purple-400" />
                    <span className="text-sm font-medium text-white">3 (1.2%)</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: AUDIENCE */}
            <TabsContent value="audience" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Age Demographics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Users className="h-4 w-4 text-indigo-400" />
                    Age Demographics
                  </h3>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 text-gray-500 hover:text-white"
                    onClick={() => handleExport('Demographics')}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="h-[160px] w-[160px] relative">
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
                          formatter={(value: number) => [`${value}%`, 'Share']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold text-white">{event.ticketsSold}</span>
                      <span className="text-[9px] text-gray-500 uppercase">Attendees</span>
                    </div>
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
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Globe className="h-4 w-4 text-emerald-400" />
                    Top 5 Cities
                  </h3>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 text-gray-500 hover:text-white"
                    onClick={() => handleExport('Geographic')}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {geoData.map((item) => (
                    <div key={item.country} className="flex items-center gap-4">
                      <span className="text-xl">{item.flag}</span>
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

              {/* Wallet Type Distribution */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-amber-400" />
                  Wallet Type Distribution
                </h3>
                
                <div className="grid grid-cols-3 gap-2">
                  {walletTypeData.map((wallet) => (
                    <div key={wallet.name} className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                      <span className="text-2xl mb-1 block">{wallet.icon}</span>
                      <span className="text-lg font-bold text-white block">{wallet.percentage}%</span>
                      <span className="text-[10px] text-gray-500 block truncate">{wallet.name}</span>
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
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6 text-gray-400 hover:text-white"
                        onClick={() => openBlockExplorer('contract')}
                      >
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
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Total Gas Spent</span>
                    <span className="text-xs text-emerald-400">0.0847 MATIC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Avg Gas / Tx</span>
                    <span className="text-xs text-white">~0.0002 MATIC</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  onClick={() => openBlockExplorer('contract')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Polygonscan
                </Button>
              </div>

              {/* Recent Transactions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Transaction Feed</h3>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 text-gray-500 hover:text-white"
                    onClick={() => handleExport('Transactions')}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                  {blockchainTransactions.map((tx, idx) => (
                    <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            tx.type === 'Minted' ? 'bg-emerald-500/10' : 
                            tx.type === 'Transferred' ? 'bg-blue-500/10' : 'bg-amber-500/10'
                          }`}>
                            <Wallet className={`h-3.5 w-3.5 ${
                              tx.type === 'Minted' ? 'text-emerald-400' : 
                              tx.type === 'Transferred' ? 'text-blue-400' : 'text-amber-400'
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-white font-medium">{tx.type}</span>
                              {/* Status indicator */}
                              {tx.status === 'confirmed' ? (
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                              ) : (
                                <Loader2 className="h-3 w-3 text-amber-400 animate-spin" />
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <code className="text-[10px] text-gray-500 font-mono">{tx.hash.slice(0, 10)}...</code>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-4 w-4 p-0 text-gray-500 hover:text-white"
                                onClick={() => copyToClipboard(tx.hash)}
                              >
                                <Copy className="h-2.5 w-2.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {tx.amount > 0 && (
                            <span className="text-sm font-mono text-indigo-400 block">{tx.amount} ETH</span>
                          )}
                          <span className="text-[10px] text-gray-600">{tx.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] border-t border-white/5 pt-2 mt-1">
                        <span className="text-gray-500 font-mono truncate max-w-[200px]">
                          {tx.wallet.slice(0, 6)}...{tx.wallet.slice(-4)}
                        </span>
                        <div className="flex items-center gap-2">
                          {tx.block && <span className="text-gray-600">Block #{tx.block}</span>}
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-5 w-5 p-0 text-gray-500 hover:text-indigo-400"
                            onClick={() => openBlockExplorer(tx.hash)}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* TAB 4: REVENUE */}
            <TabsContent value="revenue" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Stacked Revenue Chart */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    Revenue Breakdown
                  </h3>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 text-gray-500 hover:text-white"
                    onClick={() => handleExport('Revenue')}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
                
                <div className="h-[200px] w-full bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueStackedData}>
                      <defs>
                        <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRoyalties" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F87171" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#F87171" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} tickFormatter={(v) => `$${v}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                        formatter={(value: number, name: string) => {
                          const labels: Record<string, string> = {
                            primary: 'Primary Sales',
                            royalties: 'Secondary Royalties',
                            fees: 'Platform Fees'
                          };
                          return [`$${value}`, labels[name] || name];
                        }}
                      />
                      <Area type="monotone" dataKey="primary" stackId="1" stroke="#818cf8" fill="url(#colorPrimary)" />
                      <Area type="monotone" dataKey="royalties" stackId="1" stroke="#60A5FA" fill="url(#colorRoyalties)" />
                      <Area type="monotone" dataKey="fees" stackId="1" stroke="#F87171" fill="url(#colorFees)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend */}
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-indigo-400" />
                    <span className="text-[10px] text-gray-400">Primary Sales</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                    <span className="text-[10px] text-gray-400">Royalties</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="text-[10px] text-gray-400">Fees</span>
                  </div>
                </div>
              </div>

              {/* Financial Summary Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Gross Revenue</span>
                  </div>
                  <span className="text-xl font-bold text-white">${grossRevenue.toLocaleString()}</span>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="h-4 w-4 text-red-400" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Platform Fees (10%)</span>
                  </div>
                  <span className="text-xl font-bold text-red-400">-${platformFees.toLocaleString()}</span>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                    <span className="text-[10px] text-emerald-400 uppercase tracking-wider">Net Revenue</span>
                  </div>
                  <span className="text-xl font-bold text-white">${netRevenue.toLocaleString()}</span>
                </div>
                <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span className="text-[10px] text-amber-400 uppercase tracking-wider">Pending</span>
                  </div>
                  <span className="text-xl font-bold text-white">${pendingWithdrawals.toLocaleString()}</span>
                </div>
              </div>

              {/* Withdraw Button */}
              <Button 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20"
                onClick={handleWithdraw}
                disabled={isWithdrawing || pendingWithdrawals === 0}
              >
                {isWithdrawing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4 mr-2" />
                    Withdraw to Wallet
                  </>
                )}
              </Button>

              {/* Average Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Avg Ticket Price</span>
                  <span className="text-xl font-bold text-white">${event.priceUsd}</span>
                  <span className="text-xs text-indigo-400 block">{event.priceEth} ETH</span>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Revenue per Attendee</span>
                  <span className="text-xl font-bold text-white">${Math.round(event.revenue / event.ticketsSold)}</span>
                  <span className="text-xs text-emerald-400 block">↑ 8% vs avg</span>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>

      </SheetContent>
    </Sheet>
  );
}
