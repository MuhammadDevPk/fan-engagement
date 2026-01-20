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
import { Checkbox } from "@/components/ui/checkbox";
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
  Key,
  Copy,
  RefreshCw,
  ExternalLink,
  Webhook,
  Zap,
  BarChart3,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

// Mock API data
const INITIAL_API_KEYS = {
  production: "pk_live_51NxKy7GH8sJd92kL3mN4oP5qR6sT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT",
  test: "pk_test_21AxKy7GH8sJd92kL3mN4oP5qR6sT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT",
  webhookUrl: "https://api.eureka.xyz/webhooks/events",
};

const INTEGRATION_STATUS = {
  googleAnalytics: { connected: true, trackingId: "G-XXXXXXXXXX" },
  mailchimp: { connected: true, lists: 3 },
  zapier: { connected: false },
  discord: { connected: true, server: "Eureka Events" },
  telegram: { connected: false },
};

export function APISettings() {
  const [apiKeys] = useState(INITIAL_API_KEYS);
  const [integrations, setIntegrations] = useState(INTEGRATION_STATUS);
  const [showProdKey, setShowProdKey] = useState(false);
  const [showTestKey, setShowTestKey] = useState(false);
  const [gaTracking, setGaTracking] = useState(true);
  const [gaEcommerce, setGaEcommerce] = useState(true);
  const [mailchimpSync, setMailchimpSync] = useState(true);
  const [discordNotifications, setDiscordNotifications] = useState({
    sales: true,
    checkins: true,
    lowStock: true,
  });
  const [regenerateOpen, setRegenerateOpen] = useState(false);
  const [keyToRegenerate, setKeyToRegenerate] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleRegenerateKey = async () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: `Regenerating ${keyToRegenerate} key...`,
        success: () => {
          setRegenerateOpen(false);
          return `${keyToRegenerate} key regenerated. Don't forget to update your applications.`;
        },
        error: "Failed to regenerate key",
      }
    );
  };

  const handleConnect = (service: string) => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: `Connecting to ${service}...`,
        success: () => {
          setIntegrations(prev => ({
            ...prev,
            [service.toLowerCase()]: { connected: true },
          }));
          return `Connected to ${service}`;
        },
        error: `Failed to connect to ${service}`,
      }
    );
  };

  const handleDisconnect = (service: string) => {
    setIntegrations(prev => ({
      ...prev,
      [service]: { connected: false },
    }));
    toast.info(`Disconnected from ${service}`);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    toast.success("API settings saved");
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">API & Integrations</h2>
        <p className="text-muted-foreground">
          Manage API keys, webhooks, and third-party integrations.
        </p>
      </div>

      <div className="grid gap-6">
        {/* API Keys */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" /> API Keys
            </CardTitle>
            <CardDescription>
              Use these keys to authenticate API requests. Keep them secret!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Production Key */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  Production Key
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Live</Badge>
                </Label>
                <Dialog open={regenerateOpen && keyToRegenerate === "production"} onOpenChange={(o) => {
                  if (!o) setRegenerateOpen(false);
                }}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setKeyToRegenerate("production");
                        setRegenerateOpen(true);
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" /> Regenerate
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Regenerate API Key?</DialogTitle>
                      <DialogDescription>
                        This will invalidate your current key. All applications using it will stop working until updated.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setRegenerateOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleRegenerateKey}>
                        Regenerate Key
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type={showProdKey ? "text" : "password"}
                    value={apiKeys.production}
                    readOnly
                    className="font-mono text-xs pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setShowProdKey(!showProdKey)}
                    >
                      {showProdKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => copyToClipboard(apiKeys.production, "Production key")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Key */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  Test Key
                  <Badge variant="secondary">Sandbox</Badge>
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setKeyToRegenerate("test");
                    setRegenerateOpen(true);
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-1" /> Regenerate
                </Button>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type={showTestKey ? "text" : "password"}
                    value={apiKeys.test}
                    readOnly
                    className="font-mono text-xs pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setShowTestKey(!showTestKey)}
                    >
                      {showTestKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => copyToClipboard(apiKeys.test, "Test key")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Webhook URL */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Webhook className="w-4 h-4" /> Webhook URL
              </Label>
              <div className="flex gap-2">
                <Input value={apiKeys.webhookUrl} readOnly className="font-mono text-xs" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(apiKeys.webhookUrl, "Webhook URL")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Rate Limit & Docs */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Rate Limit</p>
                <p className="text-sm text-muted-foreground">1,000 requests/hour</p>
              </div>
              <Button variant="outline" onClick={() => window.open("https://docs.eureka.xyz/api", "_blank")}>
                <ExternalLink className="w-4 h-4 mr-2" /> API Documentation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" /> Third-Party Integrations
            </CardTitle>
            <CardDescription>
              Connect with external services to extend functionality.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Analytics */}
            <div className="p-4 rounded-lg border space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Google Analytics</h4>
                    <p className="text-xs text-muted-foreground">Track website traffic and conversions</p>
                  </div>
                </div>
                {integrations.googleAnalytics.connected ? (
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                  </Badge>
                ) : (
                  <Button size="sm" onClick={() => handleConnect("Google Analytics")}>
                    Connect
                  </Button>
                )}
              </div>

              {integrations.googleAnalytics.connected && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>Tracking ID</Label>
                    <Input
                      value={integrations.googleAnalytics.trackingId}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Tracking</Label>
                      <p className="text-xs text-muted-foreground">Send pageviews and events</p>
                    </div>
                    <Switch
                      checked={gaTracking}
                      onCheckedChange={v => {
                        setGaTracking(v);
                        setHasChanges(true);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enhanced Ecommerce</Label>
                      <p className="text-xs text-muted-foreground">Track purchases, refunds, etc.</p>
                    </div>
                    <Switch
                      checked={gaEcommerce}
                      onCheckedChange={v => {
                        setGaEcommerce(v);
                        setHasChanges(true);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Mailchimp */}
            <div className="p-4 rounded-lg border space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Mailchimp</h4>
                    <p className="text-xs text-muted-foreground">Email marketing automation</p>
                  </div>
                </div>
                {integrations.mailchimp.connected ? (
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                  </Badge>
                ) : (
                  <Button size="sm" onClick={() => handleConnect("Mailchimp")}>
                    Connect
                  </Button>
                )}
              </div>

              {integrations.mailchimp.connected && (
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label>Sync Attendees</Label>
                    <p className="text-xs text-muted-foreground">
                      Auto-add ticket buyers to mailing list ({integrations.mailchimp.lists} lists)
                    </p>
                  </div>
                  <Switch
                    checked={mailchimpSync}
                    onCheckedChange={v => {
                      setMailchimpSync(v);
                      setHasChanges(true);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Zapier */}
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Zapier</h4>
                    <p className="text-xs text-muted-foreground">Connect 5,000+ apps</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => handleConnect("Zapier")}>
                  Connect
                </Button>
              </div>
              <div className="mt-4 p-3 rounded bg-muted/50">
                <p className="text-xs text-muted-foreground mb-2">Available Triggers:</p>
                <div className="flex flex-wrap gap-2">
                  {["New Ticket Sale", "Event Created", "Check-in", "Refund Issued"].map(trigger => (
                    <Badge key={trigger} variant="secondary" className="text-xs">
                      {trigger}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Discord */}
            <div className="p-4 rounded-lg border space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Discord</h4>
                    <p className="text-xs text-muted-foreground">
                      {integrations.discord.connected ? integrations.discord.server : "Send notifications to Discord"}
                    </p>
                  </div>
                </div>
                {integrations.discord.connected ? (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
                      onClick={() => handleDisconnect("discord")}
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" onClick={() => handleConnect("Discord")}>
                    Connect
                  </Button>
                )}
              </div>

              {integrations.discord.connected && (
                <div className="space-y-3 pt-2">
                  <Label>Notification Types</Label>
                  <div className="space-y-2">
                    {[
                      { key: "sales", label: "New Ticket Sales" },
                      { key: "checkins", label: "Check-ins" },
                      { key: "lowStock", label: "Low Ticket Stock Alerts" },
                    ].map(item => (
                      <div key={item.key} className="flex items-center gap-2">
                        <Checkbox
                          checked={discordNotifications[item.key as keyof typeof discordNotifications]}
                          onCheckedChange={v => {
                            setDiscordNotifications(prev => ({ ...prev, [item.key]: v }));
                            setHasChanges(true);
                          }}
                        />
                        <Label className="font-normal">{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Telegram */}
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Send className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Telegram</h4>
                    <p className="text-xs text-muted-foreground">Bot notifications</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => handleConnect("Telegram")}>
                  Connect
                </Button>
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
    </div>
  );
}
