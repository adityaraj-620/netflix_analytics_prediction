"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { DollarSign, Loader2 } from "lucide-react"

interface RevenueInputs {
  region: string
  subscriberBase: string
  avgSubscriptionPrice: string
  churnRate: string
  acquisitionCost: string
  contentBudget: string
  marketingSpend: string
  seasonality: string
}

interface RevenueResult {
  monthlyRevenue: number
  annualRevenue: number
  profitMargin: number
  breakEvenPoint: number
  revenueBreakdown: { category: string; amount: number }[]
  projections: { month: string; revenue: number }[]
}

export default function RevenuePredictor({ onPrediction }: { onPrediction: (prediction: any) => void }) {
  const [inputs, setInputs] = useState<RevenueInputs>({
    region: "",
    subscriberBase: "",
    avgSubscriptionPrice: "",
    churnRate: "",
    acquisitionCost: "",
    contentBudget: "",
    marketingSpend: "",
    seasonality: "",
  })
  const [prediction, setPrediction] = useState<RevenueResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof RevenueInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handlePredict = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/predict-revenue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      })
      const result = await response.json()
      setPrediction(result)

      onPrediction({
        type: "Revenue",
        result: `$${(result.monthlyRevenue / 1000000).toFixed(1)}M monthly, ${result.profitMargin.toFixed(1)}% margin`,
        timestamp: new Date().toLocaleTimeString(),
        confidence: 90,
      })
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = Object.values(inputs).every((value) => value !== "")

  const chartConfig = {
    revenue: {
      label: "Revenue ($M)",
      color: "#dc2626",
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Form */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            Revenue Prediction
          </CardTitle>
          <CardDescription className="text-gray-400">Enter market parameters to forecast revenue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region" className="text-gray-300">
                Region
              </Label>
              <Select onValueChange={(value) => handleInputChange("region", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                  <SelectItem value="latin-america">Latin America</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subscriberBase" className="text-gray-300">
                Subscriber Base (M)
              </Label>
              <Input
                id="subscriberBase"
                type="number"
                min="0"
                placeholder="e.g., 50"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("subscriberBase", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avgSubscriptionPrice" className="text-gray-300">
                Avg Subscription Price ($)
              </Label>
              <Input
                id="avgSubscriptionPrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 15.99"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("avgSubscriptionPrice", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="churnRate" className="text-gray-300">
                Monthly Churn Rate (%)
              </Label>
              <Input
                id="churnRate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                placeholder="e.g., 2.5"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("churnRate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="acquisitionCost" className="text-gray-300">
                Customer Acquisition Cost ($)
              </Label>
              <Input
                id="acquisitionCost"
                type="number"
                min="0"
                placeholder="e.g., 45"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("acquisitionCost", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contentBudget" className="text-gray-300">
                Monthly Content Budget ($M)
              </Label>
              <Input
                id="contentBudget"
                type="number"
                min="0"
                placeholder="e.g., 500"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("contentBudget", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketingSpend" className="text-gray-300">
                Monthly Marketing Spend ($M)
              </Label>
              <Input
                id="marketingSpend"
                type="number"
                min="0"
                placeholder="e.g., 200"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("marketingSpend", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seasonality" className="text-gray-300">
                Seasonality Factor
              </Label>
              <Select onValueChange={(value) => handleInputChange("seasonality", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select factor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (Holiday Season)</SelectItem>
                  <SelectItem value="medium">Medium (Regular)</SelectItem>
                  <SelectItem value="low">Low (Off-Season)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handlePredict}
            disabled={!isFormValid || isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <DollarSign className="h-4 w-4 mr-2" />
                Predict Revenue
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Revenue Forecast</CardTitle>
          <CardDescription className="text-gray-400">Financial projections based on your parameters</CardDescription>
        </CardHeader>
        <CardContent>
          {prediction ? (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-700/30">
                  <div className="text-2xl font-bold text-white">
                    ${(prediction.monthlyRevenue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-green-400 text-sm">Monthly Revenue</div>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                  <div className="text-2xl font-bold text-white">
                    ${(prediction.annualRevenue / 1000000000).toFixed(1)}B
                  </div>
                  <div className="text-blue-400 text-sm">Annual Revenue</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-700/30">
                  <div className="text-2xl font-bold text-white">{prediction.profitMargin.toFixed(1)}%</div>
                  <div className="text-purple-400 text-sm">Profit Margin</div>
                </div>
                <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-700/30">
                  <div className="text-2xl font-bold text-white">{prediction.breakEvenPoint}</div>
                  <div className="text-orange-400 text-sm">Break-even (months)</div>
                </div>
              </div>

              {/* Revenue Breakdown */}
              <div>
                <h4 className="text-white font-medium mb-3">Revenue Breakdown</h4>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={prediction.revenueBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="category" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="amount" fill="#dc2626" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              {/* 12-Month Projections */}
              <div>
                <h4 className="text-white font-medium mb-3">12-Month Revenue Projection</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {prediction.projections.map((proj, index) => (
                    <div key={index} className="p-2 bg-gray-800/50 rounded text-center">
                      <div className="text-gray-400">{proj.month}</div>
                      <div className="text-white font-medium">${(proj.revenue / 1000000).toFixed(0)}M</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Enter market parameters and click "Predict Revenue" to see forecast</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
