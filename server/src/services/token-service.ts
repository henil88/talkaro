import jwt from "jsonwebtoken";
import tokenModel from "../models/token-model";
const accesTokenScreat = process.env.ACCESS_TOKEN_SCREAT as string;
const refreshTokenScreat = process.env.REFRESH_TOKEN_SCREAT as string;

export interface JwtPayload {
  _id: string;
  activated: boolean;
}
class tokenService {
  ganrateToken(payload: JwtPayload) {
    const accesToken = jwt.sign(payload, accesTokenScreat, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshTokenScreat, {
      expiresIn: "1y",
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
        `token save in db and token is ${token} asociated with usedId ${userId}`
      );
    } catch (error) {
      console.log(`we got some err to store refresh token in db ${error}`);
    }
  }

  async verifyAccesToken(token: string) {
    return jwt.verify(token, accesTokenScreat) as JwtPayload;
  }
}

export default new tokenService();
