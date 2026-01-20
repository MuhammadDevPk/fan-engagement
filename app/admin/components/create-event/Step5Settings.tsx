"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { EventFormData } from "./types"
import { CalendarIcon, Percent, Users, Shield, Repeat, Lock, UserCheck, X, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

interface StepProps {
  data: EventFormData;
  updateData: (data: Partial<EventFormData>) => void;
}

export default function Step5Settings({ data, updateData }: StepProps) {
  const [newAddress, setNewAddress] = useState('');

  const addWhitelistAddress = () => {
    const trimmed = newAddress.trim();
    if (trimmed && trimmed.startsWith('0x') && trimmed.length === 42 && !data.whitelistAddresses.includes(trimmed)) {
      updateData({ whitelistAddresses: [...data.whitelistAddresses, trimmed] });
      setNewAddress('');
    }
  };

  const removeWhitelistAddress = (address: string) => {
    updateData({ whitelistAddresses: data.whitelistAddresses.filter(a => a !== address) });
  };

  const handleAddressKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addWhitelistAddress();
    }
  };

  // Generate mock addresses for demo
  const generateMockAddresses = () => {
    const mockAddresses = [
      '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD58',
      '0x8ba1f109551bD432803012645Ac136ddd64DcA4a',
      '0x1234567890AbCdEf1234567890aBcDeF12345678',
      '0xDeadBeef00000000000000000000000000000000',
      '0xCafeBabe11111111111111111111111111111111',
    ];
    updateData({ whitelistAddresses: [...data.whitelistAddresses, ...mockAddresses.filter(a => !data.whitelistAddresses.includes(a))] });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Early Bird Discount */}
      <div className="p-5 bg-white/5 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Percent className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="space-y-0.5">
              <Label className="text-base">Early Bird Discount</Label>
              <p className="text-sm text-gray-400">Offer discounted prices for early purchases</p>
            </div>
          </div>
          <Switch 
            checked={data.earlyBirdDiscount}
            onCheckedChange={(checked) => updateData({ earlyBirdDiscount: checked })}
          />
        </div>
        
        {data.earlyBirdDiscount && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-2">
              <Label>Discount Ends</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-black/20 border-white/10",
                      !data.earlyBirdEndDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.earlyBirdEndDate ? format(data.earlyBirdEndDate, "PPP") : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={data.earlyBirdEndDate}
                    onSelect={(date) => updateData({ earlyBirdEndDate: date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Discount Amount</Label>
                <span className="text-sm font-bold text-yellow-400">{data.earlyBirdPercentage}% OFF</span>
              </div>
              <Slider
                value={[data.earlyBirdPercentage]}
                max={50}
                min={5}
                step={5}
                onValueChange={(vals) => updateData({ earlyBirdPercentage: vals[0] })}
                className="py-2"
              />
              <p className="text-xs text-gray-500">Early buyers save {data.earlyBirdPercentage}% on ticket prices</p>
            </div>
          </div>
        )}
      </div>

      {/* Max Per Wallet */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-400" />
          <Label htmlFor="maxWallet">Maximum Tickets per Wallet</Label>
        </div>
        <Input 
          id="maxWallet" 
          type="number"
          min="1"
          max="100"
          value={data.maxPerWallet}
          onChange={(e) => updateData({ maxPerWallet: Number(e.target.value) })}
          className="bg-white/5 border-white/10 text-white"
        />
        <p className="text-xs text-gray-500">Limit how many tickets a single wallet can purchase to prevent scalping</p>
      </div>

      {/* Whitelist */}
      <div className="p-5 bg-white/5 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-purple-400" />
            </div>
            <div className="space-y-0.5">
              <Label className="text-base">Whitelist Only</Label>
              <p className="text-sm text-gray-400">Restrict access to specific wallet addresses</p>
            </div>
          </div>
          <Switch 
            checked={data.whitelistEnabled}
            onCheckedChange={(checked) => updateData({ whitelistEnabled: checked })}
          />
        </div>

        {data.whitelistEnabled && (
          <div className="space-y-3 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
            <div className="flex gap-2">
              <Input
                placeholder="Enter wallet address (0x...)"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                onKeyDown={handleAddressKeyDown}
                className="flex-1 bg-black/20 border-white/10 font-mono text-sm"
              />
              <Button 
                variant="outline" 
                onClick={addWhitelistAddress}
                disabled={!newAddress || !newAddress.startsWith('0x') || newAddress.length !== 42}
                className="border-purple-500/50 text-purple-400"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{data.whitelistAddresses.length} addresses added</span>
              <Button variant="link" size="sm" onClick={generateMockAddresses} className="text-purple-400 text-xs">
                + Add sample addresses
              </Button>
            </div>

            {data.whitelistAddresses.length > 0 && (
              <div className="max-h-[150px] overflow-y-auto space-y-2 pr-2">
                {data.whitelistAddresses.map((address) => (
                  <div key={address} className="flex items-center justify-between p-2 bg-black/20 rounded-lg group">
                    <span className="font-mono text-xs text-gray-400 truncate">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400"
                      onClick={() => removeWhitelistAddress(address)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <Label className="text-xs text-gray-400">Or upload CSV file</Label>
              <Input 
                type="file"
                accept=".csv"
                className="mt-2 bg-black/20 border-white/10 text-white file:text-white file:bg-purple-500/20 file:border-0 file:rounded-md file:mr-4 file:px-4 file:py-1 cursor-pointer text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Resale Permissions */}
      <div className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <Repeat className="h-5 w-5 text-green-400" />
          </div>
          <div className="space-y-0.5">
            <Label className="text-base">Allow Resale</Label>
            <p className="text-sm text-gray-400">Permit tickets to be listed on secondary marketplaces</p>
          </div>
        </div>
        <Switch 
          checked={data.resalePermissions}
          onCheckedChange={(checked) => updateData({ resalePermissions: checked })}
        />
      </div>

      {/* Transfer Restrictions */}
      <div className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <Lock className="h-5 w-5 text-red-400" />
          </div>
          <div className="space-y-0.5">
            <Label className="text-base">Transfer Restrictions</Label>
            <p className="text-sm text-gray-400">Prevent ticket transfers between wallets (soulbound)</p>
          </div>
        </div>
        <Switch 
          checked={data.transferRestrictions}
          onCheckedChange={(checked) => updateData({ transferRestrictions: checked })}
        />
      </div>

      {/* KYC Requirement */}
      <div className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <UserCheck className="h-5 w-5 text-blue-400" />
          </div>
          <div className="space-y-0.5">
            <Label className="text-base">Require KYC Verification</Label>
            <p className="text-sm text-gray-400">Buyers must verify their identity before purchase</p>
          </div>
        </div>
        <Switch 
          checked={data.requireKYC}
          onCheckedChange={(checked) => updateData({ requireKYC: checked })}
        />
      </div>

      {/* Summary */}
      <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
        <h4 className="text-sm font-medium text-white mb-3">Settings Summary</h4>
        <div className="flex flex-wrap gap-2">
          {data.earlyBirdDiscount && (
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
              {data.earlyBirdPercentage}% Early Bird
            </Badge>
          )}
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
            Max {data.maxPerWallet} per wallet
          </Badge>
          {data.whitelistEnabled && (
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
              Whitelist ({data.whitelistAddresses.length})
            </Badge>
          )}
          {data.resalePermissions && (
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              Resale Allowed
            </Badge>
          )}
          {data.transferRestrictions && (
            <Badge variant="secondary" className="bg-red-500/20 text-red-400">
              Soulbound
            </Badge>
          )}
          {data.requireKYC && (
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
              KYC Required
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
