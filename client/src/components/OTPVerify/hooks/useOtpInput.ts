import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
  type FocusEvent,
} from "react";

export const useOtpInput = (length: number, onChange?: (otp: string) => void) => {
  const [otp, setOtp] = useState(() => Array(length).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const getFirstEmptyIndex = useCallback(
    () => otp.findIndex((d) => !d),
    [otp]
  );

  const updateOtp = (newOtp: string[]) => {
    setOtp(newOtp);
    onChange?.(newOtp.join(""));
  };

  useEffect(() => {
    const firstEmpty = getFirstEmptyIndex();
    if (firstEmpty !== -1) inputsRef.current[firstEmpty]?.focus();
  }, [otp, getFirstEmptyIndex]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    updateOtp(newOtp);
    if (value && index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasteData) updateOtp(pasteData.slice(0, length).split(""));
  };

  const handleFocus = (_e: FocusEvent<HTMLInputElement>, index: number) => {
    const firstEmpty = getFirstEmptyIndex();
    if (index > firstEmpty && firstEmpty !== -1) {
      inputsRef.current[firstEmpty]?.focus();
    }
  };

  return {
    otp,
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleFocus,
  };
};
