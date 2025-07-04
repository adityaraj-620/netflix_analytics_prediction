"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import { Scale } from "lucide-react"

interface ComparisonMetric {
  metric: "accuracy" | "precision" | "recall" | "f1"
  Viewership_LSTM: number
  Churn_RF: number
  Content_XGBoost: number
}

export default function ModelComparison() {
  const [data, setData] = useState<ComparisonMetric[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/model-comparison")
      const json = await res.json()
      setData(json)
    }
    fetchData()
  }, [])

  const chartConfig = {
    Viewership_LSTM: { label: "Viewership-LSTM", color: "#8b5cf6" },
    Churn_RF: { label: "Churn-RF", color: "#dc2626" },
    Content_XGBoost: { label: "Content-XGB", color: "#06b6d4" },
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Scale className="h-5 w-5 text-cyan-500" />
          Model Comparison
        </CardTitle>
        <CardDescription className="text-gray-400">
          Side-by-side comparison of key metrics for each trained model
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={data}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 1]}
                  tick={{ fill: "#9ca3af", fontSize: 10 }}
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                />
                <Radar
                  name="Viewership-LSTM"
                  dataKey="Viewership_LSTM"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Radar
                  name="Churn-RF"
                  dataKey="Churn_RF"
                  stroke="#dc2626"
                  fill="#dc2626"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="Content-XGB"
                  dataKey="Content_XGBoost"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="text-gray-400 text-center py-12">Loading model comparison…</div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <Badge className="bg-purple-600">Viewership-LSTM</Badge>
          <Badge className="bg-red-600">Churn-RF</Badge>
          <Badge className="bg-cyan-600">Content-XGB</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
