import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const stats = {
    totalUsers: 247500000,
    totalContent: 15847,
    totalViews: 8920000000,
    avgRating: 4.2,
  }

  return NextResponse.json(stats)
}
