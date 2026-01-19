import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { EventFormData, TicketTier } from "./types"
import { Plus, Trash2, GripVertical, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface StepProps {
  data: EventFormData;
  updateData: (data: Partial<EventFormData>) => void;
}

export default function Step3PricingTickets({ data, updateData }: StepProps) {
  const [cryptoPrice, setCryptoPrice] = useState<string>('0.00');

  // Mock crypto conversion effect
  useEffect(() => {
    if (data.basePrice) {
      // Mock rates: 1 ETH = 3000 USD, 1 MATIC = 0.8 USD
      let rate = 1;
      let symbol = '';
      if (data.currency === 'ETH') {
        rate = 1 / 3000;
        symbol = 'ETH';
      } else if (data.currency === 'MATIC') {
        rate = 1 / 0.8;
        symbol = 'MATIC';
      } else {
        rate = 1;
        symbol = 'USD';
      }
      
      if (data.currency === 'USD') {
        // If pricing in USD, show ETH equivalent
        setCryptoPrice(`≈ ${(data.basePrice / 3000).toFixed(4)} ETH`);
      } else {
        // If pricing in Crypto, show USD equivalent
        const usdPrice = data.currency === 'ETH' ? data.basePrice * 3000 : data.basePrice * 0.8;
        setCryptoPrice(`≈ $${usdPrice.toFixed(2)} USD`);
      }
    } else {
      setCryptoPrice('');
    }
  }, [data.basePrice, data.currency]);

  const addTier = () => {
    const newTier: TicketTier = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Tier ${data.ticketTiers.length + 1}`,
      price: data.basePrice,
      quantity: 100,
      benefits: []
    };
    updateData({ ticketTiers: [...data.ticketTiers, newTier] });
  };

  const removeTier = (id: string) => {
    updateData({ ticketTiers: data.ticketTiers.filter(t => t.id !== id) });
  };

  const updateTier = (id: string, field: keyof TicketTier, value: any) => {
    updateData({
      ticketTiers: data.ticketTiers.map(t => 
        t.id === id ? { ...t, [field]: value } : t
      )
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Global Pricing Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>Currency</Label>
          <Select 
            value={data.currency} 
            onValueChange={(val: 'USD' | 'ETH' | 'MATIC') => updateData({ currency: val })}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
              <SelectItem value="MATIC">Polygon (MATIC)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Base Price</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
                {data.currency === 'USD' ? '$' : data.currency === 'ETH' ? 'Ξ' : 'M'}
            </span>
            <Input 
              type="number"
              value={data.basePrice}
              onChange={(e) => updateData({ basePrice: Number(e.target.value) })}
              className="pl-8 bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Estimated Value</Label>
          <Input 
            readOnly
            value={cryptoPrice}
            className="bg-white/5 border-white/10 text-gray-400 font-mono"
          />
        </div>
      </div>

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
          >
            <Plus className="mr-2 h-4 w-4" /> Add Tier
          </Button>
        </div>

        <div className="space-y-4">
          {data.ticketTiers.length === 0 && (
             <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
               <p className="text-gray-500">No ticket tiers added yet.</p>
               <Button variant="link" onClick={addTier} className="text-purple-400">Create your first tier</Button>
             </div>
          )}

          {data.ticketTiers.map((tier, index) => (
            <div key={tier.id} className="group relative bg-white/5 border border-white/10 rounded-xl p-4 transition-all hover:border-purple-500/30">
              
              <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-move">
                <GripVertical className="h-5 w-5 text-gray-500" />
              </div>

              <div className="pl-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                
                <div className="md:col-span-4 space-y-1">
                  <Label className="text-xs text-gray-400">Tier Name</Label>
                  <Input 
                    value={tier.name}
                    onChange={(e) => updateTier(tier.id, 'name', e.target.value)}
                    className="bg-black/20 border-white/10 h-9"
                  />
                </div>

                <div className="md:col-span-3 space-y-1">
                  <Label className="text-xs text-gray-400">Price ({data.currency})</Label>
                  <Input 
                     type="number"
                     value={tier.price}
                     onChange={(e) => updateTier(tier.id, 'price', Number(e.target.value))}
                     className="bg-black/20 border-white/10 h-9"
                  />
                </div>

                <div className="md:col-span-3 space-y-1">
                  <Label className="text-xs text-gray-400">Quantity</Label>
                  <Input 
                     type="number"
                     value={tier.quantity}
                     onChange={(e) => updateTier(tier.id, 'quantity', Number(e.target.value))}
                     className="bg-black/20 border-white/10 h-9"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeTier(tier.id)}
                    className="text-gray-500 hover:text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Benefits Section (Collapsed simplified) */}
               <div className="mt-4 pl-6">
                  <Label className="text-xs text-gray-400 mb-2 block">Includes benefits</Label>
                  <div className="flex flex-wrap gap-2">
                    {['VIP Access', 'Free Drink', 'Meet & Greet'].map((benefit) => (
                      <Badge 
                        key={benefit} 
                        variant={tier.benefits.includes(benefit) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                           const newBenefits = tier.benefits.includes(benefit) 
                             ? tier.benefits.filter(b => b !== benefit)
                             : [...tier.benefits, benefit];
                           updateTier(tier.id, 'benefits', newBenefits);
                        }}
                      >
                         {tier.benefits.includes(benefit) && <Check className="mr-1 h-3 w-3" />}
                         {benefit}
                      </Badge>
                    ))}
                  </div>
               </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
