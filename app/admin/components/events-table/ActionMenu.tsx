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

export function ActionMenu() {
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
        
        <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
          <Copy className="mr-2 h-4 w-4" />
          <span>Duplicate Event</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>View on Chain</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
          <Download className="mr-2 h-4 w-4" />
          <span>Download List</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
          <Share2 className="mr-2 h-4 w-4" />
          <span>Share Link</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
          <Archive className="mr-2 h-4 w-4" />
          <span>Archive</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
