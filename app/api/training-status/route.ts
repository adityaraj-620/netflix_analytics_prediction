import { NextResponse } from "next/server"

export async function GET() {
  // Simulate training status
  const statuses = ["idle", "running", "completed", "error"]
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

  const data = {
    status: randomStatus,
    activeModels: Math.floor(Math.random() * 5) + 1,
  }

  return NextResponse.json(data)
}
