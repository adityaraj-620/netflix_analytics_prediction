"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface SeasonalData {
  month: string
  viewingIndex: number
  signupIndex: number
  engagementIndex: number
}

export default function SeasonalTrendsChart() {
  const [data, setData] = useState<SeasonalData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/seasonal-trends")
      const result = await response.json()
      setData(result)
    }
    fetchData()
  }, [])

  const chartConfig = {
    viewingIndex: {
      label: "Viewing Index",
      color: "#dc2626",
    },
    signupIndex: {
      label: "Signup Index",
      color: "#8b5cf6",
    },
    engagementIndex: {
      label: "Engagement Index",
      color: "#06b6d4",
    },
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-cyan-500" />
              Seasonal Trends Analysis
            </CardTitle>
            <CardDescription className="text-gray-400">
              Monthly patterns in viewing, signups, and engagement
            </CardDescription>
          </div>
          <Badge className="bg-cyan-600 hover:bg-cyan-700">Seasonal Decomposition</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={data}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 150]} tick={{ fill: "#9ca3af", fontSize: 10 }} tickCount={4} />
              <Radar
                name="Viewing Index"
                dataKey="viewingIndex"
                stroke="#dc2626"
                fill="#dc2626"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Signup Index"
                dataKey="signupIndex"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Engagement Index"
                dataKey="engagementIndex"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="p-2 bg-red-900/20 rounded border border-red-700/30">
            <div className="text-red-400 text-xs font-medium">Peak Viewing</div>
            <div className="text-white font-bold">December</div>
          </div>
          <div className="p-2 bg-purple-900/20 rounded border border-purple-700/30">
            <div className="text-purple-400 text-xs font-medium">Peak Signups</div>
            <div className="text-white font-bold">January</div>
          </div>
          <div className="p-2 bg-cyan-900/20 rounded border border-cyan-700/30">
            <div className="text-cyan-400 text-xs font-medium">Peak Engagement</div>
            <div className="text-white font-bold">November</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
