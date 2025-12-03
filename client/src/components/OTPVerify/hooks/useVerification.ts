import { useState } from "react";
import { useNavigate } from "react-router";
import { verifyOTP } from "@/apis/auth/verifyOTP";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import { getUserDetails } from "@/apis/user/getUserDetails";
import api from "@/lib/axios";

export interface VerificationProps {
  back: () => void;
}

export const useVerification = ({ back }: VerificationProps) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const { credentials } = useAppSelector((state) => state.auth);

  const submit = async () => {
    const finalOTP = otp.length === 4 ? otp : null;

    if (!finalOTP) return;

    const identifier = credentials?.email || credentials?.phone;
    if (!identifier) {
      console.error("No email or phone provided.");
      return back();
    }
    const promise = verifyOTP({ identifier, otp });
    toast.promise(promise, {
      loading: "Verifying OTP…",
      success: async (data) => {
        const { isAuthorized } = data;
        if (!isAuthorized) throw "Invalid OTP. Try again.";
        const { isActivated } = await getUserDetails(api);
        if (!isActivated) {
          navigate("/signup");
          return "Account exists but isn’t activated yet.";
        }
        navigate("/app");
        return "OTP verified. You’re good to go.";
      },
      error: "Verification failed: Invalid OTP. Try again.",
    });
  };

  return {
    onChange: (value: string) => setOtp(value),
    submit,
  };
};
