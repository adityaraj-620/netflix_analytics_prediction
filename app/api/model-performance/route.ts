import { NextResponse } from "next/server"

export async function GET() {
  // Mock performance metrics for demo purposes
  const metrics = [
    {
      model: "Viewership-LSTM",
      accuracy: 0.942,
      precision: 0.913,
      recall: 0.927,
      f1: 0.92,
    },
    {
      model: "Churn-RF",
      accuracy: 0.918,
      precision: 0.902,
      recall: 0.889,
      f1: 0.895,
    },
    {
      model: "Content-XGBoost",
      accuracy: 0.873,
      precision: 0.861,
      recall: 0.845,
      f1: 0.853,
    },
  ]

  return NextResponse.json(metrics)
}
