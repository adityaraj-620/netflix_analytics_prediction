"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Download, AlertCircle, CheckCircle } from "lucide-react"

interface UploadResult {
  fileName: string
  totalRows: number
  processedRows: number
  predictions: any[]
  errors: string[]
  processingTime: number
}

export default function BulkDataUpload({ onPrediction }: { onPrediction: (prediction: any) => void }) {
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    setUploadProgress(0)

    // Simulate file processing
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + Math.random() * 15
      })
    }, 200)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock results
      const mockResult: UploadResult = {
        fileName: file.name,
        totalRows: 1000,
        processedRows: 987,
        predictions: [
          { id: 1, type: "Viewership", prediction: "145M views", confidence: 92 },
          { id: 2, type: "Churn Risk", prediction: "Medium Risk", confidence: 87 },
          { id: 3, type: "Content Success", prediction: "78% success", confidence: 91 },
        ],
        errors: ["Row 45: Missing genre field", "Row 123: Invalid date format", "Row 456: Budget value out of range"],
        processingTime: 2.8,
      }

      setUploadResult(mockResult)
      setUploadProgress(100)

      // Add to prediction history
      onPrediction({
        type: "Bulk Upload",
        result: `${mockResult.processedRows}/${mockResult.totalRows} rows processed`,
        timestamp: new Date().toLocaleTimeString(),
        confidence: 95,
      })
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setIsProcessing(false)
      clearInterval(progressInterval)
    }
  }

  const downloadTemplate = () => {
    // Create CSV template
    const csvContent = `content_type,genre,budget,marketing_budget,cast_popularity,director_experience,release_hour,duration
movie,action,150,75,8,12,20,120
series,drama,80,40,7,8,19,45
documentary,educational,25,15,5,15,14,90`

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "netflix_prediction_template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const downloadResults = () => {
    if (!uploadResult) return

    const csvContent = uploadResult.predictions
      .map((p) => `${p.id},${p.type},${p.prediction},${p.confidence}`)
      .join("\n")

    const blob = new Blob([`id,type,prediction,confidence\n${csvContent}`], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "prediction_results.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Upload Interface */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Upload className="h-5 w-5 text-purple-500" />
            Bulk Data Upload & Prediction
          </CardTitle>
          <CardDescription className="text-gray-400">
            Upload CSV files to get predictions for multiple data points at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Download */}
          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-blue-400 font-medium">Download Template</h3>
                <p className="text-blue-200 text-sm">Get the CSV template with required columns</p>
              </div>
              <Button
                onClick={downloadTemplate}
                variant="outline"
                className="border-blue-500 text-blue-400 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Template
              </Button>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-white font-medium">Upload your CSV file</p>
                <p className="text-gray-400 text-sm">Supports CSV files up to 10MB</p>
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={isProcessing}
              />
              <label
                htmlFor="file-upload"
                className={`inline-flex items-center px-4 py-2 mt-4 rounded-md cursor-pointer transition-colors ${
                  isProcessing ? "bg-gray-600 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                } text-white`}
              >
                <FileText className="h-4 w-4 mr-2" />
                {isProcessing ? "Processing..." : "Choose File"}
              </label>
            </div>

            {/* Processing Progress */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Processing file...</span>
                  <span className="text-white">{Math.floor(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {uploadResult && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Processing Results</CardTitle>
                <CardDescription className="text-gray-400">
                  File: {uploadResult.fileName} • Processed in {uploadResult.processingTime}s
                </CardDescription>
              </div>
              <Button onClick={downloadResults} className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Download Results
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-700/30">
                <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{uploadResult.processedRows}</div>
                <div className="text-green-400 text-sm">Successful Predictions</div>
              </div>
              <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-700/30">
                <AlertCircle className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {uploadResult.totalRows - uploadResult.processedRows}
                </div>
                <div className="text-red-400 text-sm">Errors</div>
              </div>
              <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                <FileText className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{uploadResult.totalRows}</div>
                <div className="text-blue-400 text-sm">Total Rows</div>
              </div>
            </div>

            {/* Sample Predictions */}
            <div>
              <h4 className="text-white font-medium mb-3">Sample Predictions</h4>
              <div className="space-y-2">
                {uploadResult.predictions.slice(0, 5).map((pred, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-600">{pred.type}</Badge>
                      <span className="text-white">{pred.prediction}</span>
                    </div>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {pred.confidence}% confidence
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Errors */}
            {uploadResult.errors.length > 0 && (
              <div>
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  Processing Errors
                </h4>
                <div className="space-y-1">
                  {uploadResult.errors.slice(0, 5).map((error, index) => (
                    <div key={index} className="p-2 bg-red-900/20 rounded border border-red-700/30">
                      <span className="text-red-200 text-sm">{error}</span>
                    </div>
                  ))}
                  {uploadResult.errors.length > 5 && (
                    <div className="text-gray-400 text-sm">+{uploadResult.errors.length - 5} more errors...</div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
