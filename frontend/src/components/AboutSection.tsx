// ABOUT SECTION - GIỚI THIỆU VỀ DỰ ÁN
// Thông tin về công nghệ sử dụng và kiến trúc hệ thống

export default function AboutSection() {
  const techStack = [
    {
      name: "Apache Spark",
      description: "Xử lý dữ liệu lớn và huấn luyện mô hình ALS",
      icon: "⚡",
      color: "#e25a1c",
    },
    {
      name: "MongoDB",
      description: "Lưu trữ phim, đánh giá và kết quả gợi ý",
      icon: "🍃",
      color: "#00ed64",
    },
    {
      name: "Next.js",
      description: "Frontend framework hiện đại với React",
      icon: "▲",
      color: "#ffffff",
    },
    {
      name: "Docker",
      description: "Container hóa toàn bộ hệ thống",
      icon: "🐳",
      color: "#2496ed",
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
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/40 rounded-xl p-6 hover:border-gray-600 transition-all hover:transform hover:scale-105 group"
            >
              <div
                className="text-3xl mb-3 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                {tech.icon}
              </div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: tech.color }}
              >
                {tech.name}
              </h3>
              <p className="text-gray-400 text-sm">{tech.description}</p>
            </div>
          ))}
        </div>

        {/* KIẾN TRÚC HỆ THỐNG */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-gray-700/30 rounded-2xl p-8">
          <h3 className="text-white text-xl font-bold mb-6 text-center">
            Kiến trúc hệ thống
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Dataset */}
            <div className="bg-blue-900/30 border border-blue-700/40 rounded-lg px-4 py-3 text-center">
              <div className="text-blue-400 font-bold text-sm">
                MovieLens 100k
              </div>
              <div className="text-gray-500 text-xs mt-1">Dataset</div>
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
            <div className="bg-orange-900/30 border border-orange-700/40 rounded-lg px-4 py-3 text-center">
              <div className="text-orange-400 font-bold text-sm">
                Apache Spark
              </div>
              <div className="text-gray-500 text-xs mt-1">ALS Training</div>
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
            <div className="bg-green-900/30 border border-green-700/40 rounded-lg px-4 py-3 text-center">
              <div className="text-green-400 font-bold text-sm">MongoDB</div>
              <div className="text-gray-500 text-xs mt-1">Storage</div>
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
            <div className="bg-purple-900/30 border border-purple-700/40 rounded-lg px-4 py-3 text-center">
              <div className="text-purple-400 font-bold text-sm">REST API</div>
              <div className="text-gray-500 text-xs mt-1">Backend</div>
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
            <div className="bg-gray-700/30 border border-gray-600/40 rounded-lg px-4 py-3 text-center">
              <div className="text-white font-bold text-sm">Next.js</div>
              <div className="text-gray-500 text-xs mt-1">Frontend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
