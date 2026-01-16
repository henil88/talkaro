import { NextFunction, Request, Response } from "express";
import tokenService, { JwtPayload } from "../services/token-service";

export interface AuthRequest extends Request {
  user: JwtPayload;
}
const authMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const accesToken = authHeader && authHeader.split(" ")[1];

    if (!accesToken) {
      throw new Error();
    }

    const userData = await tokenService.verifyAccesToken(accesToken);

    if (!userData) {
      throw new Error();
    }

    (req as AuthRequest).user = userData;
    console.log(userData);

    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

export default authMiddlware;
