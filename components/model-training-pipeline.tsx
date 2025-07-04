"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Play, Square, Settings } from "lucide-react"

interface TrainingJob {
  id: string
  modelName: string
  modelType: string
  status: "queued" | "running" | "completed" | "failed"
  progress: number
  accuracy: number
  loss: number
  startTime: string
  estimatedCompletion: string
  datasetSize: number
}

interface TrainingMetrics {
  epoch: number
  trainLoss: number
  valLoss: number
  trainAccuracy: number
  valAccuracy: number
}

export default function ModelTrainingPipeline() {
  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([])
  const [trainingMetrics, setTrainingMetrics] = useState<TrainingMetrics[]>([])
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrainingJobs = async () => {
      const response = await fetch("/api/training-jobs")
      const data = await response.json()
      setTrainingJobs(data)
    }

    const fetchTrainingMetrics = async () => {
      if (selectedJob) {
        const response = await fetch(`/api/training-metrics/${selectedJob}`)
        const data = await response.json()
        setTrainingMetrics(data)
      }
    }

    fetchTrainingJobs()
    fetchTrainingMetrics()

    const interval = setInterval(() => {
      fetchTrainingJobs()
      fetchTrainingMetrics()
    }, 2000)

    return () => clearInterval(interval)
  }, [selectedJob])

  const startTraining = async (modelType: string) => {
    try {
      await fetch("/api/start-training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelType }),
      })
    } catch (error) {
      console.error("Error starting training:", error)
    }
  }

  const stopTraining = async (jobId: string) => {
    try {
      await fetch(`/api/stop-training/${jobId}`, { method: "POST" })
    } catch (error) {
      console.error("Error stopping training:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-blue-600 hover:bg-blue-700"
      case "completed":
        return "bg-green-600 hover:bg-green-700"
      case "failed":
        return "bg-red-600 hover:bg-red-700"
      case "queued":
        return "bg-yellow-600 hover:bg-yellow-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  const chartConfig = {
    trainLoss: {
      label: "Training Loss",
      color: "#dc2626",
    },
    valLoss: {
      label: "Validation Loss",
      color: "#ea580c",
    },
    trainAccuracy: {
      label: "Training Accuracy",
      color: "#16a34a",
    },
    valAccuracy: {
      label: "Validation Accuracy",
      color: "#0891b2",
    },
  }

  return (
    <div className="space-y-6">
      {/* Quick Start Training */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Quick Start Training</CardTitle>
          <CardDescription className="text-gray-400">
            Start training new models with pre-configured settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => startTraining("viewership-lstm")}
              className="bg-blue-600 hover:bg-blue-700 h-20 flex flex-col items-center justify-center"
            >
              <Play className="h-6 w-6 mb-2" />
              Train LSTM Model
              <span className="text-xs opacity-75">Viewership Prediction</span>
            </Button>
            <Button
              onClick={() => startTraining("churn-rf")}
              className="bg-purple-600 hover:bg-purple-700 h-20 flex flex-col items-center justify-center"
            >
              <Play className="h-6 w-6 mb-2" />
              Train Random Forest
              <span className="text-xs opacity-75">Churn Prediction</span>
            </Button>
            <Button
              onClick={() => startTraining("content-success")}
              className="bg-green-600 hover:bg-green-700 h-20 flex flex-col items-center justify-center"
            >
              <Play className="h-6 w-6 mb-2" />
              Train Success Model
              <span className="text-xs opacity-75">Content Performance</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Training Jobs */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Training Jobs</CardTitle>
          <CardDescription className="text-gray-400">Monitor active and completed training jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingJobs.map((job) => (
              <div
                key={job.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedJob === job.id ? "border-blue-500 bg-blue-900/20" : "border-gray-700 bg-gray-800/50"
                }`}
                onClick={() => setSelectedJob(job.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">{job.modelName}</h3>
                    <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {job.modelType}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.status === "running" && (
                      <Button size="sm" variant="outline" onClick={() => stopTraining(job.id)}>
                        <Square className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-400">Progress</div>
                    <div className="text-white font-medium">{job.progress}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Accuracy</div>
                    <div className="text-white font-medium">{job.accuracy.toFixed(3)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Loss</div>
                    <div className="text-white font-medium">{job.loss.toFixed(4)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Dataset Size</div>
                    <div className="text-white font-medium">{job.datasetSize.toLocaleString()}</div>
                  </div>
                </div>

                {job.status === "running" && (
                  <div className="space-y-2">
                    <Progress value={job.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Started: {job.startTime}</span>
                      <span>ETA: {job.estimatedCompletion}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training Metrics Visualization */}
      {selectedJob && trainingMetrics.length > 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Training Metrics - Real Time</CardTitle>
            <CardDescription className="text-gray-400">
              Loss and accuracy curves for the selected training job
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Loss Curves</h4>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={trainingMetrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="epoch" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="trainLoss"
                        stroke="#dc2626"
                        strokeWidth={2}
                        dot={{ fill: "#dc2626", strokeWidth: 2, r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="valLoss"
                        stroke="#ea580c"
                        strokeWidth={2}
                        dot={{ fill: "#ea580c", strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Accuracy Curves</h4>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={trainingMetrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="epoch" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="trainAccuracy"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={{ fill: "#16a34a", strokeWidth: 2, r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="valAccuracy"
                        stroke="#0891b2"
                        strokeWidth={2}
                        dot={{ fill: "#0891b2", strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
