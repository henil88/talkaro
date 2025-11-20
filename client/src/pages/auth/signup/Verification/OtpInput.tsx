import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
  type FocusEvent,
} from "react";

interface OtpInputProps {
  length?: number;
  onChange?: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 4, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [isUserEditing, setIsUserEditing] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const updateOtp = (newOtp: string[]) => {
    setOtp(newOtp);
    onChange?.(newOtp.join(""));
  };

  const getFirstEmptyIndex = useCallback(
    () => otp.findIndex((d) => d === ""),
    [otp]
  );

  /** Auto focus only when user is not manually editing */
  useEffect(() => {
    if (isUserEditing) return;

    const firstEmpty = getFirstEmptyIndex();
    if (firstEmpty !== -1) {
      inputsRef.current[firstEmpty]?.focus();
    }
  }, [otp, getFirstEmptyIndex, isUserEditing]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/g, "");

    const newOtp = [...otp];
    newOtp[index] = value ? value[0] : "";
    updateOtp(newOtp);

    // User typed → stop editing mode
    setIsUserEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
      setIsUserEditing(true);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pasteData.length === length) {
      updateOtp(pasteData.split("").slice(0, length));
      setIsUserEditing(false);
    }
  };

  /** Allow editing previous boxes without focus being stolen */
  const handleFocus = (e: FocusEvent<HTMLInputElement>, index: number) => {
    const firstEmpty = getFirstEmptyIndex();

    // If user tries to focus after the first empty box → redirect focus
    if (index > firstEmpty && firstEmpty !== -1) {
      e.preventDefault();
      inputsRef.current[firstEmpty]?.focus();
      return;
    }

    // But if user focuses a previous filled box, mark editing mode
    setIsUserEditing(true);
  };

  return (
    <div className="flex gap-4.5">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onFocus={(e) => handleFocus(e, index)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center focus:fill-cyan-500 drop-shadow-lg drop-shadow-cyan-500/25 text-xl rounded-xl border border-gray-400 focus:bg-neutral-800 duration-200 focus:border-blue-500 focus:outline-none"
        />
      ))}
    </div>
  );
};

export default OtpInput;
