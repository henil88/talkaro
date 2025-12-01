import { useState } from "react";
import PhoneIcon from "../icons/Phone";
import EmailIcon from "../icons/Email";
import OptionButton from "./OptionButton";
import { GeneratedForm } from "./form/GeneratedForm";
import { sendOTP } from "../../apis/sendOTP";

type Props = {
  forward: () => void;
};

type CustomHook<T, P> = (param: T) => P;
type Options = "phone" | "email";

interface HookResults {
  option: Options;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  submit: () => void;
  selectOption: (next: Options) => void;
}

const useEmailPhone: CustomHook<Props, HookResults> = ({ forward }) => {
  const [option, setOption] = useState<Options>("phone");
  const [input, setInput] = useState("");

  const selectOption = (next: Options) => {
    setOption(next);
    setInput("");
  };

  const submit = async () => {
    const argument = option === "phone" ? { phone: input } : { email: input };
    try {
      const data = await sendOTP(argument);
      if (data.success) return forward();
      // keep the user in and show the error
      console.log("ERROR_SUBMITTING_CREDENTIALS", data);
    } catch (err) {
      // keep the user in and show the error
      console.log("ERROR_SUBMITTING_CREDENTIALS", err);
    }
  };

  return {
    option,
    input,
    setInput,
    submit,
    selectOption,
  };
};

const baseButtonClasses =
  "p-3 flex items-center justify-center rounded-2xl duration-200 cursor-pointer";

const buttonBGClasses = {
  active: "bg-blue-500",
  inactive: "bg-neutral-900",
};

const EmailPhone: React.FC<Props> = (props) => {
  const { option, input, setInput, submit, selectOption } =
    useEmailPhone(props);

  return (
    <div>
      <div className="flex justify-end gap-3.5">
        <OptionButton
          optionName="phone"
          currentOption={option}
          onSelect={selectOption}
          baseClasses={baseButtonClasses}
          bgClasses={buttonBGClasses}
        >
          <PhoneIcon size={38} />
        </OptionButton>

        <OptionButton
          optionName="email"
          currentOption={option}
          onSelect={selectOption}
          baseClasses={baseButtonClasses}
          bgClasses={buttonBGClasses}
        >
          <EmailIcon size={38} />
        </OptionButton>
      </div>

      <div className="mt-4">
        <GeneratedForm
          field={option}
          input={input}
          setInput={setInput}
          submit={submit}
        />
      </div>
    </div>
  );
};

export default EmailPhone;
