"use client"

import { useState, useMemo } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ThumbsUp, ThumbsDown, PlayCircle, FileText, Eye, ArrowRight, Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FaqItem {
  id: string
  question: string
  category: string
  views: string
  content: string
  badge?: string
  helpfulCount: number
  notHelpfulCount: number
  relatedArticles: string[]
  videoTutorial?: string
}

const initialFaqs: FaqItem[] = [
  {
    id: "item-1",
    question: "How do I withdraw my earnings?",
    category: "Payments",
    views: "12,345",
    content: "You can withdraw your earnings once they've settled (typically 2-3 days after the event). Go to Revenue > Request Payout, select your destination wallet or bank account, choose the payout method, and confirm. Instant crypto payouts are available for a small fee, while bank transfers take 3-5 business days.",
    badge: "Most Helpful",
    helpfulCount: 234,
    notHelpfulCount: 12,
    relatedArticles: ["Setting up payout methods", "Understanding settlement"],
    videoTutorial: "Watch payout tutorial"
  },
  {
    id: "item-2",
    question: "What blockchain networks are supported?",
    category: "Web3",
    views: "8,976",
    content: "We currently support Ethereum Mainnet, Polygon (Matic), Optimism, and Arbitrum. Polygon is recommended for lower gas fees for your attendees. You can switch networks in the Settings > Blockchain configuration panel at any time. Each network has different gas costs and transaction speeds.",
    helpfulCount: 189,
    notHelpfulCount: 8,
    relatedArticles: ["Choosing the right network", "Gas fee optimization"]
  },
  {
    id: "item-3",
    question: "How do I handle refunds?",
    category: "Payments",
    views: "6,543",
    content: "Refunds can be processed directly from the Attendee Management dashboard. Find the attendee, click 'Manage', and select 'Issue Refund'. For fiat payments, this reverses the charge. For crypto payments, you need to approve the transaction in your connected wallet. Partial refunds are also supported.",
    helpfulCount: 156,
    notHelpfulCount: 15,
    relatedArticles: ["Refund policies", "Processing partial refunds"]
  },
  {
    id: "item-4",
    question: "Can I customize my ticket NFT design?",
    category: "Settings",
    views: "5,432",
    content: "Yes! Navigate to the Event Dashboard > NFT Settings. You can upload custom artwork (PNG, JPG, GIF, or MP4), set metadata properties, and even add dynamic attributes that reveal after the event starts. We recommend 1:1 aspect ratio images at 1000x1000 pixels minimum.",
    helpfulCount: 145,
    notHelpfulCount: 10,
    relatedArticles: ["NFT design guidelines", "Dynamic attributes"],
    videoTutorial: "NFT customization tutorial"
  },
  {
    id: "item-5",
    question: "What are gas fees and who pays them?",
    category: "Web3",
    views: "7,890",
    content: "Gas fees are transaction fees paid to miners/validators on the blockchain. By default, Eureka uses a gasless minting setup where you (the organizer) cover the minting fees so attendees don't need crypto. You can change this in your billing settings. On Polygon, gas fees are typically under $0.01 per transaction.",
    helpfulCount: 178,
    notHelpfulCount: 11,
    relatedArticles: ["Gas fee optimization", "Gasless transactions"]
  },
  {
    id: "item-6",
    question: "How do I set up multi-tier ticket pricing?",
    category: "Payments",
    views: "4,567",
    content: "Create multiple ticket types in your Event Settings > Tickets section. For each tier, set a name (e.g., 'Early Bird', 'VIP', 'General Admission'), price, quantity, and any special perks. You can also set time-based pricing that automatically changes based on dates you specify.",
    helpfulCount: 134,
    notHelpfulCount: 9,
    relatedArticles: ["Pricing strategies", "Time-based pricing"]
  },
  {
    id: "item-7",
    question: "Can attendees resell their tickets?",
    category: "Web3",
    views: "6,234",
    content: "Yes! Since tickets are NFTs, attendees can transfer or sell them on supported marketplaces. You can set royalty percentages (typically 2.5-10%) to earn from secondary sales. You can also disable transfers entirely or set a maximum resale price in your event settings.",
    helpfulCount: 167,
    notHelpfulCount: 14,
    relatedArticles: ["Secondary market settings", "Royalty configuration"]
  },
  {
    id: "item-8",
    question: "How does the check-in process work?",
    category: "Attendees",
    views: "5,876",
    content: "Use our mobile app or web scanner to scan attendee QR codes at entry. The scanner verifies blockchain ownership in real-time and marks tickets as used to prevent double-entry. It works offline too - data syncs when you're back online.",
    helpfulCount: 198,
    notHelpfulCount: 7,
    relatedArticles: ["Check-in setup guide", "Offline mode"],
    videoTutorial: "Check-in demo"
  }
]

const categories = ["All", "Payments", "Web3", "Settings", "Attendees"]

export function FaqSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs)
  const [votedItems, setVotedItems] = useState<Record<string, 'up' | 'down' | null>>({})

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = searchQuery === "" || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.content.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [faqs, searchQuery, selectedCategory])

  const handleVote = (faqId: string, voteType: 'up' | 'down') => {
    const currentVote = votedItems[faqId]
    
    setFaqs(prev => prev.map(faq => {
      if (faq.id !== faqId) return faq
      
      let newHelpful = faq.helpfulCount
      let newNotHelpful = faq.notHelpfulCount
      
      // Remove previous vote if exists
      if (currentVote === 'up') newHelpful--
      if (currentVote === 'down') newNotHelpful--
      
      // Add new vote if different from current
      if (currentVote !== voteType) {
        if (voteType === 'up') newHelpful++
        if (voteType === 'down') newNotHelpful++
      }
      
      return { ...faq, helpfulCount: newHelpful, notHelpfulCount: newNotHelpful }
    }))
    
    setVotedItems(prev => ({
      ...prev,
      [faqId]: currentVote === voteType ? null : voteType
    }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-400 mb-6">
          Find quick answers to common questions about managing your events and account.
        </p>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search FAQs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full bg-white/5 border-white/10 text-white mb-6">
            <Filter className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
            {categories.map(cat => (
              <SelectItem key={cat} value={cat} className="hover:bg-white/10">{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="text-sm text-gray-500 mb-6">
          Showing {filteredFaqs.length} of {faqs.length} questions
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-blue-400 font-semibold mb-2">Can't find what you need?</h3>
          <p className="text-sm text-gray-400 mb-4">
            Our support team is available 24/7 to help you with specific issues.
          </p>
          <Button variant="outline" className="w-full bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300">
            Contact Support
          </Button>
        </div>
      </div>

      <div className="lg:col-span-2">
        {filteredFaqs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-white/5 rounded-xl border border-white/10">
            <Search className="w-12 h-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filter</p>
            <Button 
              variant="ghost" 
              className="mt-4 text-brand-primary"
              onClick={() => { setSearchQuery(""); setSelectedCategory("All") }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="bg-white/5 border border-white/10 rounded-xl px-4 overflow-hidden data-[state=open]:bg-white/10 transition-all">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left flex-wrap">
                    <span className="text-base font-medium text-white">{faq.question}</span>
                    {faq.badge && (
                      <Badge variant="outline" className="text-[10px] font-bold bg-amber-500/20 text-amber-400 border-amber-500/30 uppercase tracking-wider">
                        {faq.badge}
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="pt-2 text-gray-300 leading-relaxed">
                    {faq.content}
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      <span className="bg-white/5 px-2 py-1 rounded">{faq.category}</span>
                      <span className="flex items-center bg-white/5 px-2 py-1 rounded"><Eye className="w-3 h-3 mr-1" /> {faq.views} views</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-xs text-gray-400">
                        Was this helpful?
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className={`h-7 w-7 ml-2 rounded-full transition-colors ${votedItems[faq.id] === 'up' ? 'bg-green-500/30 text-green-400' : 'hover:bg-green-500/20 hover:text-green-500'}`}
                          onClick={() => handleVote(faq.id, 'up')}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </Button>
                        <span className="mx-1 text-green-400 font-medium">{faq.helpfulCount}</span>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className={`h-7 w-7 rounded-full transition-colors ${votedItems[faq.id] === 'down' ? 'bg-red-500/30 text-red-400' : 'hover:bg-red-500/20 hover:text-red-500'}`}
                          onClick={() => handleVote(faq.id, 'down')}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </Button>
                        <span className="ml-1 text-red-400 font-medium">{faq.notHelpfulCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    {faq.relatedArticles.map((article, i) => (
                      <Button key={i} variant="link" className="text-brand-primary h-auto p-0 text-xs">
                        <FileText className="w-3 h-3 mr-1" /> {article}
                      </Button>
                    ))}
                    {faq.videoTutorial && (
                      <Button variant="link" className="text-pink-400 h-auto p-0 text-xs">
                        <PlayCircle className="w-3 h-3 mr-1" /> {faq.videoTutorial}
                      </Button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        
        <div className="mt-6 text-center">
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            View All FAQs <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
