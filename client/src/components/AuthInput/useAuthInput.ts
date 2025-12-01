import { useState } from "react";
import { sendOTP } from "../../apis/sendOTP";

export type Option = "phone" | "email";

export interface UseAuthInputProps {
  forward: () => void;
}

export interface HookResults {
  option: Option;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  submit: () => void;
  selectOption: (next: Option) => void;
}

export const useAuthInput = ({ forward }: UseAuthInputProps): HookResults => {
  const [option, setOption] = useState<Option>("phone");
  const [input, setInput] = useState("");

  const selectOption = (next: Option) => {
    setOption(next);
    setInput("");
  };

  const submit = async () => {
    const argument = option === "phone" ? { phone: input } : { email: input };

    try {
      const data = await sendOTP(argument);
      if (data.success) forward();
      else console.error("OTP_ERROR", data);
    } catch (err) {
      console.error("OTP_ERROR", err);
    }
  };

  return { option, input, setInput, submit, selectOption };
};
