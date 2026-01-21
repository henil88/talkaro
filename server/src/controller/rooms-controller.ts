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
}

export default new RoomController();
