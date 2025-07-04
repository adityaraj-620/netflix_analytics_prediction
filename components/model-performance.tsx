"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Gauge, Activity } from "lucide-react"

interface PerformanceMetric {
  model: string
  accuracy: number
  precision: number
  recall: number
  f1: number
}

export default function ModelPerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/model-performance")
      const data = await res.json()
      setMetrics(data)
    }
    fetchData()
  }, [])

  const chartConfig = {
    accuracy: {
      label: "Accuracy",
      color: "#16a34a",
    },
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Gauge className="h-5 w-5 text-orange-500" />
          Model Performance Metrics
        </CardTitle>
        <CardDescription className="text-gray-400">
          Accuracy, precision, recall, and F1-score for each trained model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["accuracy", "precision", "recall", "f1"].map((key) => {
            const avg = metrics.reduce((sum, m) => sum + (m as any)[key], 0) / (metrics.length || 1)
            return (
              <div key={key} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 text-center space-y-1">
                <Badge className="bg-blue-600 capitalize">{key}</Badge>
                <div className="text-2xl font-bold text-white">{(avg * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-400">Average {key}</div>
              </div>
            )
          })}
        </div>

        {/* Accuracy Bar Chart */}
        <div>
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-500" />
            Accuracy by Model
          </h4>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="model" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="accuracy"
                  fill="#16a34a"
                  radius={[4, 4, 0, 0]}
                  label={({ value }) => `${(value * 100).toFixed(1)}%`}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
