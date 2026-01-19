import { Request, Response } from "express";
import otpService from "../services/otp-service";
import hashService from "../services/hash-service";
import userService from "../services/user-service";
import tokenService from "../services/token-service";
import UserDto from "../dtos/userDto";
import { UserDocument } from "../models/user-model";
import { JwtUserPayload } from "../types/auth-token";
import { Message } from "twilio/lib/twiml/MessagingResponse";

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
    console.log(otp);

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

  async verifyOtp(req: Request, res: Response) {
    const { otp, hash, phone } = req.body;

    if (!otp || !hash || !phone) {
      res.status(400).json({
        message: "all filed are required",
      });
    }

    const [hashedOtp, expireStr] = hash.split(".");
    // console.log(hashedOtp)

    const expire: number = Number(expireStr);

    if (Date.now() > expire) {
      return res.status(400).json({
        message: "otp expire",
      });
    }

    const data = `${phone}.${otp}.${expire}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      return res.status(400).json({
        message: "otp is invalid",
      });
    }

    let user: UserDocument | null = null;

    try {
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Db Error",
      });
    }

    if (!user) {
      return res.status(500).json({
        message: "user not available",
      });
    }

    const { accesToken, refreshToken } = tokenService.ganrateToken({
      _id: user._id.toString(),
      activated: false,
    });

    await tokenService.storeRefreshToken(refreshToken, user._id.toString());

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.json({
      user: userDto,
      accesToken,
    });
  }

  async refreshToken(req: Request, res: Response) {
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    let userData: JwtUserPayload | null;
    try {
      userData = tokenService.verifyRefreshToken(refreshTokenFromCookie);
      if (!userData || typeof userData === null) {
        return res.status(404).json({
          message: "userdata is missing",
        });
      }
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie,
      );

      if (!token) {
        res.status(401).json({
          message: "invalid token",
        });
      }

      const user = await userService.findUser({ _id: userData._id });

      if (!user) {
        return res.status(401).json({
          message: "user not found",
        });
      }

      const { refreshToken, accesToken } = tokenService.ganrateToken({
        _id: userData._id,
      });

      try {
        await tokenService.updateRefreshToken(refreshToken, userData._id);
      } catch (err) {
        res.status(401).json({
          Message: "failed to update token in db ",
        });
      }
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      const userDto = new UserDto(user);
      res.json({
        user: userDto,
        accesToken,
      });
    } catch (err) {
      res.status(500).json({
        message: "internal server error",
      });
    }
  }

  async logOut(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    await tokenService.DeleteRefreshToken(refreshToken);

    res.clearCookie("refreshToken");

    res.status(200).json({
      user: null,
    });
  }
}

export default new AuthController();
