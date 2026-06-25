import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { hashPassword } from "@/lib/crypto";

export const dynamic = "force-dynamic";

// Đặt lại mật khẩu - chỉ cho phép nếu OTP đã được xác thực trước đó
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập đầy đủ Email và Mật khẩu mới!" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Kiểm tra xem OTP đã được xác thực chưa
    const otpRecord = await db.collection("otps").findOne({ email, verified: true });
    if (!otpRecord) {
      return NextResponse.json(
        { success: false, error: "Phiên xác thực không hợp lệ. Vui lòng bắt đầu lại!" },
        { status: 403 }
      );
    }

    // Kiểm tra user tồn tại
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy tài khoản với email này!" },
        { status: 404 }
      );
    }

    // Mã hóa mật khẩu mới và cập nhật
    const hashedPassword = await hashPassword(password);
    await db.collection("users").updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    // Xóa bản ghi OTP sau khi sử dụng thành công
    await db.collection("otps").deleteOne({ email });

    return NextResponse.json({
      success: true,
      message: "Đặt lại mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới.",
    });
  } catch (error) {
    console.error("Lỗi đặt lại mật khẩu:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi hệ thống khi đặt lại mật khẩu!" },
      { status: 500 }
    );
  }
}
