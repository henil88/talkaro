import { Jimp } from "jimp";
import { RequestHandler } from "express";
import path from "path";
import { AuthRequest } from "../middlewares/auth-middlware";
import userService from "../services/user-service";
import UserDto from "../dtos/userDto";

class ActivateController {
  public activate: RequestHandler = async (req, res) => {
    const { name } = req.body;
    const avatar = req.file;
    if (!name || !avatar) {
      return res.status(400).json({
        message: "all filed are required",
      });
    }

    const imagepath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    const imgBuffer = avatar?.buffer;
    avatar.originalname = imagepath;

    try {
      const resizeAvatar = await Jimp.read(imgBuffer);
      resizeAvatar
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
      user.avatar = `/storage/${imagepath}`;
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
