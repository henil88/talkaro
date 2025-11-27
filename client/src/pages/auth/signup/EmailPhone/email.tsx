import Button from "../../../../components/Button";

type Props = {
  goToNextStage: () => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  submit: (input: string) => void;
};

const Email: React.FC<Props> = ({ input, setInput, submit }) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(input.trim());
  };
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
          Enter your email id
        </h4>
        <div className="w-full flex justify-center items-center">
          <label className="input-box bg-zinc-800 rounded-lg flex justify-center items-center w-[18rem] h-12">
            <label
              htmlFor="flag"
              className="flex items-center justify-between w-full h-full px-3.5 cursor-pointer"
            >
              <input
                id="flag"
                type="email"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="talkaro@talkaro.com"
                className="text-lg/loose duration-200 outline-0 py-2 w-full h-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </label>
          </label>
        </div>
      </div>
      <div className="w-full flex justify-center items-center flex-col gap-5">
        <Button type="submit" className="w-[11.12rem]">
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
};

export default Email;
