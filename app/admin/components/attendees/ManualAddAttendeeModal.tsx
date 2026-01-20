"use client"

import React, { useState } from 'react';
import { X, User, Mail, Wallet, Ticket, AlertCircle, UserPlus } from "lucide-react";
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
import { toast } from "sonner";

interface ManualAddAttendeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; email: string; walletAddress: string; ticketType: string; sendWelcome: boolean }) => void;
}

export function ManualAddAttendeeModal({ isOpen, onClose, onAdd }: ManualAddAttendeeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletAddress: '',
    ticketType: '',
    sendWelcome: true
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (formData.walletAddress && !/^0x[a-fA-F0-9]{40}$/.test(formData.walletAddress)) {
      newErrors.walletAddress = 'Invalid wallet address format (0x + 40 hex chars)';
    }
    
    if (!formData.ticketType) {
      newErrors.ticketType = 'Please select a ticket type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onAdd(formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
        name: '',
        email: '',
        walletAddress: '',
        ticketType: '',
        sendWelcome: true
    });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      walletAddress: '',
      ticketType: '',
      sendWelcome: true
    });
    setErrors({});
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" onClick={handleClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0A0E27] border border-white/10 rounded-xl shadow-2xl z-50 p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-indigo-400" />
            Add New Attendee
          </h2>
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-400 hover:text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label className="text-gray-400 flex items-center gap-1">
              Full Name <span className="text-red-400">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="John Doe" 
                className={`pl-9 bg-[#0A0E27] border-white/10 text-white ${errors.name ? 'border-red-500' : ''}`}
                value={formData.name}
                onChange={(e) => {
                  setFormData({...formData, name: e.target.value});
                  if (errors.name) setErrors({...errors, name: ''});
                }}
              />
            </div>
            {errors.name && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label className="text-gray-400">Email Address</Label>
             <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="john@example.com" 
                type="email"
                className={`pl-9 bg-[#0A0E27] border-white/10 text-white ${errors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  if (errors.email) setErrors({...errors, email: ''});
                }}
            />
            </div>
            {errors.email && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.email}</p>}
          </div>

          {/* Wallet Address Field */}
          <div className="space-y-2">
            <Label className="text-gray-400">Wallet Address</Label>
             <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" 
                className={`pl-9 bg-[#0A0E27] border-white/10 text-white font-mono text-sm ${errors.walletAddress ? 'border-red-500' : ''}`}
                value={formData.walletAddress}
                onChange={(e) => {
                  setFormData({...formData, walletAddress: e.target.value});
                  if (errors.walletAddress) setErrors({...errors, walletAddress: ''});
                }}
            />
            </div>
            {errors.walletAddress && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.walletAddress}</p>}
            <p className="text-xs text-gray-500">Leave empty to auto-generate a wallet address</p>
          </div>

          {/* Ticket Type Field */}
          <div className="space-y-2">
             <Label className="text-gray-400 flex items-center gap-1">
               <Ticket className="h-4 w-4" /> Ticket Type <span className="text-red-400">*</span>
             </Label>
             <Select 
               value={formData.ticketType} 
               onValueChange={(val) => {
                 setFormData({...formData, ticketType: val});
                 if (errors.ticketType) setErrors({...errors, ticketType: ''});
               }}
             >
                <SelectTrigger className={`bg-[#0A0E27] border-white/10 text-gray-300 ${errors.ticketType ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select ticket type" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A0E27] border-white/10">
                    <SelectItem value="vip" className="text-gray-200 focus:bg-white/10 focus:text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400">⭐</span> VIP Ticket
                      </div>
                    </SelectItem>
                    <SelectItem value="general" className="text-gray-200 focus:bg-white/10 focus:text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">🎟️</span> General Admission
                      </div>
                    </SelectItem>
                    <SelectItem value="early_bird" className="text-gray-200 focus:bg-white/10 focus:text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400">🐦</span> Early Bird
                      </div>
                    </SelectItem>
                </SelectContent>
            </Select>
            {errors.ticketType && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.ticketType}</p>}
          </div>
          
          {/* Welcome Email Checkbox */}
           <div className="flex items-center space-x-2 py-2 bg-white/5 rounded-lg px-3">
              <Checkbox 
                id="sendWelcome" 
                checked={formData.sendWelcome}
                onCheckedChange={(checked) => setFormData({...formData, sendWelcome: !!checked})}
                className="border-white/20 data-[state=checked]:bg-indigo-500" 
              />
              <label
                htmlFor="sendWelcome"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400 cursor-pointer"
              >
                Send welcome email immediately
              </label>
            </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button 
            variant="outline" 
            className="flex-1 border-white/10 text-gray-300 hover:text-white hover:bg-white/5" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Attendee'}
          </Button>
        </div>
      </div>
    </>
  );
}
