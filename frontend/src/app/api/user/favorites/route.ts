import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { userId, favorites } = await request.json();
    if (!userId || !Array.isArray(favorites)) {
      return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    await db.collection("users").updateOne(
      { userId: userId },
      { $set: { favorite_movies: favorites } }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lỗi khi lưu phim yêu thích:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get("userId") || "0");
    
    if (!userId) {
      return NextResponse.json({ success: false, error: "Missing userId" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ userId: userId });
    
    return NextResponse.json({ 
      success: true, 
      favorites: user?.favorite_movies || [] 
    });
  } catch (err) {
    console.error("Lỗi khi lấy phim yêu thích:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
