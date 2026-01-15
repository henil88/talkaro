import { Router } from "express";
import authController from "../controller/auth-controller";
import activateController from "../controller/activate-controller";

const router = Router();

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activated", activateController.activate);

export default router;
