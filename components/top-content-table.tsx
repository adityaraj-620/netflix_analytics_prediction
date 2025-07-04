"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp } from "lucide-react"

interface ContentItem {
  id: number
  title: string
  type: "Movie" | "Series"
  genre: string
  rating: number
  views: number
  releaseYear: number
}

export default function TopContentTable() {
  const [content, setContent] = useState<ContentItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/top-content")
      const result = await response.json()
      setContent(result)
    }
    fetchData()
  }, [])

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-red-600" />
          Top Performing Content
        </CardTitle>
        <CardDescription className="text-gray-400">Most watched movies and series this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Rank</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Title</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Type</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Genre</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Rating</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Views</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Year</th>
              </tr>
            </thead>
            <tbody>
              {content.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-2">
                    <div className="flex items-center">
                      <span className="text-red-600 font-bold text-lg">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="font-medium text-white">{item.title}</div>
                  </td>
                  <td className="py-3 px-2">
                    <Badge
                      variant={item.type === "Movie" ? "default" : "secondary"}
                      className={
                        item.type === "Movie" ? "bg-red-600 hover:bg-red-700" : "bg-orange-600 hover:bg-orange-700"
                      }
                    >
                      {item.type}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-gray-300">{item.genre}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-white font-medium">{item.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-300">{(item.views / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-2 text-gray-300">{item.releaseYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
