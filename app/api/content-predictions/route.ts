import { NextResponse } from "next/server"

export async function GET() {
  const content = [
    {
      id: 1,
      title: "Quantum Horizons",
      type: "Series" as const,
      genre: "Sci-Fi",
      releaseDate: "March 15, 2025",
      predictedRating: 4.6,
      predictedViews: 185000000,
      successProbability: 87,
      riskFactors: [
        "High production costs may impact ROI",
        "Niche sci-fi audience",
        "Competition with similar releases",
      ],
      recommendations: [
        "Target marketing to sci-fi enthusiasts",
        "Release during low-competition window",
        "Leverage social media buzz campaigns",
      ],
    },
    {
      id: 2,
      title: "The Last Detective",
      type: "Movie" as const,
      genre: "Crime",
      releaseDate: "April 8, 2025",
      predictedRating: 4.2,
      predictedViews: 142000000,
      successProbability: 73,
      riskFactors: ["Saturated crime genre market", "Limited international appeal", "Aging target demographic"],
      recommendations: [
        "Focus on domestic marketing",
        "Emphasize unique story elements",
        "Partner with crime podcast networks",
      ],
    },
    {
      id: 3,
      title: "Love in Tokyo",
      type: "Series" as const,
      genre: "Romance",
      releaseDate: "February 14, 2025",
      predictedRating: 4.4,
      predictedViews: 198000000,
      successProbability: 91,
      riskFactors: ["Cultural localization challenges", "Subtitle dependency for global audience"],
      recommendations: [
        "Invest in high-quality dubbing",
        "Leverage Valentine's Day release timing",
        "Target Asian diaspora communities",
      ],
    },
  ]

  return NextResponse.json(content)
}
