export const usePhoneFormat = () => {
  const formatForState = (value: string) => {
    const noPrefix = value.startsWith("+91 ") ? value.slice(4) : value;
    const digits = noPrefix.replace(/\D/g, "");
    const limited = digits.slice(0, 10);
    return limited ? `+91 ${limited}` : "";
  };

  const formatForDisplay = (number: string) => {
    const base = number.startsWith("+91 ") ? 9 : 5;
    return number.length > base
      ? `${number.slice(0, base)} ${number.slice(base)}`
      : number;
  };

  return { formatForState, formatForDisplay };
};
