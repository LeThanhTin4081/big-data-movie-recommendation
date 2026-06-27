import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userIdStr = searchParams.get("userId");

    if (!userIdStr) {
      return NextResponse.json(
        { success: false, error: "Vui lòng cung cấp User ID!" },
        { status: 400 }
      );
    }

    const userId = parseInt(userIdStr);
    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: "User ID phải là một số nguyên hợp lệ!" },
        { status: 400 }
      );
    }

    // 1. Kết nối cơ sở dữ liệu MongoDB
    const { db } = await connectToDatabase();
    const collectionName = process.env.MONGO_COLLECTION_NAME || "user_recommendations";

    // 2. Tìm kiếm thông tin gợi ý trong database
    // Dữ liệu mới được nạp vào MongoDB lấy _id là userId (số nguyên)
    const userRecDoc = await db.collection(collectionName).findOne({
      $or: [
        { _id: userId },
        { userId: userId },
        { user_id: userId }
      ]
    } as any);

    let movies = [];
    let isColdStart = false;

    if (userRecDoc && (userRecDoc.recommendations?.length > 0 || userRecDoc.movies?.length > 0)) {
      movies = userRecDoc.recommendations || userRecDoc.movies || [];
    } else {
      // COLD START PROBLEM: Người dùng mới (ID > 943) chưa có trong tập train
      isColdStart = true;
      // Lấy ngẫu nhiên 10 phim nổi bật từ bảng movies để gợi ý
      const popularMovies = await db.collection("movies").aggregate([
        { $sample: { size: 10 } }
      ]).toArray();

      movies = popularMovies.map(m => ({
        movie_id: m._id,
        title: m.title,
        rating: 5.0, // Điểm ảo cho phim top
        genres: m.genres,
        poster_url: "placeholder.com"
      }));
    }

    return NextResponse.json({
      success: true,
      userId,
      recommendations: movies,
      isColdStart,
      source: "mongodb"
    });
  } catch (error) {
    console.error("Lỗi khi lấy phim gợi ý:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi hệ thống khi tải gợi ý phim!" },
      { status: 500 }
    );
  }
}
