import { NextResponse } from "next/server"

export async function GET() {
  const quality = [
    { metric: "Completeness", score: 94, status: "good" },
    { metric: "Accuracy", score: 87, status: "warning" },
    { metric: "Consistency", score: 92, status: "good" },
    { metric: "Validity", score: 78, status: "critical" },
  ]

  return NextResponse.json(quality)
}
