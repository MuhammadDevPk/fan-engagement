"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, AlertTriangle, MailWarning, ServerCrash, CheckCircle2, ArrowRight } from "lucide-react"

export function TroubleshootingGuide() {
  const issues = [
    {
      title: "Transaction Failed",
      problem: "Transaction not going through on blockchain",
      icon: <XCircle className="w-10 h-10 text-red-500" />,
      fixes: [
        "Check your wallet has sufficient funds (ETH/MATIC)",
        "Ensure gas limit is set correctly",
        "Try a different browser or clear cache",
        "Reset your MetaMask account activity"
      ],
      action: "Detailed Guide",
      border: "border-red-500/20",
      bg: "bg-red-500/5"
    },
    {
      title: "NFT Not Showing",
      problem: "Minted NFT not appearing in wallet",
      icon: <AlertTriangle className="w-10 h-10 text-orange-500" />,
      fixes: [
        "Wait 5-10 minutes for block confirmation",
        "Import token contract address to wallet",
        "Check correct network is selected",
        "Refresh metadata on OpenSea"
      ],
      action: "Step-by-Step Guide",
      border: "border-orange-500/20",
      bg: "bg-orange-500/5"
    },
    {
      title: "Email Not Received",
      problem: "Confirmation email not delivered",
      icon: <MailWarning className="w-10 h-10 text-yellow-500" />,
      fixes: [
        "Check spam/junk folder",
        "Add support@eureka.io to contacts",
        "Verify email address in settings",
        "Check your daily email quota"
      ],
      action: "Resend Email",
      border: "border-yellow-500/20",
      bg: "bg-yellow-500/5"
    },
    {
      title: "Dashboard Errors",
      problem: "Dashboard showing errors or blank screen",
      icon: <ServerCrash className="w-10 h-10 text-pink-500" />,
      fixes: [
        "Refresh page (Ctrl+F5)",
        "Clear browser cache and cookies",
        "Disable ad blockers/extensions",
        "Update browser to latest version"
      ],
      action: "System Status",
      border: "border-pink-500/20",
      bg: "bg-pink-500/5"
    }
  ]

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
           <h2 className="text-2xl font-bold text-white">Troubleshooting Guide</h2>
           <p className="text-gray-400">Quick solutions to common problems</p>
        </div>
        <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
           View All Guides
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {issues.map((issue, index) => (
          <Card key={index} className={`bg-white/5 ${issue.border} text-white hover:bg-white/10 transition-all`}>
            <CardHeader className={`${issue.bg} pb-4`}>
              <div className="flex justify-between items-start mb-2">
                 {issue.icon}
              </div>
              <CardTitle className="text-lg">{issue.title}</CardTitle>
              <CardDescription className="text-gray-400">{issue.problem}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {issue.fixes.map((fix, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                    {fix}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white justify-between" variant="ghost">
                {issue.action}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
