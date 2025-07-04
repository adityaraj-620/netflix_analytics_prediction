"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Star, Loader2, TrendingUp, Users, DollarSign } from "lucide-react"

interface ContentInputs {
  title: string
  genre: string
  budget: string
  castPopularity: string
  directorExperience: string
  productionStudio: string
  targetAudience: string
  marketingBudget: string
  releaseStrategy: string
  synopsis: string
}

interface ContentResult {
  successScore: number
  predictedRating: number
  predictedViews: number
  revenueProjection: number
  successFactors: { factor: string; score: number }[]
  marketingRecommendations: string[]
  competitorAnalysis: { competitor: string; similarity: number }[]
}

export default function ContentSuccessPredictor({ onPrediction }: { onPrediction: (prediction: any) => void }) {
  const [inputs, setInputs] = useState<ContentInputs>({
    title: "",
    genre: "",
    budget: "",
    castPopularity: "",
    directorExperience: "",
    productionStudio: "",
    targetAudience: "",
    marketingBudget: "",
    releaseStrategy: "",
    synopsis: "",
  })
  const [prediction, setPrediction] = useState<ContentResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof ContentInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handlePredict = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/predict-content-success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      })
      const result = await response.json()
      setPrediction(result)

      onPrediction({
        type: "Content Success",
        result: `${result.successScore}% success score, ${result.predictedRating.toFixed(1)} rating`,
        timestamp: new Date().toLocaleTimeString(),
        confidence: result.successScore,
      })
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = inputs.title && inputs.genre && inputs.budget && inputs.synopsis

  const getSuccessColor = (score: number) => {
    if (score >= 80) return "text-green-400 bg-green-900/20 border-green-700/30"
    if (score >= 60) return "text-yellow-400 bg-yellow-900/20 border-yellow-700/30"
    return "text-red-400 bg-red-900/20 border-red-700/30"
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Form */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-500" />
            Content Success Prediction
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter content details to predict success probability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">
                Content Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., The Next Big Hit"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genre" className="text-gray-300">
                  Primary Genre
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
                    <SelectItem value="documentary">Documentary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-gray-300">
                  Production Budget ($M)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  min="0"
                  placeholder="e.g., 150"
                  className="bg-gray-800 border-gray-700"
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="castPopularity" className="text-gray-300">
                  Cast Popularity (1-10)
                </Label>
                <Input
                  id="castPopularity"
                  type="number"
                  min="1"
                  max="10"
                  placeholder="e.g., 8"
                  className="bg-gray-800 border-gray-700"
                  onChange={(e) => handleInputChange("castPopularity", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="directorExperience" className="text-gray-300">
                  Director Experience (years)
                </Label>
                <Input
                  id="directorExperience"
                  type="number"
                  min="0"
                  placeholder="e.g., 15"
                  className="bg-gray-800 border-gray-700"
                  onChange={(e) => handleInputChange("directorExperience", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productionStudio" className="text-gray-300">
                  Production Studio
                </Label>
                <Select onValueChange={(value) => handleInputChange("productionStudio", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select studio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="netflix-originals">Netflix Originals</SelectItem>
                    <SelectItem value="major-studio">Major Studio</SelectItem>
                    <SelectItem value="independent">Independent</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience" className="text-gray-300">
                  Target Audience
                </Label>
                <Select onValueChange={(value) => handleInputChange("targetAudience", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="teens">Teens</SelectItem>
                    <SelectItem value="young-adults">Young Adults</SelectItem>
                    <SelectItem value="adults">Adults</SelectItem>
                    <SelectItem value="mature">Mature</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="marketingBudget" className="text-gray-300">
                  Marketing Budget ($M)
                </Label>
                <Input
                  id="marketingBudget"
                  type="number"
                  min="0"
                  placeholder="e.g., 75"
                  className="bg-gray-800 border-gray-700"
                  onChange={(e) => handleInputChange("marketingBudget", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="releaseStrategy" className="text-gray-300">
                  Release Strategy
                </Label>
                <Select onValueChange={(value) => handleInputChange("releaseStrategy", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wide-release">Wide Release</SelectItem>
                    <SelectItem value="limited-release">Limited Release</SelectItem>
                    <SelectItem value="festival-first">Festival First</SelectItem>
                    <SelectItem value="streaming-only">Streaming Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="synopsis" className="text-gray-300">
                Synopsis
              </Label>
              <Textarea
                id="synopsis"
                placeholder="Brief description of the content..."
                className="bg-gray-800 border-gray-700 min-h-[100px]"
                onChange={(e) => handleInputChange("synopsis", e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handlePredict}
            disabled={!isFormValid || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Star className="h-4 w-4 mr-2" />
                Predict Success
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Success Prediction</CardTitle>
          <CardDescription className="text-gray-400">AI-powered content performance forecast</CardDescription>
        </CardHeader>
        <CardContent>
          {prediction ? (
            <div className="space-y-6">
              {/* Success Score */}
              <div className={`text-center p-6 rounded-lg border ${getSuccessColor(prediction.successScore)}`}>
                <div className="text-4xl font-bold mb-2">{prediction.successScore}%</div>
                <div className="font-medium mb-3">Success Probability</div>
                <Progress value={prediction.successScore} className="h-2" />
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{prediction.predictedRating.toFixed(1)}</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {(prediction.predictedViews / 1000000).toFixed(0)}M
                  </div>
                  <div className="text-sm text-gray-400">Views</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    ${(prediction.revenueProjection / 1000000).toFixed(0)}M
                  </div>
                  <div className="text-sm text-gray-400">Revenue</div>
                </div>
              </div>

              {/* Success Factors */}
              <div>
                <h4 className="text-white font-medium mb-3">Success Factors</h4>
                <div className="space-y-2">
                  {prediction.successFactors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                      <span className="text-gray-300">{factor.factor}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={factor.score} className="w-20 h-2" />
                        <span className="text-sm font-medium text-white w-12">{factor.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marketing Recommendations */}
              <div>
                <h4 className="text-white font-medium mb-3">Marketing Recommendations</h4>
                <div className="space-y-2">
                  {prediction.marketingRecommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-3 bg-green-900/20 rounded border border-green-700/30"
                    >
                      <TrendingUp className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-green-200 text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Enter content details and click "Predict Success" to see analysis</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
