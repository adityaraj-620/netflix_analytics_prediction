import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const inputs = await request.json()

  // Calculate revenue based on inputs
  const subscriberBase = Number.parseFloat(inputs.subscriberBase) * 1000000 // Convert to actual number
  const avgPrice = Number.parseFloat(inputs.avgSubscriptionPrice)
  const churnRate = Number.parseFloat(inputs.churnRate) / 100
  const acquisitionCost = Number.parseFloat(inputs.acquisitionCost)
  const contentBudget = Number.parseFloat(inputs.contentBudget) * 1000000
  const marketingSpend = Number.parseFloat(inputs.marketingSpend) * 1000000

  // Regional multipliers
  const regionMultipliers = {
    "north-america": 1.2,
    europe: 1.0,
    "asia-pacific": 0.8,
    "latin-america": 0.6,
    global: 1.1,
  }

  // Seasonality multipliers
  const seasonalityMultipliers = {
    high: 1.3,
    medium: 1.0,
    low: 0.8,
  }

  const regionMultiplier = regionMultipliers[inputs.region as keyof typeof regionMultipliers] || 1
  const seasonalityMultiplier = seasonalityMultipliers[inputs.seasonality as keyof typeof seasonalityMultipliers] || 1

  // Calculate monthly revenue
  const monthlyRevenue = subscriberBase * avgPrice * regionMultiplier * seasonalityMultiplier
  const annualRevenue = monthlyRevenue * 12

  // Calculate costs
  const monthlyCosts = contentBudget + marketingSpend + subscriberBase * churnRate * acquisitionCost
  const monthlyProfit = monthlyRevenue - monthlyCosts
  const profitMargin = (monthlyProfit / monthlyRevenue) * 100

  // Break-even calculation
  const breakEvenPoint = Math.ceil(monthlyCosts / (monthlyRevenue / subscriberBase))

  // Revenue breakdown
  const revenueBreakdown = [
    { category: "Subscriptions", amount: monthlyRevenue / 1000000 },
    { category: "Content Costs", amount: -contentBudget / 1000000 },
    { category: "Marketing", amount: -marketingSpend / 1000000 },
    { category: "Acquisition", amount: -(subscriberBase * churnRate * acquisitionCost) / 1000000 },
  ]

  // 12-month projections with growth
  const projections = []
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  for (let i = 0; i < 12; i++) {
    const growthFactor = 1 + i * 0.02 // 2% monthly growth
    const seasonalFactor = 1 + Math.sin((i / 12) * Math.PI * 2) * 0.1 // Seasonal variation
    const projectedRevenue = monthlyRevenue * growthFactor * seasonalFactor

    projections.push({
      month: months[i],
      revenue: projectedRevenue,
    })
  }

  return NextResponse.json({
    monthlyRevenue,
    annualRevenue,
    profitMargin,
    breakEvenPoint,
    revenueBreakdown,
    projections,
  })
}
