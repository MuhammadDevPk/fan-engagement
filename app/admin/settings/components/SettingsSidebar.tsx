"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Settings,
  Blocks,
  CreditCard,
  Mail,
  Webhook,
  Shield,
  Palette,
  Receipt,
} from "lucide-react";

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const sidebarItems = [
  {
    id: "general",
    label: "General Settings",
    icon: Settings,
    description: "Organization info & defaults",
  },
  {
    id: "blockchain",
    label: "Blockchain & Networks",
    icon: Blocks,
    description: "Networks, contracts & IPFS",
  },
  {
    id: "payment",
    label: "Payment Configuration",
    icon: CreditCard,
    description: "Gateways, fees & payouts",
  },
  {
    id: "notifications",
    label: "Email Notifications",
    icon: Mail,
    description: "Templates & branding",
  },
  {
    id: "api",
    label: "API & Integrations",
    icon: Webhook,
    description: "Keys, webhooks & 3rd party",
  },
  {
    id: "security",
    label: "Security & Access",
    icon: Shield,
    description: "2FA, roles & logs",
  },
  {
    id: "branding",
    label: "Branding",
    icon: Palette,
    description: "Logo, colors & domain",
  },
  {
    id: "fees",
    label: "Platform Fees",
    icon: Receipt,
    description: "Pricing & calculators",
  },
];

export function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  return (
    <aside className="w-[240px] shrink-0 border-r bg-card/50 backdrop-blur-sm sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto hidden md:block">
      <div className="p-4 space-y-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              activeTab === item.id
                ? "bg-primary/10 text-primary hover:bg-primary/15"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <div className="flex flex-col items-start gap-0.5">
              <span>{item.label}</span>
              {/* <span className="text-[10px] text-muted-foreground/70 font-normal">
                {item.description}
              </span> */}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
