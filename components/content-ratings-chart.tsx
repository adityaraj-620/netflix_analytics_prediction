"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface RatingData {
  rating: string
  count: number
  percentage: number
}

const COLORS = ["#dc2626", "#ea580c", "#f59e0b", "#eab308", "#84cc16"]

export default function ContentRatingsChart() {
  const [data, setData] = useState<RatingData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/content-ratings")
      const result = await response.json()
      setData(result)
    }
    fetchData()
  }, [])

  const chartConfig = {
    count: {
      label: "Content Count",
    },
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Content Ratings Distribution</CardTitle>
        <CardDescription className="text-gray-400">Distribution of content by rating categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ rating, percentage }) => `${rating}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
