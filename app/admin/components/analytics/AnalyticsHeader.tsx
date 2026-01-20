"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Download, RefreshCw } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AnalyticsHeader() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          Comprehensive insights across all your events • {currentDate}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center text-xs text-gray-500 mr-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <RefreshCw className="w-3 h-3 mr-2 animate-spin-slow" />
          Last updated 2 min ago
        </div>

        <Select defaultValue="30d">
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

        <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>
    </div>
  )
}
