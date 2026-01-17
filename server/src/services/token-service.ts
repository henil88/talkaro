import jwt from "jsonwebtoken";
import tokenModel from "../models/token-model";
import { JwtUserPayload } from "../types/auth-token";
const accesTokenScreat = process.env.ACCESS_TOKEN_SCREAT as string;
const refreshTokenScreat = process.env.REFRESH_TOKEN_SCREAT as string;

// export interface JwtPayload {
//   _id: string;
//   activated: boolean;
// }
class tokenService {
  ganrateToken(payload: JwtUserPayload) {
    const accesToken = jwt.sign(payload, accesTokenScreat, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshTokenScreat, {
      expiresIn: "30d",
    });
    return { accesToken, refreshToken };
  }

  async storeRefreshToken(token: string, userId: string) {
    try {
      await tokenModel.create({
        token,
        userId,
      });

      console.log(
        `token save in db and token is ${token} asociated with usedId ${userId}`,
      );
    } catch (error) {
      console.log(`we got some err to store refresh token in db ${error}`);
    }
  }

  async findRefreshToken(token: string, userId: string) {
    return await tokenModel.findOne({ userId: userId, token: token });
  }

  verifyAccesToken(token: string) {
    return jwt.verify(token, accesTokenScreat) as JwtUserPayload;
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, refreshTokenScreat) as JwtUserPayload;
  }

  async updateRefreshToken(token: string, userId: string) {
    return await tokenModel.updateOne({ userId: userId }, { token: token });
  }
}

export default new tokenService();
