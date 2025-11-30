import { useState } from "react";

export interface ProfileDetails {
  username: string;
  avatar: File | null;
}

export function useProfileDetails() {
  const [details, setDetails] = useState<ProfileDetails>({
    username: "",
    avatar: null,
  });

  const updateField = (field: keyof ProfileDetails, value: unknown) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  return { details, updateField };
}
