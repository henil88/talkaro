import { Request, Response } from "express";
import roomService from "../services/room-service";
import RoomDto from "../dtos/roomDto";

class RoomController {
  async create(req: Request, res: Response) {
    const { topic, roomType } = req.body;

    if (!topic || !roomType) {
      res.status(400).json({
        message: "all filed are required",
      });
    }

    const room = await roomService.create({
      topic,
      roomType,
      ownerId: req.user!._id,
    });

    res.json(new RoomDto(room));
  }

  async index(req: Request, res: Response) {
    const rooms = await roomService.getAllRooms(["public"]);
    // const allRooms = rooms.map((room) => new RoomDto(room));

    return res.json({ success: true, rooms, message: "All rooms are sent" });
  }

  async verifyRoom(req: Request, res: Response) {
    const { roomId } = req.params;
    if (!roomId) {
      return res.status(400).json({
        success: false,
        message: "room id is required",
      });
    }

    try {
      const isRoomExist = await roomService.getRoom(roomId as string);

      if (!isRoomExist) {
        return res.status(404).json({
          success: false,
          message: "room id invalid",
        });
      }

      return res.status(200).json({
        success: true,
        room: isRoomExist,
        message: "room exist",
      });
    } catch (err) {
      console.error("room err", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
export default new RoomController();
