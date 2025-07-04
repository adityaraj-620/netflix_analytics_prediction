import { NextResponse } from "next/server"

export async function GET() {
  const groups = [
    {
      name: "User Behavior Features",
      features: [
        "user_watch_time",
        "user_age_group",
        "user_subscription_days",
        "user_engagement_score",
        "user_location_cluster",
      ],
      performance: 89.2,
      status: "active",
    },
    {
      name: "Content Features",
      features: [
        "content_genre_encoded",
        "content_rating_score",
        "content_release_year",
        "content_duration_mins",
        "content_popularity_rank",
      ],
      performance: 84.7,
      status: "active",
    },
    {
      name: "Temporal Features",
      features: ["viewing_hour_sin", "seasonal_trend", "content_release_date"],
      performance: 76.3,
      status: "testing",
    },
    {
      name: "Device & Platform",
      features: ["device_type_encoded", "platform_version", "connection_quality"],
      performance: 71.8,
      status: "active",
    },
    {
      name: "Experimental Features",
      features: ["user_churn_risk", "content_virality_score", "social_engagement"],
      performance: 68.4,
      status: "testing",
    },
  ]

  return NextResponse.json(groups)
}
