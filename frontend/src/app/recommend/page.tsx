import Navbar from "@/components/Navbar";
import RecommendSection from "@/components/RecommendSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Gợi ý cho bạn - T3V Play",
};

export default function RecommendPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white font-sans antialiased selection:bg-orange-600 selection:text-white flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow flex flex-col items-center justify-start pb-20">
        <RecommendSection />
      </div>
      <Footer />
    </div>
  );
}
