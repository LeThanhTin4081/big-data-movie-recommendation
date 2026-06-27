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

    // Đọc danh sách các ID phim có ảnh (poster) hợp lệ
    let validMovieIds: number[] = [];
    try {
      const fs = require('fs');
      const path = require('path');
      const posterMapPath = path.join(process.cwd(), 'public', 'poster_map.json');
      const mapData = JSON.parse(fs.readFileSync(posterMapPath, 'utf8'));
      validMovieIds = Object.keys(mapData).map(id => parseInt(id, 10));
    } catch (e) {
      console.error("Failed to load poster_map.json in API", e);
    }

    if (userRecDoc && (userRecDoc.recommendations?.length > 0 || userRecDoc.movies?.length > 0)) {
      let rawMovies = userRecDoc.recommendations || userRecDoc.movies || [];
      // Lọc bỏ các phim KHÔNG có ảnh
      movies = rawMovies.filter((m: any) => validMovieIds.includes(m.movie_id));
      
      // Nếu sau khi lọc mà bị thiếu (nhỏ hơn 10 phim), ta bù thêm bằng các phim phổ biến CÓ ẢNH
      if (movies.length < 10) {
        const needed = 10 - movies.length;
        const existingIds = movies.map((m: any) => m.movie_id);
        const fallbackMovies = await db.collection("movies").aggregate([
          { $match: { _id: { $in: validMovieIds, $nin: existingIds } } },
          { $sample: { size: needed } }
        ]).toArray();
        
        const mappedFallback = fallbackMovies.map(m => ({
          movie_id: m._id,
          title: m.title,
          rating: 4.5,
          genres: m.genres,
          poster_url: "placeholder.com"
        }));
        movies = [...movies, ...mappedFallback];
      }
    } else {
      // COLD START PROBLEM: Người dùng mới
      isColdStart = true;
      const genre = searchParams.get("genre");

      let aggregatePipeline: any[] = [];
      let matchStage: any = { _id: { $in: validMovieIds } }; // Đảm bảo luôn CÓ ẢNH

      if (genre) {
        matchStage.genres = { $regex: genre, $options: "i" };
      }
      
      aggregatePipeline.push({ $match: matchStage });
      aggregatePipeline.push({ $sample: { size: 10 } });

      // Lấy ngẫu nhiên phim theo thể loại (đảm bảo có ảnh)
      let popularMovies = await db.collection("movies").aggregate(aggregatePipeline).toArray();

      // Nếu database chưa cập nhật thể loại (trả về rỗng), lấy ngẫu nhiên 10 phim CÓ ẢNH
      if (!popularMovies || popularMovies.length < 10) {
        popularMovies = await db.collection("movies").aggregate([
          { $match: { _id: { $in: validMovieIds } } },
          { $sample: { size: 10 } }
        ]).toArray();
      }

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
