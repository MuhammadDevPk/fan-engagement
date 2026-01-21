"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Rocket, Play, Code, Users, ExternalLink, ArrowRight, CheckCircle2, Copy, Download } from "lucide-react"
import { toast } from "sonner"

interface QuickHelpCard {
  icon: React.ReactNode
  title: string
  description: string
  meta: string
  primaryAction: { label: string; icon: typeof Play }
  secondaryAction?: { label: string; icon: typeof ArrowRight }
  gradient: string
  border: string
  type: 'video' | 'docs' | 'guide' | 'community'
}

const cards: QuickHelpCard[] = [
  {
    icon: <Rocket className="w-6 h-6 text-indigo-400" />,
    title: "Quick Start Guide",
    description: "Set up your first event in 5 minutes",
    meta: "Estimated time: 5 min",
    primaryAction: { label: "Watch Video Tutorial", icon: Play },
    secondaryAction: { label: "Read Guide", icon: ArrowRight },
    gradient: "from-indigo-500/10 to-purple-500/10",
    border: "hover:border-indigo-500/50",
    type: "guide"
  },
  {
    icon: <Play className="w-6 h-6 text-pink-400" />,
    title: "Video Library",
    description: "Step-by-step visual guides",
    meta: "24 videos available",
    primaryAction: { label: "Browse All Videos", icon: ArrowRight },
    secondaryAction: undefined,
    gradient: "from-pink-500/10 to-rose-500/10",
    border: "hover:border-pink-500/50",
    type: "video"
  },
  {
    icon: <Code className="w-6 h-6 text-cyan-400" />,
    title: "Developer Docs",
    description: "API reference and integration guides",
    meta: "v2.4.0 Documentation",
    primaryAction: { label: "View API Docs", icon: ExternalLink },
    secondaryAction: { label: "Download Postman", icon: Download },
    gradient: "from-cyan-500/10 to-blue-500/10",
    border: "hover:border-cyan-500/50",
    type: "docs"
  },
  {
    icon: <Users className="w-6 h-6 text-amber-400" />,
    title: "Community Forum",
    description: "Connect with other event organizers",
    meta: "156 Active discussions",
    primaryAction: { label: "Join Discord", icon: ExternalLink },
    secondaryAction: { label: "Visit Forum", icon: ArrowRight },
    gradient: "from-amber-500/10 to-orange-500/10",
    border: "hover:border-amber-500/50",
    type: "community"
  }
]

const guideSteps = [
  { title: "Create your account", description: "Sign up and verify your email", completed: true },
  { title: "Connect your wallet", description: "Link MetaMask or other Web3 wallet", completed: true },
  { title: "Set up your first event", description: "Add event details, dates, and venue", completed: false },
  { title: "Configure ticket types", description: "Set pricing and quantity for each tier", completed: false },
  { title: "Deploy smart contract", description: "Mint your NFT tickets on blockchain", completed: false },
  { title: "Publish and share", description: "Go live and start selling tickets", completed: false }
]

const videoList = [
  { title: "Platform Overview", duration: "12:45", views: "12K" },
  { title: "Creating Your First Event", duration: "8:32", views: "24K" },
  { title: "Understanding NFT Tickets", duration: "6:15", views: "18K" },
  { title: "Advanced Analytics", duration: "15:20", views: "7K" },
  { title: "API Integration Tutorial", duration: "22:45", views: "5K" },
  { title: "Mobile Check-in Setup", duration: "9:10", views: "11K" }
]

export function QuickHelpCards() {
  const [selectedCard, setSelectedCard] = useState<QuickHelpCard | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handlePrimaryAction = (card: QuickHelpCard) => {
    setSelectedCard(card)
    setDialogOpen(true)
  }

  const handleSecondaryAction = (card: QuickHelpCard) => {
    if (card.type === 'docs') {
      toast.success("Downloading Postman collection...", {
        description: "eureka-api-v2.4.0.postman_collection.json"
      })
    } else if (card.type === 'community') {
      toast.info("Opening community forum...")
    } else {
      setSelectedCard(card)
      setDialogOpen(true)
    }
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText("pk_live_eureka_xxxxxxxxxxxxxxxxxxxx")
    toast.success("API key copied to clipboard!")
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <Card key={index} className={`bg-white/5 border-white/10 text-white transition-all duration-300 ${card.border} group hover:shadow-lg hover:shadow-white/5`}>
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>
              <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
              <CardDescription className="text-gray-400">{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500 font-medium">{card.meta}</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pt-0">
              <Button 
                className="w-full bg-white/10 hover:bg-white/20 text-white justify-between" 
                variant="ghost"
                onClick={() => handlePrimaryAction(card)}
              >
                {card.primaryAction.label}
                <card.primaryAction.icon className="w-4 h-4 ml-2" />
              </Button>
              {card.secondaryAction && (
                <Button 
                  className="w-full text-gray-400 hover:text-white justify-between" 
                  variant="link"
                  onClick={() => handleSecondaryAction(card)}
                >
                  {card.secondaryAction.label}
                  <card.secondaryAction.icon className="w-3 h-3 ml-2" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Dynamic Dialog based on card type */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0f0f0f] border-white/10 text-white max-w-lg max-h-[80vh] overflow-y-auto">
          {selectedCard?.type === 'guide' && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-indigo-400" />
                  Quick Start Guide
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Complete these steps to launch your first event
                </DialogDescription>
              </DialogHeader>
              
              <div className="bg-white/5 rounded-lg aspect-video flex items-center justify-center mb-4">
                <div className="text-center">
                  <Play className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">5-minute quick start video</p>
                </div>
              </div>

              <div className="space-y-3">
                {guideSteps.map((step, i) => (
                  <div 
                    key={i} 
                    className={`flex items-start gap-3 p-3 rounded-lg ${step.completed ? 'bg-green-500/10' : 'bg-white/5'}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${step.completed ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                      {step.completed ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs">{i + 1}</span>}
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${step.completed ? 'text-green-400' : 'text-white'}`}>{step.title}</p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">
                Continue Setup
              </Button>
            </>
          )}

          {selectedCard?.type === 'video' && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-pink-400" />
                  Video Library
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  24 tutorials to help you master Eureka
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-2">
                {videoList.map((video, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
                    onClick={() => toast.info(`Playing: ${video.title}`)}
                  >
                    <div className="w-10 h-10 rounded bg-pink-500/20 flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 text-pink-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-white truncate">{video.title}</p>
                      <p className="text-xs text-gray-500">{video.duration} • {video.views} views</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 shrink-0" />
                  </button>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 border-white/10">
                View All 24 Videos
              </Button>
            </>
          )}

          {selectedCard?.type === 'docs' && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-cyan-400" />
                  Developer Documentation
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  API v2.4.0 - RESTful & GraphQL endpoints
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-2">Your API Key</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm text-cyan-400 bg-black/30 px-3 py-2 rounded font-mono">
                      pk_live_eureka_xxxx...xxxx
                    </code>
                    <Button size="icon" variant="ghost" onClick={copyApiKey}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {['REST API', 'GraphQL', 'Webhooks', 'SDKs'].map((item) => (
                    <Button 
                      key={item}
                      variant="outline" 
                      className="border-white/10 justify-start"
                      onClick={() => toast.info(`Opening ${item} documentation`)}
                    >
                      <Code className="w-4 h-4 mr-2 text-cyan-400" />
                      {item}
                    </Button>
                  ))}
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                  <p className="text-sm text-cyan-300 font-medium mb-1">Rate Limits</p>
                  <p className="text-xs text-gray-400">1000 requests/min on Pro plan</p>
                </div>
              </div>

              <Button className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Full Documentation
              </Button>
            </>
          )}

          {selectedCard?.type === 'community' && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  Community Hub
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Connect with 5,600+ event organizers
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#5865F2]/20 rounded-lg p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-[#5865F2] mx-auto mb-2 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-medium text-white">Discord</p>
                    <p className="text-xs text-gray-400">5,632 members</p>
                    <Button 
                      size="sm" 
                      className="mt-2 bg-[#5865F2] hover:bg-[#4752C4] w-full"
                      onClick={() => toast.success("Opening Discord invite...")}
                    >
                      Join Server
                    </Button>
                  </div>
                  
                  <div className="bg-orange-500/20 rounded-lg p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-orange-500 mx-auto mb-2 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-medium text-white">Forum</p>
                    <p className="text-xs text-gray-400">156 discussions</p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="mt-2 border-orange-500/30 text-orange-400 w-full"
                      onClick={() => toast.info("Opening forum...")}
                    >
                      Browse Topics
                    </Button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-2">Trending Discussions</p>
                  {['Best practices for music events', 'Gas optimization tips', 'Marketing strategies that work'].map((topic, i) => (
                    <button
                      key={i}
                      className="w-full text-left text-sm text-gray-300 hover:text-white py-1.5 border-b border-white/5 last:border-0"
                      onClick={() => toast.info(`Opening: ${topic}`)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
