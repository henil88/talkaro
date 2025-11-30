/* eslint-disable */
// @ts-nocheck
import api from "../lib/axios";
function formatFormData<T extends Record<string, unknown>>(
  payload: T
): FormData {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => {
    const value = payload[key];
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  return formData;
}

interface ProfileDetails {
  username: string;
  avatar: File | null;
}

export const sendDetails = async (details: ProfileDetails) => {
  const formData = formatFormData(details);
  try {
    const response = await api.post("/api/user-details", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    const errMsg =
      ((err as RejectedError)?.response?.data as RejectedResponse)?.message ||
      "Error sending Details";
    console.error(errMsg);
  }
};
