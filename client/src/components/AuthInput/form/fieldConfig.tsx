import IndiaFlagIcon from "../../icons/IndiaFlag";

export const fieldConfig = {
  phone: {
    label: "Enter your phone number",
    placeholder: "+91-98233-24223",
    type: "tel",
    icon: <IndiaFlagIcon size={24.5} className="rounded-md" />,
  },
  email: {
    label: "Enter your email id",
    placeholder: "talkaro@talkaro.com",
    type: "email",
    icon: null,
  },
} as const;
