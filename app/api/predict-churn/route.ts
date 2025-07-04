import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const inputs = await request.json()

  // Calculate churn probability based on inputs
  let churnScore = 0

  // Subscription months (longer = lower churn)
  const months = Number.parseInt(inputs.subscriptionMonths)
  if (months < 3) churnScore += 30
  else if (months < 12) churnScore += 15
  else if (months > 24) churnScore -= 10

  // Monthly usage (lower usage = higher churn)
  const usage = Number.parseFloat(inputs.monthlyUsage)
  if (usage < 10) churnScore += 25
  else if (usage < 30) churnScore += 10
  else if (usage > 60) churnScore -= 15

  // Session duration
  const sessionDuration = Number.parseFloat(inputs.avgSessionDuration)
  if (sessionDuration < 30) churnScore += 20
  else if (sessionDuration > 90) churnScore -= 10

  // Support tickets (more tickets = higher churn)
  const tickets = Number.parseInt(inputs.supportTickets)
  churnScore += tickets * 8

  // Payment failures
  const failures = Number.parseInt(inputs.paymentFailures)
  churnScore += failures * 15

  // Content rating satisfaction
  const rating = Number.parseFloat(inputs.contentRating)
  if (rating < 3) churnScore += 20
  else if (rating > 4) churnScore -= 10

  // Age group impact
  const ageGroupImpact = {
    "18-25": 5,
    "26-35": -5,
    "36-45": -10,
    "46-55": -5,
    "56+": 10,
  }
  churnScore += ageGroupImpact[inputs.ageGroup as keyof typeof ageGroupImpact] || 0

  // Subscription tier
  const tierImpact = {
    basic: 10,
    standard: 0,
    premium: -15,
  }
  churnScore += tierImpact[inputs.subscriptionTier as keyof typeof tierImpact] || 0

  // Normalize to 0-100
  const churnProbability = Math.max(0, Math.min(100, Math.floor(churnScore + Math.random() * 10)))

  let riskLevel: "Low" | "Medium" | "High" = "Low"
  if (churnProbability > 70) riskLevel = "High"
  else if (churnProbability > 40) riskLevel = "Medium"

  const riskFactors = [
    { factor: "Usage Frequency", score: usage < 20 ? 80 : usage < 40 ? 40 : 20 },
    { factor: "Support Issues", score: tickets * 20 },
    { factor: "Payment Problems", score: failures * 25 },
    { factor: "Content Satisfaction", score: rating < 3 ? 70 : rating < 4 ? 30 : 10 },
    { factor: "Subscription Length", score: months < 6 ? 60 : months < 12 ? 30 : 15 },
  ]

  const recommendations = [
    "Offer personalized content recommendations",
    "Provide customer support outreach",
    "Consider retention discount offer",
    "Improve content discovery experience",
    "Send engagement re-activation campaigns",
  ]

  return NextResponse.json({
    churnProbability,
    riskLevel,
    riskFactors,
    recommendations,
  })
}
