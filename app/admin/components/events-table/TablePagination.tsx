import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TablePagination() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-white/10 mt-4">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <span>Rows per page</span>
        <Select defaultValue="10">
          <SelectTrigger className="h-8 w-[70px] bg-[#0A0E27] border-white/10 text-gray-300">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent className="bg-[#0A0E27] border-white/10 text-gray-300">
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10" disabled>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="h-8 w-8 font-medium bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 hover:text-indigo-300">
          1
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 font-medium text-gray-400 hover:bg-white/10 hover:text-white">
          2
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 font-medium text-gray-400 hover:bg-white/10 hover:text-white">
          3
        </Button>
        <span className="text-gray-600 px-1">...</span>
        <Button variant="ghost" size="sm" className="h-8 w-8 font-medium text-gray-400 hover:bg-white/10 hover:text-white">
          5
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
