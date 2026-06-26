import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FavoriteMoviesRow from "@/components/FavoriteMoviesRow";

export default function FavoritesPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white font-sans antialiased selection:bg-orange-600 selection:text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              Kho phim <span className="text-red-500">yêu thích</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl">
              Danh sách những bộ phim bạn đã đánh dấu yêu thích. Bạn có thể xem lại hoặc gỡ bỏ bất cứ lúc nào.
            </p>
          </div>
          
          <FavoriteMoviesRow />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
