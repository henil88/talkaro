import { Router } from "express";
import authController from "../controller/auth-controller";
import activateController from "../controller/activate-controller";
import authMiddlware from "../middlewares/auth-middlware";
import { upload } from "../services/image-upload-service";

const router = Router();

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post(
  "/api/activated",
  authMiddlware,
  upload.single("avtar"),
  activateController.activate
);

export default router;
