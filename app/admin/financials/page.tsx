"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Download, FileText } from "lucide-react"
import { FinancialOverviewCards } from "../components/financials/FinancialOverviewCards"
import { RevenueChart } from "../components/financials/RevenueChart"
import { PaymentMethodsBreakdown } from "../components/financials/PaymentMethodsBreakdown"
import { TransactionsTable } from "../components/financials/TransactionsTable"

export default function FinancialsPage() {
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
            <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-gray-300 gap-2">
                <FileText className="w-4 h-4" />
                View Tax Docs
            </Button>
            <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-gray-300 gap-2">
                <Download className="w-4 h-4" />
                Export Financials
            </Button>
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20">
                Request Payout
            </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <FinancialOverviewCards />

      {/* Analytics Section */}
      {/* We use a grid here or stack them. RevenueChart inside expects column span, so we might want to wrap it or override its class */}
      {/* For this layout, we'll let RevenueChart take full width for clarity, and put Payment Breakdown below */}
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
