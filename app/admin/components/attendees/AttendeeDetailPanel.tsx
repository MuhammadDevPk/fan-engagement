"use client"

import React, { useState } from 'react';
import { 
  X, Copy, Mail, MessageSquare, ExternalLink, Calendar, Wallet, CheckCircle2, 
  Send, Clock, AlertCircle, Shield, ArrowRightLeft, Ban, 
  Activity, Download, RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Attendee } from './types';

interface AttendeeDetailPanelProps {
  attendee: Attendee | null;
  onClose: () => void;
}

export function AttendeeDetailPanel({ attendee, onClose }: AttendeeDetailPanelProps) {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  if (!attendee) return null;

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(attendee.walletAddress);
    toast.success("Wallet address copied to clipboard");
  };

  const handleCopyTxHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast.success("Transaction hash copied");
  };

  const handleSendEmail = async () => {
    if (!emailSubject.trim() || !emailBody.trim()) {
      toast.error("Please enter both subject and message");
      return;
    }
    setIsSendingEmail(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSendingEmail(false);
    toast.success("Email sent successfully", {
      description: `Message sent to ${attendee.email || attendee.walletAddress}`
    });
    setEmailSubject('');
    setEmailBody('');
  };

  const handleResendTicket = (ticketId: string) => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Resending ticket...',
        success: `Ticket ${ticketId} resent successfully!`,
        error: 'Failed to resend ticket'
      }
    );
  };

  const handleViewOnChain = (network: string, contractAddress: string, tokenId: string) => {
    const baseUrls: { [key: string]: string } = {
      'Ethereum': 'https://etherscan.io',
      'Polygon': 'https://polygonscan.com',
      'BSC': 'https://bscscan.com'
    };
    const url = `${baseUrls[network] || 'https://etherscan.io'}/token/${contractAddress}?a=${tokenId}`;
    window.open(url, '_blank');
    toast.info(`Opening ${network} explorer...`);
  };

  const handleBlockUser = () => {
    toast.warning(`Are you sure you want to block ${attendee.name || 'this user'}?`, {
      action: {
        label: 'Block',
        onClick: () => {
          toast.success(`${attendee.name || 'User'} has been blocked`);
        }
      }
    });
  };

  const handleExportData = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Generating export...',
        success: 'Attendee data exported as JSON',
        error: 'Export failed'
      }
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'CHECK_IN': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case 'PURCHASE': return <Wallet className="h-4 w-4 text-indigo-500" />;
      case 'EMAIL': return <Mail className="h-4 w-4 text-blue-500" />;
      case 'BLOCKCHAIN': return <Shield className="h-4 w-4 text-purple-500" />;
      case 'SYSTEM': return <Activity className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Completed</Badge>;
      case 'PENDING': return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Pending</Badge>;
      case 'FAILED': return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Failed</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-[#0A0E27] border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right">
        {/* Header */}
        <div className="h-20 border-b border-white/10 flex items-center justify-between px-6 bg-[#0A0E27]">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border border-white/10 bg-white/5 relative">
                    <img src={attendee.avatar} alt={attendee.name} className="h-full w-full object-cover" />
                    {attendee.isBlocked && (
                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                        <Ban className="h-6 w-6 text-red-500" />
                      </div>
                    )}
                </div>
                <div>
                   <h3 className="text-lg font-bold text-white flex items-center gap-2">
                       {attendee.name || 'Anonymous'}
                       {attendee.isVip && <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px]">VIP</Badge>}
                       {attendee.isBlocked && <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-[10px]">BLOCKED</Badge>}
                   </h3>
                   <button 
                     onClick={handleCopyWallet}
                     className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                   >
                       <span className="font-mono">{attendee.walletAddress.slice(0, 6)}...{attendee.walletAddress.slice(-4)}</span>
                       <Copy className="h-3 w-3" />
                   </button>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="border-white/10 text-gray-300 hover:text-white" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-1" /> Export
                </Button>
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
                    {/* OVERVIEW TAB */}
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
                                        attendee.engagementScore === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400' :
                                        'bg-gray-500/10 text-gray-400'
                                    }`}>
                                        {attendee.engagementScore}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Marketing Opt-in</p>
                                    <p className="text-sm text-white">{attendee.marketingOptIn ? 'Yes' : 'No'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Last Email Opened</p>
                                    <p className="text-sm text-white">{attendee.emailOpened ? 'Yes' : 'No'}</p>
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
                                                    <Badge variant="secondary" className={`${
                                                      ticket.type === 'VIP' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                      ticket.type === 'EARLY_BIRD' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                      'bg-white/10 text-gray-300'
                                                    }`}>{ticket.type}</Badge>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">Purchased on {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                  {ticket.price} <span className="text-gray-500">({ticket.priceEth} {ticket.network === 'BSC' ? 'BNB' : ticket.network === 'Polygon' ? 'MATIC' : 'ETH'})</span>
                                                </p>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 mt-4">
                                                <Button 
                                                  size="sm" 
                                                  className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white"
                                                  onClick={() => handleViewOnChain(ticket.network, ticket.contractAddress, ticket.tokenId)}
                                                >
                                                  View NFT
                                                </Button>
                                                <Button 
                                                  size="sm" 
                                                  variant="ghost" 
                                                  className="h-8 text-gray-400 hover:text-white"
                                                  onClick={() => handleResendTicket(ticket.id)}
                                                >
                                                  <RefreshCw className="h-3 w-3 mr-1" /> Resend
                                                </Button>
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

                    {/* COMMUNICATION TAB */}
                    <TabsContent value="communication" className="mt-0 space-y-6">
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
                            <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Send Email</h4>
                            <div className="space-y-3">
                              <Input
                                placeholder="Subject"
                                value={emailSubject}
                                onChange={(e) => setEmailSubject(e.target.value)}
                                className="bg-[#0A0E27] border-white/10 text-white"
                              />
                              <Textarea 
                                placeholder="Write your message here..."
                                value={emailBody}
                                onChange={(e) => setEmailBody(e.target.value)}
                                className="bg-[#0A0E27] border-white/10 text-white min-h-[120px]"
                              />
                              <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500">
                                  Sending to: <span className="text-gray-300">{attendee.email || 'No email on file'}</span>
                                </p>
                                <Button 
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                  onClick={handleSendEmail}
                                  disabled={isSendingEmail || !attendee.email}
                                >
                                  {isSendingEmail ? (
                                    <>Sending...</>
                                  ) : (
                                    <><Send className="mr-2 h-4 w-4" /> Send Email</>
                                  )}
                                </Button>
                              </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline" className="border-white/10 text-gray-300 hover:text-white justify-start" onClick={() => toast.info("Opening SMS composer...")}>
                            <MessageSquare className="mr-2 h-4 w-4" /> Send SMS
                          </Button>
                          <Button variant="outline" className="border-white/10 text-gray-300 hover:text-white justify-start" onClick={() => handleResendTicket(attendee.tickets[0]?.id || 'ticket')}>
                            <RefreshCw className="mr-2 h-4 w-4" /> Resend All Tickets
                          </Button>
                        </div>

                        {/* Email Open Status */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${attendee.emailOpened ? 'bg-emerald-500/10' : 'bg-gray-500/10'}`}>
                                <Mail className={`h-5 w-5 ${attendee.emailOpened ? 'text-emerald-500' : 'text-gray-500'}`} />
                              </div>
                              <div>
                                <p className="text-sm text-white">Email Engagement</p>
                                <p className="text-xs text-gray-500">Last event reminder</p>
                              </div>
                            </div>
                            <Badge className={attendee.emailOpened ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'}>
                              {attendee.emailOpened ? 'Opened' : 'Not Opened'}
                            </Badge>
                          </div>
                        </div>
                    </TabsContent>

                    {/* ACTIVITY LOG TAB */}
                    <TabsContent value="activity" className="mt-0 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Activity Timeline</h4>
                        <Badge variant="secondary" className="bg-white/10">{attendee.activityLog.length} events</Badge>
                      </div>

                      {attendee.activityLog.length > 0 ? (
                        <div className="space-y-3">
                          {attendee.activityLog.map((log, index) => (
                            <div key={log.id} className="flex gap-4 relative">
                              {/* Timeline Line */}
                              {index < attendee.activityLog.length - 1 && (
                                <div className="absolute left-[19px] top-10 w-0.5 h-full bg-white/10" />
                              )}
                              
                              {/* Icon */}
                              <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 z-10">
                                {getActivityIcon(log.type)}
                              </div>
                              
                              {/* Content */}
                              <div className="flex-1 bg-white/5 rounded-lg border border-white/10 p-3">
                                <p className="text-sm text-white">{log.action}</p>
                                {log.details && <p className="text-xs text-gray-500 mt-1">{log.details}</p>}
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {log.timestamp}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center bg-white/[0.02] border border-white/5 rounded-xl border-dashed">
                          <Activity className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                          <p className="text-gray-500">No activity recorded yet</p>
                        </div>
                      )}
                    </TabsContent>

                    {/* BLOCKCHAIN TAB */}
                    <TabsContent value="blockchain" className="mt-0 space-y-6">
                         <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
                            <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Wallet Overview</h4>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <Wallet className="h-6 w-6 text-orange-500" />
                                </div>
                                <div className="flex-1">
                                    <button 
                                      onClick={handleCopyWallet}
                                      className="text-white font-mono text-sm hover:text-indigo-400 transition-colors flex items-center gap-2"
                                    >
                                      {attendee.walletAddress}
                                      <Copy className="h-3 w-3" />
                                    </button>
                                    <a 
                                      href={`https://etherscan.io/address/${attendee.walletAddress}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-1"
                                    >
                                        View on Etherscan <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </div>
                         </div>

                         {/* NFT Tokens */}
                         <div className="space-y-3">
                           <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">NFT Tickets Owned</h4>
                           {attendee.tickets.map((ticket) => (
                             <div key={ticket.id} className="bg-white/5 rounded-lg border border-white/10 p-4 flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                 <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                   <Shield className="h-5 w-5 text-purple-500" />
                                 </div>
                                 <div>
                                   <p className="text-sm text-white font-mono">Token #{ticket.tokenId}</p>
                                   <p className="text-xs text-gray-500">{ticket.eventName}</p>
                                 </div>
                               </div>
                               <div className="flex items-center gap-2">
                                 <Badge variant="secondary" className="bg-white/10">{ticket.network}</Badge>
                                 <Button 
                                   size="sm" 
                                   variant="ghost" 
                                   className="text-gray-400 hover:text-white"
                                   onClick={() => handleViewOnChain(ticket.network, ticket.contractAddress, ticket.tokenId)}
                                 >
                                   <ExternalLink className="h-4 w-4" />
                                 </Button>
                               </div>
                             </div>
                           ))}
                         </div>

                         {/* Transaction History */}
                         <div className="space-y-3">
                           <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Transaction History</h4>
                           {attendee.transactions.length > 0 ? (
                             attendee.transactions.map((tx) => (
                               <div key={tx.hash} className="bg-white/5 rounded-lg border border-white/10 p-4">
                                 <div className="flex items-center justify-between mb-2">
                                   <div className="flex items-center gap-2">
                                     <ArrowRightLeft className="h-4 w-4 text-indigo-400" />
                                     <span className="text-sm text-white font-medium">{tx.type}</span>
                                   </div>
                                   {getStatusBadge(tx.status)}
                                 </div>
                                 <div className="flex items-center justify-between">
                                   <button 
                                     onClick={() => handleCopyTxHash(tx.hash)}
                                     className="text-xs font-mono text-gray-400 hover:text-indigo-400 flex items-center gap-1"
                                   >
                                     {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                                     <Copy className="h-3 w-3" />
                                   </button>
                                   <div className="text-right">
                                     <p className="text-sm text-white font-mono">{tx.amount}</p>
                                     <p className="text-xs text-gray-500">{tx.date}</p>
                                   </div>
                                 </div>
                               </div>
                             ))
                           ) : (
                             <div className="p-6 text-center bg-white/[0.02] border border-white/5 rounded-xl border-dashed">
                               <p className="text-gray-500">No transactions recorded</p>
                             </div>
                           )}
                         </div>
                    </TabsContent>
                </ScrollArea>

                {/* Footer Actions */}
                <div className="p-4 border-t border-white/10 bg-[#0A0E27] flex justify-between items-center">
                    <Button 
                      variant="ghost" 
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={handleBlockUser}
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      {attendee.isBlocked ? 'Unblock User' : 'Block User'}
                    </Button>
                    <div className="flex gap-3">
                         <Button variant="outline" className="border-white/10 text-gray-300 hover:text-white" onClick={onClose}>Close</Button>
                    </div>
                </div>
             </Tabs>
        </div>
      </div>
    </>
  );
}
