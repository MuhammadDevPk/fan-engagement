"use client"

import { useState } from "react"
import AnalyticsHeader from "../components/analytics/AnalyticsHeader"
import MetricsCards from "../components/analytics/MetricsCards"
import RevenueChart from "../components/analytics/RevenueChart"
import AudienceInsights from "../components/analytics/AudienceInsights"
import { EventPerformanceChart } from "../components/analytics/EventPerformanceChart"
import { Web3MetricsSection } from "../components/analytics/Web3MetricsSection"
import { QuickInsightsPanel } from "../components/analytics/QuickInsightsPanel"
import { SalesChannelsSection } from "../components/analytics/SalesChannelsSection"
import { motion } from "framer-motion"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")

  return (
    <div className="space-y-8 pb-20">
      <AnalyticsHeader dateRange={dateRange} onDateRangeChange={setDateRange} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Top Metrics Row */}
        <MetricsCards />
        
        {/* Revenue & Event Performance */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            📈 Sales Performance
          </h2>
          <div className="grid grid-cols-12 gap-6">
            <RevenueChart dateRange={dateRange} />
            <EventPerformanceChart />
          </div>
        </section>

        {/* AI Insights Panel */}
        <section>
          <QuickInsightsPanel />
        </section>

        {/* Audience Insights with Demographics & Geo */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            👥 Audience Insights
          </h2>
          <AudienceInsights />
        </section>

        {/* Sales Channels - Traffic, Devices, Marketing */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            🎯 Sales Channels
          </h2>
          <SalesChannelsSection />
        </section>

        {/* Web3 Specific Metrics */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            ⛓️ Web3 Metrics
          </h2>
          <Web3MetricsSection />
        </section>
      </motion.div>
    </div>
  )
}
