import type { AxiosError } from "axios";
import api from "../../lib/axios";

type Identifier =
  | {
      email: string;
      phone?: never;
    }
  | {
      email?: never;
      phone: string;
    };

type RejectedError = unknown & AxiosError;
type RejectedResponse = { message: string };

// sends the email or phone number to backend to perform operations and send success results
export const sendOTP = async ({ email, phone }: Identifier) => {
  const identifier = email || phone;
  if (!identifier) throw new Error("Neither email nor phone was provided.");
  try {
    const response = await api.post("/api/send-otp", { identifier });
    console.log(response.data.message);
    return Promise.resolve(response.data);
  } catch (err) {
    const errMsg =
      ((err as RejectedError)?.response?.data as RejectedResponse)?.message ||
      "Error sending OTP";
    return errMsg;
  }
};
