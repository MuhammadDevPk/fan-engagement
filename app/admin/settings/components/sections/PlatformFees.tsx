"use client";

import React, { useState, useMemo } from "react";
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
  Calculator,
  Receipt,
  CreditCard,
  Zap,
  TrendingUp,
  Check,
  Crown,
  ExternalLink,
  DollarSign,
  Percent,
} from "lucide-react";

// Pricing plans
const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    period: "forever",
    features: [
      "Up to 3 events/month",
      "100 tickets per event",
      "Basic analytics",
      "Email support",
    ],
    platformFee: 15,
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    period: "/month",
    features: [
      "Unlimited events",
      "Unlimited tickets",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
      "API access",
    ],
    platformFee: 10,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    period: "/month",
    features: [
      "Everything in Pro",
      "White-label solution",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "Volume discounts",
    ],
    platformFee: 5,
  },
];

const BILLING_HISTORY = [
  { id: 1, date: "Jan 15, 2026", description: "Pro Plan - Monthly", amount: 49.00, status: "paid" },
  { id: 2, date: "Dec 15, 2025", description: "Pro Plan - Monthly", amount: 49.00, status: "paid" },
  { id: 3, date: "Nov 15, 2025", description: "Pro Plan - Monthly", amount: 49.00, status: "paid" },
  { id: 4, date: "Oct 15, 2025", description: "Pro Plan - Monthly", amount: 49.00, status: "paid" },
];

export function PlatformFees() {
  const [ticketPrice, setTicketPrice] = useState(100);
  const [quantity, setQuantity] = useState(10);
  const [currentPlan] = useState("pro");

  const currentPlanData = PRICING_PLANS.find(p => p.id === currentPlan);
  const platformFeePercent = currentPlanData?.platformFee || 10;

  // Calculate fees
  const calculations = useMemo(() => {
    const subtotal = ticketPrice * quantity;
    const platformFee = subtotal * (platformFeePercent / 100);
    const paymentProcessing = subtotal * 0.029 + 0.30 * quantity; // Standard 2.9% + $0.30
    const gasEstimate = 0.002 * quantity; // ETH per ticket
    const gasEstimateUsd = gasEstimate * 2500; // Assuming $2500 ETH price
    const totalCost = subtotal + platformFee + paymentProcessing;
    const netRevenue = subtotal - platformFee - paymentProcessing;

    return {
      subtotal,
      platformFee,
      paymentProcessing,
      gasEstimate,
      gasEstimateUsd,
      totalCost,
      netRevenue,
    };
  }, [ticketPrice, quantity, platformFeePercent]);

  const handleUpgrade = (planId: string) => {
    toast.success(`Upgraded to ${planId}`, {
      description: "Your billing will be updated on the next cycle.",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Platform Fees</h2>
        <p className="text-muted-foreground">
          View and manage platform usage fees and billing.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Fee Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Fee Calculator
            </CardTitle>
            <CardDescription>
              Estimate your fees and net revenue for ticket sales.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Ticket Price ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      className="pl-10"
                      value={ticketPrice}
                      onChange={e => setTicketPrice(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Percent className="w-4 h-4" />
                    <span>Platform fee rate: <strong className="text-foreground">{platformFeePercent}%</strong> ({currentPlanData?.name} plan)</span>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="p-4 rounded-lg border bg-card space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Receipt className="w-4 h-4" /> Fee Breakdown
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${calculations.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <span>Platform Fee ({platformFeePercent}%)</span>
                    <span>-${calculations.platformFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <span>Payment Processing (2.9% + $0.30)</span>
                    <span>-${calculations.paymentProcessing.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Est. Gas (~{calculations.gasEstimate.toFixed(4)} ETH)
                    </span>
                    <span>~${calculations.gasEstimateUsd.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between pt-2">
                    <span className="text-muted-foreground">Total Cost to Buyer</span>
                    <span className="font-medium">${calculations.totalCost.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Your Net Revenue</p>
                      <p className="text-2xl font-bold text-primary">
                        ${calculations.netRevenue.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Per Ticket</p>
                      <p className="text-lg font-semibold">
                        ${(calculations.netRevenue / quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5" /> Pricing Plans
            </CardTitle>
            <CardDescription>
              Choose the plan that best fits your needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {PRICING_PLANS.map(plan => (
                <div
                  key={plan.id}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    plan.id === currentPlan
                      ? "border-primary bg-primary/5"
                      : plan.popular
                      ? "border-primary/50"
                      : "border-muted hover:border-muted-foreground/50"
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  {plan.id === currentPlan && (
                    <Badge variant="outline" className="absolute -top-2.5 right-4 bg-background">
                      Current Plan
                    </Badge>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {plan.platformFee}% platform fee
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.id === currentPlan ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : plan.id === "enterprise" ? (
                    <Button variant="outline" className="w-full" onClick={() => toast.info("Contact sales for Enterprise pricing")}>
                      Contact Sales
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleUpgrade(plan.id)}
                    >
                      {plan.price > (currentPlanData?.price || 0) ? "Upgrade" : "Downgrade"}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Billing History
                </CardTitle>
                <CardDescription>
                  View your past invoices and payments.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" /> Manage Billing
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium">Date</th>
                    <th className="text-left p-3 text-sm font-medium">Description</th>
                    <th className="text-right p-3 text-sm font-medium">Amount</th>
                    <th className="text-right p-3 text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {BILLING_HISTORY.map(item => (
                    <tr key={item.id} className="border-t">
                      <td className="p-3 text-sm text-muted-foreground">{item.date}</td>
                      <td className="p-3 text-sm">{item.description}</td>
                      <td className="p-3 text-sm text-right font-medium">${item.amount.toFixed(2)}</td>
                      <td className="p-3 text-right">
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 capitalize">
                          {item.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">$42,350</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Platform Fees YTD</p>
                  <p className="text-2xl font-bold">$4,235</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Net Earnings</p>
                  <p className="text-2xl font-bold">$38,115</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
