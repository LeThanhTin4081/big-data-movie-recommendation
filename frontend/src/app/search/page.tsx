import { connectToDatabase } from "@/lib/mongodb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tìm kiếm phim - T3V Play",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  let movies: any[] = [];

  if (query.trim()) {
    const { db } = await connectToDatabase();
    
    // Tìm kiếm phim có tên chứa từ khóa (không phân biệt hoa thường)
    movies = await db
      .collection("movies")
      .find({
        title: { $regex: query, $options: "i" },
      })
      .limit(20) // Lấy tối đa 20 kết quả
      .toArray();
  }

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans antialiased selection:bg-orange-600 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-black mb-2">
            Kết quả tìm kiếm cho: <span className="text-orange-500">"{query}"</span>
          </h1>
          <p className="text-gray-400">
            Tìm thấy {movies.length} bộ phim phù hợp với từ khóa của bạn.
          </p>
        </div>

        {movies.length > 0 ? (
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-300">Không tìm thấy phim nào</h2>
            <p className="text-gray-500 max-w-md">
              Rất tiếc, chúng tôi không tìm thấy kết quả nào phù hợp với từ khóa "{query}". 
              Vui lòng thử lại với tên phim khác.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
