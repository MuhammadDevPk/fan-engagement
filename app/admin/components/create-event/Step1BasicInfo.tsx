import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { EventFormData } from "./types"

interface StepProps {
  data: EventFormData;
  updateData: (data: Partial<EventFormData>) => void;
}

export default function Step1BasicInfo({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Event Name</Label>
          <Input 
            id="name" 
            placeholder="e.g. Summer Music Festival 2024" 
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="grid gap-2">
          <Label>Category</Label>
          <Select 
            value={data.category} 
            onValueChange={(value) => updateData({ category: value })}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="festival">Festival</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Describe your event..." 
            className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tags">Tags</Label>
          <Input 
            id="tags" 
            placeholder="Press enter to add tags" 
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            value={data.tags.join(', ')}
            onChange={(e) => updateData({ tags: e.target.value.split(', ') })}
          />
          <p className="text-xs text-gray-400">Separate tags with commas</p>
        </div>
      </div>
    </div>
  )
}
