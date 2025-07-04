"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Users } from "lucide-react"

interface ContentPrediction {
  id: number
  title: string
  type: "Movie" | "Series"
  genre: string
  releaseDate: string
  predictedRating: number
  predictedViews: number
  successProbability: number
  riskFactors: string[]
  recommendations: string[]
}

export default function ContentSuccessPrediction() {
  const [predictions, setPredictions] = useState<ContentPrediction[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/content-predictions")
      const result = await response.json()
      setPredictions(result)
    }
    fetchData()
  }, [])

  const getSuccessColor = (probability: number) => {
    if (probability >= 80) return "text-green-400 bg-green-900/20 border-green-700/30"
    if (probability >= 60) return "text-yellow-400 bg-yellow-900/20 border-yellow-700/30"
    return "text-red-400 bg-red-900/20 border-red-700/30"
  }

  const getSuccessLabel = (probability: number) => {
    if (probability >= 80) return "High Success"
    if (probability >= 60) return "Moderate Success"
    return "Low Success"
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Star className="h-5 w-5 text-blue-500" />
          Upcoming Content Success Predictions
        </CardTitle>
        <CardDescription className="text-gray-400">
          AI-powered predictions for upcoming releases based on historical data and market trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((content) => (
            <div key={content.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{content.title}</h3>
                    <Badge
                      variant={content.type === "Movie" ? "default" : "secondary"}
                      className={
                        content.type === "Movie" ? "bg-red-600 hover:bg-red-700" : "bg-orange-600 hover:bg-orange-700"
                      }
                    >
                      {content.type}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {content.genre}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-400 mb-3">Release Date: {content.releaseDate}</div>
                </div>
                <div className={`px-3 py-2 rounded-lg border ${getSuccessColor(content.successProbability)}`}>
                  <div className="text-sm font-medium">{getSuccessLabel(content.successProbability)}</div>
                  <div className="text-lg font-bold">{content.successProbability}%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-400">Predicted Rating:</span>
                  <span className="text-white font-medium">{content.predictedRating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-400">Predicted Views:</span>
                  <span className="text-white font-medium">{(content.predictedViews / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-400">Success Rate:</span>
                  <span className="text-white font-medium">{content.successProbability}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-red-400 mb-2">Risk Factors:</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {content.riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-2">Recommendations:</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {content.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
