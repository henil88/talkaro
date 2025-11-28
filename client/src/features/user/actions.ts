import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../lib/axios";

type RejectedError = unknown & AxiosError;
type RejectedResponse = { message: string };

type FulfilledResponse = { data: unknown; isActivated: boolean };

export const getUser = createAsyncThunk(
  "user/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<FulfilledResponse>("/api/user");
      console.log(response.data);
      return response.data;
    } catch (err) {
      const errMsg =
        ((err as RejectedError)?.response?.data as RejectedResponse)?.message ||
        "Error Getting User";
      return rejectWithValue(errMsg);
    }
  }
);
