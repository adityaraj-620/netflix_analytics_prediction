import { NextResponse } from "next/server"

export async function GET() {
  const data = [
    { genre: "Drama", views: 2840, content: 3200 },
    { genre: "Comedy", views: 2650, content: 2800 },
    { genre: "Action", views: 2420, content: 2100 },
    { genre: "Thriller", views: 2180, content: 1900 },
    { genre: "Romance", views: 1950, content: 2400 },
    { genre: "Horror", views: 1720, content: 1200 },
    { genre: "Sci-Fi", views: 1580, content: 800 },
    { genre: "Documentary", views: 1340, content: 1500 },
    { genre: "Animation", views: 1120, content: 600 },
    { genre: "Crime", views: 980, content: 700 },
  ]

  return NextResponse.json(data)
}
