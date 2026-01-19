import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { EventFormData } from "./types"

interface StepProps {
  data: EventFormData;
  updateData: (data: Partial<EventFormData>) => void;
}

export default function Step5Settings({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="space-y-1">
          <Label className="text-base">Early Bird Discount</Label>
          <p className="text-sm text-gray-400">Enable automated price updates based on date</p>
        </div>
        <Switch 
          checked={data.earlyBirdDiscount}
          onCheckedChange={(checked) => updateData({ earlyBirdDiscount: checked })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxWallet">Maximum Tickets per Wallet</Label>
        <Input 
          id="maxWallet" 
          type="number" 
          value={data.maxPerWallet}
          onChange={(e) => updateData({ maxPerWallet: Number(e.target.value) })}
          className="bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="space-y-1">
          <Label className="text-base">Whitelist Only</Label>
          <p className="text-sm text-gray-400">Restrict access to specific wallet addresses</p>
        </div>
        <Switch 
          checked={data.whitelistEnabled}
          onCheckedChange={(checked) => updateData({ whitelistEnabled: checked })}
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="space-y-1">
          <Label className="text-base">Allow Resale</Label>
          <p className="text-sm text-gray-400">Permit tickets to be listed on secondary marketplaces</p>
        </div>
        <Switch 
          checked={data.resalePermissions}
          onCheckedChange={(checked) => updateData({ resalePermissions: checked })}
        />
      </div>

      {data.whitelistEnabled && (
         <div className="space-y-2 animate-in fade-in zoom-in-95">
           <Label>Upload Whitelist (CSV)</Label>
           <Input 
             type="file" 
             className="bg-white/5 border-white/10 text-white file:text-white file:bg-white/10 file:border-0 file:rounded-md file:mr-4 file:px-4 file:py-1 cursor-pointer"
           />
         </div>
      )}
    </div>
  )
}
