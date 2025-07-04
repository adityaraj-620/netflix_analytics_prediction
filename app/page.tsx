"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Eye, Star } from "lucide-react"
import ViewingTrendsChart from "@/components/viewing-trends-chart"
import GenrePopularityChart from "@/components/genre-popularity-chart"
import UserEngagementChart from "@/components/user-engagement-chart"
import ContentRatingsChart from "@/components/content-ratings-chart"
import RevenueChart from "@/components/revenue-chart"
import TopContentTable from "@/components/top-content-table"
import PredictionsOverview from "@/components/predictions-overview"
import ModelTrainingDashboard from "@/components/model-training-dashboard"
import UserPredictionInterface from "@/components/user-prediction-interface"

interface DashboardStats {
  totalUsers: number
  totalContent: number
  totalViews: number
  avgRating: number
}

export default function NetflixDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard-stats")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-600 text-xl">Loading Netflix Analytics...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Play className="h-8 w-8 text-red-600 fill-current" />
                <h1 className="text-2xl font-bold text-red-600">NETFLIX</h1>
              </div>
              <Badge variant="outline" className="border-red-600 text-red-600">
                Analytics Dashboard
              </Badge>
            </div>
            <div className="text-sm text-gray-400">Real-time streaming insights</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
              <Users className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-green-500">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Content</CardTitle>
              <Play className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.totalContent.toLocaleString()}</div>
              <p className="text-xs text-green-500">+8.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.totalViews.toLocaleString()}</div>
              <p className="text-xs text-green-500">+15.3% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.avgRating.toFixed(1)}</div>
              <p className="text-xs text-green-500">+0.2 from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="trends" className="data-[state=active]:bg-red-600">
              Viewing Trends
            </TabsTrigger>
            <TabsTrigger value="genres" className="data-[state=active]:bg-red-600">
              Genre Analytics
            </TabsTrigger>
            <TabsTrigger value="engagement" className="data-[state=active]:bg-red-600">
              User Engagement
            </TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-red-600">
              Revenue
            </TabsTrigger>
            <TabsTrigger value="predictions" className="data-[state=active]:bg-red-600">
              Predictions
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-red-600">
              Model Training
            </TabsTrigger>
            <TabsTrigger value="user-predictions" className="data-[state=active]:bg-red-600">
              User Predictions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ViewingTrendsChart />
              <ContentRatingsChart />
            </div>
            <TopContentTable />
          </TabsContent>

          <TabsContent value="genres" className="space-y-6">
            <GenrePopularityChart />
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <UserEngagementChart />
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <RevenueChart />
          </TabsContent>
          <TabsContent value="predictions" className="space-y-6">
            <PredictionsOverview />
          </TabsContent>
          <TabsContent value="training" className="space-y-6">
            <ModelTrainingDashboard />
          </TabsContent>
          <TabsContent value="user-predictions" className="space-y-6">
            <UserPredictionInterface />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
