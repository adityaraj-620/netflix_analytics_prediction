import { NextResponse } from "next/server"

export async function GET() {
  const data = [
    { rating: "G", count: 1200, percentage: 8 },
    { rating: "PG", count: 2800, percentage: 18 },
    { rating: "PG-13", count: 4500, percentage: 28 },
    { rating: "R", count: 5200, percentage: 33 },
    { rating: "NC-17", count: 2147, percentage: 13 },
  ]

  return NextResponse.json(data)
}
