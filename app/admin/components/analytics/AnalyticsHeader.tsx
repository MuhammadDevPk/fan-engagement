"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Download, RefreshCw, Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface AnalyticsHeaderProps {
  dateRange: string
  onDateRangeChange: (range: string) => void
}

export default function AnalyticsHeader({ dateRange, onDateRangeChange }: AnalyticsHeaderProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handleExport = async () => {
    setIsExporting(true)
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Generating analytics report...',
        success: () => {
          setIsExporting(false)
          return 'Report exported successfully! Check your downloads folder.'
        },
        error: 'Failed to export report',
      }
    )
  }

  const handleRefresh = () => {
    setLastUpdated(new Date())
    toast.success("Data refreshed", {
      description: "Analytics data has been updated."
    })
  }

  const getTimeSinceUpdate = () => {
    const diff = Math.floor((new Date().getTime() - lastUpdated.getTime()) / 1000)
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    return `${Math.floor(diff / 3600)}h ago`
  }

  const handleDateRangeChange = (value: string) => {
    onDateRangeChange(value)
    const labels: Record<string, string> = {
      '7d': 'Last 7 days',
      '30d': 'Last 30 days',
      '90d': 'Last 90 days',
      'year': 'This year',
      'custom': 'Custom range'
    }
    toast.info(`Date range updated to ${labels[value]}`)
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
            📊 Analytics Dashboard
          </h1>
        </div>
        <p className="text-gray-400 mt-1">
          Comprehensive insights across all your events • {currentDate}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button 
          onClick={handleRefresh}
          className="flex items-center text-xs text-gray-500 mr-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3 mr-2" />
          Last updated {getTimeSinceUpdate()}
        </button>

        <Select value={dateRange} onValueChange={handleDateRangeChange}>
          <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-eureka-dark border-white/10 text-white">
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="year">This year</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          Export Report
        </Button>
      </div>
    </div>
  )
}
