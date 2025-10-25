import crypto from "crypto";
import twilio from "twilio";

const accoundSid = process.env.ACCOUNT_SID;
const smsAuth = process.env.AUTH_TOKEN;
const smsNum = process.env.SMS_NUMBER;

const client = twilio(accoundSid, smsAuth, {
  lazyLoading: true,
});

class Otpservice {
  async genrateOtp() {
    return crypto.randomInt(1000, 9999);
  }

  async sendBySms(phone: string, otp: number) {
    return await client.messages.create({
      to: phone,
      from: smsNum,
      body: `Thank You for join Talkaro Your OTP is ${otp}`,
    });
  }

  verifyOtp() {}
}

export default new Otpservice();
