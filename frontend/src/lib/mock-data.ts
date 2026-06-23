// ==============================================================================
// DỮ LIỆU MẪU (MOCK DATA) - VỚI ẢNH THẬT TỪ TMDB PUBLIC CDN
// Sử dụng các URL poster đã được xác minh hoạt động đúng
// Dự phòng: Ảnh sẽ bị bắt lỗi bởi onError handler trong MovieCard
// ==============================================================================

// ------------------------------------------------------------------------------
// Định nghĩa kiểu dữ liệu cho Phim
// ------------------------------------------------------------------------------
export interface Movie {
  movie_id: number;
  title: string;
  title_vn?: string;
  year: string;
  genres: string[];
  rating: number;
  num_ratings: number;
  poster_url: string;
  backdrop_url?: string;
  description?: string;
  duration?: string;
  quality?: string;
}

// ------------------------------------------------------------------------------
// Định nghĩa kiểu dữ liệu cho Gợi ý phim
// ------------------------------------------------------------------------------
export interface Recommendation {
  movie_id: number;
  title: string;
  title_vn?: string;
  predicted_rating: number;
  genres: string[];
  poster_url: string;
  year?: string;
  description?: string;
}

// ==============================================================================
// BASE URL CHO ẢNH TMDB (Public CDN - Không cần API key)
// ==============================================================================
const TMDB = "https://image.tmdb.org/t/p";
const P = `${TMDB}/w342`;   // Poster 342px width
const B = `${TMDB}/w1280`;  // Backdrop 1280px width

// ==============================================================================
// PHIM NỔI BẬT TRÊN HERO BANNER (Backdrop đã xác minh)
// ==============================================================================
export const FEATURED_MOVIES: Movie[] = [
  {
    movie_id: 11,
    title: "Star Wars",
    title_vn: "CHIẾN TRANH GIỮA CÁC VÌ SAO",
    year: "1977",
    genres: ["Hành động", "Phiêu lưu", "Viễn tưởng"],
    rating: 4.4,
    num_ratings: 583,
    poster_url: `${P}/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg`,
    backdrop_url: `${B}/zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg`,
    description:
      "Luke Skywalker tham gia cùng một hiệp sĩ Jedi, một phi công liều lĩnh, một người Wookiee và hai robot để cứu vũ trụ khỏi chế độ độc tài của Lực Lượng Chính quy Độc ác.",
    duration: "121 phút",
    quality: "FULL HD",
  },
  {
    movie_id: 278,
    title: "The Shawshank Redemption",
    title_vn: "NHÀ TÙ SHAWSHANK",
    year: "1994",
    genres: ["Tâm lý", "Chính kịch"],
    rating: 4.5,
    num_ratings: 283,
    poster_url: `${P}/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg`,
    backdrop_url: `${B}/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg`,
    description:
      "Hai người tù Andy Dufresne và Ellis Boyd hình thành một tình bạn bền chặt, cùng nhau nuôi dưỡng hy vọng và tìm kiếm sự giải thoát trong những năm tháng tù đày.",
    duration: "142 phút",
    quality: "FULL HD",
  },
  {
    movie_id: 238,
    title: "The Godfather",
    title_vn: "BỐ GIÀ",
    year: "1972",
    genres: ["Tội phạm", "Chính kịch"],
    rating: 4.3,
    num_ratings: 413,
    poster_url: `${P}/3bhkrj58Vtu7enYsLcdn3yDjhW8.jpg`,
    backdrop_url: `${B}/tmU7GeKVybMWFButWEGl2M4GeiP.jpg`,
    description:
      "Sự sụp đổ của một gia đình tội phạm Mafia người Mỹ gốc Ý, đi kèm với sự lên ngôi quyền lực và tàn bạo của người con trai út Michael.",
    duration: "175 phút",
    quality: "ULTRA HD 4K",
  },
];

export const FEATURED_MOVIE = FEATURED_MOVIES[0];

// ==============================================================================
// PHIM PHỔ BIẾN NHẤT (Poster URL đã xác minh từ TMDB)
// ==============================================================================
export const POPULAR_MOVIES: Movie[] = [
  {
    movie_id: 11,
    title: "Star Wars (1977)",
    year: "1977",
    genres: ["Hành động", "Viễn tưởng"],
    rating: 4.4,
    num_ratings: 583,
    poster_url: `${P}/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 694,
    title: "Contact (1997)",
    year: "1997",
    genres: ["Kịch tính", "Viễn tưởng"],
    rating: 3.8,
    num_ratings: 509,
    poster_url: `${P}/3GrgjOAhxLfRRiQ7xBDqLqbFwM4.jpg`,
    quality: "HD",
  },
  {
    movie_id: 275,
    title: "Fargo (1996)",
    year: "1996",
    genres: ["Tội phạm", "Kinh dị"],
    rating: 4.2,
    num_ratings: 508,
    poster_url: `${P}/mAwOPvnQWaOK5FzuuqJEQ6vAMv1.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 1892,
    title: "Return of the Jedi (1983)",
    year: "1983",
    genres: ["Hành động", "Phiêu lưu"],
    rating: 4.0,
    num_ratings: 507,
    poster_url: `${P}/mDCBQNhR6R0PVFucJlRAMBgCcLS.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 9487,
    title: "Liar Liar (1997)",
    year: "1997",
    genres: ["Hài hước", "Gia đình"],
    rating: 3.2,
    num_ratings: 485,
    poster_url: `${P}/4BCOyYFVKWTX5kVyPmXoZ7YRLQW.jpg`,
    quality: "HD",
  },
  {
    movie_id: 862,
    title: "Toy Story (1995)",
    year: "1995",
    genres: ["Hoạt hình", "Hài hước"],
    rating: 3.9,
    num_ratings: 452,
    poster_url: `${P}/uXDfjJbdP4ijW5hWSBrPl9KcertP.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 13,
    title: "Forrest Gump (1994)",
    year: "1994",
    genres: ["Chính kịch", "Lãng mạn"],
    rating: 4.0,
    num_ratings: 452,
    poster_url: `${P}/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 1891,
    title: "Empire Strikes Back (1980)",
    year: "1980",
    genres: ["Hành động", "Viễn tưởng"],
    rating: 4.3,
    num_ratings: 367,
    poster_url: `${P}/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 329,
    title: "Jurassic Park (1993)",
    year: "1993",
    genres: ["Hành động", "Phiêu lưu"],
    rating: 3.7,
    num_ratings: 367,
    poster_url: `${P}/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg`,
    quality: "HD",
  },
  {
    movie_id: 602,
    title: "Independence Day (1996)",
    year: "1996",
    genres: ["Hành động", "Viễn tưởng"],
    rating: 3.4,
    num_ratings: 429,
    poster_url: `${P}/bkxsWaG8oh6XJRfBrInuLqE8WR0.jpg`,
    quality: "HD",
  },
];

// ==============================================================================
// PHIM HÀNH ĐỘNG
// ==============================================================================
export const ACTION_MOVIES: Movie[] = [
  {
    movie_id: 85,
    title: "Raiders of the Lost Ark (1981)",
    year: "1981",
    genres: ["Hành động", "Phiêu lưu"],
    rating: 4.3,
    num_ratings: 420,
    poster_url: `${P}/ceG9VzoRAVGwivFU403Wc3AHRys.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 1891,
    title: "Empire Strikes Back (1980)",
    year: "1980",
    genres: ["Hành động", "Viễn tưởng"],
    rating: 4.3,
    num_ratings: 367,
    poster_url: `${P}/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 238,
    title: "The Godfather (1972)",
    year: "1972",
    genres: ["Tội phạm", "Chính kịch"],
    rating: 4.3,
    num_ratings: 413,
    poster_url: `${P}/3bhkrj58Vtu7enYsLcdn3yDjhW8.jpg`,
    quality: "ULTRA HD 4K",
  },
  {
    movie_id: 680,
    title: "Pulp Fiction (1994)",
    year: "1994",
    genres: ["Tội phạm", "Chính kịch"],
    rating: 4.2,
    num_ratings: 394,
    poster_url: `${P}/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 218,
    title: "The Terminator (1984)",
    year: "1984",
    genres: ["Hành động", "Viễn tưởng"],
    rating: 3.9,
    num_ratings: 315,
    poster_url: `${P}/qvktm0BHcnmDpQzWbOkFz7q27jC.jpg`,
    quality: "HD",
  },
  {
    movie_id: 329,
    title: "Jurassic Park (1993)",
    year: "1993",
    genres: ["Hành động", "Phiêu lưu"],
    rating: 3.7,
    num_ratings: 367,
    poster_url: `${P}/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg`,
    quality: "HD",
  },
  {
    movie_id: 9058,
    title: "Air Force One (1997)",
    year: "1997",
    genres: ["Hành động", "Kịch tính"],
    rating: 3.6,
    num_ratings: 431,
    poster_url: `${P}/4FCqVFkPlcHiNhf9MF0MnW6ZKON.jpg`,
    quality: "HD",
  },
  {
    movie_id: 769,
    title: "GoodFellas (1990)",
    year: "1990",
    genres: ["Tội phạm", "Chính kịch"],
    rating: 4.1,
    num_ratings: 287,
    poster_url: `${P}/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg`,
    quality: "FULL HD",
  },
];

// ==============================================================================
// PHIM KINH ĐIỂN / CHÍNH KỊCH
// ==============================================================================
export const DRAMA_MOVIES: Movie[] = [
  {
    movie_id: 278,
    title: "The Shawshank Redemption (1994)",
    year: "1994",
    genres: ["Tâm lý", "Chính kịch"],
    rating: 4.5,
    num_ratings: 283,
    poster_url: `${P}/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 424,
    title: "Schindler's List (1993)",
    year: "1993",
    genres: ["Lịch sử", "Chiến tranh"],
    rating: 4.5,
    num_ratings: 298,
    poster_url: `${P}/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 274,
    title: "Silence of the Lambs (1991)",
    year: "1991",
    genres: ["Tội phạm", "Kinh dị"],
    rating: 4.3,
    num_ratings: 390,
    poster_url: `${P}/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 275,
    title: "Fargo (1996)",
    year: "1996",
    genres: ["Tội phạm", "Chính kịch"],
    rating: 4.2,
    num_ratings: 508,
    poster_url: `${P}/mAwOPvnQWaOK5FzuuqJEQ6vAMv1.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 24251,
    title: "The English Patient (1996)",
    year: "1996",
    genres: ["Chiến tranh", "Lãng mạn"],
    rating: 3.7,
    num_ratings: 481,
    poster_url: `${P}/gNmovVCyVMJ6r3KpTDqQ3oHZ1Qv.jpg`,
    quality: "HD",
  },
  {
    movie_id: 63,
    title: "Twelve Monkeys (1995)",
    year: "1995",
    genres: ["Viễn tưởng", "Kịch tính"],
    rating: 3.6,
    num_ratings: 392,
    poster_url: `${P}/6Sj9wDu3YHZZ9o9FGNjK3oTvpzC.jpg`,
    quality: "HD",
  },
  {
    movie_id: 597,
    title: "Titanic (1997)",
    year: "1997",
    genres: ["Lãng mạn", "Chính kịch"],
    rating: 3.6,
    num_ratings: 350,
    poster_url: `${P}/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg`,
    quality: "ULTRA HD 4K",
  },
  {
    movie_id: 13,
    title: "Forrest Gump (1994)",
    year: "1994",
    genres: ["Chính kịch", "Lãng mạn"],
    rating: 4.0,
    num_ratings: 452,
    poster_url: `${P}/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg`,
    quality: "FULL HD",
  },
];

// ==============================================================================
// PHIM HÀI / HOẠT HÌNH
// ==============================================================================
export const COMEDY_MOVIES: Movie[] = [
  {
    movie_id: 862,
    title: "Toy Story (1995)",
    year: "1995",
    genres: ["Hoạt hình", "Hài hước"],
    rating: 3.9,
    num_ratings: 452,
    poster_url: `${P}/uXDfjJbdP4ijW5hWSBrPl9KcertP.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 9487,
    title: "Liar Liar (1997)",
    year: "1997",
    genres: ["Hài hước", "Gia đình"],
    rating: 3.2,
    num_ratings: 485,
    poster_url: `${P}/4BCOyYFVKWTX5kVyPmXoZ7YRLQW.jpg`,
    quality: "HD",
  },
  {
    movie_id: 13,
    title: "Forrest Gump (1994)",
    year: "1994",
    genres: ["Hài hước", "Chính kịch"],
    rating: 4.0,
    num_ratings: 452,
    poster_url: `${P}/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg`,
    quality: "FULL HD",
  },
  {
    movie_id: 8587,
    title: "Men in Black (1997)",
    year: "1997",
    genres: ["Hành động", "Hài hước"],
    rating: 3.5,
    num_ratings: 395,
    poster_url: `${P}/f1AQhx6ZfGhPkFdhsPo9bqREr74.jpg`,
    quality: "HD",
  },
  {
    movie_id: 9023,
    title: "Chasing Amy (1997)",
    year: "1997",
    genres: ["Hài hước", "Lãng mạn"],
    rating: 3.6,
    num_ratings: 262,
    poster_url: `${P}/yjCv4FwL7QCb99VkCmNxOLH5Qku.jpg`,
    quality: "HD",
  },
  {
    movie_id: 574,
    title: "Conspiracy Theory (1997)",
    year: "1997",
    genres: ["Hành động", "Kịch tính"],
    rating: 3.3,
    num_ratings: 262,
    poster_url: `${P}/tHxjsxkq2eDMaEOCxsS5jApbqGu.jpg`,
    quality: "HD",
  },
  {
    movie_id: 9058,
    title: "Air Force One (1997)",
    year: "1997",
    genres: ["Hành động", "Kịch tính"],
    rating: 3.6,
    num_ratings: 431,
    poster_url: `${P}/4FCqVFkPlcHiNhf9MF0MnW6ZKON.jpg`,
    quality: "HD",
  },
  {
    movie_id: 348,
    title: "Alien (1979)",
    year: "1979",
    genres: ["Kinh dị", "Viễn tưởng"],
    rating: 4.0,
    num_ratings: 291,
    poster_url: `${P}/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg`,
    quality: "FULL HD",
  },
];

// ==============================================================================
// GỢI Ý MẪU CHO MỘT SỐ USER ID (Dữ liệu mock từ ALS model)
// ==============================================================================
export const MOCK_RECOMMENDATIONS: Record<number, Recommendation[]> = {
  1: [
    {
      movie_id: 278,
      title: "The Shawshank Redemption (1994)",
      predicted_rating: 4.82,
      genres: ["Tâm lý", "Chính kịch"],
      poster_url: `${P}/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg`,
      year: "1994",
      description: "Hai người bạn thiết lập cuộc sống trong nhà tù Shawshank đầy áp bức.",
    },
    {
      movie_id: 424,
      title: "Schindler's List (1993)",
      predicted_rating: 4.75,
      genres: ["Lịch sử", "Chiến tranh"],
      poster_url: `${P}/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg`,
      year: "1993",
      description: "Câu chuyện có thật về Oskar Schindler, người đã cứu sống hơn 1.100 người Do Thái.",
    },
    {
      movie_id: 274,
      title: "Silence of the Lambs (1991)",
      predicted_rating: 4.65,
      genres: ["Tội phạm", "Kinh dị"],
      poster_url: `${P}/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg`,
      year: "1991",
      description: "Một nữ điều tra viên FBI phải tìm kiếm sự giúp đỡ từ kẻ sát nhân ăn thịt người.",
    },
    {
      movie_id: 238,
      title: "The Godfather (1972)",
      predicted_rating: 4.58,
      genres: ["Tội phạm", "Chính kịch"],
      poster_url: `${P}/3bhkrj58Vtu7enYsLcdn3yDjhW8.jpg`,
      year: "1972",
      description: "Bố già gia đình Corleone đối mặt với sự tàn phai của vương quốc tội phạm.",
    },
    {
      movie_id: 13,
      title: "Forrest Gump (1994)",
      predicted_rating: 4.51,
      genres: ["Chính kịch", "Lãng mạn"],
      poster_url: `${P}/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg`,
      year: "1994",
      description: "Cuộc đời kỳ lạ của Forrest Gump, người vô tình tham gia vào các sự kiện lịch sử.",
    },
  ],
  42: [
    {
      movie_id: 11,
      title: "Star Wars (1977)",
      predicted_rating: 4.91,
      genres: ["Hành động", "Viễn tưởng"],
      poster_url: `${P}/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg`,
      year: "1977",
      description: "Luke Skywalker khởi đầu hành trình trở thành một Jedi huyền thoại.",
    },
    {
      movie_id: 1891,
      title: "Empire Strikes Back (1980)",
      predicted_rating: 4.85,
      genres: ["Hành động", "Viễn tưởng"],
      poster_url: `${P}/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg`,
      year: "1980",
      description: "Sau thất bại của Đế chế, Luke tìm kiếm sự giúp đỡ của Yoda để trở thành Jedi.",
    },
    {
      movie_id: 238,
      title: "The Godfather (1972)",
      predicted_rating: 4.78,
      genres: ["Tội phạm", "Chính kịch"],
      poster_url: `${P}/3bhkrj58Vtu7enYsLcdn3yDjhW8.jpg`,
      year: "1972",
      description: "Bố già gia đình Corleone đối mặt với sự tàn phai của vương quốc tội phạm.",
    },
    {
      movie_id: 680,
      title: "Pulp Fiction (1994)",
      predicted_rating: 4.72,
      genres: ["Tội phạm", "Chính kịch"],
      poster_url: `${P}/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg`,
      year: "1994",
      description: "Nhiều câu chuyện tội phạm đan xen nhau tại Los Angeles.",
    },
    {
      movie_id: 85,
      title: "Raiders of the Lost Ark (1981)",
      predicted_rating: 4.65,
      genres: ["Hành động", "Phiêu lưu"],
      poster_url: `${P}/ceG9VzoRAVGwivFU403Wc3AHRys.jpg`,
      year: "1981",
      description: "Indiana Jones truy tìm Rương Thánh Tích trước khi bọn Quốc Xã chiếm được.",
    },
  ],
  100: [
    {
      movie_id: 85,
      title: "Raiders of the Lost Ark (1981)",
      predicted_rating: 4.88,
      genres: ["Hành động", "Phiêu lưu"],
      poster_url: `${P}/ceG9VzoRAVGwivFU403Wc3AHRys.jpg`,
      year: "1981",
      description: "Indiana Jones truy tìm Rương Thánh Tích trước khi bọn Quốc Xã chiếm được.",
    },
    {
      movie_id: 278,
      title: "The Shawshank Redemption (1994)",
      predicted_rating: 4.80,
      genres: ["Tâm lý", "Chính kịch"],
      poster_url: `${P}/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg`,
      year: "1994",
      description: "Hai người bạn thiết lập cuộc sống trong nhà tù Shawshank.",
    },
    {
      movie_id: 13,
      title: "Forrest Gump (1994)",
      predicted_rating: 4.73,
      genres: ["Chính kịch", "Lãng mạn"],
      poster_url: `${P}/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg`,
      year: "1994",
      description: "Cuộc đời kỳ lạ của Forrest Gump, người vô tình tham gia vào những sự kiện lịch sử.",
    },
    {
      movie_id: 348,
      title: "Alien (1979)",
      predicted_rating: 4.65,
      genres: ["Kinh dị", "Viễn tưởng"],
      poster_url: `${P}/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg`,
      year: "1979",
      description: "Phi hành đoàn một con tàu không gian phải đối mặt với sinh vật ngoài hành tinh.",
    },
    {
      movie_id: 862,
      title: "Toy Story (1995)",
      predicted_rating: 4.58,
      genres: ["Hoạt hình", "Hài hước"],
      poster_url: `${P}/uXDfjJbdP4ijW5hWSBrPl9KcertP.jpg`,
      year: "1995",
      description: "Hành trình phiêu lưu của các đồ chơi khi chủ nhân Woody bị bỏ quên.",
    },
  ],
  500: [
    {
      movie_id: 424,
      title: "Schindler's List (1993)",
      predicted_rating: 4.90,
      genres: ["Lịch sử", "Chiến tranh"],
      poster_url: `${P}/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg`,
      year: "1993",
      description: "Câu chuyện có thật về Oskar Schindler, người đã cứu sống hơn 1.100 người Do Thái.",
    },
    {
      movie_id: 275,
      title: "Fargo (1996)",
      predicted_rating: 4.82,
      genres: ["Tội phạm", "Chính kịch"],
      poster_url: `${P}/mAwOPvnQWaOK5FzuuqJEQ6vAMv1.jpg`,
      year: "1996",
      description: "Một vụ bắt cóc diễn ra sai kế hoạch trong mùa đông giá lạnh ở Minnesota.",
    },
    {
      movie_id: 274,
      title: "Silence of the Lambs (1991)",
      predicted_rating: 4.76,
      genres: ["Tội phạm", "Kinh dị"],
      poster_url: `${P}/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg`,
      year: "1991",
      description: "Nữ điều tra viên Clarice Starling phải giao thiếp với kẻ sát nhân để tìm thủ phạm.",
    },
    {
      movie_id: 769,
      title: "GoodFellas (1990)",
      predicted_rating: 4.68,
      genres: ["Tội phạm", "Chính kịch"],
      poster_url: `${P}/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg`,
      year: "1990",
      description: "Cuộc đời của Henry Hill, một tội phạm đã vươn lên trong thế giới mafia.",
    },
    {
      movie_id: 680,
      title: "Pulp Fiction (1994)",
      predicted_rating: 4.55,
      genres: ["Tội phạm", "Chính kịch"],
      poster_url: `${P}/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg`,
      year: "1994",
      description: "Nhiều câu chuyện tội phạm đan xen nhau tại Los Angeles.",
    },
  ],
};

// ==============================================================================
// HÀM TRẢ VỀ GỢI Ý THEO USER ID
// ==============================================================================
export function getRecommendations(userId: number): Recommendation[] {
  return MOCK_RECOMMENDATIONS[userId] || [];
}

// ==============================================================================
// DANH SÁCH USER IDS CÓ SẴN ĐỂ THỬ NHANH
// ==============================================================================
export const QUICK_USER_IDS = [1, 42, 100, 500];
