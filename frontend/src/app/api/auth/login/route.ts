import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { hashPassword } from "@/lib/crypto";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Kiểm tra đầu vào
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập đầy đủ thông tin!" },
        { status: 400 }
      );
    }

    // 2. Tài khoản Demo mặc định phục vụ chạy thử/chấm bài
    if (email === "demo@t3v.com" && password === "12345678") {
      return NextResponse.json({
        success: true,
        user: {
          name: "Người dùng Demo",
          email: "demo@t3v.com",
          userId: 42, // Có sẵn nhiều gợi ý phim trong dataset
        },
      });
    }

    // 3. Kết nối cơ sở dữ liệu MongoDB
    const { db } = await connectToDatabase();

    // 4. Tìm người dùng theo email
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Email hoặc mật khẩu không chính xác!" },
        { status: 401 }
      );
    }

    // 5. Kiểm tra mật khẩu (hash và so sánh)
    const hashedPassword = await hashPassword(password);
    if (user.password !== hashedPassword) {
      return NextResponse.json(
        { success: false, error: "Email hoặc mật khẩu không chính xác!" },
        { status: 401 }
      );
    }

    // 6. Đăng nhập thành công, trả về thông tin user
    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        userId: user.userId,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi hệ thống khi đăng nhập!" },
      { status: 500 }
    );
  }
}
