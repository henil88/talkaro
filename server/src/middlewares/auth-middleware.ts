import { NextFunction, Request, Response } from "express";
import tokenService from "../services/token-service";
import { JwtUserPayload } from "../types/auth-token";

export interface AuthRequest extends Request {
  user: JwtUserPayload;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1] || false;

    if (!accessToken) {
      return res.status(401).json({
        message: "Token is required",
      });
    }

    const userData = tokenService.verifyAccessToken(accessToken);

    if (!userData) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    (req as AuthRequest).user = userData;

    next();
  } catch (err) {
    console.error(err);  // Log the error for debugging
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default authMiddleware;
