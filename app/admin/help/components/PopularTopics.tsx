"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Clock, Eye, ThumbsUp, ArrowRight, Zap, Coins, Link as LinkIcon, BarChart3, Users, Settings, Smartphone, Bug } from "lucide-react"

// Mock data for all categories
const articlesData: Record<string, Array<{
  title: string
  description: string
  readTime: string
  views: string
  rating: string
  icon: typeof Zap
}>> = {
  "getting-started": [
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
    },
    {
      title: "Publishing Your Event",
      description: "Final steps to make your event live and visible to attendees",
      readTime: "3 min",
      views: "3,456",
      rating: "91%",
      icon: Zap
    }
  ],
  "payments": [
    {
      title: "Setting Up Payout Methods",
      description: "Configure bank accounts and crypto wallets for receiving payments",
      readTime: "5 min",
      views: "8,234",
      rating: "95%",
      icon: Coins
    },
    {
      title: "Understanding Transaction Fees",
      description: "Breakdown of platform fees, gas fees, and payment processing",
      readTime: "4 min",
      views: "6,543",
      rating: "89%",
      icon: Coins
    },
    {
      title: "Processing Refunds",
      description: "How to issue refunds for fiat and crypto payments",
      readTime: "6 min",
      views: "4,321",
      rating: "87%",
      icon: Coins
    },
    {
      title: "Multi-Currency Pricing",
      description: "Accept payments in multiple cryptocurrencies and fiat",
      readTime: "5 min",
      views: "3,876",
      rating: "92%",
      icon: Coins
    },
    {
      title: "Revenue Analytics",
      description: "Track your earnings and financial performance",
      readTime: "7 min",
      views: "5,432",
      rating: "94%",
      icon: BarChart3
    }
  ],
  "blockchain": [
    {
      title: "Choosing the Right Network",
      description: "Ethereum vs Polygon vs Arbitrum - which is best for your event",
      readTime: "8 min",
      views: "7,654",
      rating: "96%",
      icon: LinkIcon
    },
    {
      title: "Gas Fee Optimization",
      description: "Strategies to minimize gas costs for you and attendees",
      readTime: "6 min",
      views: "5,432",
      rating: "93%",
      icon: Coins
    },
    {
      title: "Smart Contract Customization",
      description: "Advanced options for custom ticket logic and royalties",
      readTime: "10 min",
      views: "3,210",
      rating: "88%",
      icon: LinkIcon
    },
    {
      title: "NFT Metadata Best Practices",
      description: "Optimize your ticket NFT metadata for marketplaces",
      readTime: "5 min",
      views: "4,567",
      rating: "91%",
      icon: LinkIcon
    },
    {
      title: "Wallet Integration Guide",
      description: "Support multiple wallet providers for attendees",
      readTime: "7 min",
      views: "6,789",
      rating: "94%",
      icon: Coins
    }
  ],
  "analytics": [
    {
      title: "Reading Your Dashboard",
      description: "Understanding key metrics and KPIs for your events",
      readTime: "5 min",
      views: "4,321",
      rating: "92%",
      icon: BarChart3
    },
    {
      title: "Sales Funnel Analysis",
      description: "Track conversion rates from viewing to purchase",
      readTime: "6 min",
      views: "3,210",
      rating: "89%",
      icon: BarChart3
    },
    {
      title: "Audience Demographics",
      description: "Understand your attendee base with detailed insights",
      readTime: "4 min",
      views: "2,876",
      rating: "87%",
      icon: Users
    },
    {
      title: "Exporting Reports",
      description: "Download and share analytics data in various formats",
      readTime: "3 min",
      views: "2,543",
      rating: "85%",
      icon: BarChart3
    }
  ],
  "attendees": [
    {
      title: "Managing Attendee List",
      description: "View, search, and filter your event attendees",
      readTime: "4 min",
      views: "5,678",
      rating: "93%",
      icon: Users
    },
    {
      title: "Check-in Process",
      description: "Set up QR code scanning for event entry",
      readTime: "5 min",
      views: "6,789",
      rating: "95%",
      icon: Users
    },
    {
      title: "Communication Tools",
      description: "Send updates and announcements to attendees",
      readTime: "4 min",
      views: "4,321",
      rating: "90%",
      icon: Users
    },
    {
      title: "Ticket Transfers",
      description: "Enable and manage peer-to-peer ticket transfers",
      readTime: "6 min",
      views: "3,456",
      rating: "88%",
      icon: Users
    }
  ],
  "settings": [
    {
      title: "Account Security",
      description: "Two-factor authentication and security best practices",
      readTime: "5 min",
      views: "4,567",
      rating: "96%",
      icon: Settings
    },
    {
      title: "Team Management",
      description: "Add team members and set permissions",
      readTime: "4 min",
      views: "3,210",
      rating: "92%",
      icon: Users
    },
    {
      title: "Notification Preferences",
      description: "Customize email and push notification settings",
      readTime: "3 min",
      views: "2,345",
      rating: "89%",
      icon: Settings
    },
    {
      title: "Branding & Customization",
      description: "Customize your event pages with your brand",
      readTime: "6 min",
      views: "4,876",
      rating: "94%",
      icon: Settings
    }
  ],
  "mobile": [
    {
      title: "Mobile App Overview",
      description: "Introduction to the Eureka organizer mobile app",
      readTime: "4 min",
      views: "5,678",
      rating: "93%",
      icon: Smartphone
    },
    {
      title: "Mobile Check-in Setup",
      description: "Configure your phone as a check-in scanner",
      readTime: "5 min",
      views: "6,543",
      rating: "95%",
      icon: Smartphone
    },
    {
      title: "Real-time Notifications",
      description: "Get instant alerts for sales and check-ins",
      readTime: "3 min",
      views: "3,210",
      rating: "90%",
      icon: Smartphone
    },
    {
      title: "Offline Mode",
      description: "Use the app without internet connection",
      readTime: "4 min",
      views: "2,876",
      rating: "88%",
      icon: Smartphone
    }
  ],
  "troubleshooting": [
    {
      title: "Transaction Failed Errors",
      description: "Common causes and solutions for failed blockchain transactions",
      readTime: "6 min",
      views: "8,765",
      rating: "91%",
      icon: Bug
    },
    {
      title: "NFT Not Appearing",
      description: "Why minted NFTs might not show up immediately",
      readTime: "4 min",
      views: "6,543",
      rating: "89%",
      icon: Bug
    },
    {
      title: "Wallet Connection Issues",
      description: "Troubleshoot MetaMask and other wallet problems",
      readTime: "5 min",
      views: "5,432",
      rating: "87%",
      icon: Bug
    },
    {
      title: "Email Delivery Problems",
      description: "Fix issues with confirmation emails not arriving",
      readTime: "3 min",
      views: "4,321",
      rating: "85%",
      icon: Bug
    }
  ]
}

const categories = [
  { id: "getting-started", label: "Getting Started", icon: Zap },
  { id: "payments", label: "Payments & Payouts", icon: Coins },
  { id: "blockchain", label: "Blockchain & Web3", icon: LinkIcon },
  { id: "analytics", label: "Analytics & Reporting", icon: BarChart3 },
  { id: "attendees", label: "Attendee Management", icon: Users },
  { id: "settings", label: "Settings & Config", icon: Settings },
  { id: "mobile", label: "Mobile App", icon: Smartphone },
  { id: "troubleshooting", label: "Troubleshooting", icon: Bug },
]

export function PopularTopics() {
  const [activeTab, setActiveTab] = useState("getting-started")

  const renderArticles = (categoryId: string) => {
    const articles = articlesData[categoryId] || []
    return (
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
    )
  }

  return (
    <div className="space-y-6 mb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Popular Topics</h2>
        <span className="text-sm text-gray-500">{articlesData[activeTab]?.length || 0} articles</span>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

        {categories.map(cat => (
          <TabsContent key={cat.id} value={cat.id} className="space-y-4 animate-in fade-in-50 duration-300">
            {renderArticles(cat.id)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
