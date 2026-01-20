"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { EventFormData } from "./types"
import { CalendarIcon, MapPin, Clock, Globe, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface StepProps {
  data: EventFormData;
  updateData: (data: Partial<EventFormData>) => void;
}

// Mock location suggestions
const LOCATION_SUGGESTIONS = [
  "Madison Square Garden, New York, NY",
  "Crypto Arena, Los Angeles, CA",
  "Miami Crypto Arena, Miami, FL",
  "Chase Center, San Francisco, CA",
  "United Center, Chicago, IL",
];

export default function Step2DateLocation({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Date Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            Start Date <span className="text-red-400">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10",
                  !data.startDate && "text-muted-foreground",
                  data.startDate && "border-green-500/50"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.startDate ? format(data.startDate, "EEE, MMM d, yyyy") : <span>Pick start date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.startDate}
                onSelect={(date) => updateData({ startDate: date })}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10",
                  !data.endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.endDate ? format(data.endDate, "EEE, MMM d, yyyy") : <span>Same as start (optional)</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.endDate}
                onSelect={(date) => updateData({ endDate: date })}
                disabled={(date) => date < (data.startDate || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Time Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime" className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            Start Time <span className="text-red-400">*</span>
          </Label>
          <Input 
            id="startTime" 
            type="time"
            value={data.startTime}
            onChange={(e) => updateData({ startTime: e.target.value })}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endTime" className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            End Time
          </Label>
          <Input 
            id="endTime" 
            type="time"
            value={data.endTime}
            onChange={(e) => updateData({ endTime: e.target.value })}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (Hours)</Label>
          <Input 
            id="duration" 
            type="number"
            min="1"
            max="168"
            value={data.duration}
            onChange={(e) => updateData({ duration: Number(e.target.value) })}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>

      {/* Virtual Event Toggle */}
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Video className="h-5 w-5 text-blue-400" />
          </div>
          <div className="space-y-0.5">
            <Label className="text-base">Virtual / Online Event</Label>
            <p className="text-sm text-gray-400">Enable if this event will be hosted online</p>
          </div>
        </div>
        <Switch 
          checked={data.isVirtual}
          onCheckedChange={(checked) => updateData({ isVirtual: checked })}
        />
      </div>

      {/* Virtual Link (conditional) */}
      {data.isVirtual && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
          <Label htmlFor="virtualLink" className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-400" />
            Event Link
          </Label>
          <Input 
            id="virtualLink" 
            type="url"
            placeholder="https://meet.google.com/... or https://zoom.us/..."
            value={data.virtualLink}
            onChange={(e) => updateData({ virtualLink: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
      )}

      {/* Physical Location */}
      {!data.isVirtual && (
        <>
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-1">
              Location <span className="text-red-400">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                id="location" 
                placeholder="Search for a venue or enter address..."
                value={data.location}
                onChange={(e) => updateData({ location: e.target.value })}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            {/* Quick suggestions */}
            {!data.location && (
              <div className="flex flex-wrap gap-2 mt-2">
                {LOCATION_SUGGESTIONS.slice(0, 3).map((loc) => (
                  <Button
                    key={loc}
                    variant="outline"
                    size="sm"
                    className="text-xs border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                    onClick={() => {
                      updateData({ 
                        location: loc, 
                        venueName: loc.split(',')[0] 
                      });
                    }}
                  >
                    {loc.split(',')[0]}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="venue">Venue Name</Label>
              <Input 
                id="venue"
                placeholder="e.g. Main Stage, Hall A"
                value={data.venueName}
                onChange={(e) => updateData({ venueName: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity" className="flex items-center gap-1">
                Venue Capacity <span className="text-red-400">*</span>
              </Label>
              <Input 
                id="capacity" 
                type="number"
                min="1"
                value={data.venueCapacity}
                onChange={(e) => updateData({ venueCapacity: Number(e.target.value) })}
                className="bg-white/5 border-white/10 text-white"
              />
              <p className="text-xs text-gray-500">Maximum number of attendees allowed</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
