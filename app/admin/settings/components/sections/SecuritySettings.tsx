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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Shield,
  UserPlus,
  Key,
  Smartphone,
  Download,
  Trash2,
  Edit,
  Clock,
  Globe,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  XCircle,
  Lock,
} from "lucide-react";

// Mock team data
const INITIAL_TEAM = [
  {
    id: "1",
    name: "Alex Chen",
    email: "alex@eureka.xyz",
    avatar: "",
    role: "owner",
    lastActive: "Just now",
    status: "online",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@eureka.xyz",
    avatar: "",
    role: "admin",
    lastActive: "2 hours ago",
    status: "online",
  },
  {
    id: "3",
    name: "Marcus Williams",
    email: "marcus@eureka.xyz",
    avatar: "",
    role: "manager",
    lastActive: "1 day ago",
    status: "offline",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@eureka.xyz",
    avatar: "",
    role: "viewer",
    lastActive: "3 days ago",
    status: "offline",
  },
];

const ROLE_PERMISSIONS = {
  owner: { create: true, edit: true, delete: true, analytics: true, settings: true, billing: true },
  admin: { create: true, edit: true, delete: true, analytics: true, settings: true, billing: false },
  manager: { create: true, edit: true, delete: false, analytics: true, settings: false, billing: false },
  viewer: { create: false, edit: false, delete: false, analytics: true, settings: false, billing: false },
};

const ACTIVITY_LOG = [
  { id: 1, action: "Login", user: "alex@eureka.xyz", ip: "192.168.1.1", location: "New York, US", time: "2 min ago" },
  { id: 2, action: "Settings updated", user: "sarah@eureka.xyz", ip: "10.0.0.45", location: "London, UK", time: "1 hour ago" },
  { id: 3, action: "Login", user: "marcus@eureka.xyz", ip: "172.16.0.12", location: "Berlin, DE", time: "1 day ago" },
  { id: 4, action: "Failed login attempt", user: "unknown", ip: "85.203.45.12", location: "Unknown", time: "2 days ago" },
  { id: 5, action: "Password changed", user: "alex@eureka.xyz", ip: "192.168.1.1", location: "New York, US", time: "5 days ago" },
];

export function SecuritySettings() {
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("4h");
  const [ipWhitelist, setIpWhitelist] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [newMember, setNewMember] = useState({ email: "", role: "viewer" });
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleRemoveMember = (id: string) => {
    const member = team.find(m => m.id === id);
    if (member?.role === "owner") {
      toast.error("Cannot remove owner");
      return;
    }
    setTeam(prev => prev.filter(m => m.id !== id));
    toast.success("Team member removed");
    setHasChanges(true);
  };

  const handleInvite = () => {
    if (!newMember.email) {
      toast.error("Please enter an email address");
      return;
    }
    
    const member = {
      id: String(Date.now()),
      name: newMember.email.split("@")[0],
      email: newMember.email,
      avatar: "",
      role: newMember.role,
      lastActive: "Pending invite",
      status: "pending" as const,
    };
    
    setTeam(prev => [...prev, member]);
    setNewMember({ email: "", role: "viewer" });
    setInviteOpen(false);
    toast.success("Invitation sent", {
      description: `Invite sent to ${member.email}`,
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    toast.success("Security settings saved");
  };

  const handleEnable2FA = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: "Setting up 2FA...",
        success: () => {
          setTwoFactorEnabled(true);
          setHasChanges(true);
          return "2FA enabled successfully";
        },
        error: "Failed to enable 2FA",
      }
    );
  };

  const handleDownloadBackupCodes = () => {
    toast.success("Backup codes downloaded", {
      description: "Store these codes in a safe place",
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "owner": return "default";
      case "admin": return "secondary";
      case "manager": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Security & Access</h2>
        <p className="text-muted-foreground">
          Configure 2FA, team roles, and view audit logs.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" /> Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!twoFactorEnabled ? (
              <div className="flex items-center justify-between p-4 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-200">2FA is not enabled</p>
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      Your account is less secure without 2FA
                    </p>
                  </div>
                </div>
                <Button onClick={handleEnable2FA}>
                  <Key className="w-4 h-4 mr-2" /> Enable 2FA
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">2FA is enabled</p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Your account is protected with authenticator app
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setTwoFactorEnabled(false)}>
                    Disable
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">QR Code</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Scan with authenticator app
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <h4 className="font-medium mb-2">Backup Codes</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Download backup codes in case you lose access to your authenticator.
                      </p>
                      <Button variant="outline" onClick={handleDownloadBackupCodes}>
                        <Download className="w-4 h-4 mr-2" /> Download Codes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Team Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Team Management
                </CardTitle>
                <CardDescription>
                  Manage team members and their access levels.
                </CardDescription>
              </div>
              <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <UserPlus className="w-4 h-4 mr-2" /> Invite Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Team Member</DialogTitle>
                    <DialogDescription>
                      Send an invitation to join your organization.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input
                        type="email"
                        placeholder="colleague@company.com"
                        value={newMember.email}
                        onChange={e => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Select
                        value={newMember.role}
                        onValueChange={v => setNewMember(prev => ({ ...prev, role: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setInviteOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleInvite}>Send Invite</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {team.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background ${
                              member.status === "online"
                                ? "bg-green-500"
                                : member.status === "pending"
                                ? "bg-amber-500"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(member.role)} className="capitalize">
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {member.lastActive}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                          onClick={() => handleRemoveMember(member.id)}
                          disabled={member.role === "owner"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Role Permissions Matrix */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" /> Role Permissions
            </CardTitle>
            <CardDescription>
              Permission levels for each role.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission</TableHead>
                  <TableHead className="text-center">Owner</TableHead>
                  <TableHead className="text-center">Admin</TableHead>
                  <TableHead className="text-center">Manager</TableHead>
                  <TableHead className="text-center">Viewer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { key: "create", label: "Create Events" },
                  { key: "edit", label: "Edit Events" },
                  { key: "delete", label: "Delete Events" },
                  { key: "analytics", label: "View Analytics" },
                  { key: "settings", label: "Manage Settings" },
                  { key: "billing", label: "Access Billing" },
                ].map(permission => (
                  <TableRow key={permission.key}>
                    <TableCell>{permission.label}</TableCell>
                    {["owner", "admin", "manager", "viewer"].map(role => (
                      <TableCell key={role} className="text-center">
                        {ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS][permission.key as keyof typeof ROLE_PERMISSIONS.owner] ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Login Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" /> Login Security
            </CardTitle>
            <CardDescription>
              Session timeout and IP restrictions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <Select
                  value={sessionTimeout}
                  onValueChange={v => {
                    setSessionTimeout(v);
                    setHasChanges(true);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30m">30 minutes</SelectItem>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="4h">4 hours</SelectItem>
                    <SelectItem value="24h">24 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Allowed IP Addresses (Whitelist)</Label>
                <Input
                  placeholder="e.g., 192.168.1.0/24, 10.0.0.1"
                  value={ipWhitelist}
                  onChange={e => {
                    setIpWhitelist(e.target.value);
                    setHasChanges(true);
                  }}
                />
              </div>
            </div>

            <Separator />

            {/* Activity Log */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Globe className="w-4 h-4" /> Recent Activity
              </Label>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ACTIVITY_LOG.map(log => (
                      <TableRow key={log.id}>
                        <TableCell className={log.action.includes("Failed") ? "text-red-500" : ""}>
                          {log.action}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{log.user}</TableCell>
                        <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                        <TableCell className="text-muted-foreground">{log.location}</TableCell>
                        <TableCell className="text-muted-foreground">{log.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Bar */}
        {hasChanges && (
          <div className="sticky bottom-4 flex justify-end gap-4 p-4 rounded-lg border bg-background/95 backdrop-blur shadow-lg animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 text-sm text-yellow-600 mr-auto">
              <AlertTriangle className="w-4 h-4" />
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
