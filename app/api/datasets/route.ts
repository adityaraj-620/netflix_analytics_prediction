import { NextResponse } from "next/server"

export async function GET() {
  const datasets = [
    {
      name: "Netflix Viewership Data",
      size: 15000000,
      features: 47,
      missingValues: 125000,
      duplicates: 8500,
      outliers: 45000,
      status: "cleaned",
      lastUpdated: "2 hours ago",
    },
    {
      name: "User Behavior Dataset",
      size: 8500000,
      features: 32,
      missingValues: 89000,
      duplicates: 12000,
      outliers: 28000,
      status: "processing",
      lastUpdated: "30 mins ago",
    },
    {
      name: "Content Metadata",
      size: 2100000,
      features: 28,
      missingValues: 15000,
      duplicates: 3200,
      outliers: 8500,
      status: "raw",
      lastUpdated: "1 day ago",
    },
  ]

  return NextResponse.json(datasets)
}
