import { Router } from "express";
import authController from "../controller/auth-controller";
import activateController from "../controller/activate-controller";
import authMiddlware from "../middlewares/auth-middlware";
import { upload } from "../services/image-upload-service";

const router = Router();

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post(
  "/api/activate",
  authMiddlware,
  upload.single("avatar"),
  activateController.activate
);
router.post("/api/refresh-token",authController.refreshToken)
router.post("/api/logout",authMiddlware,authController.logOut)

export default router;
