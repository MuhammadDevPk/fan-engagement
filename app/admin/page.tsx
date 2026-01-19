"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Ticket, Users, DollarSign, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Refactoring Admin Dashboard</h1>
          <p className="text-gray-400">Welcome back, Admin</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign },
          { title: "Active Events", value: "24", change: "+4", icon: Ticket },
          { title: "Total Attendees", value: "2,345", change: "+180", icon: Users },
          { title: "Active Listings", value: "573", change: "+201", icon: BarChart3 },
        ].map((stat) => (
          <Card key={stat.title} className="bg-eureka-card border-eureka-card backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-brand-start" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-gray-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section Placeholder */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-eureka-card border-eureka-card">
          <CardHeader>
            <CardTitle className="text-white">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              Chart Placeholder
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-eureka-card border-eureka-card">
          <CardHeader>
            <CardTitle className="text-white">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              List Placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
