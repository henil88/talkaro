import IndiaFlagIcon from "../../../../components/icons/IndiaFlag";
import Button from "../../../../components/Button";

type Props = {
  goToNextStage: () => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  submit: (input: string) => void;
};

const Phone: React.FC<Props> = ({ input, setInput, submit }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const value = rawValue.startsWith("+91 ") ? rawValue.slice(4) : rawValue;
    const digitsOnly = value.replace(/\D/g, "");
    const limitedDigits = digitsOnly.slice(0, 10);
    const formattedNumber = limitedDigits ? `+91 ${limitedDigits}` : "";
    setInput(formattedNumber);
  };

  const formatDisplayNumber = (number: string) => {
    const startIndex = number.startsWith("+91 ") ? 9 : 5;
    if (number.length > startIndex) {
      return `${number.slice(0, startIndex)} ${number.slice(startIndex)}`;
    }
    return number;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(input);
  };
  // <div className="w-xl bg-zinc-900 py-22 rounded-2xl px-8 flex flex-col gap-10">
  return (
    <form
      onSubmit={onSubmit}
      className="w-xl bg-zinc-900 py-22 rounded-2xl px-8 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-10.5">
        <h4
          id="phone"
          className="text-2xl font-normal font-roboto text-center w-full select-none duration-200"
        >
          Enter your phone number
        </h4>
        <div className="w-full flex justify-center items-center">
          <label className="input-box bg-zinc-800 rounded-lg flex justify-center items-center w-[18rem] h-12">
            <label
              htmlFor="flag"
              className="flex items-center justify-between w-full h-full px-3.5 cursor-pointer"
            >
              <IndiaFlagIcon size={24.5} className="rounded-md" />
              <input
                id="flag"
                type="tel"
                value={formatDisplayNumber(input)}
                onChange={handleChange}
                placeholder="+91-98233-24223"
                className="text-lg/loose duration-200 outline-0 pl-3.5 py-2 w-full h-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </label>
          </label>
        </div>
      </div>
      <div className="w-full flex justify-center items-center flex-col gap-5">
        <Button
          type="submit"
          className="w-[11.12rem]"
          onClick={() => submit(input)}
        >
          Next
        </Button>
        <p className="text-[#C4C5C5] text-sm w-75 text-center">
          By entering your number, you’re agreeing to our{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Privacy Policy
          </span>
          . Thanks!
        </p>
      </div>
    </form>
  );
  // </div>
};

export default Phone;
