"use client"

import React from 'react';
import {
  MoreHorizontal,
  Copy,
  ExternalLink,
  Download,
  Share2,
  Archive,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActionMenuProps {
  eventId: string;
  eventName: string;
}

export function ActionMenu({ eventId, eventName }: ActionMenuProps) {
  
  const handleDuplicate = () => {
    toast.success("Event duplicated", {
      description: `"${eventName}" has been duplicated as a draft.`
    });
  };

  const handleViewOnChain = () => {
    // Mock blockchain explorer URL
    const txHash = `0x${eventId.padStart(64, '0').substring(0, 64)}`;
    toast.info("Opening blockchain explorer", {
      description: `Transaction: ${txHash.slice(0, 10)}...${txHash.slice(-8)}`
    });
  };

  const handleDownloadList = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Generating attendee list...',
        success: `Downloaded attendees for "${eventName}"`,
        error: 'Failed to download list',
      }
    );
  };

  const handleShareLink = () => {
    const shareUrl = `https://eureka.events/e/${eventId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!", {
      description: shareUrl
    });
  };

  const handleArchive = () => {
    toast.info("Event archived", {
      description: `"${eventName}" has been moved to archives.`,
      action: {
        label: "Undo",
        onClick: () => toast.success("Archive undone"),
      },
    });
  };

  const handleDelete = () => {
    toast.error("Delete event?", {
      description: `This will permanently delete "${eventName}" and all associated tickets.`,
      action: {
        label: "Confirm Delete",
        onClick: () => toast.success("Event deleted"),
      },
      duration: 5000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-white/10 data-[state=open]:bg-white/10">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] bg-[#0A0E27] border-white/10 text-gray-200">
        <DropdownMenuLabel className="text-xs text-gray-500 font-normal uppercase tracking-wider">
          Actions
        </DropdownMenuLabel>
        
        <DropdownMenuItem 
          className="focus:bg-white/5 focus:text-white cursor-pointer"
          onClick={handleDuplicate}
        >
          <Copy className="mr-2 h-4 w-4" />
          <span>Duplicate Event</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="focus:bg-white/5 focus:text-white cursor-pointer"
          onClick={handleViewOnChain}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>View on Chain</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="focus:bg-white/5 focus:text-white cursor-pointer"
          onClick={handleDownloadList}
        >
          <Download className="mr-2 h-4 w-4" />
          <span>Download Attendees</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="focus:bg-white/5 focus:text-white cursor-pointer"
          onClick={handleShareLink}
        >
          <Share2 className="mr-2 h-4 w-4" />
          <span>Share Link</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem 
          className="focus:bg-white/5 focus:text-white cursor-pointer"
          onClick={handleArchive}
        >
          <Archive className="mr-2 h-4 w-4" />
          <span>Archive</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
          onClick={handleDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
