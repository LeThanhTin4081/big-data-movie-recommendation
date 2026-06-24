import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { hashPassword } from "@/lib/crypto";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // 1. Kiểm tra đầu vào
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập đầy đủ thông tin!" },
        { status: 400 }
      );
    }

    // 2. Kết nối cơ sở dữ liệu MongoDB
    const { db } = await connectToDatabase();

    // 3. Kiểm tra xem email đã tồn tại chưa
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email này đã được sử dụng!" },
        { status: 400 }
      );
    }

    // 4. Sinh ngẫu nhiên User ID (1 - 943) để khớp với tập dữ liệu MovieLens 100k
    const randomUserId = Math.floor(Math.random() * 943) + 1;

    // 5. Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    // 6. Lưu user mới vào collection 'users'
    const newUser = {
      name,
      email,
      password: hashedPassword,
      userId: randomUserId,
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);

    // 7. Trả về thông tin user (loại bỏ mật khẩu)
    return NextResponse.json({
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        userId: newUser.userId,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi hệ thống khi đăng ký!" },
      { status: 500 }
    );
  }
}
