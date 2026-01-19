"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SettingsSidebar } from "./components/SettingsSidebar";

// Sections
import { BlockchainSettings } from "./components/sections/BlockchainSettings";
import { GeneralSettings } from "./components/sections/GeneralSettings";
import { PaymentSettings } from "./components/sections/PaymentSettings";
import { EmailNotifications } from "./components/sections/EmailNotifications";
import { APISettings } from "./components/sections/APISettings";
import { SecuritySettings } from "./components/sections/SecuritySettings";
import { BrandingSettings } from "./components/sections/BrandingSettings";
import { PlatformFees } from "./components/sections/PlatformFees";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");

  // Sync active tab with URL
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/admin/settings?tab=${tab}`);
  };

  const renderSection = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "blockchain":
        return <BlockchainSettings />;
      case "payment":
        return <PaymentSettings />;
      case "notifications":
        return <EmailNotifications />;
      case "api":
        return <APISettings />;
      case "security":
        return <SecuritySettings />;
      case "branding":
        return <BrandingSettings />;
      case "fees":
        return <PlatformFees />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Settings Sidebar */}
        <SettingsSidebar activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Content Area */}
        <main className="flex-1 w-full min-w-0 py-4">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
