"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EventFormData, NFTAttribute, BLOCKCHAIN_NETWORKS } from "./types"
import { Upload, ImageIcon, Plus, X, Sparkles, Wallet, Info } from "lucide-react"
import { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

interface StepProps {
  data: EventFormData;
  updateData: (data: Partial<EventFormData>) => void;
}

export default function Step4NFT({ data, updateData }: StepProps) {
  const [isDraggingNft, setIsDraggingNft] = useState(false);
  const [isDraggingBanner, setIsDraggingBanner] = useState(false);
  const nftInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((file: File, type: 'nft' | 'banner') => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      if (type === 'nft') {
        updateData({ nftImagePreview: preview });
      } else {
        updateData({ bannerImagePreview: preview });
      }
    };
    reader.readAsDataURL(file);
  }, [updateData]);

  const handleDrop = useCallback((e: React.DragEvent, type: 'nft' | 'banner') => {
    e.preventDefault();
    setIsDraggingNft(false);
    setIsDraggingBanner(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file, type);
  }, [handleImageUpload]);

  const addAttribute = () => {
    const newAttr: NFTAttribute = {
      id: `attr-${Date.now()}`,
      traitType: '',
      value: ''
    };
    updateData({ nftAttributes: [...data.nftAttributes, newAttr] });
  };

  const updateAttribute = (id: string, field: 'traitType' | 'value', value: string) => {
    updateData({
      nftAttributes: data.nftAttributes.map(attr =>
        attr.id === id ? { ...attr, [field]: value } : attr
      )
    });
  };

  const removeAttribute = (id: string) => {
    updateData({ nftAttributes: data.nftAttributes.filter(attr => attr.id !== id) });
  };

  const selectedNetwork = BLOCKCHAIN_NETWORKS.find(n => n.value === data.network);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Image Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NFT Image Upload */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-purple-400" />
            NFT Ticket Image <span className="text-red-400">*</span>
          </Label>
          <input
            ref={nftInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'nft')}
          />
          <div 
            className={cn(
              "relative border-2 border-dashed rounded-xl aspect-square flex flex-col items-center justify-center text-center transition-all cursor-pointer overflow-hidden group",
              isDraggingNft ? "border-purple-500 bg-purple-500/10" : "border-white/20 hover:border-purple-500/50 hover:bg-white/5",
              data.nftImagePreview && "border-solid border-purple-500/50"
            )}
            onClick={() => nftInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDraggingNft(true); }}
            onDragLeave={() => setIsDraggingNft(false)}
            onDrop={(e) => handleDrop(e, 'nft')}
          >
            {data.nftImagePreview ? (
              <>
                <img src={data.nftImagePreview} alt="NFT Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-sm">Click to change</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 bg-black/50 hover:bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateData({ nftImagePreview: null });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="p-8">
                <div className="h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <ImageIcon className="h-8 w-8 text-purple-400" />
                </div>
                <p className="text-sm font-medium text-white mb-1">Drag & drop or click to browse</p>
                <p className="text-xs text-gray-400">500×500px recommended</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF (max 5MB)</p>
              </div>
            )}
          </div>
        </div>

        {/* Banner Upload */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Upload className="h-4 w-4 text-blue-400" />
            Event Banner
          </Label>
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'banner')}
          />
          <div 
            className={cn(
              "relative border-2 border-dashed rounded-xl aspect-video flex flex-col items-center justify-center text-center transition-all cursor-pointer overflow-hidden group",
              isDraggingBanner ? "border-blue-500 bg-blue-500/10" : "border-white/20 hover:border-blue-500/50 hover:bg-white/5",
              data.bannerImagePreview && "border-solid border-blue-500/50"
            )}
            onClick={() => bannerInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDraggingBanner(true); }}
            onDragLeave={() => setIsDraggingBanner(false)}
            onDrop={(e) => handleDrop(e, 'banner')}
          >
            {data.bannerImagePreview ? (
              <>
                <img src={data.bannerImagePreview} alt="Banner Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-sm">Click to change</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 bg-black/50 hover:bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateData({ bannerImagePreview: null });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-sm font-medium text-white mb-1">Drag & drop or click to browse</p>
                <p className="text-xs text-gray-400">1920×1080px recommended</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collection Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="collection" className="flex items-center gap-1">
            Collection Name <span className="text-red-400">*</span>
          </Label>
          <Input 
            id="collection"
            placeholder="e.g. Crypto Music Fest 2026"
            value={data.collectionName}
            onChange={(e) => updateData({ collectionName: e.target.value })}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="symbol" className="flex items-center gap-1">
            Token Symbol <span className="text-red-400">*</span>
          </Label>
          <Input 
            id="symbol" 
            placeholder="e.g. CMF26"
            maxLength={10}
            value={data.tokenSymbol}
            onChange={(e) => updateData({ tokenSymbol: e.target.value.toUpperCase() })}
            className="bg-white/5 border-white/10 text-white uppercase font-mono"
          />
          <p className="text-xs text-gray-500">3-10 characters, uppercase</p>
        </div>
      </div>

      {/* Royalty Slider */}
      <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <Label>Creator Royalty</Label>
          </div>
          <span className="text-lg font-bold text-purple-400">{data.royaltyPercentage}%</span>
        </div>
        <Slider 
          value={[data.royaltyPercentage]} 
          max={10} 
          min={0}
          step={0.5} 
          onValueChange={(vals) => updateData({ royaltyPercentage: vals[0] })}
          className="py-2"
        />
        <p className="text-xs text-gray-500">
          You will receive {data.royaltyPercentage}% of all secondary sales. Industry standard: 5-7.5%
        </p>
      </div>

      {/* NFT Attributes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Info className="h-4 w-4 text-gray-400" />
            NFT Attributes (Metadata)
          </Label>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={addAttribute}
            className="text-purple-400 hover:text-purple-300"
            disabled={data.nftAttributes.length >= 10}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Attribute
          </Button>
        </div>
        
        {data.nftAttributes.length === 0 ? (
          <p className="text-sm text-gray-500 py-2">No custom attributes. Add traits like "Event Year", "Location", etc.</p>
        ) : (
          <div className="space-y-2">
            {data.nftAttributes.map((attr) => (
              <div key={attr.id} className="flex gap-2 items-center">
                <Input
                  placeholder="Trait type (e.g. Location)"
                  value={attr.traitType}
                  onChange={(e) => updateAttribute(attr.id, 'traitType', e.target.value)}
                  className="flex-1 bg-white/5 border-white/10 text-white h-9"
                />
                <Input
                  placeholder="Value (e.g. Miami)"
                  value={attr.value}
                  onChange={(e) => updateAttribute(attr.id, 'value', e.target.value)}
                  className="flex-1 bg-white/5 border-white/10 text-white h-9"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttribute(attr.id)}
                  className="h-9 w-9 text-gray-500 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-px bg-white/10" />

      {/* Smart Contract Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-blue-400" />
          <Label className="text-base">Smart Contract</Label>
        </div>
        
        <RadioGroup 
          value={data.deployContract} 
          onValueChange={(val: 'new' | 'existing') => updateData({ deployContract: val })}
          className="grid grid-cols-2 gap-4"
        >
          <div className={cn(
            "flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-all",
            data.deployContract === 'new' 
              ? "bg-purple-500/10 border-purple-500/50" 
              : "bg-white/5 border-white/10 hover:border-white/30"
          )}>
            <RadioGroupItem value="new" id="new" className="border-purple-500 text-purple-500" />
            <div>
              <Label htmlFor="new" className="cursor-pointer font-medium">Deploy New Contract</Label>
              <p className="text-xs text-gray-500">We'll create a new ERC-721 contract for you</p>
            </div>
          </div>
          
          <div className={cn(
            "flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-all",
            data.deployContract === 'existing' 
              ? "bg-blue-500/10 border-blue-500/50" 
              : "bg-white/5 border-white/10 hover:border-white/30"
          )}>
            <RadioGroupItem value="existing" id="existing" className="border-blue-500 text-blue-500" />
            <div>
              <Label htmlFor="existing" className="cursor-pointer font-medium">Use Existing Contract</Label>
              <p className="text-xs text-gray-500">Connect your own deployed contract</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      {data.deployContract === 'existing' && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
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

      {/* Network Selection */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Blockchain Network <span className="text-red-400">*</span>
        </Label>
        <Select 
          value={data.network} 
          onValueChange={(val) => updateData({ network: val })}
        >
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BLOCKCHAIN_NETWORKS.map((network) => (
              <SelectItem key={network.value} value={network.value}>
                <span className="flex items-center gap-2">
                  <span>{network.icon}</span>
                  <span>{network.label}</span>
                  <span className={cn(
                    "ml-2 text-xs px-2 py-0.5 rounded",
                    network.gasEstimate === 'Low' ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  )}>
                    {network.gasEstimate} Gas
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedNetwork && (
          <p className="text-xs text-gray-500">
            {selectedNetwork.gasEstimate === 'Low' 
              ? '✓ Lower gas fees for minting and transfers' 
              : '⚠️ Higher gas fees but maximum decentralization'}
          </p>
        )}
      </div>
    </div>
  )
}
