"use client"

import { Bell, Menu, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface MobileHeaderProps {
  onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const [isWalletExpanded, setIsWalletExpanded] = useState(false)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-eureka-bg/95 backdrop-blur-md border-b border-eureka-card lg:hidden">
      <div className="h-16 flex items-center justify-between px-4">
        {/* Hamburger Menu (Left) */}
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>

        {/* Eureka Logo (Center) */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand-start to-brand-end flex items-center justify-center text-white font-bold text-sm animate-gradient">
            E
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Eureka
          </span>
        </div>

        {/* Notifications (Right) */}
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
            <Bell className="h-6 w-6" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-eureka-bg" />
            </Button>
            
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8 border border-eureka-card">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback className="bg-brand-start text-white">AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#0f1435] border-eureka-card text-gray-300" align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      {/* Connected Wallet Chip (Collapsible) */}
        <div 
            className="w-full px-4 pb-2"
        >
             <button 
                onClick={() => setIsWalletExpanded(!isWalletExpanded)}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-full bg-eureka-card/50 border border-eureka-card/50"
             >
                <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                     <span className="text-xs text-gray-400">Polygon • 0x12...5678</span>
                </div>
                 <Wallet className="h-3 w-3 text-gray-400" />
             </button>
             
             <div className={cn(
                 "overflow-hidden transition-all duration-300 ease-in-out",
                 isWalletExpanded ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
             )}>
                 <div className="p-3 rounded-lg bg-black/20 border border-white/5 space-y-1">
                     <div className="flex justify-between text-xs text-gray-400">
                         <span>Balance</span>
                         <span className="text-white font-mono">1.45 ETH</span>
                     </div>
                      <div className="flex justify-between text-xs text-gray-400">
                         <span>Network</span>
                         <span className="text-green-400">Polygon Mainnet</span>
                     </div>
                 </div>
             </div>
        </div>
    </div>
  )
}
