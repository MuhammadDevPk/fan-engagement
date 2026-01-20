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
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Wallet,
  DollarSign,
  Bitcoin,
  Copy,
  ExternalLink,
  RefreshCw,
  Info,
  Loader2,
  QrCode,
  Calculator,
} from "lucide-react";

// Mock payment data
const CRYPTO_TOKENS = [
  { id: "eth", name: "Ethereum", symbol: "ETH", enabled: true },
  { id: "usdc", name: "USD Coin", symbol: "USDC", enabled: true },
  { id: "dai", name: "Dai", symbol: "DAI", enabled: false },
  { id: "matic", name: "Polygon", symbol: "MATIC", enabled: true },
  { id: "usdt", name: "Tether", symbol: "USDT", enabled: false },
];

const INITIAL_PAYMENT_SETTINGS = {
  payoutWallet: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  autoConvertUsd: false,
  minTransaction: 5,
  stripeApiKey: "sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  stripeWebhook: "https://api.eureka.xyz/webhooks/stripe",
  stripeStatus: "active",
  platformFee: 10,
  fixedFee: 0.30,
  resaleRoyalty: 5,
};

export function PaymentSettings() {
  const [tokens, setTokens] = useState(CRYPTO_TOKENS);
  const [settings, setSettings] = useState(INITIAL_PAYMENT_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const toggleToken = (id: string) => {
    setTokens(prev =>
      prev.map(t => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
    setHasChanges(true);
  };

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    toast.success("Payment settings saved", {
      description: "Your payment configuration has been updated.",
    });
  };

  const handleDiscard = () => {
    setTokens(CRYPTO_TOKENS);
    setSettings(INITIAL_PAYMENT_SETTINGS);
    setHasChanges(false);
    toast.info("Changes discarded");
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleReconnectStripe = async () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: "Reconnecting to Stripe...",
        success: "Stripe connection refreshed",
        error: "Failed to connect",
      }
    );
  };

  // Fee calculation preview
  const ticketPrice = 100;
  const quantity = 10;
  const subtotal = ticketPrice * quantity;
  const platformFeeAmount = subtotal * (settings.platformFee / 100);
  const processingFee = subtotal * 0.029 + 0.30 * quantity;
  const gasEstimate = 0.002;
  const totalCost = subtotal + platformFeeAmount + processingFee;
  const netRevenue = subtotal - platformFeeAmount - processingFee;

  return (
    <TooltipProvider>
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payment Configuration</h2>
          <p className="text-muted-foreground">
            Manage payment gateways, accepted tokens, and payout methods.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Crypto Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bitcoin className="w-5 h-5" /> Crypto Payments
              </CardTitle>
              <CardDescription>
                Configure accepted cryptocurrency tokens and payout wallet.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Accepted Tokens */}
              <div className="space-y-4">
                <Label>Accepted Tokens</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {tokens.map(token => (
                    <button
                      key={token.id}
                      onClick={() => toggleToken(token.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                        token.enabled
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-muted-foreground/50"
                      }`}
                    >
                      <span className="text-lg font-bold">{token.symbol}</span>
                      <span className="text-xs text-muted-foreground">{token.name}</span>
                      {token.enabled && (
                        <Badge variant="secondary" className="text-[10px]">
                          Active
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Payout Wallet */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label>Wallet Address for Payouts</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Crypto payments will be sent to this address
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Wallet className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      className="pl-10 font-mono text-sm"
                      value={settings.payoutWallet}
                      onChange={e => handleChange("payoutWallet", e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(settings.payoutWallet, "Wallet address")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowQr(!showQr)}
                  >
                    <QrCode className="w-4 h-4" />
                  </Button>
                </div>
                {showQr && (
                  <div className="flex justify-center p-4 bg-white rounded-lg">
                    <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      QR Code
                    </div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-convert to USD</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically convert crypto to stablecoin
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoConvertUsd}
                    onCheckedChange={v => handleChange("autoConvertUsd", v)}
                  />
                </div>
                <div className="space-y-2 p-4 rounded-lg border">
                  <Label>Minimum Transaction ($)</Label>
                  <Input
                    type="number"
                    value={settings.minTransaction}
                    onChange={e => handleChange("minTransaction", parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fiat Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Fiat Payments
              </CardTitle>
              <CardDescription>
                Configure credit card and traditional payment methods.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stripe */}
              <div className="p-4 rounded-lg border space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#635BFF] flex items-center justify-center">
                      <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Stripe</h4>
                      <p className="text-xs text-muted-foreground">Credit card processing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-500 border-green-500/20"
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                    </Badge>
                    <Button variant="outline" size="sm" onClick={handleReconnectStripe}>
                      <RefreshCw className="w-4 h-4 mr-2" /> Reconnect
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <Input type="password" value={settings.stripeApiKey} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Webhook URL</Label>
                    <div className="flex gap-2">
                      <Input value={settings.stripeWebhook} readOnly />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(settings.stripeWebhook, "Webhook URL")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* PayPal Coming Soon */}
              <div className="p-4 rounded-lg border border-dashed opacity-60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#003087] flex items-center justify-center">
                      <span className="text-white font-bold text-sm">P</span>
                    </div>
                    <div>
                      <h4 className="font-medium">PayPal</h4>
                      <p className="text-xs text-muted-foreground">Alternative payment method</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fee Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" /> Fee Structure
              </CardTitle>
              <CardDescription>
                Configure platform fees and royalties.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Platform Fee</Label>
                    <span className="text-sm font-medium">{settings.platformFee}%</span>
                  </div>
                  <Slider
                    value={[settings.platformFee]}
                    onValueChange={v => handleChange("platformFee", v[0])}
                    max={15}
                    step={0.5}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Fixed Fee per Ticket</Label>
                    <span className="text-sm font-medium">${settings.fixedFee}</span>
                  </div>
                  <Slider
                    value={[settings.fixedFee]}
                    onValueChange={v => handleChange("fixedFee", v[0])}
                    max={2}
                    step={0.05}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Royalty on Resales</Label>
                    <span className="text-sm font-medium">{settings.resaleRoyalty}%</span>
                  </div>
                  <Slider
                    value={[settings.resaleRoyalty]}
                    onValueChange={v => handleChange("resaleRoyalty", v[0])}
                    max={10}
                    step={0.5}
                  />
                </div>
              </div>

              <Separator />

              {/* Preview Calculation */}
              <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Fee Preview (10 tickets @ $100)
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform Fee ({settings.platformFee}%)</span>
                      <span className="text-red-500">-${platformFeeAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing (2.9% + $0.30)</span>
                      <span className="text-red-500">-${processingFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Gas</span>
                      <span className="text-muted-foreground">~{gasEstimate} ETH</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-xs text-muted-foreground">Your Net Revenue</span>
                    <span className="text-2xl font-bold text-primary">${netRevenue.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground">per {quantity} tickets sold</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Bar */}
          {hasChanges && (
            <div className="sticky bottom-4 flex justify-end gap-4 p-4 rounded-lg border bg-background/95 backdrop-blur shadow-lg mt-4 animate-in slide-in-from-bottom-4">
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
    </TooltipProvider>
  );
}
