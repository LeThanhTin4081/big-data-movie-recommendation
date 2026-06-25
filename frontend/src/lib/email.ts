import nodemailer from "nodemailer";

export async function sendOtpEmail(email: string, otp: string): Promise<boolean> {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Nếu không có thông tin đăng nhập SMTP, ta giả lập ghi log ra console của Terminal
  if (!user || !pass) {
    console.log("\n");
    console.log("=====================================================================");
    console.log("              [MOCK EMAIL SERVICE — THỜI GIAN THỬ NGHIỆM]            ");
    console.log(` Gửi tới: ${email}`);
    console.log(` Nội dung: Mã xác thực OTP của bạn là: ${otp}`);
    console.log(" Thời hạn: Mã này sẽ hết hạn sau 5 phút.");
    console.log("=====================================================================\n");
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true cho port 465, false cho port khác
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"T3V Play Support" <${user}>`,
      to: email,
      subject: `[T3V Play] Mã xác thực OTP đặt lại mật khẩu`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #f9f9f9;">
          <h2 style="color: #f97316; text-align: center; font-weight: 800;">T3V Play</h2>
          <hr style="border: 0; height: 1px; background: #e0e0e0; margin: 20px 0;">
          <p>Xin chào,</p>
          <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản liên kết với địa chỉ email này. Dưới đây là mã xác thực OTP của bạn:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: 900; letter-spacing: 6px; color: #f97316; background-color: #ffe6d5; padding: 12px 30px; border-radius: 8px; border: 1px dashed #f97316;">${otp}</span>
          </div>
          <p style="color: #6b7280; font-size: 13px;">Mã này có hiệu lực trong vòng <b>5 phút</b>. Nếu bạn không yêu cầu hành động này, vui lòng bỏ qua email này.</p>
          <hr style="border: 0; height: 1px; background: #e0e0e0; margin: 20px 0;">
          <p style="text-align: center; color: #9ca3af; font-size: 11px;">© ${new Date().getFullYear()} T3V Play Movie Recommendation Project. All rights reserved.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Lỗi gửi email thực tế:", error);
    return false;
  }
}
