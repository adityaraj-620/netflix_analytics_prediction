import { NextResponse } from "next/server"

export async function GET() {
  const data = []
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views: Math.floor(Math.random() * 50) + 150,
      hours: Math.floor(Math.random() * 30) + 80,
    })
  }

  return NextResponse.json(data)
}
