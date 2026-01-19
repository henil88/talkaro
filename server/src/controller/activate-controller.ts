import { Jimp } from "jimp";
import { Request, RequestHandler, Response } from "express";
import path from "path";
import { AuthRequest } from "../middlewares/auth-middlware";
import userService from "../services/user-service";
import UserDto from "../dtos/userDto";

class ActivateController {
  public activate: RequestHandler = async (req, res) => {
    const { name } = req.body;
    const avtar = req.file;
    if (!name || !avtar) {
      return res.status(400).json({
        message: "all filed are requred",
      });
    }

    const imagepath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    const imgBuffer = avtar?.buffer;
    avtar.originalname = imagepath;

    try {
      const resizeAvtar = await Jimp.read(imgBuffer);
      resizeAvtar
        .resize({ w: 150 })
        .write(
          path.resolve(
            __dirname,
            `../storage/`,
            imagepath
          ) as `${string}.${string}`
        );
    } catch (err) {
      res.status(500).json({
        message: "could not process the image",
      });
    }

    const authReq = req as AuthRequest;
    const userId = authReq.user._id;

    try {
      const user = await userService.findUser({ _id: userId });

      if (!user) {
        return res.status(404).json({
          message: "user not found",
        });
      }

      user.name = name;
      user.activated = true;
      user.avtar = imagepath;
      user.save();

      res.status(200).json({
        user: new UserDto(user),
        auth: true,
      });
    } catch (err) {
      res.status(404).json({
        message: "user not found",
      });
    }
  };
}

export default new ActivateController();
