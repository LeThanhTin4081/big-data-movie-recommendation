import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { connectToDatabase } from "@/lib/mongodb";

// Server Component
export default async function HomePage() {
  // Kết nối DB và lấy dữ liệu
  const { db } = await connectToDatabase();
  const moviesCol = db.collection("movies");

  // Hàm helper để map _id -> movie_id theo đúng giao diện
  const mapMovie = (m: any) => ({
    ...m,
    movie_id: m._id,
    _id: undefined,
  });

  // Vì data thực tế hiện tại chưa có chia thể loại, lấy ngẫu nhiên 4 danh sách
  // Ở hệ thống thực tế sẽ dùng aggregate $match thể loại và $sort
  const popularRaw = await moviesCol.find({}).limit(10).toArray();
  const actionRaw = await moviesCol.find({}).skip(10).limit(10).toArray();
  const dramaRaw = await moviesCol.find({}).skip(20).limit(10).toArray();
  const comedyRaw = await moviesCol.find({}).skip(30).limit(10).toArray();

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

        <StatsSection />
        <AboutSection />
        <Footer />
      </div>
    </div>
  );
}
