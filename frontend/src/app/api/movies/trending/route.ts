import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const genre = searchParams.get("genre");
    const limit = parseInt(searchParams.get("limit") || "5");

    const { db } = await connectToDatabase();
    const moviesCol = db.collection("movies");
    
    let query = {};
    if (genre && genre !== "All") {
      query = { genres: genre };
    }
    
    // Fetch top 5 movies matching genre
    const moviesRaw = await moviesCol.find(query as any).limit(limit).toArray();
    
    // Map _id to movie_id
    const movies = moviesRaw.map(m => ({
      ...m,
      movie_id: m._id,
      _id: undefined,
    }));

    return NextResponse.json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return NextResponse.json({ success: false, movies: [] }, { status: 500 });
  }
}
