import crypto from "crypto";
import twilio from "twilio";
import hashService from "./hash-service";
import otpModel from "../models/otp-model";
import mongoose from "mongoose";

const accoundSid = process.env.ACCOUNT_SID;
const smsAuth = process.env.AUTH_TOKEN;
const smsNum = process.env.SMS_NUMBER;

const client = twilio(accoundSid, smsAuth, {
  lazyLoading: true,
});

class Otpservice {
  //ganrate-otp
  async genrateOtp() {
    return crypto.randomInt(1000, 9999);
  }

  //send otp by sms
  async sendBySms(phone: string, otp: number) {
    // return await client.messages.create({
    //   to: phone,
    //   from: smsNum,
    //   body: `Thank You for join Talkaro Your OTP is ${otp}`,
    // });
  }

  async otpExist(phone: string) {
    return await otpModel.exists({ identifier: phone });
  }

  //veryfy sended otp
  async verifyOtp(userOtp: string, identifier: string) {
    const otpDoc = await otpModel.findOne({
      identifier: identifier,
    });

    if (!otpDoc) {
      throw new Error("Invalid or expired OTP");
    }
    if (otpDoc.expiresAt < new Date()) {
      await otpModel.deleteOne({ _id: otpDoc._id });
      throw new Error("OTP expired, please request new one");
    }

    const isMatchOtp = hashService.compareHash(userOtp, otpDoc.otpHash);
    if (!isMatchOtp) {
      throw new Error("Invalid otp");
    }

    await otpModel.deleteOne({ _id: otpDoc._id });
  }

  // store otp to db
  async storeOtpToDb(otp: string, identifier: string) {
    const expireAt = new Date(Date.now() + 2 * 60 * 1000);
    return await otpModel.create({
      otpHash: otp,
      identifier: identifier,
      expiresAt: expireAt,
    });
  }

  async deleteOtp(id: mongoose.Types.ObjectId) {
    await otpModel.findOneAndDelete({ _id: id });
  }
}

export default new Otpservice();
