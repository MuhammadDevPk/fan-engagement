"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { FileText, Clock, Eye, ThumbsUp, ArrowRight, Zap, Coins, Link as LinkIcon, BarChart3, Users, Settings, Smartphone } from "lucide-react"

export function PopularTopics() {
  const categories = [
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "payments", label: "Payments & Payouts", icon: Coins },
    { id: "blockchain", label: "Blockchain & Web3", icon: LinkIcon },
    { id: "analytics", label: "Analytics & Reporting", icon: BarChart3 },
    { id: "attendees", label: "Attendee Management", icon: Users },
    { id: "settings", label: "Settings & Config", icon: Settings },
    { id: "mobile", label: "Mobile App", icon: Smartphone },
  ]

  const articles = [
    {
      title: "Creating Your First Event",
      description: "Learn how to set up and publish your first event on Eureka",
      readTime: "5 min",
      views: "5,432",
      rating: "94%",
      icon: Zap
    },
    {
      title: "Understanding Web3 Ticketing",
      description: "What makes blockchain tickets different and why it matters",
      readTime: "4 min",
      views: "3,876",
      rating: "92%",
      icon: LinkIcon
    },
    {
      title: "Connecting Your Crypto Wallet",
      description: "Step-by-step guide to connect MetaMask and other wallets",
      readTime: "3 min",
      views: "4,234",
      rating: "96%",
      icon: Coins
    },
    {
      title: "Setting Up Ticket Pricing",
      description: "Best practices for pricing in USD and cryptocurrency",
      readTime: "6 min",
      views: "2,987",
      rating: "88%",
      icon: Coins
    },
    {
      title: "Deploying Your Smart Contract",
      description: "Understanding smart contracts and how to deploy them",
      readTime: "8 min",
      views: "2,134",
      rating: "85%",
      icon: LinkIcon
    }
  ]

  return (
    <div className="space-y-6 mb-12">
      <h2 className="text-2xl font-bold text-white">Popular Topics</h2>
      
      <Tabs defaultValue="getting-started" className="w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border border-white/10 bg-white/5 p-1 mb-6">
          <TabsList className="bg-transparent h-auto p-0 flex space-x-1">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-brand-primary data-[state=active]:text-white px-4 py-2 rounded-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* For this demo, we'll show the same articles for all tabs, but in a real app this would filter */}
        <TabsContent value="getting-started" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article, index) => (
              <Card key={index} className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      <article.icon className="w-5 h-5" />
                    </div>
                    <span className="flex items-center text-xs text-green-400 font-medium bg-green-400/10 px-2 py-1 rounded-full">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {article.rating}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {article.views}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-brand-primary hover:text-brand-primary/80">
                      Read Article <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        {/* Render placeholder for other tabs to prevent empty state layout shifts if switched */}
        {categories.slice(1).map(cat => (
             <TabsContent key={cat.id} value={cat.id} className="min-h-[200px] flex items-center justify-center text-gray-500 bg-white/5 rounded-lg border border-white/10 border-dashed">
                Content for {cat.label} would appear here
             </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
