"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Wrench, TrendingUp, Zap, CheckCircle } from "lucide-react"

interface Feature {
  name: string
  type: "numerical" | "categorical" | "temporal" | "derived"
  importance: number
  correlation: number
  status: "active" | "inactive" | "testing"
  engineered: boolean
}

interface FeatureGroup {
  name: string
  features: string[]
  performance: number
  status: "active" | "testing" | "deprecated"
}

export default function FeatureEngineering() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [featureGroups, setFeatureGroups] = useState<FeatureGroup[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuresRes, groupsRes] = await Promise.all([fetch("/api/features"), fetch("/api/feature-groups")])

        const featuresData = await featuresRes.json()
        const groupsData = await groupsRes.json()

        setFeatures(featuresData)
        setFeatureGroups(groupsData)
      } catch (error) {
        console.error("Error fetching feature data:", error)
      }
    }

    fetchData()
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "numerical":
        return "bg-blue-600 hover:bg-blue-700"
      case "categorical":
        return "bg-green-600 hover:bg-green-700"
      case "temporal":
        return "bg-purple-600 hover:bg-purple-700"
      case "derived":
        return "bg-orange-600 hover:bg-orange-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600 hover:bg-green-700"
      case "testing":
        return "bg-yellow-600 hover:bg-yellow-700"
      case "inactive":
      case "deprecated":
        return "bg-red-600 hover:bg-red-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  const chartConfig = {
    importance: {
      label: "Feature Importance",
      color: "#dc2626",
    },
  }

  return (
    <div className="space-y-6">
      {/* Feature Engineering Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Features</CardTitle>
            <Wrench className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{features.length}</div>
            <p className="text-xs text-green-500">+12 new features</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Engineered Features</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{features.filter((f) => f.engineered).length}</div>
            <p className="text-xs text-green-500">67% of total</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Features</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{features.filter((f) => f.status === "active").length}</div>
            <p className="text-xs text-green-500">89% active rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Avg Importance</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {(features.reduce((sum, f) => sum + f.importance, 0) / features.length).toFixed(2)}
            </div>
            <p className="text-xs text-green-500">+0.15 improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Importance Chart */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Feature Importance Ranking</CardTitle>
          <CardDescription className="text-gray-400">
            Top performing features ranked by importance score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={features.slice(0, 15).sort((a, b) => b.importance - a.importance)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="importance" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Feature Details */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Feature Catalog</CardTitle>
          <CardDescription className="text-gray-400">
            Detailed view of all features and their properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-white font-medium">{feature.name}</h3>
                    <Badge className={getTypeColor(feature.type)}>{feature.type}</Badge>
                    <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                    {feature.engineered && (
                      <Badge variant="outline" className="border-orange-500 text-orange-400">
                        Engineered
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-gray-400">
                      Importance: <span className="text-white font-medium">{feature.importance.toFixed(3)}</span>
                    </div>
                    <div className="text-gray-400">
                      Correlation: <span className="text-white font-medium">{feature.correlation.toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Groups */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Feature Groups</CardTitle>
          <CardDescription className="text-gray-400">Organized feature sets for different model types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureGroups.map((group, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">{group.name}</h3>
                  <Badge className={getStatusColor(group.status)}>{group.status}</Badge>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="text-sm text-gray-400">Features: {group.features.length}</div>
                  <div className="text-sm text-gray-400">
                    Performance: <span className="text-white font-medium">{group.performance.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {group.features.slice(0, 3).map((featureName, idx) => (
                    <div key={idx} className="text-xs text-gray-400">
                      • {featureName}
                    </div>
                  ))}
                  {group.features.length > 3 && (
                    <div className="text-xs text-gray-500">+{group.features.length - 3} more...</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
