"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Search, Mail, Video, Phone, ExternalLink, HelpCircle, FileText, Zap, ArrowRight } from "lucide-react"
import { toast } from "sonner"

const recentArticles = [
  { title: "Setting up payout methods", category: "Payments" },
  { title: "Understanding gas fees", category: "Web3" },
  { title: "Minting your first ticket", category: "Getting Started" },
  { title: "Check-in scanner setup", category: "Mobile" },
  { title: "NFT metadata customization", category: "Settings" }
]

const quickActions = [
  { label: "Start Live Chat", icon: MessageCircle, color: "text-green-400", action: "chat" },
  { label: "Email Support", icon: Mail, color: "text-blue-400", action: "email" },
  { label: "Watch Tutorials", icon: Video, color: "text-pink-400", action: "videos" },
  { label: "Schedule Call", icon: Phone, color: "text-purple-400", action: "call" }
]

export function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof recentArticles>([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 1) {
      const results = recentArticles.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleAction = (action: string) => {
    switch (action) {
      case 'chat':
        toast.success("Connecting to live chat...", { description: "Wait time: ~2 minutes" })
        break
      case 'email':
        window.location.href = "mailto:support@eureka.io?subject=Support Request"
        break
      case 'videos':
        toast.info("Opening video library...")
        break
      case 'call':
        toast.info("Opening calendar to schedule a call...")
        break
    }
  }

  const handleArticleClick = (article: typeof recentArticles[0]) => {
    toast.info(`Opening: ${article.title}`, { description: `Category: ${article.category}` })
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-br from-brand-primary to-purple-600 hover:opacity-90 text-white shadow-lg shadow-brand-primary/30 transition-all hover:scale-110 z-50 flex items-center justify-center p-0"
        aria-label="Open help widget"
      >
        <HelpCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold animate-pulse">1</span>
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <Card className="w-[360px] bg-[#0A0A0A] border-white/10 text-white shadow-2xl shadow-black/50">
        <CardHeader className="bg-gradient-to-r from-brand-primary/20 to-purple-600/20 pb-4 border-b border-white/10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-brand-primary to-purple-600 rounded-lg text-white">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-base">Need Help?</CardTitle>
                <p className="text-xs text-gray-400">We're here 24/7</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/10 -mr-2 rounded-full" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4 pb-2">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="How can we help?" 
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 h-10 bg-white/5 border-white/10 text-white text-sm placeholder:text-gray-500 focus:border-brand-primary/50"
            />
            
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden z-10">
                {searchResults.map((result, i) => (
                  <button
                    key={i}
                    className="w-full px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center justify-between transition-colors"
                    onClick={() => handleArticleClick(result)}
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-gray-500" />
                      {result.title}
                    </span>
                    <span className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">{result.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, i) => (
                <Button 
                  key={i}
                  variant="ghost" 
                  className="justify-start text-sm h-10 px-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                  onClick={() => handleAction(action.action)}
                >
                  <action.icon className={`w-4 h-4 mr-2 ${action.color}`} />
                  <span className="truncate">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Recent Articles */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Popular Articles</p>
            <ul className="space-y-1">
              {recentArticles.slice(0, 4).map((article, i) => (
                <li key={i}>
                  <button 
                    className="w-full flex items-center justify-between text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors py-2 px-2 rounded-md"
                    onClick={() => handleArticleClick(article)}
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-gray-600" />
                      <span className="truncate">{article.title}</span>
                    </span>
                    <ArrowRight className="w-3 h-3 opacity-50 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <Button 
              variant="ghost" 
              className="w-full text-brand-primary hover:text-brand-primary/80 hover:bg-brand-primary/10 text-sm"
              onClick={() => {
                setIsOpen(false)
                toast.info("Scrolling to Help Center...")
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Browse All Help Topics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
