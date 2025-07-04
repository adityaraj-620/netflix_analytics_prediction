import { NextResponse } from "next/server"

export async function GET() {
  const data = []

  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0") + ":00"
    const baseUsers = 800 + Math.sin(((i - 6) * Math.PI) / 12) * 400
    const activeUsers = Math.max(200, Math.floor(baseUsers + Math.random() * 100))
    const newSignups = Math.floor(Math.random() * 50) + 10

    data.push({
      hour,
      activeUsers,
      newSignups,
    })
  }

  return NextResponse.json(data)
}
