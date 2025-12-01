import { useCallback, useState } from "react";
import { sendDetails } from "../../../apis/user/sendDetails";
import { useNavigate } from "react-router";

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

  const handleSubmit = useCallback(async () => {
    const data = await sendDetails(details);
    if (data?.success) return navigate("/app");
  }, [details, navigate]);

  return { details, updateField, handleSubmit };
}
