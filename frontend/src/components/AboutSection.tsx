// ABOUT SECTION - GIỚI THIỆU VỀ DỰ ÁN
// Thông tin về công nghệ sử dụng và kiến trúc hệ thống
import { Flame, Database, LayoutTemplate, Container } from "lucide-react";

export default function AboutSection() {
  const techStack = [
    {
      name: "Apache Spark",
      description: "Xử lý dữ liệu lớn và huấn luyện mô hình ALS",
      icon: <Flame className="w-8 h-8 text-orange-500" strokeWidth={1.5} />,
      color: "from-orange-600 to-orange-400",
      shadow: "shadow-orange-500/20",
    },
    {
      name: "MongoDB",
      description: "Lưu trữ phim, đánh giá và kết quả gợi ý",
      icon: <Database className="w-8 h-8 text-emerald-500" strokeWidth={1.5} />,
      color: "from-emerald-600 to-emerald-400",
      shadow: "shadow-emerald-500/20",
    },
    {
      name: "Next.js",
      description: "Frontend framework hiện đại với React",
      icon: <LayoutTemplate className="w-8 h-8 text-white" strokeWidth={1.5} />,
      color: "from-gray-300 to-white",
      shadow: "shadow-white/10",
    },
    {
      name: "Docker",
      description: "Container hóa toàn bộ hệ thống",
      icon: <Container className="w-8 h-8 text-blue-500" strokeWidth={1.5} />,
      color: "from-blue-600 to-blue-400",
      shadow: "shadow-blue-500/20",
    },
  ];

  return (
    <section id="about" className="py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* TIÊU ĐỀ */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Về dự án
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Hệ thống gợi ý phim sử dụng Big Data - Đồ án môn học xử lý dữ liệu
            lớn
          </p>
        </div>

        {/* CÔNG NGHỆ SỬ DỤNG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="relative group bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] transition-all duration-700 hover:-translate-y-3 overflow-hidden"
            >
              {/* Ánh sáng nền (Ambient glow) */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${tech.color} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
              
              <div
                className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} p-[1px] mb-6 shadow-2xl ${tech.shadow} group-hover:scale-110 transition-transform duration-500`}
              >
                <div className="w-full h-full bg-[#111] rounded-2xl flex items-center justify-center drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  <div>
                    {tech.icon}
                  </div>
                </div>
              </div>
              <h3 className={`relative z-10 text-xl font-black mb-2 tracking-tight bg-gradient-to-br ${tech.color} text-transparent bg-clip-text`}>
                {tech.name}
              </h3>
              <p className="relative z-10 text-gray-400 text-sm leading-relaxed">{tech.description}</p>
            </div>
          ))}
        </div>

        {/* KIẾN TRÚC HỆ THỐNG */}
        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <h3 className="text-white text-2xl font-bold mb-8 text-center tracking-tight">
            Kiến trúc hệ thống
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Dataset */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl px-5 py-4 text-center shadow-lg hover:bg-blue-500/20 transition-colors">
              <div className="text-blue-400 font-bold text-sm tracking-wide">MovieLens 100k</div>
              <div className="text-gray-400 text-xs mt-1.5 uppercase tracking-widest font-semibold">Dataset</div>
            </div>

            <svg
              className="w-6 h-6 text-gray-600 hidden sm:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>

            {/* Spark */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl px-5 py-4 text-center shadow-lg hover:bg-orange-500/20 transition-colors">
              <div className="text-orange-400 font-bold text-sm tracking-wide">Apache Spark</div>
              <div className="text-gray-400 text-xs mt-1.5 uppercase tracking-widest font-semibold">ALS Training</div>
            </div>

            <svg
              className="w-6 h-6 text-gray-600 hidden sm:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>

            {/* MongoDB */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-4 text-center shadow-lg hover:bg-green-500/20 transition-colors">
              <div className="text-green-400 font-bold text-sm tracking-wide">MongoDB</div>
              <div className="text-gray-400 text-xs mt-1.5 uppercase tracking-widest font-semibold">Storage</div>
            </div>

            <svg
              className="w-6 h-6 text-gray-600 hidden sm:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>

            {/* API */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl px-5 py-4 text-center shadow-lg hover:bg-purple-500/20 transition-colors">
              <div className="text-purple-400 font-bold text-sm tracking-wide">REST API</div>
              <div className="text-gray-400 text-xs mt-1.5 uppercase tracking-widest font-semibold">Backend</div>
            </div>

            <svg
              className="w-6 h-6 text-gray-600 hidden sm:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>

            {/* Frontend */}
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-center shadow-lg hover:bg-white/20 transition-colors">
              <div className="text-white font-bold text-sm tracking-wide">Next.js</div>
              <div className="text-gray-400 text-xs mt-1.5 uppercase tracking-widest font-semibold">Frontend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
