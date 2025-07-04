"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Brain, Target, AlertTriangle, CheckCircle } from "lucide-react"
import ViewershipPredictionChart from "@/components/viewership-prediction-chart"
import ChurnPredictionChart from "@/components/churn-prediction-chart"
import ContentSuccessPrediction from "@/components/content-success-prediction"
import RevenueForecasting from "@/components/revenue-forecasting"
import SeasonalTrendsChart from "@/components/seasonal-trends-chart"
import PredictionInsights from "@/components/prediction-insights"

export default function PredictionsOverview() {
  return (
    <div className="space-y-6">
      {/* Prediction Header */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-purple-400" />
              <div>
                <CardTitle className="text-2xl text-white">AI-Powered Predictions</CardTitle>
                <CardDescription className="text-purple-200">
                  Advanced machine learning models forecasting Netflix trends and performance
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white">ML Models Active</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Prediction Accuracy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Viewership Accuracy</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">94.2%</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Churn Prediction</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">91.8%</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +1.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Content Success</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">87.3%</div>
            <p className="text-xs text-red-500 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              -0.8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Revenue Forecast</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">92.7%</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Prediction Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ViewershipPredictionChart />
        <ChurnPredictionChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueForecasting />
        <SeasonalTrendsChart />
      </div>

      <ContentSuccessPrediction />

      <PredictionInsights />
    </div>
  )
}
