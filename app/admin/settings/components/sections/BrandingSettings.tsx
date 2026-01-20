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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Palette,
  Upload,
  Globe,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Link2,
  Shield,
  RefreshCw,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";

const INITIAL_BRANDING = {
  logoLight: "",
  logoDark: "",
  favicon: "",
  primaryColor: "#8B5CF6",
  secondaryColor: "#3B82F6",
  customDomain: "",
  domainVerified: false,
  sslStatus: "pending",
};

export function BrandingSettings() {
  const [branding, setBranding] = useState(INITIAL_BRANDING);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (key: string, value: any) => {
    setBranding(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    toast.success("Branding settings saved");
  };

  const handleVerifyDomain = async () => {
    if (!branding.customDomain) {
      toast.error("Please enter a domain first");
      return;
    }
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsVerifying(false);
    setBranding(prev => ({ ...prev, domainVerified: true, sslStatus: "active" }));
    toast.success("Domain verified successfully", {
      description: "SSL certificate has been provisioned.",
    });
    setHasChanges(true);
  };

  const handleUpload = (type: string) => {
    toast.info(`Upload ${type}`, {
      description: "File picker would open here",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Branding</h2>
        <p className="text-muted-foreground">
          Customize the look and feel of your event pages.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Visual Identity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" /> Visual Identity
            </CardTitle>
            <CardDescription>
              Upload logos and configure brand colors.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logos */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Light Logo */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Sun className="w-4 h-4" /> Logo (Light Mode)
                </Label>
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-white"
                  onClick={() => handleUpload("light logo")}
                >
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-600">Upload logo</p>
                  <p className="text-xs text-gray-400">PNG, SVG recommended</p>
                </div>
              </div>

              {/* Dark Logo */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Moon className="w-4 h-4" /> Logo (Dark Mode)
                </Label>
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-gray-900"
                  onClick={() => handleUpload("dark logo")}
                >
                  <Upload className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                  <p className="text-sm font-medium text-gray-300">Upload logo</p>
                  <p className="text-xs text-gray-500">PNG, SVG recommended</p>
                </div>
              </div>

              {/* Favicon */}
              <div className="space-y-3">
                <Label>Favicon</Label>
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => handleUpload("favicon")}
                >
                  <div className="w-12 h-12 mx-auto rounded-lg bg-muted flex items-center justify-center mb-2">
                    <span className="text-2xl">🎫</span>
                  </div>
                  <p className="text-sm font-medium">Upload favicon</p>
                  <p className="text-xs text-muted-foreground">32x32px ICO/PNG</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Colors */}
            <div className="space-y-4">
              <Label>Brand Colors</Label>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Primary Color */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Primary Color</span>
                    <span className="text-sm font-mono">{branding.primaryColor}</span>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={branding.primaryColor}
                      onChange={e => handleChange("primaryColor", e.target.value)}
                      className="w-12 h-12 rounded-lg border cursor-pointer"
                    />
                    <div className="flex-1 flex gap-2 items-center">
                      {["#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#3B82F6", "#EF4444"].map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-lg transition-all ${
                            branding.primaryColor === color ? "ring-2 ring-ring ring-offset-2" : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleChange("primaryColor", color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Secondary Color */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Secondary Color</span>
                    <span className="text-sm font-mono">{branding.secondaryColor}</span>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={branding.secondaryColor}
                      onChange={e => handleChange("secondaryColor", e.target.value)}
                      className="w-12 h-12 rounded-lg border cursor-pointer"
                    />
                    <div className="flex-1 flex gap-2 items-center">
                      {["#3B82F6", "#6366F1", "#8B5CF6", "#64748B", "#14B8A6", "#F97316"].map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-lg transition-all ${
                            branding.secondaryColor === color ? "ring-2 ring-ring ring-offset-2" : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleChange("secondaryColor", color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Preview */}
            <div className="space-y-3">
              <Label>Preview</Label>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Light Preview */}
                <div className="p-4 rounded-lg bg-white border">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: branding.primaryColor }} />
                    <span className="font-bold text-gray-900">Eureka Events</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 bg-gray-200 rounded" />
                    <div className="h-3 w-1/2 bg-gray-200 rounded" />
                  </div>
                  <button
                    className="mt-4 px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    Get Tickets
                  </button>
                </div>

                {/* Dark Preview */}
                <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: branding.primaryColor }} />
                    <span className="font-bold text-white">Eureka Events</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 bg-gray-700 rounded" />
                    <div className="h-3 w-1/2 bg-gray-700 rounded" />
                  </div>
                  <button
                    className="mt-4 px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    Get Tickets
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Domain */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" /> Custom Domain
            </CardTitle>
            <CardDescription>
              Use your own domain for event pages.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Domain</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    placeholder="tickets.yourbrand.com"
                    value={branding.customDomain}
                    onChange={e => handleChange("customDomain", e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={handleVerifyDomain}
                  disabled={isVerifying || !branding.customDomain}
                >
                  {isVerifying ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  <span className="ml-2">{isVerifying ? "Verifying..." : "Verify"}</span>
                </Button>
              </div>
            </div>

            {branding.customDomain && (
              <>
                <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                  <h4 className="font-medium">DNS Configuration</h4>
                  <p className="text-sm text-muted-foreground">
                    Add the following DNS records to your domain:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded bg-background border font-mono text-xs">
                      <span>CNAME</span>
                      <span>{branding.customDomain}</span>
                      <span>custom.eureka.xyz</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded bg-background border font-mono text-xs">
                      <span>TXT</span>
                      <span>_eureka</span>
                      <span>verify=abc123xyz</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Domain Status:</span>
                    {branding.domainVerified ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500/20">
                        <AlertCircle className="w-3 h-3 mr-1" /> Pending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">SSL:</span>
                    {branding.sslStatus === "active" ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        <Shield className="w-3 h-3 mr-1" /> Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500/20">
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Provisioning
                      </Badge>
                    )}
                  </div>
                </div>

                {branding.domainVerified && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Your event pages are live at:</span>
                    <a
                      href={`https://${branding.customDomain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium flex items-center gap-1 hover:underline"
                    >
                      https://{branding.customDomain}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </>
            )}
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
