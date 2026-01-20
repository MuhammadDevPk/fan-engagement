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
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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

function SidebarContent({ activeTab, onTabChange, onItemClick }: SettingsSidebarProps & { onItemClick?: () => void }) {
  return (
    <div className="p-4 space-y-1">
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            onTabChange(item.id);
            onItemClick?.();
          }}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all",
            "hover:bg-accent hover:text-accent-foreground",
            activeTab === item.id
              ? "bg-primary/10 text-primary hover:bg-primary/15"
              : "text-muted-foreground"
          )}
        >
          <item.icon className={cn(
            "w-5 h-5 shrink-0 transition-colors",
            activeTab === item.id ? "text-primary" : ""
          )} />
          <div className="flex flex-col items-start gap-0.5 text-left">
            <span>{item.label}</span>
            <span className="text-[10px] text-muted-foreground/70 font-normal hidden lg:block">
              {item.description}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

export function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-[260px] shrink-0 border-r bg-card/50 backdrop-blur-sm sticky top-20 h-[calc(100vh-5rem)] overflow-hidden hidden md:block">
        <ScrollArea className="h-full">
          <div className="p-3 border-b">
            <h3 className="text-sm font-semibold text-muted-foreground px-3">Settings</h3>
          </div>
          <SidebarContent activeTab={activeTab} onTabChange={onTabChange} />
        </ScrollArea>
      </aside>

      {/* Mobile Sheet */}
      <div className="md:hidden mb-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Menu className="w-4 h-4" />
              {sidebarItems.find(i => i.id === activeTab)?.label || "Settings"}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Settings</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-5rem)]">
              <SidebarContent
                activeTab={activeTab}
                onTabChange={onTabChange}
                onItemClick={() => setOpen(false)}
              />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
