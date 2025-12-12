import { useState } from "react";
import { sendOTP } from "@/apis/sendOTP";
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

  const submit = () => {
    const argument = option === "phone" ? { phone: input } : { email: input };

    toast.promise(sendOTP(argument), {
      loading: "Sending credentials…",
      success: (data) => {
        if (!data.success) throw new Error();
        forward();
        return "OTP sent. Check your inbox and continue.";
      },
      error: "Couldn’t send credentials. Check the info and try again.",
    });
  };

  return { option, input, setInput, submit, selectOption };
};
