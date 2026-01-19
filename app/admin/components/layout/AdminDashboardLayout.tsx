"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Sidebar } from "@/components/layout/Sidebar"
import { MobileHeader } from "./MobileHeader"
import { MobileBottomNav } from "./MobileBottomNav"
import { cn } from "@/lib/utils"

interface AdminDashboardLayoutProps {
  children: React.ReactNode
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mobile menu click (from MobileHeader) - opens the shared sidebar as an overlay
  const handleMobileMenuClick = () => {
      setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-eureka-bg text-white pb-20 lg:pb-0">
      
      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden lg:block">
          {/* Header */}
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

          {/* Sidebar - Desktop */}
          <div className="fixed top-16 left-0 bottom-0 w-60 z-40">
            <Sidebar className="w-full h-full" />
          </div>

          {/* Main Content */}
          <main
            className={cn(
              "pt-16 pl-60 min-h-screen transition-all duration-300 ease-in-out"
            )}
          >
            <div className="container mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
            </div>
          </main>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="lg:hidden">
          {/* Mobile Header */}
          <MobileHeader onMenuClick={handleMobileMenuClick} />
          
          {/* Mobile Bottom Nav */}
          <MobileBottomNav onMenuClick={handleMobileMenuClick} />

          {/* Shared Sidebar - Mobile Overlay */}
          <div
            className={cn(
              "fixed inset-0 z-[60] bg-black/80 transition-opacity duration-300 backdrop-blur-sm",
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className={cn(
                "fixed inset-y-0 left-0 w-64 bg-eureka-bg transform transition-transform duration-300 ease-in-out border-r border-eureka-card z-[70]",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between h-16 px-6 border-b border-eureka-card">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-start to-brand-end">
                  Eureka
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-400 hover:text-white focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Sidebar className="h-[calc(100%-4rem)]" />
            </div>
          </div>

          {/* Main Content - Mobile */}
          <main className="pt-20 px-4 min-h-screen">
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {children}
               </div>
          </main>
      </div>

    </div>
  )
}
