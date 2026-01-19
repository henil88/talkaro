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

  const submit = () => {
    if (otp.length !== 4) return;

    const identifier = credentials?.email || credentials?.phone;
    if (!identifier) {
      console.error("No email or phone provided.");
      return back();
    }

    toast.promise(verifyOTP({ identifier, otp }), {
      loading: "Verifying OTP…",
      success: async (data) => {
        if (!data.isAuthorized) throw "Invalid OTP. Try again.";

        const { isActivated } = await getUserDetails(api);
        if (!isActivated) {
          navigate("/signup");
          return "Account isn’t activated. Please complete the activation process.";
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
