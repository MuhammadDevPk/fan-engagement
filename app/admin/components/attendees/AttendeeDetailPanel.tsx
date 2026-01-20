import React from 'react';
import { X, Copy, Mail, MessageSquare, ExternalLink, Calendar, Wallet, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Attendee } from './types';

interface AttendeeDetailPanelProps {
  attendee: Attendee | null;
  onClose: () => void;
}

export function AttendeeDetailPanel({ attendee, onClose }: AttendeeDetailPanelProps) {
  if (!attendee) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-[#0A0E27] border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right">
        {/* Header */}
        <div className="h-20 border-b border-white/10 flex items-center justify-between px-6 bg-[#0A0E27]">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border border-white/10 bg-white/5">
                    <img src={attendee.avatar} alt={attendee.name} className="h-full w-full object-cover" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-white flex items-center gap-2">
                       {attendee.name || 'Anonymous'}
                       {attendee.isVip && <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px]">VIP</Badge>}
                   </h3>
                   <div className="flex items-center gap-2 text-sm text-gray-400">
                       <span className="font-mono">{attendee.walletAddress}</span>
                       <Copy className="h-3 w-3 cursor-pointer hover:text-white" />
                   </div>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10">
                    <X className="h-5 w-5" />
                </Button>
            </div>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100vh-80px)]">
             <Tabs defaultValue="overview" className="flex-1 flex flex-col">
                <div className="px-6 pt-4">
                    <TabsList className="bg-white/5 border border-white/10 text-gray-400 w-full justify-start h-11 p-1">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Overview</TabsTrigger>
                        <TabsTrigger value="communication" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Communication</TabsTrigger>
                        <TabsTrigger value="activity" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Activity Log</TabsTrigger>
                        <TabsTrigger value="blockchain" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Blockchain</TabsTrigger>
                    </TabsList>
                </div>

                <ScrollArea className="flex-1 p-6">
                    <TabsContent value="overview" className="space-y-6 mt-0">
                        {/* Personal Info Card */}
                        <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
                            <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Personal Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Email Address</p>
                                    <p className="text-sm text-white">{attendee.email || 'Not provided'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Join Date</p>
                                    <p className="text-sm text-white">{new Date(attendee.joinDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                                    <p className="text-sm text-white font-mono">{attendee.totalSpent}</p>
                                </div>
                                 <div>
                                    <p className="text-xs text-gray-500 mb-1">Engagement</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        attendee.engagementScore === 'HIGH' ? 'bg-emerald-500/10 text-emerald-400' : 
                                        'bg-gray-500/10 text-gray-400'
                                    }`}>
                                        {attendee.engagementScore}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Valid Tickets */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider flex items-center justify-between">
                                Active Tickets
                                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">{attendee.tickets.length}</span>
                            </h4>
                            {attendee.tickets.length > 0 ? (
                                attendee.tickets.map((ticket) => (
                                    <div key={ticket.id} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden flex">
                                        <div className="w-24 bg-gray-800">
                                            <img src={ticket.eventThumbnail} alt="" className="h-full w-full object-cover" />
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h5 className="font-bold text-white">{ticket.eventName}</h5>
                                                    <Badge variant="secondary" className="bg-white/10 text-gray-300">{ticket.type}</Badge>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">Purchased on {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                                            </div>
                                            
                                            <div className="flex items-center gap-4 mt-4">
                                                <Button size="sm" className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white">View Ticket</Button>
                                                <Button size="sm" variant="ghost" className="h-8 text-gray-400 hover:text-white">Transfer</Button>
                                            </div>
                                        </div>
                                        {attendee.checkInStatus === 'CHECKED_IN' && (
                                            <div className="w-8 bg-emerald-500/10 border-l border-emerald-500/20 flex items-center justify-center">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-500 -rotate-90" />
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center bg-white/[0.02] border border-white/5 rounded-xl border-dashed">
                                    <p className="text-gray-500">No active tickets found</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="communication" className="mt-0 space-y-6">
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                            <Mail className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                            <h4 className="text-white font-medium mb-1">Send a Message</h4>
                            <p className="text-sm text-gray-500 mb-4">Send an email or SMS directly to this attendee</p>
                            <div className="flex justify-center gap-3">
                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                    <Mail className="mr-2 h-4 w-4" /> Send Email
                                </Button>
                                <Button variant="outline" className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5">
                                    <MessageSquare className="mr-2 h-4 w-4" /> Send SMS
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                     <TabsContent value="blockchain" className="mt-0 space-y-6">
                         <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
                            <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Wallet Overview</h4>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <Wallet className="h-6 w-6 text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-white font-mono text-lg">{attendee.walletAddress}</p>
                                    <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                        View on Etherscan <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </div>
                         </div>
                    </TabsContent>
                </ScrollArea>

                {/* Footer Actions */}
                <div className="p-4 border-t border-white/10 bg-[#0A0E27] flex justify-between items-center">
                    <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">Block User</Button>
                    <div className="flex gap-3">
                         <Button variant="outline" className="border-white/10 text-gray-300 hover:text-white" onClick={onClose}>Close</Button>
                         <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Changes</Button>
                    </div>
                </div>
             </Tabs>
        </div>
      </div>
    </>
  );
}
