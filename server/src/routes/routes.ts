import { Router } from "express";
import authController from "../controller/auth-controller";

const router = Router();

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp",authController.verifyOtp)

export default router;
