"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Rocket, Play, Code, Users, ExternalLink, ArrowRight } from "lucide-react"

export function QuickHelpCards() {
  const cards = [
    {
      icon: <Rocket className="w-6 h-6 text-indigo-400" />,
      title: "Quick Start Guide",
      description: "Set up your first event in 5 minutes",
      meta: "Estimated time: 5 min",
      primaryAction: { label: "Watch Video Tutorial", icon: Play },
      secondaryAction: { label: "Read Guide", icon: ArrowRight },
      gradient: "from-indigo-500/10 to-purple-500/10",
      border: "hover:border-indigo-500/50"
    },
    {
      icon: <Play className="w-6 h-6 text-pink-400" />,
      title: "Video Library",
      description: "Step-by-step visual guides",
      meta: "24 videos available",
      primaryAction: { label: "Browse All Videos", icon: ArrowRight },
      secondaryAction: null,
      gradient: "from-pink-500/10 to-rose-500/10",
      border: "hover:border-pink-500/50"
    },
    {
      icon: <Code className="w-6 h-6 text-cyan-400" />,
      title: "Developer Docs",
      description: "API reference and integration guides",
      meta: "v2.4.0 Documentation",
      primaryAction: { label: "View API Docs", icon: ExternalLink },
      secondaryAction: { label: "Download Postman", icon: ArrowRight },
      gradient: "from-cyan-500/10 to-blue-500/10",
      border: "hover:border-cyan-500/50"
    },
    {
      icon: <Users className="w-6 h-6 text-amber-400" />,
      title: "Community Forum",
      description: "Connect with other event organizers",
      meta: "156 Active discussions",
      primaryAction: { label: "Join Discord", icon: ExternalLink },
      secondaryAction: { label: "Visit Forum", icon: ArrowRight },
      gradient: "from-amber-500/10 to-orange-500/10",
      border: "hover:border-amber-500/50"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className={`bg-white/5 border-white/10 text-white transition-all duration-300 ${card.border} group`}>
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
            <Button className="w-full bg-white/10 hover:bg-white/20 text-white justify-between" variant="ghost">
              {card.primaryAction.label}
              <card.primaryAction.icon className="w-4 h-4 ml-2" />
            </Button>
            {card.secondaryAction && (
              <Button className="w-full text-gray-400 hover:text-white justify-between" variant="link">
                {card.secondaryAction.label}
                <card.secondaryAction.icon className="w-3 h-3 ml-2" />
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
