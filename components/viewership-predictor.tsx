"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { TrendingUp, Loader2, CheckCircle } from "lucide-react"

interface ViewershipInputs {
  contentType: string
  genre: string
  releaseHour: string
  seasonality: string
  marketingBudget: string
  contentRating: string
  duration: string
  leadActorPopularity: string
}

interface PredictionResult {
  predictedViews: number
  confidence: number
  factors: { factor: string; impact: number }[]
  trend: { day: number; views: number }[]
}

export default function ViewershipPredictor({ onPrediction }: { onPrediction: (prediction: any) => void }) {
  const [inputs, setInputs] = useState<ViewershipInputs>({
    contentType: "",
    genre: "",
    releaseHour: "",
    seasonality: "",
    marketingBudget: "",
    contentRating: "",
    duration: "",
    leadActorPopularity: "",
  })
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof ViewershipInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handlePredict = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/predict-viewership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      })
      const result = await response.json()
      setPrediction(result)

      // Add to history
      onPrediction({
        type: "Viewership",
        result: `${(result.predictedViews / 1000000).toFixed(1)}M views predicted`,
        timestamp: new Date().toLocaleTimeString(),
        confidence: result.confidence,
      })
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = Object.values(inputs).every((value) => value !== "")

  const chartConfig = {
    views: {
      label: "Predicted Views (M)",
      color: "#dc2626",
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Form */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Viewership Prediction
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter content details to predict viewership numbers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contentType" className="text-gray-300">
                Content Type
              </Label>
              <Select onValueChange={(value) => handleInputChange("contentType", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="series">TV Series</SelectItem>
                  <SelectItem value="documentary">Documentary</SelectItem>
                  <SelectItem value="special">Special</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre" className="text-gray-300">
                Genre
              </Label>
              <Select onValueChange={(value) => handleInputChange("genre", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="comedy">Comedy</SelectItem>
                  <SelectItem value="drama">Drama</SelectItem>
                  <SelectItem value="horror">Horror</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                  <SelectItem value="thriller">Thriller</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="releaseHour" className="text-gray-300">
                Release Hour (24h)
              </Label>
              <Input
                id="releaseHour"
                type="number"
                min="0"
                max="23"
                placeholder="e.g., 20"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("releaseHour", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seasonality" className="text-gray-300">
                Season
              </Label>
              <Select onValueChange={(value) => handleInputChange("seasonality", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="fall">Fall</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketingBudget" className="text-gray-300">
                Marketing Budget ($M)
              </Label>
              <Input
                id="marketingBudget"
                type="number"
                min="0"
                placeholder="e.g., 50"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("marketingBudget", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contentRating" className="text-gray-300">
                Content Rating
              </Label>
              <Select onValueChange={(value) => handleInputChange("contentRating", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="G">G</SelectItem>
                  <SelectItem value="PG">PG</SelectItem>
                  <SelectItem value="PG-13">PG-13</SelectItem>
                  <SelectItem value="R">R</SelectItem>
                  <SelectItem value="NC-17">NC-17</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-gray-300">
                Duration (minutes)
              </Label>
              <Input
                id="duration"
                type="number"
                min="1"
                placeholder="e.g., 120"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("duration", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="leadActorPopularity" className="text-gray-300">
                Lead Actor Popularity (1-10)
              </Label>
              <Input
                id="leadActorPopularity"
                type="number"
                min="1"
                max="10"
                placeholder="e.g., 8"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("leadActorPopularity", e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handlePredict}
            disabled={!isFormValid || isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Predicting...
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4 mr-2" />
                Predict Viewership
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Prediction Results</CardTitle>
          <CardDescription className="text-gray-400">
            AI-powered viewership forecast based on your inputs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {prediction ? (
            <div className="space-y-6">
              {/* Main Prediction */}
              <div className="text-center p-6 bg-green-900/20 rounded-lg border border-green-700/30">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-medium">Predicted Viewership</span>
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {(prediction.predictedViews / 1000000).toFixed(1)}M
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-gray-400">Confidence:</span>
                  <Badge className="bg-green-600">{prediction.confidence}%</Badge>
                </div>
              </div>

              {/* Impact Factors */}
              <div>
                <h4 className="text-white font-medium mb-3">Key Impact Factors</h4>
                <div className="space-y-2">
                  {prediction.factors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                      <span className="text-gray-300">{factor.factor}</span>
                      <div className="flex items-center gap-2">
                        <div className={`text-sm font-medium ${factor.impact > 0 ? "text-green-400" : "text-red-400"}`}>
                          {factor.impact > 0 ? "+" : ""}
                          {factor.impact}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trend Chart */}
              <div>
                <h4 className="text-white font-medium mb-3">7-Day Viewership Trend</h4>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={prediction.trend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#dc2626"
                        strokeWidth={2}
                        dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Enter content details and click "Predict Viewership" to see results</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
