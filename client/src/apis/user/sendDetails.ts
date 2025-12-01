import type { AxiosError } from "axios";
import api from "../../lib/axios";

interface ProfileDetails {
  username: string;
  avatar: File | null;
}

function formatFormData(payload: ProfileDetails): FormData {
  const formData = new FormData();
  formData.append("username", payload["username"]);
  if (payload["avatar"]) formData.append("avatar", payload["avatar"]);
  return formData;
}

type RejectedError = unknown & AxiosError;
type RejectedResponse = { message: string };

type ResponseType = { success: boolean; message: string };

export const sendDetails = async (details: ProfileDetails) => {
  const formData = formatFormData(details);
  try {
    const response = await api.post<ResponseType>(
      "/api/user-details",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    const errMsg =
      ((err as RejectedError)?.response?.data as RejectedResponse)?.message ||
      "Error sending Details";
    console.error(errMsg);
  }
};
