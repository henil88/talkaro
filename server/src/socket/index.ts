import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import { socketMiddleware } from "../middlewares/socket-middlware";
import { events } from "./events";
export const socketInit = (httpServer: HttpServer) => {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.use(socketMiddleware);
  io.on("connection", (socket) => {
    console.log(socket.request.user);
    console.log(socket.id);
    events(socket, io);
  });
};
