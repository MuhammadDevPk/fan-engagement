"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Ticket, BarChart3, Users, DollarSign, Settings, CircleHelp, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Events", href: "/dashboard/events", icon: Ticket },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Attendees", href: "/dashboard/attendees", icon: Users },
  { name: "Revenue", href: "/dashboard/revenue", icon: DollarSign },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/dashboard/help", icon: CircleHelp },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex flex-col h-full bg-eureka-bg text-gray-400 border-r border-eureka-card", className)}>
      <div className="flex-1 py-6">
        <nav className="space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 relative overflow-hidden",
                  isActive
                    ? "bg-eureka-card text-white shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                    : "hover:bg-eureka-card/50 hover:text-white"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-start to-brand-end rounded-r-full" />
                )}
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-brand-start" : "text-gray-500 group-hover:text-brand-start"
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
