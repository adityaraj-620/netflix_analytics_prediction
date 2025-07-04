"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, Users, Star } from "lucide-react"
import ViewershipPredictor from "@/components/viewership-predictor"
import ChurnPredictor from "@/components/churn-predictor"
import ContentSuccessPredictor from "@/components/content-success-predictor"
import RevenuePredictor from "@/components/revenue-predictor"
import BulkDataUpload from "@/components/bulk-data-upload"

export default function UserPredictionInterface() {
  const [predictionHistory, setPredictionHistory] = useState<any[]>([])

  const addToPredictionHistory = (prediction: any) => {
    setPredictionHistory((prev) => [prediction, ...prev.slice(0, 9)]) // Keep last 10 predictions
  }

  return (
    <div className="space-y-6">
      {/* Prediction Interface Header */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="h-8 w-8 text-green-400" />
              <div>
                <CardTitle className="text-2xl text-white">Interactive Prediction Center</CardTitle>
                <CardDescription className="text-green-200">
                  Enter your own data and get real-time predictions from our trained ML models
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-600 hover:bg-green-700 text-white">Live Predictions</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Prediction Models */}
      <Tabs defaultValue="viewership" className="space-y-6">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="viewership" className="data-[state=active]:bg-green-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            Viewership
          </TabsTrigger>
          <TabsTrigger value="churn" className="data-[state=active]:bg-green-600">
            <Users className="h-4 w-4 mr-2" />
            Churn Risk
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-green-600">
            <Star className="h-4 w-4 mr-2" />
            Content Success
          </TabsTrigger>
          <TabsTrigger value="revenue" className="data-[state=active]:bg-green-600">
            <Calculator className="h-4 w-4 mr-2" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="bulk" className="data-[state=active]:bg-green-600">
            Bulk Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="viewership" className="space-y-6">
          <ViewershipPredictor onPrediction={addToPredictionHistory} />
        </TabsContent>

        <TabsContent value="churn" className="space-y-6">
          <ChurnPredictor onPrediction={addToPredictionHistory} />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <ContentSuccessPredictor onPrediction={addToPredictionHistory} />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <RevenuePredictor onPrediction={addToPredictionHistory} />
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <BulkDataUpload onPrediction={addToPredictionHistory} />
        </TabsContent>
      </Tabs>

      {/* Prediction History */}
      {predictionHistory.length > 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Predictions</CardTitle>
            <CardDescription className="text-gray-400">Your last 10 predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {predictionHistory.map((prediction, index) => (
                <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-600">{prediction.type}</Badge>
                      <span className="text-white font-medium">{prediction.result}</span>
                    </div>
                    <div className="text-sm text-gray-400">{prediction.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
