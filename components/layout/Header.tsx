"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6 fixed top-0 left-0 right-0 z-50 bg-eureka-bg/80 backdrop-blur-md border-b border-eureka-card">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden text-gray-400" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-start to-brand-end flex items-center justify-center text-white font-bold text-lg animate-gradient">
            E
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 hidden sm:inline-block">
            Eureka Admin
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Network Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-eureka-card border border-eureka-card">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-xs font-medium text-gray-300">Polygon</span>
        </div>

        {/* Wallet Address */}
        <Button
          variant="outline"
          className="hidden sm:flex border-eureka-card bg-eureka-card/50 text-gray-300 hover:bg-eureka-card hover:text-white h-9"
        >
          <span className="mr-2 text-brand-start">●</span>
          0x1234...5678
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white hover:bg-eureka-card">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-eureka-bg" />
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8 border border-eureka-card">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback className="bg-brand-start text-white">AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#0f1435] border-eureka-card text-gray-300" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-white">Admin User</p>
                <p className="text-xs leading-none text-gray-500">admin@eureka.xyz</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-eureka-card" />
            <DropdownMenuItem className="focus:bg-eureka-card focus:text-white cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-eureka-card focus:text-white cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-eureka-card" />
            <DropdownMenuItem className="focus:bg-eureka-card focus:text-red-400 text-red-400 cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
