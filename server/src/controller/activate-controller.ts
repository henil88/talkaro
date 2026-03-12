import crypto from "crypto";
import { RequestHandler } from "express";
import { AuthRequest } from "../middlewares/auth-middleware";
import userService from "../services/user-service";
import UserDto from "../dtos/userDto";
import imagekit from "../configs/imagekit";
import { toFile } from "@imagekit/nodejs";
import ImageKit from "@imagekit/nodejs";

const IMAGEKIT_URL_ENDPOINT = process.env.IMAGEKIT_URL_ENDPOINT!;

class ActivateController {
  public activate: RequestHandler = async (req, res) => {
    try {
      const { name } = req.body;
      const avatar = req.file;

      /* -------------------- validation -------------------- */

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      }

      if (!avatar) {
        return res.status(400).json({
          success: false,
          message: "Avatar file is required",
        });
      }

      if (!avatar.mimetype.startsWith("image/")) {
        return res.status(400).json({
          success: false,
          message: "Only image files are allowed",
        });
      }

      const authReq = req as AuthRequest;

      if (!authReq.user?._id) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      /* -------------------- upload to imagekit -------------------- */

      let uploadResponse;

      try {
        const file = await toFile(avatar.buffer, avatar.originalname);

        uploadResponse = await imagekit.files.upload({
          file,
          fileName: crypto.randomUUID(),
          folder: "/avatars",
        });
      } catch (error) {
        console.error("ImageKit upload error:", error);

        if (error instanceof ImageKit.APIError) {
          return res.status(error.status || 500).json({
            success: false,
            message: "Image upload failed",
            error: error.name,
          });
        }

        return res.status(500).json({
          success: false,
          message: "Failed to upload avatar",
        });
      }

      if (!uploadResponse?.filePath) {
        return res.status(500).json({
          success: false,
          message: "Image upload returned invalid response",
        });
      }

      /* -------------------- generate avatar url -------------------- */

      const avatarUrl = imagekit.helper.buildSrc({
        urlEndpoint: IMAGEKIT_URL_ENDPOINT,
        src: uploadResponse.filePath,
        transformation: [
          {
            width: 150,
            height: 150,
            crop: "maintain_ratio",
            focus: "center",
          },
        ],
      });

      /* -------------------- update user -------------------- */

      const user = await userService.findUser({ _id: authReq.user._id });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      user.name = name;
      user.activated = true;
      user.avatar = avatarUrl;

      await user.save();

      /* -------------------- success -------------------- */

      return res.status(200).json({
        success: true,
        user: new UserDto(user),
        auth: true,
      });
    } catch (error: unknown) {
      console.error("Activate controller error:", error);

      if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
}

export default new ActivateController();