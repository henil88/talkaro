import { Request, Response } from "express";
import otpService from "../services/otp-service";
import hashService from "../services/hash-service";
import userService from "../services/user-service";
import tokenService from "../services/token-service";
import UserDto from "../dtos/userDto";
import { UserDocument } from "../models/user-model";
import { JwtUserPayload } from "../types/auth-token";
import MailOtpSend from "../services/nodeMailer-service";

class AuthController {
  //send-otp-function
  async sendOtp(req: Request, res: Response) {
    const { phone, email } = req.body;

    if (!phone && !email) {
      return res.status(400).json({
        success: false,
        message: "Phone number or email required",
      });
    }

    const identifier = phone || email;

    // gamrate otp
    const otp = await otpService.genrateOtp();
    console.log(otp);

    //crete hash
    const hash = hashService.hashOtp(otp.toString());

    //save otp to db in hash form
    const isOtpExist = await otpService.otpExist(identifier);

    if (isOtpExist === null) {
      await otpService.storeOtpToDb(hash, identifier);
    } else {
      await otpService.deleteOtp(isOtpExist._id);
      await otpService.storeOtpToDb(hash, identifier);
    }

    //send otp
    try {
      if (email) {
        await MailOtpSend.sendOtpToMail(email, otp);
        return res.status(200).json({
          success: true,
          email: email,
        });
      }

      await otpService.sendBySms(phone, otp);
      return res.status(200).json({
        success: true,
        phone: phone,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `we got some error${error}`,
      });
    }
  }

  async verifyOtp(req: Request, res: Response) {
    const { otp, phone, email } = req.body;

    if (!otp || (!phone && !email)) {
      return res.status(400).json({
        message: "all filed are required",
      });
    }

    const identifier = phone || email;

    // crete otp Hash
    const otpHash = hashService.hashOtp(otp);

    //verify otp in db
    try {
      await otpService.verifyOtp(otpHash, identifier);
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    let user: UserDocument | null = null;

    try {
      const query = phone ? { phone } : { email };

      user = await userService.findUser(query);
      if (!user) {
        user = await userService.createUser(query);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Db Error",
      });
    }

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user not available",
      });
    }

    const { accessToken, refreshToken } = tokenService.ganrateToken({
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
      success: true,
      accessToken,
      isAuthorized: true,
    });
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
  
      // 1️⃣ token missing
      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Refresh token missing",
        });
      }
  
      // 2️⃣ verify token
      const userData = tokenService.verifyRefreshToken(refreshToken);
  
      if (!userData) {
        return res.status(401).json({
          success: false,
          message: "Invalid refresh token",
        });
      }
  
      // 3️⃣ token must exist in DB
      const tokenInDb = await tokenService.findRefreshToken(
        userData._id,
        refreshToken,
      );
  
      if (!tokenInDb) {
        return res.status(401).json({
          success: false,
          message: "Refresh token not recognized",
        });
      }
  
      // 4️⃣ user must exist
      const user = await userService.findUser({ _id: userData._id });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // 5️⃣ generate new tokens
      const { accessToken, refreshToken: newRefreshToken } =
        tokenService.ganrateToken({ _id: user._id.toString() });
  
      await tokenService.updateRefreshToken(newRefreshToken, user._id.toString());
  
      // 6️⃣ set cookie
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
  
      const userDto = new UserDto(user);
  
      return res.status(200).json({
        success: true,
        user: userDto,
        accessToken,
      });
  
    } catch (err) {
      console.error("Refresh token error:", err);
  
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }
  }

  async UserDetails(req: Request, res: Response) {
    const user = (req as any).user as { _id: string };

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    try {
      const userData = await userService.findById(user._id);

      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found in the database",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User information retrieved successfully",
        user: new UserDto(userData),
        isActivated: userData.activated,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
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
