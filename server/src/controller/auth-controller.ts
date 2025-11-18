import { Request, Response } from "express";
import otpService from "../services/otp-service";
import hashService from "../services/hash-service";

class AuthController {
  //send-otp-function
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
    } catch (error) {
      res.status(500).json({
        message: `we got some error${error}`,
      });
    }
  }

  verifyOtp(req: Request, res: Response) {
    const { otp, hash, phone } = req.body;

    if (!otp || !hash || !phone) {
      res.status(400).json({
        message: "all filed are required",
      });
    }

    const [hashedOtp, expireStr] = hash.split(".");
    console.log(hashedOtp)

    const expire: number = Number(expireStr);

    if (Date.now() > expire) {
      res.status(400).json({
        message: "otp expire",
      });
    }

    const data = `${phone}.${otp}.${expire}`
    const isValid = otpService.verifyOtp(hashedOtp,data);

    if(!isValid){
      return res.status(400).json({
        message:"otp is invalid"
      })
    }
    
    res.status(200).json({
      message:"otp verify succes"
    })
  }
}

export default new AuthController();
