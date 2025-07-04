import { NextResponse } from "next/server"

export async function GET() {
  const quarters = [
    "Q1 2023",
    "Q2 2023",
    "Q3 2023",
    "Q4 2023",
    "Q1 2024",
    "Q2 2024",
    "Q3 2024",
    "Q4 2024",
    "Q1 2025",
    "Q2 2025",
    "Q3 2025",
    "Q4 2025",
  ]

  const data = quarters.map((quarter, index) => {
    const isHistorical = index < 8
    const baseRevenue = 7.5 + index * 0.3 + Math.sin((index / 4) * Math.PI) * 0.5
    const baseSubscribers = 240 + index * 8 + Math.random() * 5

    return {
      quarter,
      actualRevenue: isHistorical ? Math.round(baseRevenue * 10) / 10 : null,
      predictedRevenue: !isHistorical ? Math.round((baseRevenue + 0.2) * 10) / 10 : null,
      subscribers: Math.floor(baseSubscribers),
      confidence: !isHistorical ? Math.floor(95 - (index - 7) * 2) : null,
    }
  })

  return NextResponse.json(data)
}
