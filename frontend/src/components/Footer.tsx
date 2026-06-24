// ==============================================================================
// FOOTER - CHÂN TRANG
// Hiển thị thông tin bản quyền và liên kết
// ==============================================================================

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 mt-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo và tên */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">MR</span>
            </div>
            <span className="text-gray-400 text-sm">
              T3V Play - Hệ thống Gợi ý Phim
            </span>
          </div>

          {/* Thông tin */}
          <div className="text-center sm:text-right">
            <p className="text-gray-500 text-xs">
              Đồ án Big Data - Sử dụng Apache Spark, MongoDB, Next.js
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Dataset: MovieLens 100k | {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
