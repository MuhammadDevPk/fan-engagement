"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { XCircle, AlertTriangle, MailWarning, ServerCrash, CheckCircle2, ArrowRight, ExternalLink, Play, Copy, RefreshCw } from "lucide-react"
import { toast } from "sonner"

interface TroubleshootingIssue {
  title: string
  problem: string
  icon: React.ReactNode
  fixes: string[]
  action: string
  actionType: 'guide' | 'resend' | 'status' | 'video'
  border: string
  bg: string
  videoUrl?: string
  detailedSteps?: string[]
}

const issues: TroubleshootingIssue[] = [
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
    actionType: "guide",
    border: "border-red-500/20",
    bg: "bg-red-500/5",
    detailedSteps: [
      "Open MetaMask and check your balance",
      "Go to Settings > Advanced > Reset Account",
      "Clear your browser cache and cookies",
      "Try using a different RPC endpoint",
      "If on Ethereum, consider switching to Polygon for lower fees",
      "Contact support if issue persists after 30 minutes"
    ]
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
    action: "Video Tutorial",
    actionType: "video",
    border: "border-orange-500/20",
    bg: "bg-orange-500/5",
    videoUrl: "https://youtube.com/watch?v=example",
    detailedSteps: [
      "Open your wallet (MetaMask, Rainbow, etc.)",
      "Go to the NFT or Collectibles tab",
      "Click 'Import NFT' or 'Add Custom Token'",
      "Enter the contract address: 0x...",
      "Enter the Token ID from your ticket confirmation",
      "The NFT should now appear in your collection"
    ]
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
    actionType: "resend",
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
    actionType: "status",
    border: "border-pink-500/20",
    bg: "bg-pink-500/5"
  }
]

export function TroubleshootingGuide() {
  const [selectedIssue, setSelectedIssue] = useState<TroubleshootingIssue | null>(null)
  const [isResending, setIsResending] = useState(false)

  const handleAction = async (issue: TroubleshootingIssue) => {
    switch (issue.actionType) {
      case 'resend':
        setIsResending(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        toast.success("Email resent!", {
          description: "Check your inbox in the next few minutes"
        })
        setIsResending(false)
        break
      case 'status':
        toast.info("All systems operational", {
          description: "No ongoing incidents reported"
        })
        break
      case 'guide':
      case 'video':
        setSelectedIssue(issue)
        break
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

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
              <Button 
                className="w-full bg-white/10 hover:bg-white/20 text-white justify-between" 
                variant="ghost"
                onClick={() => handleAction(issue)}
                disabled={isResending && issue.actionType === 'resend'}
              >
                {isResending && issue.actionType === 'resend' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    {issue.action}
                    {issue.actionType === 'video' ? <Play className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Detailed Guide Dialog */}
      <Dialog open={!!selectedIssue} onOpenChange={(open) => !open && setSelectedIssue(null)}>
        <DialogContent className="bg-[#0f0f0f] border-white/10 text-white max-w-lg">
          {selectedIssue && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {selectedIssue.icon}
                  <span>{selectedIssue.title}</span>
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Follow these steps to resolve the issue
                </DialogDescription>
              </DialogHeader>

              {selectedIssue.actionType === 'video' && (
                <div className="bg-white/5 rounded-lg aspect-video flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Play className="w-12 h-12 text-brand-primary mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Video tutorial would play here</p>
                    <Button 
                      variant="link" 
                      className="text-brand-primary mt-2"
                      onClick={() => toast.info("Opening video in new tab")}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Open in YouTube
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="font-medium text-white">Step-by-step instructions:</h4>
                <ol className="space-y-3">
                  {selectedIssue.detailedSteps?.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {selectedIssue.title === "NFT Not Showing" && (
                <div className="bg-white/5 rounded-lg p-4 mt-4">
                  <p className="text-xs text-gray-400 mb-2">Contract Address (click to copy):</p>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-xs font-mono bg-white/5 hover:bg-white/10"
                    onClick={() => copyToClipboard("0x1234567890abcdef1234567890abcdef12345678")}
                  >
                    0x1234...5678
                    <Copy className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-white/10"
                  onClick={() => setSelectedIssue(null)}
                >
                  Close
                </Button>
                <Button 
                  className="flex-1 bg-brand-primary hover:bg-brand-primary/90"
                  onClick={() => {
                    toast.info("Opening support ticket form")
                    setSelectedIssue(null)
                  }}
                >
                  Still need help?
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
