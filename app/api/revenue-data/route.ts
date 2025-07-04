import { NextResponse } from "next/server"

export async function GET() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const data = months.map((month, index) => ({
    month,
    revenue: 7500 + Math.floor(Math.random() * 1000) + index * 50,
    subscribers: 240 + Math.floor(Math.random() * 20) + index * 2,
    churnRate: 2.5 + Math.random() * 1.5,
  }))

  return NextResponse.json(data)
}
