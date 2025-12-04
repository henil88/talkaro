import { useCallback, useState } from "react";
import { sendDetails } from "@/apis/user/sendDetails";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface ProfileDetails {
  username: string;
  avatar: File | null;
}

export function useProfileDetails() {
  const navigate = useNavigate();
  const [details, setDetails] = useState<ProfileDetails>({
    username: "",
    avatar: null,
  });

  const updateField = (field: keyof ProfileDetails, value: unknown) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = useCallback(() => {
    toast.promise(sendDetails(details), {
      loading: "Processing your request…",
      success: (data) => {
        if (!data?.success) throw new Error();
        navigate("/app");
        return "Account activated. Redirecting to your dashboard.";
      },
      error: () =>
        "An error occurred. Please review the details and try again.",
    });
  }, [details, navigate]);

  return { details, updateField, handleSubmit };
}
