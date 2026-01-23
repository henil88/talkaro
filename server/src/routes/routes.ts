import { Router } from "express";
import authController from "../controller/auth-controller";
import activateController from "../controller/activate-controller";
import authMiddleware from "../middlewares/auth-middleware";
import { upload } from "../services/image-upload-service";
import roomsController from "../controller/rooms-controller";

const router = Router();

router.get("/api/me", authMiddleware, authController.UserDetails);

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post(
  "/api/activate",
  authMiddleware,
  upload.single("avatar"),
  activateController.activate,
);
router.post("/api/refresh", authController.refreshToken);
router.get("/api/logout", authMiddleware, authController.logOut);
router.post("/api/rooms", authMiddleware, roomsController.create);
router.get("/api/rooms", authMiddleware, roomsController.index);

export default router;
