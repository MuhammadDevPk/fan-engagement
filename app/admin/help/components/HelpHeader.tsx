"use client"

import { Search, MessageCircle, Ticket, Headphones, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function HelpHeader() {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
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
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search help articles, FAQs, and guides..." 
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-brand-primary/50"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10">
              <Headphones className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">Contact</span> Support
            </Button>
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white">
              <Ticket className="w-4 h-4 mr-2" />
              Submit Ticket
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
