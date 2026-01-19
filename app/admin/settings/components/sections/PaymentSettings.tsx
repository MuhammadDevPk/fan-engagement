"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

export function PaymentSettings() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Payment Configuration</h2>
        <p className="text-muted-foreground">Manage payment gateways, accepted tokens, and payout methods.</p>
      </div>
      
       <Card className="border-dashed">
            <CardHeader className="text-center pb-10">
                 <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Construction className="w-6 h-6 text-muted-foreground" />
                 </div>
                <CardTitle>Under Construction</CardTitle>
                <CardDescription>
                    This section is currently being implemented. Check back soon for Stripe and Crypto payment configurations.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-8">
                <Button variant="outline">Return to Dashboard</Button>
            </CardContent>
        </Card>
    </div>
  );
}
