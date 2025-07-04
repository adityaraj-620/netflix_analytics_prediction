import { NextResponse } from "next/server"

export async function GET() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const data = months.map((month, index) => {
    const baseChurn = 2.5 + Math.sin((index / 12) * Math.PI * 2) * 0.8
    const predictedChurn = baseChurn + 0.3 + Math.random() * 0.4

    let riskLevel: "Low" | "Medium" | "High" = "Low"
    if (predictedChurn > 3.5) riskLevel = "High"
    else if (predictedChurn > 2.8) riskLevel = "Medium"

    return {
      month,
      churnRate: Math.round(baseChurn * 10) / 10,
      predictedChurn: Math.round(predictedChurn * 10) / 10,
      riskLevel,
    }
  })

  return NextResponse.json(data)
}
