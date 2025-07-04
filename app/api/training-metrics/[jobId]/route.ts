import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { jobId: string } }) {
  // Generate realistic training metrics
  const metrics = []

  for (let epoch = 1; epoch <= 50; epoch++) {
    const trainLoss = 0.8 * Math.exp(-epoch * 0.1) + Math.random() * 0.1
    const valLoss = trainLoss + 0.05 + Math.random() * 0.05
    const trainAccuracy = 1 - trainLoss + Math.random() * 0.05
    const valAccuracy = trainAccuracy - 0.02 + Math.random() * 0.03

    metrics.push({
      epoch,
      trainLoss: Math.max(0, trainLoss),
      valLoss: Math.max(0, valLoss),
      trainAccuracy: Math.min(1, Math.max(0, trainAccuracy)),
      valAccuracy: Math.min(1, Math.max(0, valAccuracy)),
    })
  }

  return NextResponse.json(metrics)
}
