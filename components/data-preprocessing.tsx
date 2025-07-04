"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Database, Filter, Zap, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react"

interface DatasetInfo {
  name: string
  size: number
  features: number
  missingValues: number
  duplicates: number
  outliers: number
  status: "raw" | "processing" | "cleaned"
  lastUpdated: string
}

interface DataQuality {
  metric: string
  score: number
  status: "good" | "warning" | "critical"
}

const COLORS = ["#dc2626", "#ea580c", "#f59e0b", "#eab308", "#84cc16"]

export default function DataPreprocessing() {
  const [datasets, setDatasets] = useState<DatasetInfo[]>([])
  const [dataQuality, setDataQuality] = useState<DataQuality[]>([])
  const [processingProgress, setProcessingProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [datasetsRes, qualityRes] = await Promise.all([fetch("/api/datasets"), fetch("/api/data-quality")])

        const datasetsData = await datasetsRes.json()
        const qualityData = await qualityRes.json()

        setDatasets(datasetsData)
        setDataQuality(qualityData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const startPreprocessing = async (datasetName: string) => {
    setIsProcessing(true)
    setProcessingProgress(0)

    try {
      const response = await fetch("/api/preprocess-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataset: datasetName }),
      })

      if (response.ok) {
        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setProcessingProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval)
              setIsProcessing(false)
              return 100
            }
            return prev + Math.random() * 15
          })
        }, 500)
      }
    } catch (error) {
      console.error("Error starting preprocessing:", error)
      setIsProcessing(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cleaned":
        return "bg-green-600 hover:bg-green-700"
      case "processing":
        return "bg-blue-600 hover:bg-blue-700"
      case "raw":
        return "bg-yellow-600 hover:bg-yellow-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  const getQualityIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <RefreshCw className="h-4 w-4 text-gray-500" />
    }
  }

  const chartConfig = {
    score: {
      label: "Quality Score",
      color: "#dc2626",
    },
  }

  return (
    <div className="space-y-6">
      {/* Data Quality Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dataQuality.map((quality) => (
          <Card key={quality.metric} className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{quality.metric}</CardTitle>
              {getQualityIcon(quality.status)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{quality.score}%</div>
              <Progress value={quality.score} className="mt-2 h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dataset Management */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Dataset Management
          </CardTitle>
          <CardDescription className="text-gray-400">Manage and preprocess training datasets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {datasets.map((dataset) => (
              <div key={dataset.name} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">{dataset.name}</h3>
                    <Badge className={getStatusColor(dataset.status)}>{dataset.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => startPreprocessing(dataset.name)}
                      disabled={isProcessing || dataset.status === "processing"}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {dataset.status === "processing" ? "Processing..." : "Preprocess"}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-400">Size</div>
                    <div className="text-white font-medium">{dataset.size.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Features</div>
                    <div className="text-white font-medium">{dataset.features}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Missing</div>
                    <div className="text-red-400 font-medium">{dataset.missingValues.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Duplicates</div>
                    <div className="text-yellow-400 font-medium">{dataset.duplicates.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Outliers</div>
                    <div className="text-orange-400 font-medium">{dataset.outliers.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Updated</div>
                    <div className="text-gray-300 font-medium">{dataset.lastUpdated}</div>
                  </div>
                </div>

                {dataset.status === "processing" && (
                  <div className="space-y-2">
                    <Progress value={processingProgress} className="h-2" />
                    <div className="text-xs text-gray-400">Processing: {Math.floor(processingProgress)}% complete</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Quality Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Data Quality Scores</CardTitle>
            <CardDescription className="text-gray-400">Quality metrics across all datasets</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataQuality}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="metric" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="score" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Data Issues Distribution</CardTitle>
            <CardDescription className="text-gray-400">Types of data quality issues found</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Missing Values", value: 35 },
                      { name: "Duplicates", value: 25 },
                      { name: "Outliers", value: 20 },
                      { name: "Format Issues", value: 15 },
                      { name: "Other", value: 5 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[35, 25, 20, 15, 5].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Preprocessing Pipeline */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Preprocessing Pipeline
          </CardTitle>
          <CardDescription className="text-gray-400">Automated data cleaning and transformation steps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "Data Validation", status: "completed", time: "2.3s" },
              { step: "Missing Value Imputation", status: "completed", time: "15.7s" },
              { step: "Outlier Detection", status: "running", time: "8.2s" },
              { step: "Feature Scaling", status: "pending", time: "-" },
            ].map((step, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{step.step}</h4>
                  <Badge
                    className={
                      step.status === "completed"
                        ? "bg-green-600"
                        : step.status === "running"
                          ? "bg-blue-600"
                          : "bg-gray-600"
                    }
                  >
                    {step.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-400">Time: {step.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
