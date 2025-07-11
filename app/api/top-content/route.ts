import { NextResponse } from "next/server"

export async function GET() {
  const content = [
    {
      id: 1,
      title: "Stranger Things 4",
      type: "Series" as const,
      genre: "Sci-Fi",
      rating: 4.8,
      views: 286000000,
      releaseYear: 2022,
    },
    {
      id: 2,
      title: "Wednesday",
      type: "Series" as const,
      genre: "Comedy",
      rating: 4.6,
      views: 252000000,
      releaseYear: 2022,
    },
    {
      id: 3,
      title: "Glass Onion",
      type: "Movie" as const,
      genre: "Mystery",
      rating: 4.4,
      views: 209000000,
      releaseYear: 2022,
    },
    {
      id: 4,
      title: "The Crown",
      type: "Series" as const,
      genre: "Drama",
      rating: 4.7,
      views: 198000000,
      releaseYear: 2022,
    },
    {
      id: 5,
      title: "Dahmer",
      type: "Series" as const,
      genre: "Crime",
      rating: 4.3,
      views: 196000000,
      releaseYear: 2022,
    },
    {
      id: 6,
      title: "The Gray Man",
      type: "Movie" as const,
      genre: "Action",
      rating: 4.1,
      views: 188000000,
      releaseYear: 2022,
    },
    {
      id: 7,
      title: "Ozark",
      type: "Series" as const,
      genre: "Thriller",
      rating: 4.5,
      views: 175000000,
      releaseYear: 2022,
    },
    {
      id: 8,
      title: "Purple Hearts",
      type: "Movie" as const,
      genre: "Romance",
      rating: 4.2,
      views: 165000000,
      releaseYear: 2022,
    },
    {
      id: 9,
      title: "The Umbrella Academy",
      type: "Series" as const,
      genre: "Sci-Fi",
      rating: 4.4,
      views: 158000000,
      releaseYear: 2022,
    },
    {
      id: 10,
      title: "Enola Holmes 2",
      type: "Movie" as const,
      genre: "Adventure",
      rating: 4.3,
      views: 142000000,
      releaseYear: 2022,
    },
  ]

  return NextResponse.json(content)
}
