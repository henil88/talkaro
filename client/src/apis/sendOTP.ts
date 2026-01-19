import api from "@/lib/axios";
import { store } from "@/store";
import { setCredentials } from "@/features/auth/slice";
import type { Identifier } from "@/types/credentials";

type ResponseType = { success: boolean; message: string };

export const sendOTP = async ({ email, phone }: Identifier) => {
  if (!email && !phone) throw new Error("Neither email nor phone was provided.");

  const { data } = await api.post<ResponseType>("/api/send-otp", { email, phone });
  if (data.success) console.log("SUCCESS_SENDING_CREDENTIALS", data);

  store.dispatch(setCredentials({ email, phone }));
  return data;
};
