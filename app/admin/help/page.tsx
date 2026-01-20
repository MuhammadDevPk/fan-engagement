"use client"

import { HelpHeader } from "./components/HelpHeader"
import { QuickHelpCards } from "./components/QuickHelpCards"
import { PopularTopics } from "./components/PopularTopics"
import { FaqSection } from "./components/FaqSection"
import { TroubleshootingGuide } from "./components/TroubleshootingGuide"
import { LiveSupportPanel } from "./components/LiveSupportPanel"
import { HelpWidget } from "./components/HelpWidget"

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 lg:p-8 relative">
      <div className="max-w-7xl mx-auto">
        <HelpHeader />
        
        <div className="animate-in slide-in-from-bottom-5 duration-500 fade-in fill-mode-backwards">
          <QuickHelpCards />
        </div>
        
        <div className="animate-in slide-in-from-bottom-5 duration-500 delay-100 fade-in fill-mode-backwards">
          <PopularTopics />
        </div>
        
        <div className="animate-in slide-in-from-bottom-5 duration-500 delay-200 fade-in fill-mode-backwards">
          <FaqSection />
          <TroubleshootingGuide />
          <LiveSupportPanel />
        </div>
      </div>
      
      <HelpWidget />
    </div>
  )
}
