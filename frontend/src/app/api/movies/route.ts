import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids");
    
    if (!idsParam) {
      return NextResponse.json({ movies: [] });
    }

    const ids = idsParam.split(",").map(id => parseInt(id.trim())).filter(id => !isNaN(id));

    if (ids.length === 0) {
      return NextResponse.json({ movies: [] });
    }

    const { db } = await connectToDatabase();
    const moviesCol = db.collection("movies");
    
    // Fetch movies matching IDs (using 'as any' to bypass TypeScript ObjectId check)
    const moviesRaw = await moviesCol.find({ _id: { $in: ids } } as any).toArray();
    
    // Map _id to movie_id
    const movies = moviesRaw.map(m => ({
      ...m,
      movie_id: m._id,
      _id: undefined,
    }));

    return NextResponse.json({ movies });
  } catch (error) {
    console.error("Error fetching movies by ids:", error);
    return NextResponse.json({ movies: [] }, { status: 500 });
  }
}
