import type { Metadata } from "next";
import "./globals.css";
<<<<<<< HEAD
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "T3V Play - Hệ thống Gợi ý Phim | Big Data Apache Spark",
  description:
    "Hệ thống gợi ý phim quy mô lớn sử dụng Apache Spark, ALS Collaborative Filtering và MongoDB Atlas",
=======

export const metadata: Metadata = {
  title: "Big Data Movie Recommendation",
  description: "Web Demo cho hệ thống gợi ý phim",
>>>>>>> c0393d970b2f378d18ac59ebb71244b48cdb7332
};

export default function RootLayout({
  children,
<<<<<<< HEAD
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <ScrollProgress />
=======
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
>>>>>>> c0393d970b2f378d18ac59ebb71244b48cdb7332
        {children}
      </body>
    </html>
  );
}
