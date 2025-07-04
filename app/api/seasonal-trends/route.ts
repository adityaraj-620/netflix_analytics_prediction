import { NextResponse } from "next/server"

export async function GET() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const data = months.map((month, index) => {
    // Seasonal patterns based on typical streaming behavior
    const viewingBase = 100 + Math.sin((index / 12) * Math.PI * 2) * 25
    const signupBase = 100 + Math.sin(((index + 1) / 12) * Math.PI * 2) * 30
    const engagementBase = 100 + Math.sin(((index - 1) / 12) * Math.PI * 2) * 20

    return {
      month,
      viewingIndex: Math.floor(viewingBase + Math.random() * 10),
      signupIndex: Math.floor(signupBase + Math.random() * 10),
      engagementIndex: Math.floor(engagementBase + Math.random() * 10),
    }
  })

  return NextResponse.json(data)
}
