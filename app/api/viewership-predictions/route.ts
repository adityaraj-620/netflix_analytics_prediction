import { NextResponse } from "next/server"

export async function GET() {
  const data = []
  const today = new Date()

  // Historical data (past 30 days)
  for (let i = 30; i >= 1; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      actual: Math.floor(Math.random() * 50) + 150,
      predicted: null,
      confidence: null,
      type: "historical",
    })
  }

  // Today marker
  data.push({
    date: "Today",
    actual: Math.floor(Math.random() * 50) + 150,
    predicted: Math.floor(Math.random() * 50) + 150,
    confidence: 95,
    type: "forecast",
  })

  // Future predictions (next 30 days)
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)

    const baseValue = 170 + Math.sin((i / 30) * Math.PI * 2) * 20
    const predicted = Math.floor(baseValue + Math.random() * 20)
    const confidence = Math.max(60, 95 - i * 1.2)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      actual: null,
      predicted,
      confidence: Math.floor(confidence),
      type: "forecast",
    })
  }

  return NextResponse.json(data)
}
