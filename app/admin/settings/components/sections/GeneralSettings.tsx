"use client";

import React from "react";
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
import { Globe, Building2, Clock, CheckCircle2 } from "lucide-react";

export function GeneralSettings() {
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
              <Input id="orgName" placeholder="Eureka Events" defaultValue="Eureka Events" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Admin Email</Label>
                    <div className="relative">
                        <Input id="email" defaultValue="admin@eureka.xyz" />
                        <CheckCircle2 className="w-4 h-4 text-green-500 absolute right-3 top-3" />
                    </div>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+1 (555) 000-0000" />
                </div>
            </div>

             <div className="grid md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="utc">
                        <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                            <SelectItem value="est">EST (GMT-5)</SelectItem>
                            <SelectItem value="pst">PST (GMT-8)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label>Currency</Label>
                     <Select defaultValue="usd">
                        <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label>Language</Label>
                     <Select defaultValue="en">
                        <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
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
                 <div className="grid gap-2">
                    <Label>Default Capacity</Label>
                    <Input type="number" defaultValue="1000" />
                 </div>
                 <div className="grid gap-2">
                    <Label>Default Duration (Hours)</Label>
                     <Input type="number" defaultValue="2" />
                 </div>
             </div>

             <Separator />

             <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label className="text-base">Auto-publish Events</Label>
                    <p className="text-sm text-muted-foreground">Automatically publish events after creation</p>
                </div>
                <Switch />
             </div>
             
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label className="text-base">Require Approval</Label>
                    <p className="text-sm text-muted-foreground">Require admin approval for event edits</p>
                </div>
                <Switch defaultChecked />
             </div>

          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-4">
            <Button variant="outline">Discard</Button>
            <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
