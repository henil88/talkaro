import { Server, Socket } from "socket.io";
import { socketEvent } from "./socketEvent";
import { rooms, socketToRoom, socketToUser } from "./socketstate";
import { AnswerSignal, IceSignal, OfferSignal } from "../types/socket-signal";

// Peer settings interface
interface PeerSettings {
  muted: boolean;
  avatar: string;
  username: string;
}

export const events = (socket: Socket, io: Server) => {
  socket.on(socketEvent.JOIN, (roomId: string) => {
    if (!roomId) {
      socket.emit(socketEvent.ERROR, { message: "RoomID required" });
    }

    let room = rooms.get(roomId);
    if (!room) {
      room = new Set();
      rooms.set(roomId, room);
    }
    const existingPeers = Array.from(room) || [];

    room.add(socket.id);
    socketToRoom.set(socket.id, roomId);
    socketToUser.set(socket.id, socket.request.user);

    socket.emit(socketEvent.JOINED, existingPeers);
  });
  socket.on(socketEvent.OFFER, (msg: OfferSignal) => {
    io.to(msg.to).emit(socketEvent.OFFER, msg);
  });
  socket.on(socketEvent.ANSWER, (msg: AnswerSignal) => {
    io.to(msg.to).emit(socketEvent.ANSWER, msg);
  });
  socket.on(socketEvent.ICE, (msg: IceSignal) => {
    io.to(msg.to).emit(socketEvent.ICE, msg);
  });

  socket.on(socketEvent.LEAVE, () => {
    const result = removePeer(socket.id);
    if (!result.roomId) return;
    const existingPeers = getPeer(result.roomId);
    existingPeers.forEach((id) => {
      if (id === socket.id) return;
      io.to(id).emit(socketEvent.LEFT, socket.id);
    });
  });

  socket.on(socketEvent.DISCONNECT, () => {
    const result = removePeer(socket.id);
    if (!result.roomId) return;
    const existingPeers = getPeer(result.roomId);
    existingPeers.forEach((id) => {
      if (id === socket.id) return;
      io.to(id).emit(socketEvent.LEFT, socket.id);
    });
  });

  // Handle peer settings event after WebRTC connection is established
  socket.on(
    socketEvent.PEER_SETTINGS,
    ({ settings, to }: { settings: PeerSettings; to: string }) => {
      const roomId = socketToRoom.get(socket.id);
      if (roomId && to !== socket.id) {
        io.to(to).emit(socketEvent.PEER_SETTINGS, {
          from: socket.id,
          settings,
        });
      }
    },
  );
};

function removePeer(socketId: string) {
  const roomId = socketToRoom.get(socketId);
  if (!roomId) return {};
  const room = rooms.get(roomId);
  if (!room) return {};
  room.delete(socketId);
  socketToRoom.delete(socketId);
  socketToUser.delete(socketId);
  if (rooms.size === 0) {
    rooms.delete(roomId);
  }
  return { roomId };
}

function getPeer(roomId: string) {
  const room = rooms.get(roomId);
  return room ? Array.from(room) : [];
}
