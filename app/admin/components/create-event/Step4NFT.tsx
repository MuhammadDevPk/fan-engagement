import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EventFormData } from "./types"
import { Upload, ImageIcon } from "lucide-react"

interface StepProps {
  data: EventFormData;
  updateData: (data: Partial<EventFormData>) => void;
}

export default function Step4NFT({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 gap-6">
        {/* NFT Image Upload */}
        <div className="space-y-2">
          <Label>NFT Image (500x500px)</Label>
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ImageIcon className="h-6 w-6 text-purple-400" />
            </div>
            <p className="text-sm font-medium text-white">Drag & drop or browse</p>
            <p className="text-xs text-gray-400 mt-1">supports JPG, PNG, GIF</p>
          </div>
        </div>

        {/* Banner Upload */}
        <div className="space-y-2">
          <Label>Event Banner (1920x1080px)</Label>
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Upload className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-sm font-medium text-white">Drag & drop or browse</p>
            <p className="text-xs text-gray-400 mt-1">supports JPG, PNG</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="collection">Collection Name</Label>
          <Input 
            id="collection" 
            value={data.collectionName}
            onChange={(e) => updateData({ collectionName: e.target.value })}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="symbol">Token Symbol</Label>
          <Input 
            id="symbol" 
            placeholder="e.g. TICKET"
            value={data.tokenSymbol}
            onChange={(e) => updateData({ tokenSymbol: e.target.value })}
            className="bg-white/5 border-white/10 text-white uppercase"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <Label>Royalty Percentage</Label>
          <span className="text-sm font-medium text-purple-400">{data.royaltyPercentage}%</span>
        </div>
        <Slider 
          value={[data.royaltyPercentage]} 
          max={10} 
          step={0.5} 
          onValueChange={(vals) => updateData({ royaltyPercentage: vals[0] })}
          className="py-4"
        />
      </div>

      <div className="space-y-3 pt-4 border-t border-white/10">
        <Label>Smart Contract</Label>
        <RadioGroup 
          value={data.deployContract} 
          onValueChange={(val: 'new' | 'existing') => updateData({ deployContract: val })}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="new" className="border-purple-500 text-purple-500" />
            <Label htmlFor="new">Deploy New Contract</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="existing" id="existing" className="border-purple-500 text-purple-500" />
            <Label htmlFor="existing">Use Existing</Label>
          </div>
        </RadioGroup>
      </div>

      {data.deployContract === 'existing' && (
        <div className="space-y-2 animate-in fade-in zoom-in-95">
          <Label htmlFor="address">Contract Address</Label>
          <Input 
            id="address" 
            placeholder="0x..."
            value={data.contractAddress}
            onChange={(e) => updateData({ contractAddress: e.target.value })}
            className="bg-white/5 border-white/10 text-white font-mono"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Network</Label>
        <Select 
          value={data.network} 
          onValueChange={(val) => updateData({ network: val })}
        >
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ethereum">Ethereum Mainnet</SelectItem>
            <SelectItem value="Polygon">Polygon (Matic)</SelectItem>
            <SelectItem value="Optimism">Optimism</SelectItem>
            <SelectItem value="Arbitrum">Arbitrum</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
