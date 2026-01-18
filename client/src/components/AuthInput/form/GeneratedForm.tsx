import Button from "@/components/Button";
import { fieldConfig } from "./fieldConfig";
import FormContainer from "./FormContainer";
import InputWithLabel from "./InputWithLabel";
import Terms from "./Terms";
import { usePhoneFormat } from "./usePhoneFormat";
import { cn } from "@/lib/utils";

const GeneratedForm = ({
  field,
  input,
  setInput,
  submit,
  className,
}: {
  field: keyof typeof fieldConfig;
  input: string;
  setInput: (val: string) => void;
  submit: (v: string) => void;
  className?: string;
}) => {
  const config = fieldConfig[field];
  const { formatForState, formatForDisplay } = usePhoneFormat();

  const handleChange = (val: string) => {
    if (field === "phone") return setInput(formatForState(val));
    setInput(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(field === "email" ? input.trim() : input);
  };

  return (
    <FormContainer className={cn(className)}>
      <div className="flex flex-col gap-10.5">
        <h4 className="text-2xl font-normal font-roboto text-center">
          {config.label}
        </h4>

        <InputWithLabel
          icon={config.icon}
          value={field === "phone" ? formatForDisplay(input) : input}
          onChange={handleChange}
          type={config.type}
          placeholder={config.placeholder}
        />
      </div>

      <div className="w-full flex justify-center items-center flex-col gap-5">
        <Button type="submit" onClick={handleSubmit} className="w-[11.12rem]">
          Next
        </Button>
        <Terms />
      </div>
    </FormContainer>
  );
};

export default GeneratedForm;
