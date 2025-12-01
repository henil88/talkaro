import { useState } from "react";
import { useNavigate } from "react-router";
import { verifyOTP } from "../../../apis/auth/verifyOTP";
import { useAppSelector } from "../../../store/hooks";

export interface VerificationProps {
  back: () => void;
}

export const useVerification = ({ back }: VerificationProps) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const { credentials } = useAppSelector((state) => state.auth);
  const { isActivated } = useAppSelector((state) => state.user);

  const submit = async () => {
    const finalOTP = otp.length === 4 ? otp : null;

    if (!finalOTP) return;

    const identifier = credentials?.email || credentials?.phone;
    if (!identifier) {
      console.error("No email or phone provided.");
      return back();
    }

    try {
      const { isAuthorized } = await verifyOTP({ identifier, otp });

      if (!isAuthorized) {
        console.error("Wrong OTP");
        return;
      }

      if (!isActivated) {
        return navigate("/signup");
      }

      navigate("/app");
    } catch (err) {
      console.error("VERIFY_OTP_ERROR", err);
    }
  };

  return {
    onChange: (value: string) => setOtp(value),
    submit,
  };
};
