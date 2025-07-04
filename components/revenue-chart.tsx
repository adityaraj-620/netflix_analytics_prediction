"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface RevenueData {
  month: string
  revenue: number
  subscribers: number
  churnRate: number
}

export default function RevenueChart() {
  const [data, setData] = useState<RevenueData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/revenue-data")
      const result = await response.json()
      setData(result)
    }
    fetchData()
  }, [])

  const chartConfig = {
    revenue: {
      label: "Revenue (Millions $)",
      color: "#dc2626",
    },
    subscribers: {
      label: "Subscribers (Millions)",
      color: "#ea580c",
    },
    churnRate: {
      label: "Churn Rate (%)",
      color: "#f59e0b",
    },
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Revenue & Subscriber Analytics</CardTitle>
        <CardDescription className="text-gray-400">Monthly revenue, subscriber growth, and churn rate</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="#dc2626" radius={[4, 4, 0, 0]} />
              <Line
                type="monotone"
                dataKey="churnRate"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
