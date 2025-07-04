"use client"

import { useState, useEffect } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Pause, RotateCcw } from "lucide-react"
import DataPreprocessing from "@/components/data-preprocessing"
import ModelTrainingPipeline from "@/components/model-training-pipeline"
import ModelPerformance from "@/components/model-performance"
import FeatureEngineering from "@/components/feature-engineering"
import ModelComparison from "@/components/model-comparison"
// Remove this import as the component doesn't exist yet
// import AutoMLPipeline from "@/components/automl-pipeline"

export default function ModelTrainingDashboard() {
  const [trainingStatus, setTrainingStatus] = useState<"idle" | "running" | "completed" | "error">("idle")
  const [activeModels, setActiveModels] = useState(0)

  useEffect(() => {
    const fetchTrainingStatus = async () => {
      try {
        const response = await fetch("/api/training-status")
        const data = await response.json()
        setTrainingStatus(data.status)
        setActiveModels(data.activeModels)
      } catch (error) {
        console.error("Error fetching training status:", error)
      }
    }

    fetchTrainingStatus()
    const interval = setInterval(fetchTrainingStatus, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-blue-600 hover:bg-blue-700"
      case "completed":
        return "bg-green-600 hover:bg-green-700"
      case "error":
        return "bg-red-600 hover:bg-red-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Zap className="h-4 w-4" />
      case "completed":
        return <Brain className="h-4 w-4" />
      case "error":
        return <RotateCcw className="h-4 w-4" />
      default:
        return <Pause className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Training Overview Header */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-blue-400" />
              <div>
                <CardTitle className="text-2xl text-white">ML Model Training Center</CardTitle>
                <CardDescription className="text-blue-200">
                  Train, optimize, and deploy machine learning models for Netflix analytics
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(trainingStatus)}>
                {getStatusIcon(trainingStatus)}
                {trainingStatus.charAt(0).toUpperCase() + trainingStatus.slice(1)}
              </Badge>
              <Badge variant="outline" className="border-blue-500 text-blue-400">
                {activeModels} Active Models
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Training Tabs */}
      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="pipeline" className="data-[state=active]:bg-blue-600">
            Training Pipeline
          </TabsTrigger>
          <TabsTrigger value="preprocessing" className="data-[state=active]:bg-blue-600">
            Data Preprocessing
          </TabsTrigger>
          <TabsTrigger value="features" className="data-[state=active]:bg-blue-600">
            Feature Engineering
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-blue-600">
            Model Performance
          </TabsTrigger>
          <TabsTrigger value="comparison" className="data-[state=active]:bg-blue-600">
            Model Comparison
          </TabsTrigger>
          {/* Remove this until AutoMLPipeline component is created
          <TabsTrigger value="automl" className="data-[state=active]:bg-blue-600">
            AutoML
          </TabsTrigger>
          */}
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          <ModelTrainingPipeline />
        </TabsContent>

        <TabsContent value="preprocessing" className="space-y-6">
          <DataPreprocessing />
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <FeatureEngineering />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <ModelPerformance />
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <ModelComparison />
        </TabsContent>

        {/* Remove this until AutoMLPipeline component is created
        <TabsContent value="automl" className="space-y-6">
          <AutoMLPipeline />
        </TabsContent>
        */}
      </Tabs>
    </div>
  )
}
