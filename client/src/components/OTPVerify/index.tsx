import { useState } from "react";
import Button from "../Button";
import OtpInput from "./OtpInput";

type Props = {
  back: () => void;
};

const useVerification = () => {
  const [otp, setOtp] = useState("");
  const submit = () => otp.length === 4 && console.log("submit", otp);
  const onChange = (value: string) => setOtp(value);
  return { onChange, submit };
};

const Verification: React.FC<Props> = () => {
  const { onChange, submit } = useVerification();
  return (
    <>
      <div className="w-xl bg-zinc-900 py-22 rounded-2xl px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-10.5">
          <h4
            id="phone"
            className="text-2xl font-normal font-roboto text-center w-full select-none duration-200"
          >
            Enter the code we just texted you
          </h4>
          <div className="w-full flex justify-center items-center">
            <label className="input-box rounded-lg flex justify-center items-center w-[18rem] h-12">
              <OtpInput length={4} onChange={onChange} />
            </label>
          </div>
        </div>
        <div className="w-full flex justify-center items-center flex-col gap-5">
          <Button className="w-[11.12rem]" onClick={submit}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Verification;
