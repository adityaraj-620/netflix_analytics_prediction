"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface GenreData {
  genre: string
  views: number
  content: number
}

export default function GenrePopularityChart() {
  const [data, setData] = useState<GenreData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/genre-popularity")
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
    content: {
      label: "Content Count",
      color: "#ea580c",
    },
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Genre Popularity</CardTitle>
        <CardDescription className="text-gray-400">Most watched genres and content distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="genre" stroke="#9ca3af" fontSize={12} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="views" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
