"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, RefreshCw, X, ChevronRight, Lightbulb, TrendingUp, Clock, Zap } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Insight {
  id: string
  icon: React.ReactNode
  text: string
  type: 'success' | 'warning' | 'info' | 'tip'
  action?: string
}

const initialInsights: Insight[] = [
  {
    id: '1',
    icon: <Clock className="w-4 h-4" />,
    text: "Thursday 7 PM shows 34% higher sales - schedule more events during this time",
    type: 'success',
    action: 'Schedule Event'
  },
  {
    id: '2',
    icon: <TrendingUp className="w-4 h-4" />,
    text: "VIP tickets are selling 2x faster than last month - consider increasing VIP allocation",
    type: 'success',
    action: 'Adjust Tiers'
  },
  {
    id: '3',
    icon: <Zap className="w-4 h-4" />,
    text: "Mobile conversion up 15% after recent update - mobile-first strategy is working",
    type: 'info'
  },
  {
    id: '4',
    icon: <Lightbulb className="w-4 h-4" />,
    text: "Gas fees lowest between 2-4 AM UTC - deploy contracts during this window",
    type: 'tip',
    action: 'View Gas'
  },
  {
    id: '5',
    icon: <TrendingUp className="w-4 h-4" />,
    text: "Events priced $40-$60 show 28% higher conversion rate",
    type: 'success',
    action: 'Pricing Tips'
  },
]

export function QuickInsightsPanel() {
  const [insights, setInsights] = useState(initialInsights)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleDismiss = (id: string) => {
    setInsights(prev => prev.filter(i => i.id !== id))
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(r => setTimeout(r, 1500))
    setInsights(initialInsights) // Reset to show all insights
    setIsRefreshing(false)
  }

  const getTypeStyles = (type: Insight['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20 text-green-400'
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
      case 'info':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400'
      case 'tip':
        return 'bg-violet-500/10 border-violet-500/20 text-violet-400'
    }
  }

  return (
    <Card className="bg-gradient-to-br from-violet-500/10 to-blue-500/10 backdrop-blur-md border-white/10">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-violet-400" />
          🤖 AI Insights
        </CardTitle>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Analyzing...' : 'Refresh'}
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {insights.map((insight) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-start gap-3 p-3 rounded-xl border ${getTypeStyles(insight.type)} group`}
              >
                <div className="mt-0.5">{insight.icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-200 leading-relaxed">{insight.text}</p>
                  {insight.action && (
                    <button className="mt-2 text-xs flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                      {insight.action}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => handleDismiss(insight.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {insights.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">All insights reviewed!</p>
              <button 
                onClick={handleRefresh}
                className="mt-2 text-xs text-violet-400 hover:text-violet-300"
              >
                Generate new insights
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
          <span>Powered by AI analysis of your event data</span>
          <span className="text-gray-400">{insights.length} active insights</span>
        </div>
      </CardContent>
    </Card>
  )
}
