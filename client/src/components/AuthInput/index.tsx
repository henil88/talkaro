import { useState } from "react";
import PhoneIcon from "../icons/Phone";
import EmailIcon from "../icons/Email";
import OptionButton from "./OptionButton";
import { GeneratedForm } from "./form/GeneratedForm";
import { useNavigate } from "react-router";

const useEmailPhone = () => {
  const [option, setOption] = useState<"phone" | "email">("phone");
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const selectOption = (next: "phone" | "email") => {
    setOption(next);
    setInput("");
  };

  const submit = () => {
    console.log(input);
    navigate("/auth/verify");
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

const EmailPhone: React.FC = () => {
  const { option, input, setInput, submit, selectOption } = useEmailPhone();

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
