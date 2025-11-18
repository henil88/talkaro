import { useState, useCallback } from "react";
import PhoneIcon from "../../../../components/icons/Phone";
import EmailIcon from "../../../../components/icons/Email";
import Phone from "./phone"; // Assuming this is a React component
import Email from "./email"; // Assuming this is a React component
import OptionButton from "./OptionButton";

// 📝 Define a union type for the possible state values
type OptionType = 'phone' | 'email';

const EmailPhone: React.FC = () => {
  // Use the defined type for useState
  const [option, setOption] = useState<OptionType>("phone");

  // Use the defined type in useCallback
  const handleOptionChange = useCallback((newOption: OptionType) => {
    setOption(newOption);
  }, []);

  const baseButtonClasses: string = "p-3 flex items-center justify-center rounded-2xl duration-200 cursor-pointer";
  
  const buttonBGClasses: { active: string; inactive: string } = {
    active: "bg-blue-500",
    inactive: "bg-neutral-900",
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="w-fit flex justify-end items-start">
          <div className="flex gap-3.5">
            {/* Phone Button */}
            <OptionButton
              optionName="phone"
              currentOption={option}
              onSelect={handleOptionChange}
              baseClasses={baseButtonClasses}
              bgClasses={buttonBGClasses}
            >
              {/* Assuming PhoneIcon accepts 'size' as a number prop */}
              <PhoneIcon size={38} /> 
            </OptionButton>

            {/* Email Button */}
            <OptionButton
              optionName="email"
              currentOption={option}
              onSelect={handleOptionChange}
              baseClasses={baseButtonClasses}
              bgClasses={buttonBGClasses}
            >
              {/* Assuming EmailIcon accepts 'size' as a number prop */}
              <EmailIcon size={38} />
            </OptionButton>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {/* Conditional render based on the state value */}
        {option === "phone" ? <Phone /> : <Email />}
      </div>
    </>
  );
};

export default EmailPhone;