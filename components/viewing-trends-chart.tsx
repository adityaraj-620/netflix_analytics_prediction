"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface ViewingData {
  date: string
  views: number
  hours: number
}

export default function ViewingTrendsChart() {
  const [data, setData] = useState<ViewingData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/viewing-trends")
      const result = await response.json()
      setData(result)
    }
    fetchData()
  }, [])

  const chartConfig = {
    views: {
      label: "Views (Millions)",
      color: "#dc2626",
    },
    hours: {
      label: "Watch Hours (Millions)",
      color: "#ea580c",
    },
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Viewing Trends</CardTitle>
        <CardDescription className="text-gray-400">Daily viewing statistics over the past 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#dc2626"
                strokeWidth={2}
                dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#ea580c"
                strokeWidth={2}
                dot={{ fill: "#ea580c", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
