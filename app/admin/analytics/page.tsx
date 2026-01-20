"use client"

import AnalyticsHeader from "../components/analytics/AnalyticsHeader"
import MetricsCards from "../components/analytics/MetricsCards"
import RevenueChart from "../components/analytics/RevenueChart"
import AudienceInsights from "../components/analytics/AudienceInsights"
import { motion } from "framer-motion"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 pb-20">
      <AnalyticsHeader />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MetricsCards />
        
        <div className="grid grid-cols-12 gap-6 mb-6">
           <RevenueChart />
           {/* Placeholder for Event Performance Comparison or other widgets later */}
           <div className="col-span-12 lg:col-span-4 bg-white/5 border-white/10 backdrop-blur-md rounded-xl p-6 min-h-[300px]">
                <h3 className="text-xl font-bold text-white mb-2">Event Performance</h3>
                <p className="text-sm text-gray-400 mb-6">Top performing events by revenue</p>
                <div className="flex items-center justify-center h-[200px] text-gray-500 text-sm border-2 border-dashed border-white/10 rounded-lg">
                    Comparison Chart Coming Soon
                </div>
           </div>
        </div>

        <AudienceInsights />
      </motion.div>
    </div>
  )
}
