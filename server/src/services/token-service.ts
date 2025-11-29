import jwt from "jsonwebtoken";
const accesTokenScreat = process.env.ACCESS_TOKEN_SCREAT as string;
const refreshTokenScreat = process.env.REFRESH_TOKEN_SCREAT as string;

interface JwtPayload {
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
}

export default new tokenService();
