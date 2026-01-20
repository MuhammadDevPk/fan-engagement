"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { EventFormData, EVENT_CATEGORIES } from "./types"
import { X, AlertCircle, CheckCircle2 } from "lucide-react"
import { useState, KeyboardEvent } from "react"
import { cn } from "@/lib/utils"

interface StepProps {
  data: EventFormData;
  updateData: (data: Partial<EventFormData>) => void;
}

export default function Step1BasicInfo({ data, updateData }: StepProps) {
  const [tagInput, setTagInput] = useState('');

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !data.tags.includes(trimmedTag) && data.tags.length < 10) {
      updateData({ tags: [...data.tags, trimmedTag] });
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    updateData({ tags: data.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === 'Backspace' && !tagInput && data.tags.length > 0) {
      removeTag(data.tags[data.tags.length - 1]);
    }
  };

  const isNameValid = data.name.length >= 3;
  const isCategorySelected = data.category.length > 0;
  const isDescriptionValid = data.description.length >= 20;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid gap-6">
        {/* Event Name */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="name" className="flex items-center gap-1">
              Event Name <span className="text-red-400">*</span>
            </Label>
            {data.name && (
              <span className={cn("text-xs flex items-center gap-1", isNameValid ? "text-green-400" : "text-yellow-400")}>
                {isNameValid ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                {data.name.length}/100
              </span>
            )}
          </div>
          <Input 
            id="name" 
            placeholder="e.g. Summer Music Festival 2026" 
            value={data.name}
            maxLength={100}
            onChange={(e) => updateData({ name: e.target.value })}
            className={cn(
              "bg-white/5 border-white/10 text-white placeholder:text-gray-500 transition-all",
              data.name && (isNameValid ? "border-green-500/50 focus:border-green-500" : "border-yellow-500/50")
            )}
          />
          <p className="text-xs text-gray-500">Choose a unique, descriptive name for your event</p>
        </div>

        {/* Category */}
        <div className="grid gap-2">
          <Label className="flex items-center gap-1">
            Category <span className="text-red-400">*</span>
          </Label>
          <Select 
            value={data.category} 
            onValueChange={(value) => updateData({ category: value })}
          >
            <SelectTrigger className={cn(
              "bg-white/5 border-white/10 text-white",
              isCategorySelected && "border-green-500/50"
            )}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description" className="flex items-center gap-1">
              Description <span className="text-red-400">*</span>
            </Label>
            <span className={cn("text-xs", isDescriptionValid ? "text-green-400" : "text-gray-500")}>
              {data.description.length}/2000
            </span>
          </div>
          <Textarea 
            id="description" 
            placeholder="Describe your event in detail. Include what attendees can expect, special guests, activities, and any unique Web3 features..." 
            className={cn(
              "min-h-[140px] bg-white/5 border-white/10 text-white placeholder:text-gray-500 resize-none",
              data.description && (isDescriptionValid ? "border-green-500/50" : "border-yellow-500/50")
            )}
            maxLength={2000}
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
          />
          <p className="text-xs text-gray-500">Minimum 20 characters. Be descriptive to attract more attendees.</p>
        </div>

        {/* Tags */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="tags">Tags</Label>
            <span className="text-xs text-gray-500">{data.tags.length}/10</span>
          </div>
          <div className={cn(
            "flex flex-wrap gap-2 p-3 bg-white/5 border border-white/10 rounded-md min-h-[48px] transition-all",
            data.tags.length > 0 && "border-white/20"
          )}>
            {data.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 cursor-pointer group"
                onClick={() => removeTag(tag)}
              >
                #{tag}
                <X className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100" />
              </Badge>
            ))}
            <Input 
              id="tags" 
              placeholder={data.tags.length === 0 ? "Type and press Enter to add tags..." : "Add more..."}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onBlur={() => tagInput && addTag(tagInput)}
              className="flex-1 min-w-[120px] bg-transparent border-0 p-0 h-6 text-sm focus-visible:ring-0 placeholder:text-gray-500"
              disabled={data.tags.length >= 10}
            />
          </div>
          <p className="text-xs text-gray-500">Press Enter or comma to add tags. Click a tag to remove it.</p>
        </div>
      </div>
    </div>
  )
}
