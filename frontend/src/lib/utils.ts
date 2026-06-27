export function generateMovieDescription(rawTitle: string, genres: string[] = []): string {
  const titleClean = (rawTitle || "").replace(/\(\d{4}\)/, '').trim();
  const validGenres = genres.filter(g => g && g !== "Đang cập nhật");
  const primaryGenre = validGenres.length > 0 ? validGenres[0].toLowerCase() : "";
  const genreText = validGenres.length > 0 ? `thuộc thể loại ${validGenres.slice(0, 2).join(", ")}` : "đầy kịch tính";

  let specificDesc = "mang đến những khung hình mãn nhãn và cốt truyện lôi cuốn.";
  
  if (primaryGenre.includes("action")) {
    specificDesc = "đưa người xem vào những pha hành động nghẹt thở, kỹ xảo đỉnh cao và nhịp độ dồn dập không ngừng nghỉ.";
  } else if (primaryGenre.includes("comedy")) {
    specificDesc = "hứa hẹn đem lại cho bạn những tràng cười sảng khoái, những tình huống trớ trêu và phút giây giải trí tuyệt vời.";
  } else if (primaryGenre.includes("drama")) {
    specificDesc = "khắc họa những cung bậc cảm xúc sâu sắc, một câu chuyện đầy tính nhân văn và để lại nhiều suy ngẫm cho người xem.";
  } else if (primaryGenre.includes("horror")) {
    specificDesc = "gieo rắc nỗi sợ hãi tột cùng với bầu không khí u ám, những bí ẩn rợn người và các pha hù dọa thót tim.";
  } else if (primaryGenre.includes("sci-fi")) {
    specificDesc = "mở ra một thế giới viễn tưởng kỳ thú với những công nghệ vượt thời đại và những ý tưởng đột phá về tương lai.";
  } else if (primaryGenre.includes("romance")) {
    specificDesc = "là một bản tình ca lãng mạn, nhẹ nhàng vẽ nên những khoảnh khắc tuyệt đẹp và thăng hoa của tình yêu.";
  } else if (primaryGenre.includes("thriller")) {
    specificDesc = "đưa bạn vào một cuộc rượt đuổi tâm lý căng thẳng, những cú lừa ngoạn mục và hồi hộp đến từng phút giây.";
  } else if (primaryGenre.includes("animation") || primaryGenre.includes("children")) {
    specificDesc = "là một chuyến phiêu lưu đầy màu sắc kỳ diệu, mang lại niềm vui tươi sáng và bài học ý nghĩa cho mọi lứa tuổi.";
  } else if (primaryGenre.includes("documentary")) {
    specificDesc = "tái hiện chân thực những thước phim tư liệu quý giá, góc nhìn khách quan và sâu sắc về thế giới xung quanh chúng ta.";
  } else if (primaryGenre.includes("adventure")) {
    specificDesc = "cuốn người xem vào một hành trình khám phá những vùng đất mới lạ, đầy rẫy hiểm nguy nhưng cũng vô cùng kỳ thú.";
  }

  return `Bộ phim "${titleClean}" là một tác phẩm điện ảnh xuất sắc ${genreText}, ${specificDesc} Tác phẩm đã nhận được nhiều lời khen ngợi từ giới phê bình và thu hút hàng triệu lượt xem trên toàn cầu.`;
}
