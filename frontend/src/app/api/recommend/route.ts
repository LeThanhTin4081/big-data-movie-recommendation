import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getRecommendations } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
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
    // Sử dụng truy vấn linh hoạt hỗ trợ cả kiểu số (number) và chuỗi (string) cho userId / user_id
    const userRecDoc = await db.collection(collectionName).findOne({
      $or: [
        { userId: userId },
        { userId: userIdStr },
        { user_id: userId },
        { user_id: userIdStr }
      ]
    });

    let movies = [];

    if (userRecDoc) {
      // Tìm xem danh sách phim nằm ở trường nào (movies, recommendations, hoặc movie_details, v.v.)
      movies = userRecDoc.movies || userRecDoc.recommendations || userRecDoc.movie_details || [];
    }

    // 3. Dự phòng (Fallback): Nếu database chưa có dữ liệu hoặc rỗng, tự động lấy dữ liệu Mock từ mock-data
    if (!movies || movies.length === 0) {
      movies = getRecommendations(userId);
    }

    return NextResponse.json({
      success: true,
      userId,
      recommendations: movies,
      source: userRecDoc ? "mongodb" : "fallback_mock_data"
    });
  } catch (error) {
    console.error("Lỗi khi lấy phim gợi ý:", error);
    // Trong trường hợp lỗi database (Ví dụ: Mongo chưa chạy hoặc sai URI), vẫn fallback lấy dữ liệu mock để trang web không bị crash
    try {
      const { searchParams } = new URL(request.url);
      const userIdStr = searchParams.get("userId") || "0";
      const userId = parseInt(userIdStr);
      if (!isNaN(userId) && userId > 0) {
        return NextResponse.json({
          success: true,
          userId,
          recommendations: getRecommendations(userId),
          source: "error_fallback_mock_data"
        });
      }
    } catch (_) {}

    return NextResponse.json(
      { success: false, error: "Lỗi hệ thống khi tải gợi ý phim!" },
      { status: 500 }
    );
  }
}
