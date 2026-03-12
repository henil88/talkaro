import { Socket } from "socket.io";
import tokenService from "../services/token-service";

export const socketMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
): void => {
  const authToken = socket.handshake.auth.token;
  const authHeader = socket.handshake.headers.authorization;
  const accessToken = (authHeader && authHeader.split(" ")[1]) || false;

  const token = authToken || accessToken;
  if (!token) {
    return next(new Error("Token is Required"));
  }

  const userData = tokenService.verifyAccessToken(token);

  if (!userData) {
    return next(new Error("Invalid Token"));
  }

  socket.request.user = userData;
  next();
};
