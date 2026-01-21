"use client"

import { useState } from "react"
import { Search, MessageCircle, Ticket, Headphones, CheckCircle2, X, Send, Paperclip, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import Link from "next/link"

export function HelpHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false)
  const [chatDialogOpen, setChatDialogOpen] = useState(false)
  const [ticketForm, setTicketForm] = useState({
    category: "",
    priority: "normal",
    subject: "",
    description: "",
    attachDebugInfo: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock search results
  const mockSearchResults = [
    "How to withdraw earnings",
    "Setting up ticket pricing",
    "Connecting your crypto wallet",
    "Understanding gas fees",
    "Processing refunds",
    "NFT metadata customization",
    "Check-in process setup",
    "Multi-tier ticket pricing"
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      setIsSearching(true)
      // Simulate search delay
      setTimeout(() => {
        const results = mockSearchResults.filter(r => 
          r.toLowerCase().includes(query.toLowerCase())
        )
        setSearchResults(results)
        setIsSearching(false)
      }, 300)
    } else {
      setSearchResults([])
    }
  }

  const handleSubmitTicket = async () => {
    if (!ticketForm.category || !ticketForm.subject || !ticketForm.description) {
      toast.error("Please fill in all required fields")
      return
    }
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success("Ticket submitted successfully!", {
      description: "Ticket #TKT-" + Math.random().toString(36).substr(2, 5).toUpperCase() + " has been created"
    })
    
    setIsSubmitting(false)
    setTicketDialogOpen(false)
    setTicketForm({
      category: "",
      priority: "normal",
      subject: "",
      description: "",
      attachDebugInfo: true
    })
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
          ❓ Help & Support Center
        </h1>
        <p className="text-gray-400 mt-1">
          Get the help you need to succeed with Eureka
        </p>
      </div>

      <div className="flex flex-col md:items-end gap-4 flex-1">
        <div className="flex items-center gap-2 text-sm text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 w-fit">
          <CheckCircle2 className="w-4 h-4" />
          <Link href="#" className="hover:underline">All systems operational</Link>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search with autocomplete */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search help articles, FAQs, and guides..." 
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-brand-primary/50"
            />
            {/* Search dropdown */}
            {(searchResults.length > 0 || isSearching) && searchQuery.length > 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-400 text-sm">Searching...</div>
                ) : searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((result, i) => (
                      <li key={i}>
                        <button 
                          className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2 transition-colors"
                          onClick={() => {
                            setSearchQuery("")
                            setSearchResults([])
                            toast.info("Opening article: " + result)
                          }}
                        >
                          <Search className="w-3 h-3 text-gray-500" />
                          {result}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-400 text-sm">No results found</div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {/* Live Chat Dialog */}
            <Dialog open={chatDialogOpen} onOpenChange={setChatDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10">
                  <Headphones className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">Contact</span> Support
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0f0f0f] border-white/10 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                    Live Chat Support
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Chat with our support team in real-time
                  </DialogDescription>
                </DialogHeader>
                
                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-sm text-green-400 font-medium">Support team is online</span>
                  </div>
                  <p className="text-xs text-gray-400">Average response time: ~2 minutes</p>
                </div>

                <div className="bg-white/5 rounded-lg h-48 flex items-center justify-center text-gray-500 text-sm mb-4">
                  Chat window would appear here
                </div>

                <div className="flex gap-2">
                  <Input 
                    placeholder="Type your message..." 
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Submit Ticket Dialog */}
            <Dialog open={ticketDialogOpen} onOpenChange={setTicketDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white">
                  <Ticket className="w-4 h-4 mr-2" />
                  Submit Ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0f0f0f] border-white/10 text-white max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-brand-primary" />
                    Submit Support Ticket
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Describe your issue and we'll get back to you within 4 hours
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select 
                        value={ticketForm.category} 
                        onValueChange={(v) => setTicketForm(prev => ({ ...prev, category: v }))}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="blockchain">Blockchain & NFTs</SelectItem>
                          <SelectItem value="general">General Question</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select 
                        value={ticketForm.priority} 
                        onValueChange={(v) => setTicketForm(prev => ({ ...prev, priority: v }))}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Subject *</Label>
                    <Input 
                      placeholder="Brief description of your issue"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description *</Label>
                    <Textarea 
                      placeholder="Please provide as much detail as possible..."
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white min-h-[120px]"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">Attach files (optional)</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      Browse
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-400" />
                      <div>
                        <span className="text-sm text-blue-300">Include debug info</span>
                        <p className="text-xs text-gray-500">Browser, OS, account details</p>
                      </div>
                    </div>
                    <Switch 
                      checked={ticketForm.attachDebugInfo}
                      onCheckedChange={(v) => setTicketForm(prev => ({ ...prev, attachDebugInfo: v }))}
                    />
                  </div>

                  <Button 
                    className="w-full bg-brand-primary hover:bg-brand-primary/90"
                    onClick={handleSubmitTicket}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Ticket"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}
