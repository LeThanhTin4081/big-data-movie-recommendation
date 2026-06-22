import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Big Data Movie Recommendation",
  description: "Web Demo cho hệ thống gợi ý phim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
