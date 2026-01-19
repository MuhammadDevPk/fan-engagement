"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, BarChart3, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileBottomNavProps {
  onMenuClick: () => void
}

export function MobileBottomNav({ onMenuClick }: MobileBottomNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      isActive: (path: string) => path === "/admin"
    },
    {
      label: "Events",
      icon: Calendar,
      href: "/admin/events",
      isActive: (path: string) => path.startsWith("/admin/events")
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      isActive: (path: string) => path.startsWith("/admin/analytics")
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-eureka-bg/95 backdrop-blur-md border-t border-eureka-card lg:hidden pb-safe">
      <div className="grid grid-cols-4 h-full">
        {navItems.map((item) => {
          const active = item.isActive(pathname)
          const Icon = item.icon
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
            >
              <div
                className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  active ? "bg-gradient-to-br from-brand-start/20 to-brand-end/20 text-brand-text-accent" : "text-gray-400"
                )}
              >
                <Icon className={cn("h-5 w-5", active && "animate-pulse-slow")} />
              </div>
              <span className={cn(
                  "text-[10px] font-medium transition-colors",
                  active ? "text-white" : "text-gray-500"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
        
        <button
          onClick={onMenuClick}
          className="flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
        >
          <div className="p-1.5 rounded-lg text-gray-400">
            <Menu className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-medium text-gray-500">
            Menu
          </span>
        </button>
      </div>
    </div>
  )
}
