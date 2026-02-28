import nodemailer from "nodemailer";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.

class MailOtpSend {
  transporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendOtpToMail(email: string, otp: number) {
    try {
      const transport = this.transporter();
      return await transport.sendMail({
        from: `"Talkaro" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Talkaro OTP Code",
        html: this.generateOTPTemplate(otp),
      });
    } catch (error) {
      console.error("OTP Mail Error:", error);
      throw new Error("Failed to send OTP");
    }
  }

  private generateOTPTemplate(otp: number) {
    return `
      <div style="font-family: Arial; text-align: center;">
        <h2>Talkaro Verification Code</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 5px;">${otp}</h1>
        <p>This code will expire in 2 minutes.</p>
      </div>
    `;
  }
}
export default new MailOtpSend();
