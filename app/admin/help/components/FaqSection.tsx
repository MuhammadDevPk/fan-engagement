"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ThumbsUp, ThumbsDown, PlayCircle, FileText } from "lucide-react"

export function FaqSection() {
  const faqs = [
    {
      id: "item-1",
      question: "How do I withdraw my earnings?",
      category: "Payments",
      views: "12,345",
      content: "You can withdraw your earnings once they've settled (typically 2-3 days after the event). Go to Revenue > Request Payout, select your destination wallet or bank account, choose the payout method, and confirm. Instant crypto payouts are available for a small fee, while bank transfers take 3-5 business days.",
      badge: "Most Helpful"
    },
    {
      id: "item-2",
      question: "What blockchain networks are supported?",
      category: "Web3",
      views: "8,976",
      content: "We currently support Ethereum Mainnet, Polygon (Matic), Optimism, and Arbitrum. Polygon is recommended for lower gas fees for your attendees. You can switch networks in the Settings > Blockchain configuration panel at any time."
    },
    {
      id: "item-3",
      question: "How do I handle refunds?",
      category: "Payments",
      views: "6,543",
      content: "Refunds can be processed directly from the Attendee Management dashboard. Find the attendee, click 'Manage', and select 'Issue Refund'. For fiat payments, this reverses the charge. For crypto payments, you need to approve the transaction in your connected wallet."
    },
    {
      id: "item-4",
      question: "Can I customize my ticket NFT design?",
      category: "Settings",
      views: "5,432",
      content: "Yes! Navigate to the Event Dashboard > NFT Settings. You can upload custom artwork, set metadata properties, and even add dynamic attributes that reveal after the event starts."
    },
    {
      id: "item-5",
      question: "What are gas fees and who pays them?",
      category: "Web3",
      views: "7,890",
      content: "Gas fees are transaction fees paid to miners/validators. By default, Eureka uses a gasless minting setup where you (the organizer) cover the minting fees so attendees don't need crypto. You can change this in your billing settings."
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-400 mb-6">
          Find quick answers to common questions about managing your events and account.
        </p>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search FAQs..." 
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
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
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="bg-white/5 border border-white/10 rounded-xl px-4 overflow-hidden data-[state=open]:bg-white/10 transition-all">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-base font-medium text-white">{faq.question}</span>
                  {faq.badge && (
                    <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {faq.badge}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="pt-2 text-gray-300 leading-relaxed">
                  {faq.content}
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-white/10">
                  <div className="flex gap-2 text-xs text-gray-500">
                    <span className="bg-white/5 px-2 py-1 rounded">{faq.category}</span>
                    <span className="flex items-center bg-white/5 px-2 py-1 rounded"><Eye className="w-3 h-3 mr-1" /> {faq.views} views</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-xs text-gray-400 mr-2">
                      Was this helpful?
                      <Button size="icon" variant="ghost" className="h-6 w-6 ml-2 hover:bg-green-500/20 hover:text-green-500 rounded-full">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6 hover:bg-red-500/20 hover:text-red-500 rounded-full">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                   <Button variant="link" className="text-brand-primary h-auto p-0 text-xs">
                    <FileText className="w-3 h-3 mr-1" /> Related Guide
                   </Button>
                   <Button variant="link" className="text-brand-primary h-auto p-0 text-xs">
                    <PlayCircle className="w-3 h-3 mr-1" /> Watch Tutorial
                   </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-6 text-center">
             <Button variant="ghost" className="text-gray-400 hover:text-white">
                View All FAQs <ArrowRight className="w-4 h-4 ml-2" />
             </Button>
        </div>
      </div>
    </div>
  )
}
