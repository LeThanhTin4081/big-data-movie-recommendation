import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { sendOtpEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. Kiểm tra đầu vào
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập địa chỉ Email!" },
        { status: 400 }
      );
    }

    // 2. Kết nối cơ sở dữ liệu MongoDB
    const { db } = await connectToDatabase();

    // 3. Kiểm tra xem người dùng có tồn tại trong hệ thống không
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Địa chỉ email này chưa được đăng ký trong hệ thống!" },
        { status: 404 }
      );
    }

    // 4. Tạo mã OTP ngẫu nhiên gồm 6 chữ số
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 5. Tính thời gian hết hạn (5 phút kể từ bây giờ)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 6. Lưu mã OTP vào database, ghi đè nếu email này đã yêu cầu trước đó
    await db.collection("otps").updateOne(
      { email },
      {
        $set: {
          email,
          otp,
          expiresAt,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    // 7. Gửi email xác thực chứa OTP
    const emailSent = await sendOtpEmail(email, otp);

    if (!emailSent) {
      return NextResponse.json(
        { success: false, error: "Không thể gửi email xác thực. Vui lòng thử lại sau!" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mã xác thực OTP đã được gửi thành công!",
    });
  } catch (error) {
    console.error("Lỗi yêu cầu OTP:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi hệ thống khi yêu cầu OTP!" },
      { status: 500 }
    );
  }
}
