import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import FavoriteMoviesRow from "@/components/FavoriteMoviesRow";
import { connectToDatabase } from "@/lib/mongodb";

import fs from "fs";
import path from "path";

// Server Component
export default async function HomePage() {
  // Kết nối DB và lấy dữ liệu
  const { db } = await connectToDatabase();
  const moviesCol = db.collection("movies");

  // Đọc danh sách phim có ảnh từ file poster_map.json
  let validMovieIds: number[] = [];
  try {
    const posterMapPath = path.join(process.cwd(), 'public', 'poster_map.json');
    const data = fs.readFileSync(posterMapPath, 'utf8');
    const map = JSON.parse(data);
    validMovieIds = Object.keys(map).map(id => parseInt(id, 10));
  } catch(e) {
    console.error("Failed to load poster_map.json", e);
  }

  // Hàm helper để map _id -> movie_id theo đúng giao diện
  const mapMovie = (m: any) => ({
    ...m,
    movie_id: m._id,
    _id: undefined,
  });

  const query = validMovieIds.length > 0 ? { _id: { $in: validMovieIds } } : {};

  // Lấy các phim chắc chắn CÓ ẢNH
  const popularRaw = await moviesCol.find(query as any).limit(10).toArray();
  const actionRaw = await moviesCol.find(query as any).skip(10).limit(10).toArray();
  const dramaRaw = await moviesCol.find(query as any).skip(20).limit(10).toArray();
  const comedyRaw = await moviesCol.find(query as any).skip(30).limit(10).toArray();

  const POPULAR_MOVIES = popularRaw.map(mapMovie);
  const ACTION_MOVIES = actionRaw.map(mapMovie);
  const DRAMA_MOVIES = dramaRaw.map(mapMovie);
  const COMEDY_MOVIES = comedyRaw.map(mapMovie);

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans antialiased selection:bg-orange-600 selection:text-white">
      <Navbar />
      <div className="pt-16">
        <AdBanner />
        <HeroBanner />

        {/* Client Component hiển thị phim yêu thích */}
        <FavoriteMoviesRow />

        <MovieRow
          title="Phim Phổ Biến"
          subtitle="Được xem nhiều nhất tuần qua"
          movies={POPULAR_MOVIES}
          id="popular"
          accentColor="bg-red-600"
          showTop10={true}
        />

        <MovieRow
          title="Hành Động Kịch Tính"
          subtitle="Các pha hành động mãn nhãn"
          movies={ACTION_MOVIES}
          accentColor="bg-orange-500"
        />

        <MovieRow
          title="Kinh Điển Vượt Thời Gian"
          subtitle="Những tác phẩm để đời"
          movies={DRAMA_MOVIES}
          accentColor="bg-yellow-500"
        />

        <MovieRow
          title="Hài Hước Vui Nhộn"
          subtitle="Xả stress cuối tuần"
          movies={COMEDY_MOVIES}
          accentColor="bg-green-500"
        />

        <Footer />
      </div>
    </div>
  );
}
