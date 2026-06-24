<<<<<<< HEAD
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
=======
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Hệ Thống Gợi Ý Phim</h1>
        
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nhập User ID để lấy gợi ý:
          </label>
          <div className="flex space-x-4">
            <input 
              type="text" 
              placeholder="Ví dụ: 196" 
              className="flex-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-200">
              Gợi ý
            </button>
          </div>
        </div>

        {/* TODO: Hiển thị kết quả phim ở đây */}
      </div>
    </main>
>>>>>>> c0393d970b2f378d18ac59ebb71244b48cdb7332
  );
}
