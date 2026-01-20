"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AnalyticsOverview from "./components/AnalyticsOverview"
import CreateEventForm from "./components/CreateEventForm"
import { RevenueOverviewChart } from "./components/dashboard/RevenueOverviewChart"
import { RecentSalesList } from "./components/dashboard/RecentSalesList"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome back, Admin</p>
        </div>
      </div>

      {/* Stats Grid */}
      <AnalyticsOverview />
      
      {/* Create Event Form */}
      <CreateEventForm />

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueOverviewChart />
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSalesList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

