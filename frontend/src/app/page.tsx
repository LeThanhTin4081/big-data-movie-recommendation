import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import RecommendSection from "@/components/RecommendSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import {
  POPULAR_MOVIES,
  ACTION_MOVIES,
  DRAMA_MOVIES,
  COMEDY_MOVIES,
} from "@/lib/mock-data";

export default function HomePage() {
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

      <RecommendSection />

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
