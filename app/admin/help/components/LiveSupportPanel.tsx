"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare, Mail, Phone, Calendar, Clock, Ticket, ChevronRight, User, Send, X, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SupportTicket {
  id: string
  subject: string
  status: 'open' | 'in-progress' | 'waiting' | 'resolved' | 'closed'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  category: string
  createdAt: string
  lastUpdated: string
  assignedTo?: {
    name: string
    avatar?: string
  }
  messages: {
    sender: 'user' | 'agent'
    name: string
    message: string
    timestamp: string
    avatar?: string
  }[]
}

const mockTickets: SupportTicket[] = [
  {
    id: "TKT-12345",
    subject: "Transaction failed error when minting",
    status: "in-progress",
    priority: "high",
    category: "Blockchain & Web3",
    createdAt: "Jan 20, 2026 15:30",
    lastUpdated: "2 hours ago",
    assignedTo: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    messages: [
      {
        sender: "user",
        name: "You",
        message: "I'm trying to deploy a smart contract for my event but getting error: 'insufficient funds for gas'. I have 0.5 ETH in my wallet.",
        timestamp: "Jan 20, 15:30"
      },
      {
        sender: "agent",
        name: "Sarah Chen",
        message: "Thank you for reaching out! I can see the issue. The deployment requires approximately 0.02 ETH for gas on Ethereum mainnet. However, looking at your account, you're trying to deploy on a congested network. Here's what I recommend:\n\n1. Switch to Polygon network for much lower gas fees (~$0.01)\n2. Or wait for lower gas prices (usually evenings/weekends)\n3. Make sure you have some buffer ETH for the transaction",
        timestamp: "Jan 20, 15:42",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
      },
      {
        sender: "user",
        name: "You",
        message: "Thanks! I'll try Polygon. How do I switch networks?",
        timestamp: "Jan 20, 15:50"
      },
      {
        sender: "agent",
        name: "Sarah Chen",
        message: "Great choice! To switch networks:\n\n1. Go to Settings > Blockchain\n2. Select 'Polygon' from the network dropdown\n3. Make sure you have some MATIC for gas (you can get it from our faucet for testnet or purchase from exchanges)\n4. Re-deploy your contract\n\nLet me know if you need any help!",
        timestamp: "Jan 20, 15:52",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
      }
    ]
  },
  {
    id: "TKT-12344",
    subject: "NFT Artwork Upload Issue",
    status: "resolved",
    priority: "normal",
    category: "Settings",
    createdAt: "Jan 18, 2026 10:15",
    lastUpdated: "2 days ago",
    assignedTo: {
      name: "Marcus Johnson"
    },
    messages: [
      {
        sender: "user",
        name: "You",
        message: "My NFT artwork won't upload. It's a 5MB PNG file.",
        timestamp: "Jan 18, 10:15"
      },
      {
        sender: "agent",
        name: "Marcus Johnson",
        message: "The file size limit is 4MB for optimal performance. Please compress your image using tools like TinyPNG. Alternatively, you can use our built-in compression feature in the upload dialog.",
        timestamp: "Jan 18, 10:30"
      }
    ]
  },
  {
    id: "TKT-12343",
    subject: "Refund not processed after 3 days",
    status: "open",
    priority: "urgent",
    category: "Payments",
    createdAt: "Jan 19, 2026 09:00",
    lastUpdated: "1 day ago",
    messages: [
      {
        sender: "user",
        name: "You",
        message: "I issued a refund to an attendee 3 days ago but they still haven't received it. Order #ORD-78543",
        timestamp: "Jan 19, 09:00"
      }
    ]
  },
  {
    id: "TKT-12342",
    subject: "How to set up tiered pricing?",
    status: "closed",
    priority: "low",
    category: "General",
    createdAt: "Jan 15, 2026 14:20",
    lastUpdated: "5 days ago",
    messages: []
  },
  {
    id: "TKT-12341",
    subject: "Check-in scanner not working offline",
    status: "waiting",
    priority: "high",
    category: "Mobile App",
    createdAt: "Jan 17, 2026 18:45",
    lastUpdated: "3 days ago",
    messages: []
  }
]

const statusColors: Record<string, string> = {
  'open': 'bg-blue-500/20 text-blue-400',
  'in-progress': 'bg-yellow-500/20 text-yellow-400',
  'waiting': 'bg-orange-500/20 text-orange-400',
  'resolved': 'bg-green-500/20 text-green-400',
  'closed': 'bg-gray-500/20 text-gray-400'
}

const priorityColors: Record<string, string> = {
  'low': 'text-gray-400',
  'normal': 'text-blue-400',
  'high': 'text-orange-400',
  'urgent': 'text-red-400'
}

export function LiveSupportPanel() {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [ticketDetailOpen, setTicketDetailOpen] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")
  const [chatActive, setChatActive] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  const handleStartChat = () => {
    setChatActive(true)
    toast.success("Connected to live support!", {
      description: "Sarah Chen will assist you shortly"
    })
  }

  const handleSendReply = () => {
    if (!replyMessage.trim()) return
    toast.success("Reply sent!", { description: "Agent will respond shortly" })
    setReplyMessage("")
  }

  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) return
    toast.info("Message sent", { description: chatMessage })
    setChatMessage("")
  }

  const openTickets = mockTickets.filter(t => t.status === 'open' || t.status === 'in-progress' || t.status === 'waiting')

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
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Start Chat
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#0f0f0f] border-white/10 text-white max-w-md h-[500px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-green-400" />
                        Live Chat
                      </span>
                      {chatActive && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          Sarah Chen is typing...
                        </span>
                      )}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <ScrollArea className="flex-1 bg-white/5 rounded-lg p-4 my-4">
                    {!chatActive ? (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <Avatar className="w-16 h-16 mb-4">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium mb-1">Connect with Support</h3>
                        <p className="text-sm text-gray-400 mb-4">Our team is ready to help you</p>
                        <Button onClick={handleStartChat} className="bg-green-600 hover:bg-green-700">
                          Start Conversation
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-xs text-gray-400 mb-1">Sarah Chen • Just now</p>
                            <div className="bg-white/10 rounded-lg p-3 text-sm">
                              Hi! 👋 I'm Sarah from Eureka support. How can I help you today?
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </ScrollArea>

                  {chatActive && (
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Type your message..." 
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                      />
                      <Button onClick={handleSendChatMessage} className="bg-green-600 hover:bg-green-700">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
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
              <CardDescription className="text-gray-400">Detailed inquiries & tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-gray-300 mb-4">
                <Clock className="w-4 h-4 mr-2 text-blue-400" />
                Response: Within 4 hours
              </div>
              <Button 
                variant="outline" 
                className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                onClick={() => {
                  window.location.href = "mailto:support@eureka.io?subject=Support Request"
                }}
              >
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
                <Badge variant="outline" className="text-xs font-bold text-gray-400 bg-white/5 border-white/10">
                  ENTERPRISE
                </Badge>
              </div>
              <CardTitle>Phone Support</CardTitle>
              <CardDescription className="text-gray-400">Dedicated line for VIPs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-gray-300 mb-4">
                <Clock className="w-4 h-4 mr-2 text-purple-400" />
                Mon-Fri 9AM-6PM EST
              </div>
              <Button 
                variant="outline" 
                className="w-full border-white/10 text-gray-300 hover:bg-white/10 hover:text-white" 
                disabled
              >
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
              <Button 
                variant="outline" 
                className="w-full border-white/10 text-white hover:bg-white/10"
                onClick={() => toast.info("Calendar would open here")}
              >
                View Calendar
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Recent Tickets Section */}
      <div className="lg:col-span-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">My Tickets</h2>
          <Badge variant="outline" className="bg-brand-primary/20 text-brand-primary border-brand-primary/30">
            {openTickets.length} Open
          </Badge>
        </div>
        
        <div className="space-y-3">
          {mockTickets.slice(0, 4).map((ticket) => (
            <Card 
              key={ticket.id} 
              className={`bg-white/5 border-white/10 text-white cursor-pointer hover:bg-white/10 transition-colors ${ticket.status === 'resolved' || ticket.status === 'closed' ? 'opacity-60' : ''}`}
              onClick={() => {
                setSelectedTicket(ticket)
                setTicketDetailOpen(true)
              }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-gray-500">#{ticket.id}</span>
                  <Badge className={`text-[10px] font-bold uppercase ${statusColors[ticket.status]}`}>
                    {ticket.status.replace('-', ' ')}
                  </Badge>
                </div>
                <h4 className="font-medium text-sm mb-1 line-clamp-1">{ticket.subject}</h4>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">Updated: {ticket.lastUpdated}</p>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="link" className="w-full text-brand-primary">
            <Ticket className="w-4 h-4 mr-2" />
            View All Tickets ({mockTickets.length})
          </Button>
        </div>
      </div>

      {/* Ticket Detail Dialog */}
      <Dialog open={ticketDetailOpen} onOpenChange={setTicketDetailOpen}>
        <DialogContent className="bg-[#0f0f0f] border-white/10 text-white max-w-2xl max-h-[80vh] flex flex-col">
          {selectedTicket && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-lg mb-1">{selectedTicket.subject}</DialogTitle>
                    <DialogDescription className="text-gray-400 flex items-center gap-2 flex-wrap">
                      <span className="font-mono">#{selectedTicket.id}</span>
                      <span>•</span>
                      <span>{selectedTicket.category}</span>
                      <span>•</span>
                      <span className={priorityColors[selectedTicket.priority]}>{selectedTicket.priority.toUpperCase()}</span>
                    </DialogDescription>
                  </div>
                  <Badge className={`${statusColors[selectedTicket.status]} uppercase text-xs`}>
                    {selectedTicket.status.replace('-', ' ')}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="flex items-center gap-2 py-3 border-y border-white/10 my-2">
                {selectedTicket.assignedTo ? (
                  <>
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={selectedTicket.assignedTo.avatar} />
                      <AvatarFallback>{selectedTicket.assignedTo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-300">Assigned to <strong>{selectedTicket.assignedTo.name}</strong></span>
                  </>
                ) : (
                  <span className="text-sm text-gray-500">Unassigned - awaiting agent</span>
                )}
                <span className="text-xs text-gray-500 ml-auto">Created: {selectedTicket.createdAt}</span>
              </div>

              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {selectedTicket.messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="w-8 h-8 shrink-0">
                        <AvatarImage src={msg.avatar} />
                        <AvatarFallback>{msg.sender === 'user' ? 'Y' : msg.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                        <p className="text-xs text-gray-400 mb-1">{msg.name} • {msg.timestamp}</p>
                        <div className={`rounded-lg p-3 text-sm whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-brand-primary/20 text-white ml-8' : 'bg-white/10 text-gray-200 mr-8'}`}>
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {selectedTicket.status !== 'resolved' && selectedTicket.status !== 'closed' && (
                <div className="pt-4 border-t border-white/10 mt-4">
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Type your reply..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="bg-white/5 border-white/10 text-white min-h-[60px]"
                    />
                  </div>
                  <div className="flex justify-between mt-3">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                        onClick={() => {
                          toast.success("Ticket marked as resolved")
                          setTicketDetailOpen(false)
                        }}
                      >
                        Mark Resolved
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={() => toast.info("Escalation requested")}
                      >
                        Escalate
                      </Button>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-brand-primary hover:bg-brand-primary/90"
                      onClick={handleSendReply}
                      disabled={!replyMessage.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
