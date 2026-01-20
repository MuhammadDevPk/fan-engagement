"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Search, Mail, Video, Phone, ExternalLink, HelpCircle } from "lucide-react"

export function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20 transition-all hover:scale-105 z-50 flex items-center justify-center p-0"
      >
        <HelpCircle className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">1</span>
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <Card className="w-[350px] bg-[#0A0A0A] border-white/10 text-white shadow-2xl">
        <CardHeader className="bg-brand-primary/10 pb-4 border-b border-brand-primary/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
               <div className="p-1.5 bg-brand-primary rounded-lg text-white">
                  <HelpCircle className="w-4 h-4" />
               </div>
               <CardTitle className="text-base">Eureka Help</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-white/10 -mr-2" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="How can we help?" 
              className="pl-9 h-9 bg-white/5 border-white/10 text-white text-xs placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-1 mb-6">
             <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Quick Actions</p>
             <Button variant="ghost" className="w-full justify-start text-sm h-9 px-2 hover:bg-white/5 text-gray-300 hover:text-white">
                <MessageCircle className="w-4 h-4 mr-3 text-green-400" />
                Start Live Chat
             </Button>
             <Button variant="ghost" className="w-full justify-start text-sm h-9 px-2 hover:bg-white/5 text-gray-300 hover:text-white">
                <Mail className="w-4 h-4 mr-3 text-blue-400" />
                Email Support
             </Button>
             <Button variant="ghost" className="w-full justify-start text-sm h-9 px-2 hover:bg-white/5 text-gray-300 hover:text-white">
                <Video className="w-4 h-4 mr-3 text-pink-400" />
                Watch Tutorials
             </Button>
             <Button variant="ghost" className="w-full justify-start text-sm h-9 px-2 hover:bg-white/5 text-gray-300 hover:text-white">
                <Phone className="w-4 h-4 mr-3 text-purple-400" />
                Schedule Call
             </Button>
          </div>

          <div>
             <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Recent Articles</p>
             <ul className="space-y-2">
                {[
                   "Setting up payout methods",
                   "Understanding gas fees",
                   "Minting your first ticket"
                ].map((article, i) => (
                   <li key={i}>
                      <a href="#" className="flex items-center justify-between text-xs text-gray-400 hover:text-brand-primary transition-colors py-1">
                         {article}
                         <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                   </li>
                ))}
             </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
