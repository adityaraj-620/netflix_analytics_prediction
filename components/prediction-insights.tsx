"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, AlertCircle, Target, Users, DollarSign } from "lucide-react"

export default function PredictionInsights() {
  const insights = [
    {
      id: 1,
      type: "opportunity",
      icon: TrendingUp,
      title: "Sci-Fi Content Surge Expected",
      description:
        "Our models predict a 35% increase in sci-fi content demand over the next 6 months, driven by upcoming blockbuster releases.",
      impact: "High",
      confidence: 89,
      action: "Increase sci-fi content acquisition budget by 25%",
      color: "text-green-400 bg-green-900/20 border-green-700/30",
    },
    {
      id: 2,
      type: "warning",
      icon: AlertCircle,
      title: "Potential Churn Risk in Q2",
      description:
        "Elevated churn probability detected for subscribers aged 18-25, particularly in competitive markets.",
      impact: "Medium",
      confidence: 76,
      action: "Launch targeted retention campaign with personalized content recommendations",
      color: "text-yellow-400 bg-yellow-900/20 border-yellow-700/30",
    },
    {
      id: 3,
      type: "insight",
      icon: Users,
      title: "International Expansion Opportunity",
      description:
        "Southeast Asian markets show 67% higher engagement rates with local content compared to global average.",
      impact: "High",
      confidence: 92,
      action: "Accelerate local content production in Thailand, Vietnam, and Philippines",
      color: "text-blue-400 bg-blue-900/20 border-blue-700/30",
    },
    {
      id: 4,
      type: "revenue",
      icon: DollarSign,
      title: "Premium Tier Adoption Forecast",
      description:
        "4K/HDR viewing patterns suggest 23% of current subscribers likely to upgrade to premium tier within 3 months.",
      impact: "High",
      confidence: 84,
      action: "Implement targeted premium tier marketing campaign",
      color: "text-purple-400 bg-purple-900/20 border-purple-700/30",
    },
    {
      id: 5,
      type: "optimization",
      icon: Target,
      title: "Content Release Timing",
      description:
        "Friday releases show 18% higher initial viewership compared to other days, with peak engagement at 8 PM EST.",
      impact: "Medium",
      confidence: 91,
      action: "Adjust content release schedule to optimize for peak viewing windows",
      color: "text-cyan-400 bg-cyan-900/20 border-cyan-700/30",
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-600 hover:bg-red-700"
      case "Medium":
        return "bg-yellow-600 hover:bg-yellow-700"
      case "Low":
        return "bg-green-600 hover:bg-green-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI-Generated Insights & Recommendations
        </CardTitle>
        <CardDescription className="text-gray-400">
          Actionable insights derived from predictive analytics and machine learning models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => {
            const IconComponent = insight.icon
            return (
              <div key={insight.id} className={`p-4 rounded-lg border ${insight.color}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5" />
                    <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getImpactColor(insight.impact)}>{insight.impact} Impact</Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {insight.confidence}% Confidence
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-300 mb-3 leading-relaxed">{insight.description}</p>

                <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                  <div className="text-sm font-medium text-gray-400 mb-1">Recommended Action:</div>
                  <div className="text-white">{insight.action}</div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-400">Pro Tip</span>
          </div>
          <p className="text-gray-300 text-sm">
            These insights are updated in real-time based on the latest data patterns. Consider implementing
            high-confidence, high-impact recommendations first for maximum ROI.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
