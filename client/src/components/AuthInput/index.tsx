import { useAuthInput } from "./useAuthInput";
import { baseButtonClasses, buttonBGClasses } from "./constants";
import OptionButton from "./OptionButton";
import PhoneIcon from "../icons/Phone";
import EmailIcon from "../icons/Email";
import GeneratedForm from "./form/GeneratedForm";

type Props = {
  forward: () => void;
};

const AuthInput: React.FC<Props> = (props) => {
  const { option, input, setInput, submit, selectOption } = useAuthInput(props);

  return (
    <div className="w-80 md:w-full">
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

export default AuthInput;
