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
import { Progress } from "@/components/ui/progress";
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
  Cloud,
  Database,
  Network,
  Plus,
  Zap,
  Blocks,
  Copy,
  ExternalLink,
  RefreshCw,
  Info,
  Loader2,
  XCircle,
  Settings2,
} from "lucide-react";

// Mock network data
const INITIAL_NETWORKS = [
  {
    id: "ethereum",
    name: "Ethereum Mainnet",
    emoji: "💎",
    enabled: true,
    status: "connected",
    rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    chainId: 1,
    gasMode: "Fast",
    blockExplorer: "https://etherscan.io",
  },
  {
    id: "polygon",
    name: "Polygon",
    emoji: "💜",
    enabled: false,
    status: "disconnected",
    rpcUrl: "https://polygon-rpc.com",
    chainId: 137,
    gasMode: "Standard",
    blockExplorer: "https://polygonscan.com",
  },
  {
    id: "bsc",
    name: "BNB Smart Chain",
    emoji: "🟡",
    enabled: true,
    status: "connected",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainId: 56,
    gasMode: "Standard",
    blockExplorer: "https://bscscan.com",
  },
  {
    id: "arbitrum",
    name: "Arbitrum One",
    emoji: "🔵",
    enabled: false,
    status: "disconnected",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    chainId: 42161,
    gasMode: "Standard",
    blockExplorer: "https://arbiscan.io",
  },
  {
    id: "base",
    name: "Base",
    emoji: "🔷",
    enabled: true,
    status: "connected",
    rpcUrl: "https://mainnet.base.org",
    chainId: 8453,
    gasMode: "Fast",
    blockExplorer: "https://basescan.org",
  },
];

// Contract settings initial state
const INITIAL_CONTRACT_SETTINGS = {
  defaultTemplate: "erc721a",
  autoDeploy: true,
  maxGasPrice: 50,
  confirmations: 2,
  verifyContracts: true,
};

// IPFS settings initial state
const INITIAL_IPFS_SETTINGS = {
  pinningService: "pinata",
  gatewayUrl: "https://gateway.pinata.cloud/ipfs/",
  apiKey: "pk_test_9a8b7c6d5e4f3g2h1i0j",
  storageUsed: 2.3,
  storageTotal: 10,
};

export function BlockchainSettings() {
  const [networks, setNetworks] = useState(INITIAL_NETWORKS);
  const [contractSettings, setContractSettings] = useState(INITIAL_CONTRACT_SETTINGS);
  const [ipfsSettings, setIpfsSettings] = useState(INITIAL_IPFS_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [addNetworkOpen, setAddNetworkOpen] = useState(false);
  const [newNetwork, setNewNetwork] = useState({
    name: "",
    rpcUrl: "",
    chainId: "",
    blockExplorer: "",
  });

  const toggleNetwork = (id: string) => {
    setNetworks(prev =>
      prev.map(n => (n.id === id ? { ...n, enabled: !n.enabled, status: !n.enabled ? "connected" : "disconnected" } : n))
    );
    setHasChanges(true);
  };

  const handleContractChange = (key: string, value: any) => {
    setContractSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleIpfsChange = (key: string, value: any) => {
    setIpfsSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    toast.success("Settings saved successfully", {
      description: "Your blockchain configuration has been updated.",
    });
  };

  const handleDiscard = () => {
    setNetworks(INITIAL_NETWORKS);
    setContractSettings(INITIAL_CONTRACT_SETTINGS);
    setIpfsSettings(INITIAL_IPFS_SETTINGS);
    setHasChanges(false);
    toast.info("Changes discarded", {
      description: "Settings have been reset to last saved state.",
    });
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTesting(false);
    toast.success("Connection successful", {
      description: "IPFS gateway is responding correctly.",
    });
  };

  const handleAddNetwork = () => {
    if (!newNetwork.name || !newNetwork.rpcUrl || !newNetwork.chainId) {
      toast.error("Missing required fields", {
        description: "Please fill in network name, RPC URL, and Chain ID.",
      });
      return;
    }

    const network = {
      id: newNetwork.name.toLowerCase().replace(/\s+/g, "-"),
      name: newNetwork.name,
      emoji: "🔗",
      enabled: false,
      status: "disconnected" as const,
      rpcUrl: newNetwork.rpcUrl,
      chainId: parseInt(newNetwork.chainId),
      gasMode: "Standard",
      blockExplorer: newNetwork.blockExplorer || "",
    };

    setNetworks(prev => [...prev, network]);
    setNewNetwork({ name: "", rpcUrl: "", chainId: "", blockExplorer: "" });
    setAddNetworkOpen(false);
    setHasChanges(true);
    toast.success("Network added", {
      description: `${network.name} has been added to your networks.`,
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const enabledCount = networks.filter(n => n.enabled).length;

  return (
    <TooltipProvider>
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header */}
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
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Network className="w-4 h-4" /> Supported Networks
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {enabledCount} active
                </Badge>
              </div>

              <Dialog open={addNetworkOpen} onOpenChange={setAddNetworkOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Add Custom Network
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Custom Network</DialogTitle>
                    <DialogDescription>
                      Add a custom EVM-compatible blockchain network.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Network Name *</Label>
                      <Input
                        placeholder="e.g., Optimism"
                        value={newNetwork.name}
                        onChange={e => setNewNetwork(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>RPC URL *</Label>
                      <Input
                        placeholder="https://..."
                        value={newNetwork.rpcUrl}
                        onChange={e => setNewNetwork(prev => ({ ...prev, rpcUrl: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Chain ID *</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 10"
                        value={newNetwork.chainId}
                        onChange={e => setNewNetwork(prev => ({ ...prev, chainId: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Block Explorer URL (Optional)</Label>
                      <Input
                        placeholder="https://..."
                        value={newNetwork.blockExplorer}
                        onChange={e => setNewNetwork(prev => ({ ...prev, blockExplorer: e.target.value }))}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddNetworkOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddNetwork}>Add Network</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {networks.map(network => (
                <Card
                  key={network.id}
                  className={
                    network.enabled
                      ? "border-primary/50 bg-primary/5 transition-all"
                      : "opacity-70 hover:opacity-100 transition-all"
                  }
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">
                          {network.emoji}
                        </div>
                        <CardTitle className="text-base">{network.name}</CardTitle>
                      </div>
                      <Switch
                        checked={network.enabled}
                        onCheckedChange={() => toggleNetwork(network.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      {network.enabled && network.status === "connected" ? (
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500 border-green-500/20 gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Connected
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Disabled
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">RPC URL</span>
                        <div className="flex gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                                onClick={() => copyToClipboard(network.rpcUrl, "RPC URL")}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy RPC URL</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="text-xs font-mono bg-muted p-1.5 rounded truncate">
                        {network.rpcUrl.slice(0, 35)}...
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Chain ID</span>
                      <span className="font-mono">{network.chainId}</span>
                    </div>
                    {network.enabled && (
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Gas Mode</span>
                        <span className="font-medium text-amber-500 flex items-center gap-1">
                          <Zap className="w-3 h-3" /> {network.gasMode}
                        </span>
                      </div>
                    )}
                    {network.blockExplorer && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs h-7 gap-1"
                        onClick={() => window.open(network.blockExplorer, "_blank")}
                      >
                        <ExternalLink className="w-3 h-3" /> View Explorer
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
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
                  <div className="flex items-center gap-2">
                    <Label>Default Contract Template</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          ERC-721A is gas-optimized for batch minting. ERC-1155 supports multiple token types.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={contractSettings.defaultTemplate}
                    onValueChange={v => handleContractChange("defaultTemplate", v)}
                  >
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
                    <p className="text-xs text-muted-foreground">
                      Automatically deploy contracts for new events
                    </p>
                  </div>
                  <Switch
                    checked={contractSettings.autoDeploy}
                    onCheckedChange={v => handleContractChange("autoDeploy", v)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Max Gas Price (Gwei)</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Transactions above this gas price will be queued.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      type="number"
                      value={contractSettings.maxGasPrice}
                      onChange={e => handleContractChange("maxGasPrice", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirmations</Label>
                    <Input
                      type="number"
                      value={contractSettings.confirmations}
                      onChange={e => handleContractChange("confirmations", parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Verify Contracts</Label>
                    <p className="text-xs text-muted-foreground">
                      Auto-submit source code to Etherscan
                    </p>
                  </div>
                  <Switch
                    checked={contractSettings.verifyContracts}
                    onCheckedChange={v => handleContractChange("verifyContracts", v)}
                  />
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
                  <Select
                    value={ipfsSettings.pinningService}
                    onValueChange={v => handleIpfsChange("pinningService", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pinata">Pinata</SelectItem>
                      <SelectItem value="nft.storage">NFT.Storage</SelectItem>
                      <SelectItem value="infura">Infura IPFS</SelectItem>
                      <SelectItem value="web3.storage">web3.storage</SelectItem>
                      <SelectItem value="custom">Custom Node</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Gateway URL</Label>
                  <Input
                    value={ipfsSettings.gatewayUrl}
                    onChange={e => handleIpfsChange("gatewayUrl", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input type="password" value={ipfsSettings.apiKey} readOnly className="pr-10" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => copyToClipboard(ipfsSettings.apiKey, "API Key")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button variant="outline" onClick={handleTestConnection} disabled={isTesting}>
                      {isTesting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                      <span className="ml-2">{isTesting ? "Testing..." : "Test"}</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Database className="w-3 h-3" /> Storage Usage
                    </span>
                    <span className="font-mono">
                      {ipfsSettings.storageUsed}GB / {ipfsSettings.storageTotal}GB
                    </span>
                  </div>
                  <Progress
                    value={(ipfsSettings.storageUsed / ipfsSettings.storageTotal) * 100}
                    className="h-2"
                  />
                  {ipfsSettings.storageUsed / ipfsSettings.storageTotal > 0.8 && (
                    <p className="text-xs text-amber-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Storage is running low. Consider upgrading.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

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
