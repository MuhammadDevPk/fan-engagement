"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Download, FileText } from "lucide-react"
import { toast } from "sonner"
import { FinancialOverviewCards } from "../components/financials/FinancialOverviewCards"
import { RevenueChart } from "../components/financials/RevenueChart"
import { PaymentMethodsBreakdown } from "../components/financials/PaymentMethodsBreakdown"
import { TransactionsTable } from "../components/financials/TransactionsTable"

export default function FinancialsPage() {
  const handleViewTaxDocs = () => {
    toast.info("Opening Tax Documents", {
      description: "Loading your 2025/2026 tax documentation..."
    });
  };

  const handleExportFinancials = () => {
    toast.success("Export Started", {
      description: "Your financial report is being generated as PDF...",
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss()
      }
    });
  };

  const handleRequestPayout = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Processing payout request...",
        success: "Payout request submitted! Funds will arrive in 2-3 business days.",
        error: "Failed to process payout request."
      }
    );
  };

  return (
    <div className="p-6 space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">💰 Revenue Management</h1>
          <p className="text-gray-400 mt-1">Track earnings, payouts, and financial performance</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-brand-secondary">
             <RefreshCw className="w-3 h-3" />
             <span>Last updated: Real-time</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="bg-white/5 border-white/10 hover:bg-white/10 text-gray-300 gap-2"
              onClick={handleViewTaxDocs}
            >
                <FileText className="w-4 h-4" />
                View Tax Docs
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/5 border-white/10 hover:bg-white/10 text-gray-300 gap-2"
              onClick={handleExportFinancials}
            >
                <Download className="w-4 h-4" />
                Export Financials
            </Button>
            <Button 
              className="bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20"
              onClick={handleRequestPayout}
            >
                Request Payout
            </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <FinancialOverviewCards />

      {/* Analytics Section */}
      <div className="grid grid-cols-12 gap-6">
         <div className="col-span-12">
             <RevenueChart />
         </div>
      </div>

      {/* Payment Methods Breakdown */}
      <PaymentMethodsBreakdown />

      {/* Detailed Transactions Table */}
      <TransactionsTable />
      
    </div>
  )
}

