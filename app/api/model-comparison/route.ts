import { NextResponse } from "next/server"

export async function GET() {
  // Mocked normalized metrics (0-1 scale) to populate radar chart
  const comparison = [
    {
      metric: "accuracy",
      Viewership_LSTM: 0.94,
      Churn_RF: 0.92,
      Content_XGBoost: 0.87,
    },
    {
      metric: "precision",
      Viewership_LSTM: 0.91,
      Churn_RF: 0.9,
      Content_XGBoost: 0.86,
    },
    {
      metric: "recall",
      Viewership_LSTM: 0.93,
      Churn_RF: 0.89,
      Content_XGBoost: 0.85,
    },
    {
      metric: "f1",
      Viewership_LSTM: 0.92,
      Churn_RF: 0.895,
      Content_XGBoost: 0.853,
    },
  ]

  return NextResponse.json(comparison)
}
