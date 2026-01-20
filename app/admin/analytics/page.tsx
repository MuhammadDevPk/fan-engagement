"use client"

import AnalyticsHeader from "../components/analytics/AnalyticsHeader"
import MetricsCards from "../components/analytics/MetricsCards"
import RevenueChart from "../components/analytics/RevenueChart"
import AudienceInsights from "../components/analytics/AudienceInsights"
import { EventPerformanceChart } from "../components/analytics/EventPerformanceChart"
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
           <EventPerformanceChart />
        </div>

        <AudienceInsights />
      </motion.div>
    </div>
  )
}

