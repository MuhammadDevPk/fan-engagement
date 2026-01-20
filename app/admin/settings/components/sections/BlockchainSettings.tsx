"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, Cloud, Database, Network, Plus, Zap, Blocks } from "lucide-react";

export function BlockchainSettings() {
  const [networks, setNetworks] = useState({
    ethereum: true,
    polygon: false,
    bsc: true,
  });

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Blockchain & Networks</h2>
        <p className="text-muted-foreground">
          Manage supported chains, smart contracts, and decentralized storage.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Supported Networks Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Network className="w-4 h-4" /> Supported Networks
            </h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> Add Custom Network
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Ethereum Card */}
            <Card className={networks.ethereum ? "border-primary/50 bg-primary/5" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">
                      💎
                    </div>
                    <CardTitle className="text-base">Ethereum</CardTitle>
                  </div>
                  <Switch
                    checked={networks.ethereum}
                    onCheckedChange={(c) => setNetworks({ ...networks, ethereum: c })}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Connected
                  </Badge>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">RPC URL</span>
                  <div className="text-xs font-mono bg-muted p-1.5 rounded truncate">
                    https://mainnet.infura.io/v3/9aa...
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Gas Mode</span>
                    <span className="font-medium text-amber-500 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Fast
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Polygon Card */}
            <Card className={networks.polygon ? "border-primary/50 bg-primary/5" : "opacity-80"}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">
                      💜
                    </div>
                    <CardTitle className="text-base">Polygon</CardTitle>
                  </div>
                  <Switch
                    checked={networks.polygon}
                    onCheckedChange={(c) => setNetworks({ ...networks, polygon: c })}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  {networks.polygon ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      Disabled
                    </Badge>
                  )}
                </div>
                <div className="space-y-1">
                   <span className="text-xs text-muted-foreground">RPC URL</span>
                   <div className="text-xs font-mono bg-muted p-1.5 rounded truncate text-muted-foreground">
                     https://polygon-rpc.com
                   </div>
                </div>
              </CardContent>
            </Card>

            {/* BSC Card */}
            <Card className={networks.bsc ? "border-primary/50 bg-primary/5" : "opacity-80"}>
              <CardHeader className="pb-3">
                 <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">
                      🟡
                    </div>
                    <CardTitle className="text-base">BSC</CardTitle>
                  </div>
                  <Switch
                    checked={networks.bsc}
                    onCheckedChange={(c) => setNetworks({ ...networks, bsc: c })}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-3">
                 <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Connected
                  </Badge>
                </div>
                  <div className="space-y-1">
                   <span className="text-xs text-muted-foreground">RPC URL</span>
                   <div className="text-xs font-mono bg-muted p-1.5 rounded truncate">
                     https://bsc-dataseed.binance.org/
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
            {/* Smart Contract Settings */}
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Blocks className="w-5 h-5" /> Smart Contract Settings
                    </CardTitle>
                    <CardDescription>Configure global contract parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Default Contract Template</Label>
                        <Select defaultValue="erc721a">
                            <SelectTrigger>
                                <SelectValue placeholder="Select template" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="erc721">ERC-721 Standard</SelectItem>
                                <SelectItem value="erc721a">ERC-721A (Gas Optimized)</SelectItem>
                                <SelectItem value="erc1155">ERC-1155 Multi-Token</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between">
                         <div className="space-y-0.5">
                            <Label className="text-base">Auto-deploy</Label>
                            <p className="text-xs text-muted-foreground">Automatically deploy contracts for new events</p>
                         </div>
                         <Switch defaultChecked />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Max Gas Price (Gwei)</Label>
                            <Input type="number" defaultValue="50" />
                        </div>
                        <div className="space-y-2">
                             <Label>Confirmations</Label>
                             <Input type="number" defaultValue="2" />
                        </div>
                    </div>

                     <div className="flex items-center justify-between pt-2">
                         <div className="space-y-0.5">
                            <Label className="text-base">Verify Contracts</Label>
                            <p className="text-xs text-muted-foreground">Auto-submit source code to Etherscan</p>
                         </div>
                         <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            {/* IPFS Configuration */}
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Cloud className="w-5 h-5" /> IPFS Storage
                    </CardTitle>
                    <CardDescription>Decentralized media storage configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label>Pinning Service</Label>
                        <Select defaultValue="pinata">
                            <SelectTrigger>
                                <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pinata">Pinata</SelectItem>
                                <SelectItem value="nft.storage">NFT.Storage</SelectItem>
                                <SelectItem value="infura">Infura IPFS</SelectItem>
                                <SelectItem value="custom">Custom Node</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                     <div className="space-y-2">
                        <Label>Gateway URL</Label>
                        <Input defaultValue="https://gateway.pinata.cloud/ipfs/" />
                    </div>

                    <div className="space-y-2">
                        <Label>API Key</Label>
                        <div className="flex gap-2">
                             <Input type="password" value="pk_test_123456789" readOnly />
                             <Button variant="outline">Test</Button>
                        </div>
                    </div>

                    <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <Database className="w-3 h-3" /> Storage Usage
                            </span>
                            <span className="font-mono">2.3GB / 10GB</span>
                        </div>
                        <Progress value={23} className="h-2" />
                    </div>
                </CardContent>
            </Card>
        </div>
        
        {/* Save Bar */}
        <div className="sticky bottom-4 flex justify-end gap-4 p-4 rounded-lg border bg-background/80 backdrop-blur shadow-lg mt-4">
             <div className="flex items-center gap-2 text-sm text-yellow-600 mr-auto">
                <AlertCircle className="w-4 h-4" />
                <span>You have unsaved changes</span>
             </div>
             <Button variant="outline">Discard</Button>
             <Button>Save Changes</Button>
        </div>

      </div>
    </div>
  );
}
