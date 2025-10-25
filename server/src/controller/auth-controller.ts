import { Request, Response } from "express";
import otpService from "../services/otp-service";
import hashService from "../services/hash-service";

class AuthController {
  async sendOtp(req: Request, res: Response) {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        message: "Phone number required",
      });
    }

    // gamrate otp
    const otp = await otpService.genrateOtp();

    //crete data with expireTime
    const ttl = 1000 * 60 * 1;
    const expire = Date.now() + ttl;
    const data = `${phone}.${otp}.${expire}`;

    //crete hash
    const hash = hashService.hashOtp(data);

    //send otp

    try {
      await otpService.sendBySms(phone, otp);
      res.status(200).json({
        Hash: `${hash}.${expire}`,
        phone: phone,
      });
    } catch (error) {}
  }
}

export default new AuthController();
