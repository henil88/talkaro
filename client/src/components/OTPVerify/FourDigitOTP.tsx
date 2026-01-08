import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPInputProps {
  length?: number;
  onChange?: (otp: string) => void;
}

const FourDigitOTP = ({ length = 4, onChange }: OTPInputProps) => {
  const [value, setValue] = React.useState("");

  return (
    <InputOTP
      maxLength={length}
      value={value}
      inputMode="numeric"
      pattern="\d*"
      onChange={(val) => {
        const digitsOnly = val.replace(/\D/g, "").slice(0, 4);
        setValue(digitsOnly);
        onChange?.(digitsOnly);
      }}
    >
      <InputOTPGroup>
        {Array.from({ length }).map((_, idx) => (
          <InputOTPSlot
            className="h-10 w-10 text-zinc-50 text-base border-zinc-600"
            key={idx}
            index={idx}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};

export default FourDigitOTP;
