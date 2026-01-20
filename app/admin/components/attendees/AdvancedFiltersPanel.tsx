import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

export interface AdvancedFilterState {
    event: string;
    ticketType: string;
    network: string;
    walletType: string;
    status: string;
}

interface AdvancedFiltersPanelProps {
    onApply: (filters: AdvancedFilterState) => void;
    onReset: () => void;
}

export function AdvancedFiltersPanel({ onApply, onReset }: AdvancedFiltersPanelProps) {
    const [filters, setFilters] = useState<AdvancedFilterState>({
        event: 'all',
        ticketType: 'all',
        network: 'all',
        walletType: 'all',
        status: 'all'
    });

    const handleChange = (key: keyof AdvancedFilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleReset = () => {
        setFilters({
            event: 'all',
            ticketType: 'all',
            network: 'all',
            walletType: 'all',
            status: 'all'
        });
        onReset();
    };

    return (
    <div className="bg-[#0A0E27]/50 rounded-xl border border-white/5 p-4 animate-in slide-in-from-top-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
                <Label className="text-xs text-gray-400">By Event</Label>
                <Select value={filters.event} onValueChange={(v) => handleChange('event', v)}>
                    <SelectTrigger className="bg-[#0A0E27] border-white/10 text-gray-300">
                        <SelectValue placeholder="All Events" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0E27] border-white/10 text-gray-300">
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="jazz">Jazz Night Under Stars</SelectItem>
                        <SelectItem value="web3">Web3 Summit</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label className="text-xs text-gray-400">Ticket Type</Label>
                <Select value={filters.ticketType} onValueChange={(v) => handleChange('ticketType', v)}>
                    <SelectTrigger className="bg-[#0A0E27] border-white/10 text-gray-300">
                        <SelectValue placeholder="Any Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0E27] border-white/10 text-gray-300">
                        <SelectItem value="all">Any Type</SelectItem>
                        <SelectItem value="VIP">VIP</SelectItem>
                        <SelectItem value="GENERAL">General</SelectItem>
                        <SelectItem value="EARLY_BIRD">Early Bird</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label className="text-xs text-gray-400">Purchase Date</Label>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-[#0A0E27] border-white/10 text-gray-300 hover:bg-white/5 hover:text-white">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Pick a date range</span>
                </Button>
            </div>

             <div className="space-y-2">
                <Label className="text-xs text-gray-400">Network</Label>
                 <Select value={filters.network} onValueChange={(v) => handleChange('network', v)}>
                    <SelectTrigger className="bg-[#0A0E27] border-white/10 text-gray-300">
                        <SelectValue placeholder="All Networks" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0E27] border-white/10 text-gray-300">
                        <SelectItem value="all">All Networks</SelectItem>
                        <SelectItem value="Ethereum">Ethereum</SelectItem>
                        <SelectItem value="Polygon">Polygon</SelectItem>
                        <SelectItem value="BSC">BSC</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
             <div className="space-y-2">
                <Label className="text-xs text-gray-400">Wallet Type</Label>
                 <Select value={filters.walletType} onValueChange={(v) => handleChange('walletType', v)}>
                    <SelectTrigger className="bg-[#0A0E27] border-white/10 text-gray-300">
                        <SelectValue placeholder="Any Wallet" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0E27] border-white/10 text-gray-300">
                        <SelectItem value="all">Any Wallet</SelectItem>
                        <SelectItem value="mm">MetaMask</SelectItem>
                        <SelectItem value="wc">WalletConnect</SelectItem>
                    </SelectContent>
                </Select>
            </div>

             <div className="space-y-2">
                <Label className="text-xs text-gray-400">Status</Label>
                 <Select value={filters.status} onValueChange={(v) => handleChange('status', v)}>
                    <SelectTrigger className="bg-[#0A0E27] border-white/10 text-gray-300">
                        <SelectValue placeholder="Any Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0E27] border-white/10 text-gray-300">
                        <SelectItem value="all">Any Status</SelectItem>
                        <SelectItem value="CHECKED_IN">Checked In</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="NO_SHOW">No Show</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-white/5">
             <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-white hover:bg-white/5 h-8"
                onClick={handleReset}
             >
                Reset
             </Button>
             <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white h-8"
                onClick={() => onApply(filters)}
             >
                Apply Filters
             </Button>
        </div>
    </div>
  );
}
