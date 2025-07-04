"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { Badge } from "@/components/ui/badge"
import { DollarSign } from "lucide-react"

interface RevenueData {
  quarter: string
  actualRevenue: number | null
  predictedRevenue: number
  subscribers: number
  confidence: number
}

export default function RevenueForecasting() {
  const [data, setData] = useState<RevenueData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/revenue-forecasting")
      const result = await response.json()
      setData(result)
    }
    fetchData()
  }, [])

  const chartConfig = {
    actualRevenue: {
      label: "Actual Revenue ($B)",
      color: "#dc2626",
    },
    predictedRevenue: {
      label: "Predicted Revenue ($B)",
      color: "#8b5cf6",
    },
    subscribers: {
      label: "Subscribers (M)",
      color: "#06b6d4",
    },
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Revenue Forecasting
            </CardTitle>
            <CardDescription className="text-gray-400">
              Quarterly revenue predictions with subscriber growth correlation
            </CardDescription>
          </div>
          <Badge className="bg-green-600 hover:bg-green-700">ARIMA Model</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="quarter" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ReferenceLine x="Q4 2024" stroke="#f59e0b" strokeDasharray="2 2" />
              <Bar dataKey="actualRevenue" fill="#dc2626" radius={[4, 4, 0, 0]} />
              <Bar dataKey="predictedRevenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} fillOpacity={0.7} />
              <Line
                type="monotone"
                dataKey="subscribers"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-3 bg-green-900/20 rounded-lg border border-green-700/30">
            <div className="text-green-400 text-sm font-medium">Predicted Q1 2025 Revenue</div>
            <div className="text-2xl font-bold text-white">$8.9B</div>
            <div className="text-xs text-gray-400">+12.3% YoY growth</div>
          </div>
          <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-700/30">
            <div className="text-blue-400 text-sm font-medium">Forecast Confidence</div>
            <div className="text-2xl font-bold text-white">92.7%</div>
            <div className="text-xs text-gray-400">Based on 5-year data</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
