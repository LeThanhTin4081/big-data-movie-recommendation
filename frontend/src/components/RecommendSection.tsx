"use client";

// PHẦN GỢI Ý PHIM THEO USER ID
// Người dùng nhập User ID -> Hệ thống trả về Top 5 phim gợi ý
// Hiện tại dùng mock data, sau này sẽ gọi API kết nối MongoDB

import { useState, useEffect } from "react";
import { Recommendation } from "@/lib/types";

const QUICK_USER_IDS = [1, 42, 100, 500];

import MovieCard from "./MovieCard";
import { useAuth } from "@/context/AuthContext";

// Component RecommendSection
// Giao diện nhập User ID và hiển thị kết quả gợi ý phim
export default function RecommendSection() {
  const { user } = useAuth();
  const [userId, setUserId] = useState<string>("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string>("");

  // Tự động điền User ID khi người dùng đăng nhập/đổi tài khoản
  useEffect(() => {
    if (user?.userId) {
      setUserId(user.userId.toString());
      // Tự động lấy danh sách gợi ý khi đăng nhập
      const fetchDirectly = async () => {
        setIsLoading(true);
        setHasSearched(true);
        try {
          const res = await fetch(`/api/recommend?userId=${user.userId}`);
          const data = await res.json();
          if (res.ok && data.success) {
            setRecommendations(data.recommendations);
          } else {
            setError(data.error || "Không thể tải gợi ý phim.");
          }
        } catch (err) {
          setError("Lỗi kết nối khi tải gợi ý.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchDirectly();
    } else {
      setUserId("");
      setRecommendations([]);
      setHasSearched(false);
    }
  }, [user]);

  // Xử lý khi người dùng bấm nút "Gợi ý" hoặc nhấn Enter
  // Hiện tại dùng mock data, sau sẽ thay bằng API call
  const handleRecommend = async () => {
    const id = parseInt(userId);

    // Validate input
    if (!userId || isNaN(id)) {
      setError("Vui lòng nhập User ID hợp lệ (số từ 1 đến 943)");
      return;
    }
    if (id < 1 || id > 943) {
      setError("User ID phải nằm trong khoảng 1 đến 943");
      return;
    }

    setError("");
    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(`/api/recommend?userId=${id}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setRecommendations(data.recommendations);
      } else {
        setError(data.error || "Không thể tải gợi ý phim.");
      }
    } catch (err) {
      setError("Lỗi kết nối khi tải gợi ý.");
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý khi người dùng chọn User ID nhanh
  const handleQuickSelect = (id: number) => {
    setUserId(id.toString());
    setError("");
  };

  // Xử lý phím Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRecommend();
    }
  };

  return (
    <section id="recommend" className="py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* TIÊU ĐỀ VÀ MÔ TẢ */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Gợi ý phim dành cho bạn
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Nhập User ID (1 - 943) để nhận danh sách 5 bộ phim được gợi ý bởi
            hệ thống Collaborative Filtering sử dụng thuật toán ALS trên Apache
            Spark
          </p>
        </div>

        {/* KHUNG NHẬP LIỆU */}
        <div className="max-w-xl mx-auto mb-8">
          {/* Card nền */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {/* Ô nhập + Nút gợi ý */}
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  min={1}
                  max={943}
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value);
                    setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập User ID (VD: 1, 42, 100...)"
                  className="rec-input w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <button
                onClick={handleRecommend}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    Gợi ý
                  </>
                )}
              </button>
            </div>

            {/* Thông báo lỗi */}
            {error && (
              <p className="text-red-400 text-sm mt-3 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            )}

            {/* Nút chọn nhanh User ID */}
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-gray-500 text-xs">Thử nhanh:</span>
              {QUICK_USER_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => handleQuickSelect(id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    userId === id.toString()
                      ? "bg-orange-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  User {id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LOADING SKELETON */}
        {isLoading && (
          <div className="flex justify-center gap-4 flex-wrap">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-[180px] sm:w-[200px]">
                <div className="skeleton aspect-[2/3] w-full mb-2" />
                <div className="skeleton h-4 w-3/4 mb-1" />
                <div className="skeleton h-3 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* KẾT QUẢ GỢI Ý */}
        {!isLoading && hasSearched && (
          <div className="animate-fadeInUp">
            {recommendations.length > 0 ? (
              <>
                <h3 className="text-white text-xl font-bold mb-4 text-center">
                  Top {recommendations.length} phim gợi ý cho User #{userId}
                </h3>
                <div className="flex justify-center gap-4 flex-wrap">
                  {recommendations.map((rec, index) => (
                    <MovieCard
                      key={rec.movie_id}
                      movie={rec}
                      variant="recommendation"
                      index={index}
                    />
                  ))}
                </div>

                {/* Ghi chú về thuật toán */}
                <div className="mt-8 max-w-2xl mx-auto text-center">
                  <div className="bg-gray-900/50 border border-gray-700/30 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">
                      <span className="text-orange-400 font-semibold">
                        Thuật toán:
                      </span>{" "}
                      Kết quả được tạo bởi mô hình Collaborative Filtering (ALS)
                      huấn luyện trên{" "}
                      <span className="text-white">100,000 lượt đánh giá</span>{" "}
                      từ{" "}
                      <span className="text-white">943 người dùng</span> cho{" "}
                      <span className="text-white">1,682 bộ phim</span> trong
                      dataset MovieLens 100k.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  Chưa có gợi ý cho User #{userId}
                </h3>
                <p className="text-gray-400 text-sm">
                  Thử các User ID có sẵn: {QUICK_USER_IDS.join(", ")}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
