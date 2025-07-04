"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface EngagementData {
  hour: string
  activeUsers: number
  newSignups: number
}

export default function UserEngagementChart() {
  const [data, setData] = useState<EngagementData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/user-engagement")
      const result = await response.json()
      setData(result)
    }
    fetchData()
  }, [])

  const chartConfig = {
    activeUsers: {
      label: "Active Users (Thousands)",
      color: "#dc2626",
    },
    newSignups: {
      label: "New Signups",
      color: "#ea580c",
    },
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">User Engagement</CardTitle>
        <CardDescription className="text-gray-400">Hourly active users and new signups</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="activeUsers"
                stackId="1"
                stroke="#dc2626"
                fill="#dc2626"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="newSignups"
                stackId="2"
                stroke="#ea580c"
                fill="#ea580c"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
