"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Globe,
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
  Clock,
  DollarSign,
  Languages,
  Calendar,
  Users,
} from "lucide-react";

const INITIAL_SETTINGS = {
  orgName: "Eureka Events",
  adminEmail: "admin@eureka.xyz",
  phone: "+1 (555) 123-4567",
  timezone: "utc",
  currency: "usd",
  language: "en",
  defaultCapacity: 1000,
  defaultDuration: 2,
  autoPublish: false,
  requireApproval: true,
};

export function GeneralSettings() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    toast.success("Settings saved successfully", {
      description: "Your organization settings have been updated.",
    });
  };

  const handleDiscard = () => {
    setSettings(INITIAL_SETTINGS);
    setHasChanges(false);
    toast.info("Changes discarded");
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">General Settings</h2>
        <p className="text-muted-foreground">
          Manage your organization details and default event configurations.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Organization Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" /> Organization Info
            </CardTitle>
            <CardDescription>
              This information will be displayed on your public profile and emails.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                value={settings.orgName}
                onChange={e => handleChange("orgName", e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Admin Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={settings.adminEmail}
                    onChange={e => handleChange("adminEmail", e.target.value)}
                    className="pr-10"
                  />
                  <CheckCircle2 className="w-4 h-4 text-green-500 absolute right-3 top-3" />
                </div>
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone Number
                </Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={e => handleChange("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <Separator />

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Timezone
                </Label>
                <Select
                  value={settings.timezone}
                  onValueChange={v => handleChange("timezone", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                    <SelectItem value="est">EST (GMT-5)</SelectItem>
                    <SelectItem value="cst">CST (GMT-6)</SelectItem>
                    <SelectItem value="mst">MST (GMT-7)</SelectItem>
                    <SelectItem value="pst">PST (GMT-8)</SelectItem>
                    <SelectItem value="gmt">GMT (London)</SelectItem>
                    <SelectItem value="cet">CET (Central Europe)</SelectItem>
                    <SelectItem value="jst">JST (Japan)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Currency
                </Label>
                <Select
                  value={settings.currency}
                  onValueChange={v => handleChange("currency", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="cad">CAD (C$)</SelectItem>
                    <SelectItem value="aud">AUD (A$)</SelectItem>
                    <SelectItem value="jpy">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Languages className="w-4 h-4" /> Language
                </Label>
                <Select
                  value={settings.language}
                  onValueChange={v => handleChange("language", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Default Event Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" /> Default Event Settings
            </CardTitle>
            <CardDescription>
              These settings will be applied to new events by default.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> Default Capacity
                </Label>
                <Input
                  type="number"
                  value={settings.defaultCapacity}
                  onChange={e => handleChange("defaultCapacity", parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Maximum attendees per event</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Default Duration (Hours)
                </Label>
                <Input
                  type="number"
                  value={settings.defaultDuration}
                  onChange={e => handleChange("defaultDuration", parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Standard event length</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-publish Events</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically publish events after creation
                  </p>
                </div>
                <Switch
                  checked={settings.autoPublish}
                  onCheckedChange={v => handleChange("autoPublish", v)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5">
                  <Label className="text-base">Require Approval for Edits</Label>
                  <p className="text-sm text-muted-foreground">
                    Require admin approval before publishing event changes
                  </p>
                </div>
                <Switch
                  checked={settings.requireApproval}
                  onCheckedChange={v => handleChange("requireApproval", v)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Bar */}
        {hasChanges && (
          <div className="sticky bottom-4 flex justify-end gap-4 p-4 rounded-lg border bg-background/95 backdrop-blur shadow-lg animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 text-sm text-yellow-600 mr-auto">
              <AlertCircle className="w-4 h-4" />
              <span>You have unsaved changes</span>
            </div>
            <Button variant="outline" onClick={handleDiscard} disabled={isSaving}>
              Discard
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
