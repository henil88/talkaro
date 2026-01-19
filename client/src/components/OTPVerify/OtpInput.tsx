import { useOtpInput } from "./hooks/useOtpInput";

interface OtpInputProps {
  length?: number;
  onChange?: (otp: string) => void;
}

const OtpInput = ({ length = 4, onChange }: OtpInputProps) => {
  const {
    otp,
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleFocus,
  } = useOtpInput(length, onChange);

  return (
    <div className="flex gap-4.5">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) inputsRef.current[index] = el;
          }}
          type="text"
          maxLength={1}
          inputMode="numeric"
          autoComplete="one-time-code"
          value={digit}
          onFocus={(e) => handleFocus(e, index)}
          onPaste={handlePaste}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-xl rounded-xl border border-gray-400 focus:bg-neutral-800 duration-200 focus:border-blue-500 focus:outline-none"
        />
      ))}
    </div>
  );
};

export default OtpInput;
