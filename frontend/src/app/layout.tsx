import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "T3V Play - Hệ thống Gợi ý Phim | Big Data Apache Spark",
  description:
    "Hệ thống gợi ý phim quy mô lớn sử dụng Apache Spark, ALS Collaborative Filtering và MongoDB Atlas",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
