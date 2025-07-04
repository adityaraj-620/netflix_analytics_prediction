import { NextResponse } from "next/server"

export async function GET() {
  const jobs = [
    {
      id: "job-1",
      modelName: "LSTM Viewership Predictor",
      modelType: "LSTM",
      status: "running",
      progress: Math.floor(Math.random() * 100),
      accuracy: 0.942 + Math.random() * 0.05,
      loss: 0.0234 + Math.random() * 0.01,
      startTime: "2024-01-15 14:30",
      estimatedCompletion: "2024-01-15 16:45",
      datasetSize: 2500000,
    },
    {
      id: "job-2",
      modelName: "Random Forest Churn Model",
      modelType: "Random Forest",
      status: "completed",
      progress: 100,
      accuracy: 0.918 + Math.random() * 0.03,
      loss: 0.0156 + Math.random() * 0.005,
      startTime: "2024-01-15 12:00",
      estimatedCompletion: "2024-01-15 13:30",
      datasetSize: 1800000,
    },
    {
      id: "job-3",
      modelName: "Content Success Predictor",
      modelType: "XGBoost",
      status: "queued",
      progress: 0,
      accuracy: 0,
      loss: 0,
      startTime: "-",
      estimatedCompletion: "2024-01-15 18:00",
      datasetSize: 950000,
    },
  ]

  return NextResponse.json(jobs)
}
