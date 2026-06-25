import { connectToDatabase } from "@/lib/mongodb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Tắt static render cho các dynamic ID
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const movieId = parseInt(params.id);
  if (isNaN(movieId)) return { title: "Không tìm thấy phim" };

  try {
    const { db } = await connectToDatabase();
    const movie = await db.collection("movies").findOne({ _id: movieId } as any);
    if (movie) {
      return { title: `${movie.title} - T3V Play` };
    }
  } catch (error) {}
  
  return { title: "Chi tiết phim - T3V Play" };
}

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const movieId = parseInt(params.id);
  if (isNaN(movieId)) return notFound();

  const { db } = await connectToDatabase();
  const movie = await db.collection("movies").findOne({ _id: movieId } as any);

  if (!movie) return notFound();

  // Xử lý các fallback data
  const fallbackGradient = "from-blue-950 via-blue-900 to-slate-900";
  const titleInitial = movie.title.charAt(0).toUpperCase();
  const isFallbackImg = movie.poster_url?.includes("placeholder");

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans antialiased selection:bg-orange-600 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* BACKDROP THẦN THÁNH */}
        <div className="relative w-full h-[40vh] sm:h-[60vh] bg-gray-900">
          {!isFallbackImg && movie.backdrop_url ? (
            <Image
              src={movie.backdrop_url}
              alt={movie.title}
              fill
              unoptimized
              className="object-cover object-top opacity-50"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} opacity-50`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        {/* NỘI DUNG CHI TIẾT */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-32 sm:-mt-48 relative z-10 pb-20">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Poster Bên Trái */}
            <div className="flex-shrink-0 mx-auto md:mx-0 w-48 sm:w-64">
              <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-2xl shadow-black/80 ring-1 ring-white/10">
                {!isFallbackImg ? (
                  <Image
                    src={movie.poster_url}
                    alt={movie.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-b ${fallbackGradient} flex flex-col items-center justify-center p-4`}>
                    <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                      <span className="text-white/80 font-black text-4xl">{titleInitial}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thông Tin Bên Phải */}
            <div className="flex-1 pt-4 md:pt-12 text-center md:text-left">
              <h1 className="text-3xl sm:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                {movie.title}
              </h1>
              
              <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-400 mb-6">
                <span className="font-bold text-green-500">{(movie.rating || 5.0).toFixed(1)} Điểm</span>
                <span>•</span>
                <span>{movie.year || "N/A"}</span>
                <span>•</span>
                <span className="border border-gray-600 px-1.5 py-0.5 rounded text-xs">HD</span>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
                {(movie.genres || []).map((g: string) => (
                  <span key={g} className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium text-gray-300">
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-3xl">
                {movie.description || "Hệ thống đang cập nhật thông tin chi tiết và mô tả cho bộ phim này. Vui lòng quay lại sau."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-3.5 rounded-lg font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-600/30">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  Xem Trailer
                </button>
                <Link href="/" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-lg font-bold text-lg backdrop-blur-sm transition-colors border border-white/5">
                  Quay lại Trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
