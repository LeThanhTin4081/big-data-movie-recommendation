import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// Xác thực mã OTP mà người dùng nhập vào
export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: "Vui lòng cung cấp Email và mã OTP!" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Tìm bản ghi OTP theo email
    const otpRecord = await db.collection("otps").findOne({ email });

    if (!otpRecord) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy mã OTP cho email này. Hãy thử gửi lại!" },
        { status: 404 }
      );
    }

    // Kiểm tra hết hạn
    if (new Date() > new Date(otpRecord.expiresAt)) {
      await db.collection("otps").deleteOne({ email });
      return NextResponse.json(
        { success: false, error: "Mã OTP đã hết hạn! Vui lòng yêu cầu gửi lại." },
        { status: 410 }
      );
    }

    // Kiểm tra mã OTP có khớp không
    if (otpRecord.otp !== otp) {
      return NextResponse.json(
        { success: false, error: "Mã OTP không chính xác! Vui lòng kiểm tra lại." },
        { status: 400 }
      );
    }

    // OTP hợp lệ - đánh dấu là đã xác thực (verified = true)
    await db.collection("otps").updateOne(
      { email },
      { $set: { verified: true } }
    );

    return NextResponse.json({
      success: true,
      message: "Xác thực OTP thành công!",
    });
  } catch (error) {
    console.error("Lỗi xác thực OTP:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi hệ thống khi xác thực OTP!" },
      { status: 500 }
    );
  }
}
