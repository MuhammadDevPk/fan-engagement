"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Mail, Phone, Calendar, Clock, Ticket } from "lucide-react"

export function LiveSupportPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
      <div className="lg:col-span-2">
         <h2 className="text-2xl font-bold text-white mb-6">Live Support Options</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Live Chat */}
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20 text-white">
               <CardHeader>
                  <div className="flex justify-between items-start">
                     <div className="p-3 bg-green-500/20 rounded-lg text-green-400 mb-2">
                        <MessageSquare className="w-6 h-6" />
                     </div>
                     <span className="flex items-center text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                        ONLINE
                     </span>
                  </div>
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription className="text-gray-400">Talk to a specialist instantly</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center text-sm text-gray-300 mb-4">
                     <Clock className="w-4 h-4 mr-2 text-green-400" />
                     Wait time: ~2 minutes
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                     Start Chat
                  </Button>
               </CardContent>
            </Card>

            {/* Email Support */}
            <Card className="bg-white/5 border-white/10 text-white">
               <CardHeader>
                  <div className="flex justify-between items-start">
                     <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 mb-2">
                        <Mail className="w-6 h-6" />
                     </div>
                  </div>
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription className="text-gray-400">detailed inquiries & tickets</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center text-sm text-gray-300 mb-4">
                     <Clock className="w-4 h-4 mr-2 text-blue-400" />
                     Response: Within 4 hours
                  </div>
                  <Button variant="outline" className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300">
                     Send Email
                  </Button>
               </CardContent>
            </Card>

            {/* Phone Support */}
            <Card className="bg-white/5 border-white/10 text-white">
               <CardHeader>
                  <div className="flex justify-between items-start">
                     <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 mb-2">
                        <Phone className="w-6 h-6" />
                     </div>
                     <span className="text-xs font-bold text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10">
                        ENTERPRISE
                     </span>
                  </div>
                  <CardTitle>Phone Support</CardTitle>
                  <CardDescription className="text-gray-400">Dedicated line for VIPs</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center text-sm text-gray-300 mb-4">
                     <Clock className="w-4 h-4 mr-2 text-purple-400" />
                     Mon-Fri 9AM-6PM EST
                  </div>
                  <Button variant="outline" className="w-full border-white/10 text-gray-300 hover:bg-white/10 hover:text-white" disabled>
                     Upgrade Plan to Access
                  </Button>
               </CardContent>
            </Card>

            {/* Schedule Call */}
            <Card className="bg-white/5 border-white/10 text-white">
               <CardHeader>
                  <div className="flex justify-between items-start">
                     <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400 mb-2">
                        <Calendar className="w-6 h-6" />
                     </div>
                  </div>
                  <CardTitle>Schedule Call</CardTitle>
                  <CardDescription className="text-gray-400">Book a technical review</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center text-sm text-gray-300 mb-4">
                     <Clock className="w-4 h-4 mr-2 text-orange-400" />
                     Next slot: Tomorrow 2PM
                  </div>
                  <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10">
                     View Calendar
                  </Button>
               </CardContent>
            </Card>

         </div>
      </div>

      <div className="lg:col-span-1">
         <h2 className="text-2xl font-bold text-white mb-6">Recent Tickets</h2>
         <div className="space-y-4">
            <Card className="bg-white/5 border-white/10 text-white">
               <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-xs font-mono text-gray-500">#TKT-12345</span>
                     <span className="text-[10px] font-bold bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded uppercase">In Progress</span>
                  </div>
                  <h4 className="font-medium text-sm mb-1">Transaction failed error</h4>
                  <p className="text-xs text-gray-400 mb-3">Last updated: 2 hours ago</p>
                  <Button size="sm" variant="ghost" className="w-full text-xs h-8 border border-white/10 hover:bg-white/10">
                     View Details
                  </Button>
               </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 text-white opacity-60">
               <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-xs font-mono text-gray-500">#TKT-12344</span>
                     <span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded uppercase">Resolved</span>
                  </div>
                  <h4 className="font-medium text-sm mb-1">NFT Artwork Upload Issue</h4>
                  <p className="text-xs text-gray-400 mb-3">Last updated: 2 days ago</p>
                  <Button size="sm" variant="ghost" className="w-full text-xs h-8 border border-white/10 hover:bg-white/10">
                     View Details
                  </Button>
               </CardContent>
            </Card>

            <Button variant="link" className="w-full text-brand-primary">
               <Ticket className="w-4 h-4 mr-2" />
               View All Tickets
            </Button>
         </div>
      </div>
    </div>
  )
}
