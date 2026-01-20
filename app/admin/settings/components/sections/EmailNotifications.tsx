"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Mail,
  Edit,
  Send,
  Eye,
  Upload,
  Palette,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  Bell,
  FileText,
  Users,
  XCircle,
  RefreshCw,
  Megaphone,
} from "lucide-react";

// Mock email templates
const INITIAL_TEMPLATES = [
  {
    id: "purchase",
    name: "Purchase Confirmation",
    description: "Sent when a ticket is purchased",
    enabled: true,
    lastSent: 1247,
    lastEdited: "2 days ago",
  },
  {
    id: "reminder24h",
    name: "Event Reminder (24h)",
    description: "Sent 24 hours before event",
    enabled: true,
    lastSent: 892,
    lastEdited: "1 week ago",
  },
  {
    id: "reminder1h",
    name: "Event Reminder (1h)",
    description: "Sent 1 hour before event",
    enabled: true,
    lastSent: 756,
    lastEdited: "1 week ago",
  },
  {
    id: "checkin",
    name: "Check-in Confirmation",
    description: "Sent when attendee checks in",
    enabled: true,
    lastSent: 634,
    lastEdited: "3 days ago",
  },
  {
    id: "cancellation",
    name: "Event Cancellation",
    description: "Sent when event is cancelled",
    enabled: true,
    lastSent: 12,
    lastEdited: "1 month ago",
  },
  {
    id: "refund",
    name: "Refund Processed",
    description: "Sent when refund is completed",
    enabled: true,
    lastSent: 45,
    lastEdited: "2 weeks ago",
  },
  {
    id: "marketing",
    name: "Marketing Updates",
    description: "Promotional emails and offers",
    enabled: false,
    lastSent: 0,
    lastEdited: "Never",
  },
  {
    id: "announcements",
    name: "New Event Announcements",
    description: "Notify subscribers of new events",
    enabled: false,
    lastSent: 0,
    lastEdited: "Never",
  },
];

const INITIAL_BRANDING = {
  logoUrl: "",
  brandColor: "#8B5CF6",
  footerText: "© 2026 Eureka Events. All rights reserved.",
  senderName: "Eureka Events",
  senderEmail: "notifications@eureka.xyz",
};

export function EmailNotifications() {
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [branding, setBranding] = useState(INITIAL_BRANDING);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [sendingTest, setSendingTest] = useState<string | null>(null);

  const toggleTemplate = (id: string) => {
    setTemplates(prev =>
      prev.map(t => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
    setHasChanges(true);
  };

  const handleBrandingChange = (key: string, value: string) => {
    setBranding(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSendTest = async (templateId: string) => {
    setSendingTest(templateId);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSendingTest(null);
    toast.success("Test email sent", {
      description: "Check your inbox for the test email.",
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    toast.success("Email settings saved");
  };

  const handleEditTemplate = (id: string) => {
    setEditingTemplate(id);
    toast.info("Template editor opened", {
      description: "Make changes and save when done.",
    });
  };

  const getTemplateIcon = (id: string) => {
    switch (id) {
      case "purchase": return <FileText className="w-4 h-4" />;
      case "reminder24h":
      case "reminder1h": return <Clock className="w-4 h-4" />;
      case "checkin": return <CheckCircle2 className="w-4 h-4" />;
      case "cancellation": return <XCircle className="w-4 h-4" />;
      case "refund": return <RefreshCw className="w-4 h-4" />;
      case "marketing": return <Megaphone className="w-4 h-4" />;
      case "announcements": return <Bell className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Email Notifications</h2>
        <p className="text-muted-foreground">
          Configure email templates and delivery settings.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Email Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" /> Email Templates
            </CardTitle>
            <CardDescription>
              Enable or disable automated email notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Transactional Emails */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Transactional Emails</h4>
                <div className="space-y-2">
                  {templates.filter(t => !["marketing", "announcements"].includes(t.id)).map(template => (
                    <div
                      key={template.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                        template.enabled ? "bg-card" : "bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Switch
                          checked={template.enabled}
                          onCheckedChange={() => toggleTemplate(template.id)}
                        />
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            template.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}>
                            {getTemplateIcon(template.id)}
                          </div>
                          <div>
                            <p className={`font-medium ${!template.enabled && "text-muted-foreground"}`}>
                              {template.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{template.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                          <p className="text-sm font-medium">{template.lastSent.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">emails sent</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditTemplate(template.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setPreviewOpen(true)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleSendTest(template.id)}
                            disabled={sendingTest === template.id}
                          >
                            {sendingTest === template.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Send className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Marketing Emails */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Megaphone className="w-4 h-4" /> Marketing Emails
                  <Badge variant="secondary" className="text-[10px]">Optional</Badge>
                </h4>
                <div className="space-y-2">
                  {templates.filter(t => ["marketing", "announcements"].includes(t.id)).map(template => (
                    <div
                      key={template.id}
                      className={`flex items-center justify-between p-4 rounded-lg border border-dashed transition-all ${
                        template.enabled ? "bg-card border-solid" : "bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Switch
                          checked={template.enabled}
                          onCheckedChange={() => toggleTemplate(template.id)}
                        />
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            template.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}>
                            {getTemplateIcon(template.id)}
                          </div>
                          <div>
                            <p className={`font-medium ${!template.enabled && "text-muted-foreground"}`}>
                              {template.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{template.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {template.enabled && (
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Branding */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" /> Email Branding
            </CardTitle>
            <CardDescription>
              Customize the look of your email notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Logo Upload */}
              <div className="space-y-3">
                <Label>Logo</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  {branding.logoUrl ? (
                    <div className="space-y-2">
                      <img src={branding.logoUrl} alt="Logo" className="h-12 mx-auto" />
                      <Button variant="ghost" size="sm" onClick={() => handleBrandingChange("logoUrl", "")}>
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                      <div>
                        <p className="font-medium">Upload logo</p>
                        <p className="text-xs text-muted-foreground">Recommended: 200x60px</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Brand Color */}
              <div className="space-y-3">
                <Label>Brand Color</Label>
                <div className="flex gap-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={branding.brandColor}
                      onChange={e => handleBrandingChange("brandColor", e.target.value)}
                      className="w-12 h-12 rounded-lg border cursor-pointer"
                    />
                  </div>
                  <Input
                    value={branding.brandColor}
                    onChange={e => handleBrandingChange("brandColor", e.target.value)}
                    className="font-mono"
                    placeholder="#8B5CF6"
                  />
                </div>
                <div className="flex gap-2">
                  {["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"].map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        branding.brandColor === color ? "border-ring scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleBrandingChange("brandColor", color)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sender Name</Label>
                <Input
                  value={branding.senderName}
                  onChange={e => handleBrandingChange("senderName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Sender Email</Label>
                <Input
                  type="email"
                  value={branding.senderEmail}
                  onChange={e => handleBrandingChange("senderEmail", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Footer Text</Label>
              <Textarea
                value={branding.footerText}
                onChange={e => handleBrandingChange("footerText", e.target.value)}
                rows={2}
              />
            </div>

            {/* Preview Card */}
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4" /> Preview
              </h4>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border max-w-sm">
                <div
                  className="h-1 rounded-t mb-4"
                  style={{ backgroundColor: branding.brandColor }}
                />
                <div className="space-y-3">
                  <div className="h-8 w-32 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div
                    className="h-10 w-32 rounded flex items-center justify-center text-white text-sm font-medium"
                    style={{ backgroundColor: branding.brandColor }}
                  >
                    View Ticket
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-[10px] text-muted-foreground text-center">
                    {branding.footerText}
                  </p>
                </div>
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
            <Button variant="outline" onClick={() => setHasChanges(false)} disabled={isSaving}>
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

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
            <DialogDescription>Preview how your email will look to recipients.</DialogDescription>
          </DialogHeader>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
              <div className="h-2" style={{ backgroundColor: branding.brandColor }} />
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold">🎉 Your Ticket is Confirmed!</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Hi Alex,
                </p>
                <p className="text-sm text-muted-foreground">
                  Your ticket for <strong>Crypto Music Festival 2026</strong> has been confirmed. 
                  Get ready for an amazing experience!
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm font-medium">Order Details</p>
                  <div className="text-xs text-muted-foreground mt-2 space-y-1">
                    <p>Ticket: VIP Access</p>
                    <p>Date: March 15, 2026</p>
                    <p>Location: Miami Crypto Arena</p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  View Your Ticket
                </Button>
              </div>
              <div className="border-t p-4">
                <p className="text-[10px] text-muted-foreground text-center">
                  {branding.footerText}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleSendTest("preview")}>
              <Send className="w-4 h-4 mr-2" /> Send Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
