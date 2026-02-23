import { Socket } from "socket.io";
import tokenService from "../services/token-service";

export const socketMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
): void => {
  const authHeader = socket.handshake.headers.authorization;
  const accessToken = (authHeader && authHeader.split(" ")[1]) || false;
  if (!accessToken) {
    return next(new Error("Token is Required"));
  }

  const userData = tokenService.verifyAccessToken(accessToken);

  if (!userData) {
    return next(new Error("Invalid Token"));
  }

  socket.request.user = userData;
  next();
};
