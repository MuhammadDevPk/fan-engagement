import React, { useState } from 'react';
import { X, User, Mail, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ManualAddAttendeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
}

export function ManualAddAttendeeModal({ isOpen, onClose, onAdd }: ManualAddAttendeeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletAddress: '',
    ticketType: ''
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    onAdd(formData);
    onClose();
    // Reset form
    setFormData({
        name: '',
        email: '',
        walletAddress: '',
        ticketType: ''
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0A0E27] border border-white/10 rounded-xl shadow-2xl z-50 p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Add New Attendee</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-400">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="John Doe" 
                className="pl-9 bg-[#0A0E27] border-white/10 text-white" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-400">Email Address</Label>
             <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="john@example.com" 
                className="pl-9 bg-[#0A0E27] border-white/10 text-white" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-400">Wallet Address (Optional)</Label>
             <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="0x..." 
                className="pl-9 bg-[#0A0E27] border-white/10 text-white" 
                value={formData.walletAddress}
                onChange={(e) => setFormData({...formData, walletAddress: e.target.value})}
            />
            </div>
          </div>

          <div className="space-y-2">
             <Label className="text-gray-400">Ticket Type</Label>
             <Select onValueChange={(val) => setFormData({...formData, ticketType: val})}>
                <SelectTrigger className="bg-[#0A0E27] border-white/10 text-gray-300">
                    <SelectValue placeholder="Select ticket type" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A0E27] border-white/10 text-gray-300">
                    <SelectItem value="vip">VIP Ticket</SelectItem>
                    <SelectItem value="general">General Admission</SelectItem>
                    <SelectItem value="early">Early Bird</SelectItem>
                </SelectContent>
            </Select>
          </div>
          
           <div className="flex items-center space-x-2 py-2">
              <Checkbox id="marketing" className="border-white/20 data-[state=checked]:bg-indigo-500" />
              <label
                htmlFor="marketing"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400"
              >
                Send welcome email immediately
              </label>
            </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1 border-white/10 text-gray-300 hover:text-white hover:bg-white/5" onClick={onClose}>Cancel</Button>
          <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSubmit}>Add Attendee</Button>
        </div>
      </div>
    </>
  );
}
