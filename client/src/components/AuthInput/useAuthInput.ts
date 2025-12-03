import { useState } from "react";
import { sendOTP } from "../../apis/sendOTP";
import { toast } from "sonner";

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
      const promise = sendOTP(argument);
      toast.promise(promise, {
        loading: "Sending credentials…",
        success: (data) => {
          if (data.success) {
            forward();
            return "OTP sent. Check your inbox and continue.";
          } else throw null;
        },
        error: "Couldn’t send credentials. Check the info and try again.",
      });
    } catch (err) {
      console.error("OTP_ERROR", err);
    }
  };

  return { option, input, setInput, submit, selectOption };
};
