"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { EventFormData, TicketTier, AVAILABLE_BENEFITS } from "./types"
import { Plus, Trash2, GripVertical, Check, DollarSign, Coins, TrendingUp, AlertCircle } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface StepProps {
  data: EventFormData;
  updateData: (data: Partial<EventFormData>) => void;
}

// Mock exchange rates (in production, these would come from an API)
const EXCHANGE_RATES = {
  ETH: 3250,  // 1 ETH = $3250 USD
  MATIC: 0.85, // 1 MATIC = $0.85 USD
};

export default function Step3PricingTickets({ data, updateData }: StepProps) {
  const [cryptoPrice, setCryptoPrice] = useState<string>('');
  const [draggedTier, setDraggedTier] = useState<string | null>(null);

  // Calculate crypto conversion
  const calculateCryptoPrice = useCallback(() => {
    if (!data.basePrice || data.basePrice <= 0) {
      setCryptoPrice('');
      return;
    }

    if (data.currency === 'USD') {
      const ethPrice = (data.basePrice / EXCHANGE_RATES.ETH).toFixed(6);
      const maticPrice = (data.basePrice / EXCHANGE_RATES.MATIC).toFixed(2);
      setCryptoPrice(`≈ ${ethPrice} ETH / ${maticPrice} MATIC`);
    } else if (data.currency === 'ETH') {
      const usdPrice = (data.basePrice * EXCHANGE_RATES.ETH).toFixed(2);
      setCryptoPrice(`≈ $${usdPrice} USD`);
    } else {
      const usdPrice = (data.basePrice * EXCHANGE_RATES.MATIC).toFixed(2);
      setCryptoPrice(`≈ $${usdPrice} USD`);
    }
  }, [data.basePrice, data.currency]);

  useEffect(() => {
    calculateCryptoPrice();
  }, [calculateCryptoPrice]);

  const addTier = () => {
    const tierNumber = data.ticketTiers.length + 1;
    const tierNames = ['General Admission', 'VIP Pass', 'VVIP Experience', 'Platinum', 'Diamond'];
    const newTier: TicketTier = {
      id: `tier-${Date.now()}`,
      name: tierNames[tierNumber - 1] || `Tier ${tierNumber}`,
      price: data.basePrice * tierNumber,
      quantity: Math.floor(data.totalTickets / (tierNumber + 1)),
      benefits: tierNumber === 1 ? ['Event Access'] : ['Event Access', 'VIP Access']
    };
    updateData({ ticketTiers: [...data.ticketTiers, newTier] });
  };

  const removeTier = (id: string) => {
    updateData({ ticketTiers: data.ticketTiers.filter(t => t.id !== id) });
  };

  const updateTier = (id: string, field: keyof TicketTier, value: string | number | string[]) => {
    updateData({
      ticketTiers: data.ticketTiers.map(t => 
        t.id === id ? { ...t, [field]: value } : t
      )
    });
  };

  const toggleBenefit = (tierId: string, benefit: string) => {
    const tier = data.ticketTiers.find(t => t.id === tierId);
    if (!tier) return;
    
    const newBenefits = tier.benefits.includes(benefit)
      ? tier.benefits.filter(b => b !== benefit)
      : [...tier.benefits, benefit];
    updateTier(tierId, 'benefits', newBenefits);
  };

  // Calculate totals
  const totalTierTickets = data.ticketTiers.reduce((sum, tier) => sum + tier.quantity, 0);
  const remainingTickets = data.totalTickets - totalTierTickets;
  const estimatedRevenue = data.ticketTiers.reduce((sum, tier) => sum + (tier.price * tier.quantity), 0);

  const getCurrencySymbol = () => {
    switch (data.currency) {
      case 'ETH': return 'Ξ';
      case 'MATIC': return 'M';
      default: return '$';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Global Pricing Settings */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-purple-400" />
            Currency
          </Label>
          <Select 
            value={data.currency} 
            onValueChange={(val: 'USD' | 'ETH' | 'MATIC') => updateData({ currency: val })}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">
                <span className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" /> USD ($)
                </span>
              </SelectItem>
              <SelectItem value="ETH">
                <span className="flex items-center gap-2">
                  <span className="text-blue-400">Ξ</span> Ethereum (ETH)
                </span>
              </SelectItem>
              <SelectItem value="MATIC">
                <span className="flex items-center gap-2">
                  <span className="text-purple-400">M</span> Polygon (MATIC)
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            Base Price <span className="text-red-400">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400 font-medium">
              {getCurrencySymbol()}
            </span>
            <Input 
              type="number"
              min="0"
              step="0.01"
              value={data.basePrice}
              onChange={(e) => updateData({ basePrice: Number(e.target.value) })}
              className="pl-8 bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            Total Tickets <span className="text-red-400">*</span>
          </Label>
          <Input 
            type="number"
            min="1"
            value={data.totalTickets}
            onChange={(e) => updateData({ totalTickets: Number(e.target.value) })}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-gray-400">
            <TrendingUp className="h-4 w-4" />
            Conversion
          </Label>
          <div className="h-10 px-3 flex items-center bg-white/5 border border-white/10 rounded-md text-sm text-gray-400 font-mono">
            {cryptoPrice || '—'}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      {data.ticketTiers.length > 0 && (
        <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{totalTierTickets.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Tickets Allocated</p>
          </div>
          <div className="text-center border-x border-white/10">
            <p className={cn("text-2xl font-bold", remainingTickets < 0 ? "text-red-400" : "text-green-400")}>
              {remainingTickets.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Remaining</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">
              {getCurrencySymbol()}{estimatedRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Est. Revenue</p>
          </div>
        </div>
      )}

      {remainingTickets < 0 && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertCircle className="h-4 w-4" />
          Tier quantities exceed total tickets available. Please adjust.
        </div>
      )}

      <div className="h-px bg-white/10" />

      {/* Ticket Tiers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-white">Ticket Tiers</h3>
            <p className="text-sm text-gray-400">Define different access levels for your event</p>
          </div>
          <Button 
            onClick={addTier}
            variant="outline" 
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
            disabled={data.ticketTiers.length >= 5}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Tier
          </Button>
        </div>

        <div className="space-y-4">
          {data.ticketTiers.length === 0 && (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
              <div className="h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Coins className="h-8 w-8 text-purple-400" />
              </div>
              <p className="text-gray-400 mb-2">No ticket tiers added yet</p>
              <p className="text-sm text-gray-500 mb-4">Create different pricing tiers for your event</p>
              <Button variant="outline" onClick={addTier} className="text-purple-400 border-purple-500/30">
                <Plus className="mr-2 h-4 w-4" /> Create your first tier
              </Button>
            </div>
          )}

          {data.ticketTiers.map((tier, index) => (
            <div 
              key={tier.id} 
              className={cn(
                "group relative bg-white/5 border border-white/10 rounded-xl p-5 transition-all hover:border-purple-500/30",
                draggedTier === tier.id && "opacity-50"
              )}
              draggable
              onDragStart={() => setDraggedTier(tier.id)}
              onDragEnd={() => setDraggedTier(null)}
            >
              {/* Tier Number Badge */}
              <div className="absolute -top-3 -left-3 h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                {index + 1}
              </div>

              {/* Drag Handle */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-grab transition-opacity">
                <GripVertical className="h-5 w-5 text-gray-500" />
              </div>

              <div className="pl-6 space-y-4">
                {/* Main Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-4 space-y-1.5">
                    <Label className="text-xs text-gray-400">Tier Name</Label>
                    <Input 
                      value={tier.name}
                      onChange={(e) => updateTier(tier.id, 'name', e.target.value)}
                      className="bg-black/30 border-white/10 h-10"
                      placeholder="e.g. VIP Pass"
                    />
                  </div>

                  <div className="md:col-span-3 space-y-1.5">
                    <Label className="text-xs text-gray-400">Price ({data.currency})</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                        {getCurrencySymbol()}
                      </span>
                      <Input 
                        type="number"
                        min="0"
                        step="0.01"
                        value={tier.price}
                        onChange={(e) => updateTier(tier.id, 'price', Number(e.target.value))}
                        className="pl-7 bg-black/30 border-white/10 h-10"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3 space-y-1.5">
                    <Label className="text-xs text-gray-400">Quantity</Label>
                    <Input 
                      type="number"
                      min="1"
                      value={tier.quantity}
                      onChange={(e) => updateTier(tier.id, 'quantity', Number(e.target.value))}
                      className="bg-black/30 border-white/10 h-10"
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeTier(tier.id)}
                      className="text-gray-500 hover:text-red-400 hover:bg-red-400/10 h-10 w-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="pt-3 border-t border-white/5">
                  <Label className="text-xs text-gray-400 mb-3 block">Included Benefits</Label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_BENEFITS.map((benefit) => {
                      const isSelected = tier.benefits.includes(benefit);
                      return (
                        <Badge 
                          key={benefit} 
                          variant={isSelected ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer transition-all",
                            isSelected 
                              ? "bg-purple-500/20 text-purple-300 border-purple-500/50 hover:bg-purple-500/30" 
                              : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-gray-300"
                          )}
                          onClick={() => toggleBenefit(tier.id, benefit)}
                        >
                          {isSelected && <Check className="mr-1 h-3 w-3" />}
                          {benefit}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Tier Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Revenue: {getCurrencySymbol()}{(tier.price * tier.quantity).toLocaleString()}</span>
                  <span>•</span>
                  <span>{((tier.quantity / data.totalTickets) * 100).toFixed(1)}% of total</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
