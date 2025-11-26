import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async ({ email, phone }: Identifier, { rejectWithValue }) => {
    const identifier = email || phone;
    if (!identifier) throw new Error("Neither email nor phone was provided.");
    try {
      const response = await api.post("/api/send-otp", { identifier });
      console.log(response.data.message);
    } catch (err) {
      const errMsg =
        ((err as RejectedError)?.response?.data as RejectedResponse)?.message ||
        "Error sending OTP";
      return rejectWithValue(errMsg);
    }
  }
);

type VerifyParam = {
  identifier: Identifier;
  otp: string;
};

type FulfilledResponse = { token: string; user: unknown };

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (
    { identifier: _identifier, otp }: VerifyParam,
    { rejectWithValue }
  ) => {
    const identifier = _identifier.email || _identifier.phone;
    if (!identifier)
      throw new Error(
        "Neither identifier.email nor identifier.phone was provided."
      );
    try {
      const response = await api.post<FulfilledResponse>("/api/verify-otp", {
        identifier,
        otp,
      });
      return response.data;
    } catch (err) {
      const errMsg =
        ((err as RejectedError)?.response?.data as RejectedResponse)?.message ||
        "Error verifying OTP";
      return rejectWithValue(errMsg);
    }
  }
);
