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

      // 1. TOP 5 PHIM THỊNH HÀNH NHẤT (Cố định từ Ảnh 1)
      // Star Wars (1977)=50, Contact (1997)=258, Fargo (1996)=100, Return of the Jedi (1983)=181, Liar Liar (1997)=294
      const popularMovieIds = [50, 258, 100, 181, 294];
      const popularMoviesDocs = await db.collection("movies").find({ _id: { $in: popularMovieIds } } as any).toArray();
      const top5Movies = popularMovieIds.map(id => popularMoviesDocs.find((m: any) => m._id == id)).filter(Boolean);

      // 2. TOP 5 PHIM BẠN CÓ THỂ THÍCH (Cố định theo UserId và Thể loại)
      let matchStage: any = { _id: { $nin: popularMovieIds } }; // XÓA điều kiện validMovieIds để chấp nhận phim không ảnh

      if (genre) {
        // Ánh xạ từ tiếng Việt sang tiếng Anh do database lưu bằng tiếng Anh
        const genreMap: Record<string, string> = {
          "Hành động": "Action",
          "Phiêu lưu": "Adventure",
          "Hoạt hình": "Animation",
          "Trẻ em": "Children's",
          "Hài hước": "Comedy",
          "Tội phạm": "Crime",
          "Tài liệu": "Documentary",
          "Tâm lý": "Drama",
          "Viễn tưởng": "Fantasy",
          "Phim đen": "Film-Noir",
          "Kinh dị": "Horror",
          "Âm nhạc": "Musical",
          "Bí ẩn": "Mystery",
          "Tình cảm": "Romance",
          "Khoa học viễn tưởng": "Sci-Fi",
          "Giật gân": "Thriller",
          "Chiến tranh": "War",
          "Viễn tây": "Western"
        };
        const searchGenre = genreMap[genre] || genre;
        matchStage.genres = { $regex: searchGenre, $options: "i" };
      }

      let genreMovies = await db.collection("movies").find(matchStage as any).toArray();

      // Nếu vẫn ít hơn 5 phim (ví dụ thể loại quá hiếm), lấy random các phim khác
      if (!genreMovies || genreMovies.length < 5) {
        genreMovies = await db.collection("movies").find({ _id: { $nin: popularMovieIds } } as any).toArray();
      }

      // Hàm bốc ngẫu nhiên nhưng CỐ ĐỊNH theo userId và Thể loại
      let selectedGenreMovies = [];
      const uid = parseInt(userIdStr) || 1;

      // Khởi tạo seed từ userId và genre để mỗi user+genre luôn ra cùng 1 kết quả
      let seed = uid;
      if (genre) {
        for (let i = 0; i < genre.length; i++) {
          seed = (seed * 31 + genre.charCodeAt(i)) % 1000000;
        }
      }

      // Linear congruential generator (LCG)
      let available = [...genreMovies];
      for (let i = 0; i < 5 && available.length > 0; i++) {
        seed = (seed * 9301 + 49297) % 233280;
        const idx = seed % available.length;
        selectedGenreMovies.push(available[idx]);
        available.splice(idx, 1);
      }

      // Gộp lại thành 10 phim
      const finalMovies = [...top5Movies, ...selectedGenreMovies];

      movies = finalMovies.map((m: any) => ({
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
