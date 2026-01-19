import React from 'react';
import { cn } from "@/lib/utils";
import { EventStatus } from "./types";

interface StatusBadgeProps {
  status: EventStatus;
  className?: string; // Optional custom classes
  showLabel?: boolean; // Optional flag to hide text label
}

const statusConfig: Record<EventStatus, { color: string; bg: string; border: string }> = {
  'Live': {
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20'
  },
  'Upcoming': {
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20'
  },
  'Ended': {
    color: 'text-gray-400',
    bg: 'bg-gray-400/10',
    border: 'border-gray-400/20'
  },
  'Draft': {
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20'
  },
  'Sold Out': {
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20'
  }
};

export function StatusBadge({ status, className, showLabel = true }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
      config.bg,
      config.color,
      config.border,
      className
    )}>
      {status === 'Live' && (
        <span className="relative flex h-1.5 w-1.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
      )}
      {showLabel && status}
    </div>
  );
}
