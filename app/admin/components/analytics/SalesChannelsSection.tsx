"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts"
import { Globe, Smartphone, Monitor, Tablet, Twitter, Instagram, Facebook, Search, Link2, ExternalLink } from "lucide-react"
import { toast } from "sonner"

// Traffic sources data
const trafficData = [
  { name: "Direct", value: 34, color: "#8b5cf6" },
  { name: "Social Media", value: 28, color: "#3b82f6" },
  { name: "Search", value: 22, color: "#10b981" },
  { name: "Referrals", value: 16, color: "#f59e0b" },
]

// Social breakdown
const socialBreakdown = [
  { name: "Twitter", value: 12, icon: Twitter, color: "#1DA1F2" },
  { name: "Instagram", value: 10, icon: Instagram, color: "#E4405F" },
  { name: "Facebook", value: 6, icon: Facebook, color: "#1877F2" },
]

// Device breakdown
const deviceData = [
  { name: "Desktop", value: 58, icon: Monitor, color: "#8b5cf6" },
  { name: "Mobile", value: 35, icon: Smartphone, color: "#3b82f6" },
  { name: "Tablet", value: 7, icon: Tablet, color: "#10b981" },
]

// Marketing campaigns
const campaigns = [
  { name: "Summer Launch Campaign", spend: 5000, revenue: 18500, roas: 3.7, conversions: 234 },
  { name: "VIP Early Access", spend: 2000, revenue: 8400, roas: 4.2, conversions: 89 },
  { name: "Influencer Partnership", spend: 3500, revenue: 7000, roas: 2.0, conversions: 156 },
  { name: "Retargeting Ads", spend: 1500, revenue: 4200, roas: 2.8, conversions: 67 },
  { name: "Email Newsletter", spend: 500, revenue: 3500, roas: 7.0, conversions: 45 },
]

export function SalesChannelsSection() {
  const handleAddCampaign = () => {
    toast.info("Campaign builder opening...", {
      description: "Create a new marketing campaign"
    })
  }

  const handleViewSource = (source: string) => {
    toast.info(`Viewing ${source} analytics`, {
      description: "Filtering dashboard by traffic source"
    })
  }

  const getRoasColor = (roas: number) => {
    if (roas >= 3) return "text-green-400 bg-green-500/20"
    if (roas >= 1) return "text-yellow-400 bg-yellow-500/20"
    return "text-red-400 bg-red-500/20"
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Traffic Sources Treemap */}
      <Card className="col-span-12 lg:col-span-4 bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-violet-400" />
            Traffic Sources
          </CardTitle>
          <p className="text-sm text-gray-400">Where your visitors come from</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Sources */}
          <div className="space-y-3">
            {trafficData.map((source, index) => (
              <button
                key={index}
                onClick={() => handleViewSource(source.name)}
                className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{source.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white font-mono">{source.value}%</span>
                  <ExternalLink className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>

          {/* Social Breakdown */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-xs text-gray-500 uppercase mb-3">Social Breakdown</h4>
            <div className="flex gap-2">
              {socialBreakdown.map((social, index) => (
                <div
                  key={index}
                  className="flex-1 text-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <social.icon className="w-5 h-5 mx-auto mb-1" style={{ color: social.color }} />
                  <div className="text-sm font-bold text-white">{social.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Breakdown */}
      <Card className="col-span-12 lg:col-span-3 bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Monitor className="w-4 h-4 text-blue-400" />
            Device Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {deviceData.map((device, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <device.icon className="w-4 h-4" style={{ color: device.color }} />
                  <span className="text-sm text-gray-400">{device.name}</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">{device.value}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ width: `${device.value}%`, backgroundColor: device.color }}
                />
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-white/10">
            <h5 className="text-xs text-gray-500 uppercase mb-2">OS Breakdown</h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Windows</span>
                <span className="text-white">34%</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>macOS</span>
                <span className="text-white">24%</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>iOS</span>
                <span className="text-white">22%</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Android</span>
                <span className="text-white">20%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketing Performance */}
      <Card className="col-span-12 lg:col-span-5 bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Link2 className="w-4 h-4 text-emerald-400" />
              Campaign Performance
            </CardTitle>
            <p className="text-sm text-gray-400">Marketing ROI tracking</p>
          </div>
          <button
            onClick={handleAddCampaign}
            className="text-xs px-3 py-1.5 bg-violet-500 hover:bg-violet-600 text-white rounded-full transition-colors"
          >
            + Add Campaign
          </button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-white/10">
                  <th className="text-left pb-2 font-medium">Campaign</th>
                  <th className="text-right pb-2 font-medium">Spend</th>
                  <th className="text-right pb-2 font-medium">Revenue</th>
                  <th className="text-right pb-2 font-medium">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {campaigns.map((campaign, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors cursor-pointer">
                    <td className="py-2 text-gray-300">{campaign.name}</td>
                    <td className="py-2 text-right text-gray-400 font-mono">${campaign.spend.toLocaleString()}</td>
                    <td className="py-2 text-right text-white font-mono">${campaign.revenue.toLocaleString()}</td>
                    <td className="py-2 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getRoasColor(campaign.roas)}`}>
                        {campaign.roas.toFixed(1)}x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-gray-500">Total Spend: <span className="text-white font-mono">${campaigns.reduce((sum, c) => sum + c.spend, 0).toLocaleString()}</span></span>
            <span className="text-gray-500">Total Revenue: <span className="text-green-400 font-mono">${campaigns.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}</span></span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
