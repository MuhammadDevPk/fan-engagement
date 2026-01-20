import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  Eye, 
  Mail, 
  Ticket as TicketIcon,
  Copy,
  ExternalLink,
  Ban,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

import { Attendee } from './types';

interface AttendeesTableProps {
  data: Attendee[];
  onSelectAttendee: (attendee: Attendee) => void;
}

export function AttendeesTable({ data, onSelectAttendee }: AttendeesTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map(d => d.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const truncateHash = (hash: string) => `${hash.slice(0, 4)}...${hash.slice(-4)}`;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-[#0A0E27]/95 backdrop-blur sticky top-0 z-10">
            <TableRow className="hover:bg-transparent border-white/10">
              <TableHead className="w-[40px] pl-4">
                <Checkbox 
                  checked={selectedIds.length === data.length && data.length > 0}
                  onCheckedChange={toggleSelectAll}
                  className="border-white/20 data-[state=checked]:bg-indigo-500"
                />
              </TableHead>
              <TableHead className="min-w-[200px]">Attendee Info</TableHead>
              <TableHead>Tickets</TableHead>
              <TableHead>Purchase Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead className="text-right pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((attendee) => {
               const isSelected = selectedIds.includes(attendee.id);
               const mainTicket = attendee.tickets[0];

               return (
                <TableRow 
                  key={attendee.id}
                  className={`
                    group border-white/[0.05] transition-all duration-200 h-[72px]
                    hover:bg-white/[0.05] relative
                    ${isSelected ? 'bg-indigo-500/5 hover:bg-indigo-500/10' : ''}
                  `}
                >
                  <TableCell className="pl-4">
                    <Checkbox 
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(attendee.id)}
                      className="border-white/20 data-[state=checked]:bg-indigo-500"
                    />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden border border-white/10 bg-white/5">
                        <img src={attendee.avatar} alt={attendee.name || "User"} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-sm">{attendee.name || 'Anonymous'}</span>
                        <button 
                          onClick={(e) => {
                             e.stopPropagation();
                             navigator.clipboard.writeText(attendee.walletAddress);
                          }}
                          className="text-gray-500 text-xs font-mono hover:text-indigo-400 flex items-center gap-1 transition-colors"
                        >
                          {truncateHash(attendee.walletAddress)}
                          <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    {mainTicket ? (
                        <div className="flex items-center gap-2">
                             <div className="h-8 w-8 rounded-md overflow-hidden bg-white/5 border border-white/10">
                                <img src={mainTicket.eventThumbnail} alt="Event" className="h-full w-full object-cover" />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-gray-300 text-xs truncate max-w-[120px]">{mainTicket.eventName}</span>
                                <div className="flex items-center gap-1.5">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                        mainTicket.type === 'VIP' ? 'border-amber-500/30 text-amber-500 bg-amber-500/10' : 
                                        'border-blue-500/30 text-blue-500 bg-blue-500/10'
                                    }`}>
                                        {mainTicket.type}
                                    </span>
                                    {attendee.totalTickets > 1 && (
                                        <span className="text-[10px] text-gray-500 bg-white/5 px-1 rounded">+{attendee.totalTickets - 1} more</span>
                                    )}
                                </div>
                             </div>
                        </div>
                    ) : (
                        <span className="text-gray-500 text-xs italic">No active tickets</span>
                    )}
                  </TableCell>

                  <TableCell>
                    {mainTicket ? (
                        <div className="flex flex-col">
                            <span className="text-gray-300 text-xs">{new Date(mainTicket.purchaseDate).toLocaleDateString()}</span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-white text-xs font-medium">{mainTicket.price}</span>
                                <span className="text-gray-500 text-[10px]">({mainTicket.priceEth} ETH)</span>
                            </div>
                        </div>
                    ) : (
                        <span className="text-gray-500 text-xs">-</span>
                    )}
                  </TableCell>

                  <TableCell>
                     {attendee.checkInStatus === 'CHECKED_IN' && (
                        <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md w-fit border border-emerald-500/20">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">Checked In</span>
                        </div>
                     )}
                     {attendee.checkInStatus === 'PENDING' && (
                        <Button size="sm" variant="outline" className="h-7 text-xs border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300">
                            Check In
                        </Button>
                     )}
                     {attendee.checkInStatus === 'NO_SHOW' && (
                        <span className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">No Show</span>
                     )}
                     {attendee.checkInStatus === 'PARTIAL' && (
                        <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">Partial</span>
                     )}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${
                                attendee.engagementScore === 'HIGH' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                                attendee.engagementScore === 'MEDIUM' ? 'bg-yellow-500' : 'bg-gray-500'
                            }`} />
                            <span className="text-xs text-gray-300">{attendee.engagementScore}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">Last active: {attendee.lastActivity}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right pr-4">
                    <div className="flex items-center justify-end gap-1 opacity-100 transition-opacity">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10" onClick={() => onSelectAttendee(attendee)}>
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
                            onClick={() => alert(`Opening email composer for ${attendee.email || attendee.name}`)}
                        >
                            <Mail className="h-4 w-4" />
                        </Button>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 bg-[#0A0E27] border-white/10 text-gray-200">
                                <DropdownMenuLabel>Manage Attendee</DropdownMenuLabel>
                                <DropdownMenuItem 
                                    className="focus:bg-white/5 cursor-pointer"
                                    onClick={() => alert(`Resending ticket to ${attendee.email || attendee.name}`)}
                                >
                                    <TicketIcon className="mr-2 h-4 w-4" /> Resend Ticket
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="focus:bg-white/5 cursor-pointer"
                                    onClick={() => window.open(`https://etherscan.io/address/${attendee.walletAddress}`, '_blank')}
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" /> View Transaction
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem 
                                    className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
                                    onClick={() => alert(`Blocked user: ${attendee.name}`)}
                                >
                                    <Ban className="mr-2 h-4 w-4" /> Block User
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
               )
            })}
          </TableBody>
        </Table>
      </div>

       {data.length === 0 && (
         <div className="flex flex-col items-center justify-center py-16 px-4 border border-white/10 rounded-2xl bg-white/[0.02] mt-4 border-dashed">
             <div className="h-16 w-16 bg-gray-500/10 rounded-full flex items-center justify-center mb-4">
                 <div className="h-8 w-8 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                 </div>
             </div>
             <h3 className="text-lg font-medium text-white mb-1">No attendees found</h3>
             <p className="text-gray-400 text-center max-w-sm mb-6">
                 We couldn't find any attendees matching your current filters. Try adjusting your search or filters.
             </p>
             <Button variant="outline" className="border-white/10 text-gray-300 hover:text-white" onClick={() => window.location.reload()}>
                 Clear Filters
             </Button>
         </div>
       )}

       {/* Bulk Actions Bar - Sticky Bottom */}
       {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl bg-[#0A0E27] border border-white/20 shadow-2xl rounded-xl p-3 flex items-center justify-between z-50 animate-in slide-in-from-bottom-6">
            <div className="flex items-center gap-4">
                <span className="text-white font-medium pl-2">{selectedIds.length} selected</span>
                <div className="h-6 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">Check In All</Button>
                    <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">Send Email</Button>
                    <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">Export</Button>
                </div>
            </div>
             <Button size="sm" variant="ghost" onClick={toggleSelectAll} className="text-gray-400 hover:text-white">Deselect</Button>
        </div>
       )}
    </div>
  );
}
