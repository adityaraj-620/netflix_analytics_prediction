"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

interface ViewershipData {
  date: string
  actual: number | null
  predicted: number
  confidence: number
  type: "historical" | "forecast"
}

export default function ViewershipPredictionChart() {
  const [data, setData] = useState<ViewershipData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/viewership-predictions")
      const result = await response.json()
      setData(result)
    }
    fetchData()
  }, [])

  const chartConfig = {
    actual: {
      label: "Actual Views (M)",
      color: "#dc2626",
    },
    predicted: {
      label: "Predicted Views (M)",
      color: "#8b5cf6",
    },
    confidence: {
      label: "Confidence Interval",
      color: "#6366f1",
    },
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              Viewership Prediction
            </CardTitle>
            <CardDescription className="text-gray-400">
              30-day viewership forecast with confidence intervals
            </CardDescription>
          </div>
          <Badge className="bg-purple-600 hover:bg-purple-700">LSTM Model</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ReferenceLine x="Today" stroke="#f59e0b" strokeDasharray="2 2" />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#dc2626"
                strokeWidth={2}
                dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="#6366f1"
                strokeWidth={1}
                strokeOpacity={0.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-gray-400">Historical Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-400">Predictions</span>
            </div>
          </div>
          <div className="text-gray-400">Accuracy: 94.2%</div>
        </div>
      </CardContent>
    </Card>
  )
}
