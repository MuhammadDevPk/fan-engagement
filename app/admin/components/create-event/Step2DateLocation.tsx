import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EventFormData } from "./types"
import { CalendarIcon, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface StepProps {
  data: EventFormData;
  updateData: (data: Partial<EventFormData>) => void;
}

export default function Step2DateLocation({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10",
                  !data.startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.startDate ? format(data.startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.startDate}
                onSelect={(date) => updateData({ startDate: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input 
            id="time" 
            type="time"
            value={data.startTime}
            onChange={(e) => updateData({ startTime: e.target.value })}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration (Hours)</Label>
        <Input 
          id="duration" 
          type="number"
          value={data.duration}
          onChange={(e) => updateData({ duration: Number(e.target.value) })}
          className="bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="location" 
            placeholder="Search for a venue..."
            value={data.location}
            onChange={(e) => updateData({ location: e.target.value })}
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="venue">Venue Name</Label>
          <Input 
            id="venue" 
            value={data.venueName}
            onChange={(e) => updateData({ venueName: e.target.value })}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input 
            id="capacity" 
            type="number"
            value={data.venueCapacity}
            onChange={(e) => updateData({ venueCapacity: Number(e.target.value) })}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>
    </div>
  )
}
