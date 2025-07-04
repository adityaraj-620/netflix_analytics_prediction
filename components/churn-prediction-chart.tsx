"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

interface ChurnData {
  month: string
  churnRate: number
  predictedChurn: number
  riskLevel: "Low" | "Medium" | "High"
}

export default function ChurnPredictionChart() {
  const [data, setData] = useState<ChurnData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/churn-predictions")
      const result = await response.json()
      setData(result)
    }
    fetchData()
  }, [])

  const chartConfig = {
    churnRate: {
      label: "Historical Churn Rate (%)",
      color: "#dc2626",
    },
    predictedChurn: {
      label: "Predicted Churn Rate (%)",
      color: "#f59e0b",
    },
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Churn Rate Prediction
            </CardTitle>
            <CardDescription className="text-gray-400">Customer churn forecasting and risk assessment</CardDescription>
          </div>
          <Badge className="bg-orange-600 hover:bg-orange-700">Random Forest</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="churnRate" stackId="1" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} />
              <Area
                type="monotone"
                dataKey="predictedChurn"
                stackId="2"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.4}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-green-900/20 rounded-lg border border-green-700/30">
            <div className="text-green-400 font-semibold">Low Risk</div>
            <div className="text-2xl font-bold text-white">68%</div>
            <div className="text-xs text-gray-400">of subscribers</div>
          </div>
          <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
            <div className="text-yellow-400 font-semibold">Medium Risk</div>
            <div className="text-2xl font-bold text-white">24%</div>
            <div className="text-xs text-gray-400">of subscribers</div>
          </div>
          <div className="p-3 bg-red-900/20 rounded-lg border border-red-700/30">
            <div className="text-red-400 font-semibold">High Risk</div>
            <div className="text-2xl font-bold text-white">8%</div>
            <div className="text-xs text-gray-400">of subscribers</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
