import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const inputs = await request.json()

  // Simulate ML model prediction with realistic logic
  let baseViews = 50000000 // 50M base views

  // Content type impact
  const contentTypeMultiplier = {
    movie: 1.2,
    series: 1.5,
    documentary: 0.7,
    special: 0.9,
  }
  baseViews *= contentTypeMultiplier[inputs.contentType as keyof typeof contentTypeMultiplier] || 1

  // Genre impact
  const genreMultiplier = {
    action: 1.3,
    comedy: 1.1,
    drama: 1.0,
    horror: 0.9,
    romance: 1.1,
    "sci-fi": 1.2,
    thriller: 1.1,
  }
  baseViews *= genreMultiplier[inputs.genre as keyof typeof genreMultiplier] || 1

  // Release hour impact (prime time gets boost)
  const hour = Number.parseInt(inputs.releaseHour)
  if (hour >= 19 && hour <= 22) baseViews *= 1.15
  else if (hour >= 12 && hour <= 18) baseViews *= 1.05
  else baseViews *= 0.9

  // Marketing budget impact
  const marketingBudget = Number.parseFloat(inputs.marketingBudget)
  baseViews *= 1 + (marketingBudget / 100) * 0.3

  // Actor popularity impact
  const actorPopularity = Number.parseFloat(inputs.leadActorPopularity)
  baseViews *= 1 + (actorPopularity / 10) * 0.2

  // Add some randomness
  baseViews *= 0.8 + Math.random() * 0.4

  const predictedViews = Math.floor(baseViews)
  const confidence = Math.floor(85 + Math.random() * 10)

  // Generate impact factors
  const factors = [
    {
      factor: "Content Type",
      impact: Math.floor((contentTypeMultiplier[inputs.contentType as keyof typeof contentTypeMultiplier] - 1) * 100),
    },
    {
      factor: "Genre Appeal",
      impact: Math.floor((genreMultiplier[inputs.genre as keyof typeof genreMultiplier] - 1) * 100),
    },
    { factor: "Release Timing", impact: hour >= 19 && hour <= 22 ? 15 : hour >= 12 && hour <= 18 ? 5 : -10 },
    { factor: "Marketing Budget", impact: Math.floor((marketingBudget / 100) * 30) },
    { factor: "Star Power", impact: Math.floor((actorPopularity / 10) * 20) },
  ]

  // Generate 7-day trend
  const trend = []
  for (let day = 1; day <= 7; day++) {
    const dayViews = (predictedViews * (0.3 + 0.7 * Math.exp(-day * 0.3))) / 1000000
    trend.push({ day, views: Math.round(dayViews * 10) / 10 })
  }

  return NextResponse.json({
    predictedViews,
    confidence,
    factors,
    trend,
  })
}
