import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const inputs = await request.json()

  // Calculate success score based on inputs
  let successScore = 50 // Base score

  // Budget impact
  const budget = Number.parseFloat(inputs.budget)
  if (budget > 200) successScore += 15
  else if (budget > 100) successScore += 10
  else if (budget < 20) successScore -= 10

  // Cast popularity
  const castPopularity = Number.parseFloat(inputs.castPopularity)
  successScore += (castPopularity - 5) * 4

  // Director experience
  const directorExp = Number.parseFloat(inputs.directorExperience)
  if (directorExp > 15) successScore += 10
  else if (directorExp > 10) successScore += 5
  else if (directorExp < 3) successScore -= 5

  // Genre impact
  const genreImpact = {
    action: 10,
    comedy: 5,
    drama: 8,
    horror: -2,
    romance: 3,
    "sci-fi": 12,
    thriller: 7,
    documentary: -5,
  }
  successScore += genreImpact[inputs.genre as keyof typeof genreImpact] || 0

  // Studio impact
  const studioImpact = {
    "netflix-originals": 15,
    "major-studio": 10,
    independent: -5,
    international: 0,
  }
  successScore += studioImpact[inputs.productionStudio as keyof typeof studioImpact] || 0

  // Marketing budget
  const marketingBudget = Number.parseFloat(inputs.marketingBudget)
  successScore += (marketingBudget / budget) * 20

  // Add randomness
  successScore += Math.random() * 10 - 5

  // Normalize to 0-100
  successScore = Math.max(0, Math.min(100, Math.floor(successScore)))

  // Generate other metrics based on success score
  const predictedRating = 2.5 + (successScore / 100) * 2.5
  const predictedViews = (successScore / 100) * 300000000 + 50000000
  const revenueProjection = budget * (1 + (successScore / 100) * 3)

  const successFactors = [
    { factor: "Cast Appeal", score: Math.floor(castPopularity * 10) },
    { factor: "Director Track Record", score: Math.min(100, Math.floor(directorExp * 5)) },
    {
      factor: "Genre Popularity",
      score: Math.max(0, 60 + (genreImpact[inputs.genre as keyof typeof genreImpact] || 0) * 3),
    },
    { factor: "Production Value", score: Math.min(100, Math.floor((budget / 200) * 80)) },
    { factor: "Marketing Reach", score: Math.min(100, Math.floor((marketingBudget / 100) * 70)) },
  ]

  const marketingRecommendations = [
    "Focus on social media engagement campaigns",
    "Partner with influencers in target demographic",
    "Leverage cast popularity for promotional events",
    "Create behind-the-scenes content for buzz",
    "Target genre-specific communities and forums",
  ]

  return NextResponse.json({
    successScore,
    predictedRating,
    predictedViews,
    revenueProjection,
    successFactors,
    marketingRecommendations,
    competitorAnalysis: [
      { competitor: "Similar Genre Hit", similarity: 78 },
      { competitor: "Same Director's Last Film", similarity: 65 },
      { competitor: "Cast's Previous Work", similarity: 72 },
    ],
  })
}
