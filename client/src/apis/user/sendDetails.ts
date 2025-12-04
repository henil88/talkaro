import api from "@/lib/axios";
import { store } from "@/store";
import { setUser } from "@/features/user/slice";

interface ProfileDetails {
  username: string;
  avatar: File | null;
}

function formatFormData({ username, avatar }: ProfileDetails): FormData {
  const formData = new FormData();
  formData.append("username", username);
  if (avatar) formData.append("avatar", avatar);
  return formData;
}

type ResponseType = {
  success: boolean;
  message: string;
  user: unknown;
  isActivated: boolean;
};

export const sendDetails = async (details: ProfileDetails) => {
  const { data } = await api.post<ResponseType>(
    "/api/user-details",
    formatFormData(details),
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  if (data.success) store.dispatch(setUser(data));
  return data;
};
