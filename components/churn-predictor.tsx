"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Users, Loader2, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface ChurnInputs {
  subscriptionMonths: string
  monthlyUsage: string
  avgSessionDuration: string
  deviceCount: string
  supportTickets: string
  paymentFailures: string
  contentRating: string
  ageGroup: string
  subscriptionTier: string
}

interface ChurnResult {
  churnProbability: number
  riskLevel: "Low" | "Medium" | "High"
  riskFactors: { factor: string; score: number }[]
  recommendations: string[]
}

export default function ChurnPredictor({ onPrediction }: { onPrediction: (prediction: any) => void }) {
  const [inputs, setInputs] = useState<ChurnInputs>({
    subscriptionMonths: "",
    monthlyUsage: "",
    avgSessionDuration: "",
    deviceCount: "",
    supportTickets: "",
    paymentFailures: "",
    contentRating: "",
    ageGroup: "",
    subscriptionTier: "",
  })
  const [prediction, setPrediction] = useState<ChurnResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof ChurnInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handlePredict = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/predict-churn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      })
      const result = await response.json()
      setPrediction(result)

      onPrediction({
        type: "Churn Risk",
        result: `${result.riskLevel} risk (${result.churnProbability}% probability)`,
        timestamp: new Date().toLocaleTimeString(),
        confidence: 100 - result.churnProbability,
      })
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = Object.values(inputs).every((value) => value !== "")

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-400 bg-green-900/20 border-green-700/30"
      case "Medium":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-700/30"
      case "High":
        return "text-red-400 bg-red-900/20 border-red-700/30"
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-700/30"
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Low":
        return <CheckCircle className="h-5 w-5" />
      case "Medium":
        return <AlertTriangle className="h-5 w-5" />
      case "High":
        return <XCircle className="h-5 w-5" />
      default:
        return <Users className="h-5 w-5" />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Form */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-500" />
            Churn Risk Prediction
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter user behavior data to predict churn probability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subscriptionMonths" className="text-gray-300">
                Subscription Months
              </Label>
              <Input
                id="subscriptionMonths"
                type="number"
                min="0"
                placeholder="e.g., 24"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("subscriptionMonths", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyUsage" className="text-gray-300">
                Monthly Usage (hours)
              </Label>
              <Input
                id="monthlyUsage"
                type="number"
                min="0"
                placeholder="e.g., 45"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("monthlyUsage", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avgSessionDuration" className="text-gray-300">
                Avg Session (minutes)
              </Label>
              <Input
                id="avgSessionDuration"
                type="number"
                min="0"
                placeholder="e.g., 85"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("avgSessionDuration", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deviceCount" className="text-gray-300">
                Device Count
              </Label>
              <Input
                id="deviceCount"
                type="number"
                min="1"
                placeholder="e.g., 3"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("deviceCount", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportTickets" className="text-gray-300">
                Support Tickets (last 6 months)
              </Label>
              <Input
                id="supportTickets"
                type="number"
                min="0"
                placeholder="e.g., 2"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("supportTickets", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentFailures" className="text-gray-300">
                Payment Failures
              </Label>
              <Input
                id="paymentFailures"
                type="number"
                min="0"
                placeholder="e.g., 1"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("paymentFailures", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contentRating" className="text-gray-300">
                Avg Content Rating
              </Label>
              <Input
                id="contentRating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="e.g., 4.2"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => handleInputChange("contentRating", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ageGroup" className="text-gray-300">
                Age Group
              </Label>
              <Select onValueChange={(value) => handleInputChange("ageGroup", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-25">18-25</SelectItem>
                  <SelectItem value="26-35">26-35</SelectItem>
                  <SelectItem value="36-45">36-45</SelectItem>
                  <SelectItem value="46-55">46-55</SelectItem>
                  <SelectItem value="56+">56+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="subscriptionTier" className="text-gray-300">
                Subscription Tier
              </Label>
              <Select onValueChange={(value) => handleInputChange("subscriptionTier", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select subscription tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handlePredict}
            disabled={!isFormValid || isLoading}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Users className="h-4 w-4 mr-2" />
                Predict Churn Risk
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Churn Risk Analysis</CardTitle>
          <CardDescription className="text-gray-400">AI-powered churn probability assessment</CardDescription>
        </CardHeader>
        <CardContent>
          {prediction ? (
            <div className="space-y-6">
              {/* Risk Level */}
              <div className={`text-center p-6 rounded-lg border ${getRiskColor(prediction.riskLevel)}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {getRiskIcon(prediction.riskLevel)}
                  <span className="font-medium">{prediction.riskLevel} Risk</span>
                </div>
                <div className="text-4xl font-bold mb-2">{prediction.churnProbability}%</div>
                <div className="text-sm opacity-75">Churn Probability</div>
                <Progress value={prediction.churnProbability} className="mt-3 h-2" />
              </div>

              {/* Risk Factors */}
              <div>
                <h4 className="text-white font-medium mb-3">Risk Factors</h4>
                <div className="space-y-2">
                  {prediction.riskFactors.map((factor, index) => (
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

              {/* Recommendations */}
              <div>
                <h4 className="text-white font-medium mb-3">Retention Recommendations</h4>
                <div className="space-y-2">
                  {prediction.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-3 bg-blue-900/20 rounded border border-blue-700/30"
                    >
                      <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-200 text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Enter user behavior data and click "Predict Churn Risk" to see analysis</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
