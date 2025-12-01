import { useState } from "react";
import Button from "../Button";
import OtpInput from "./OtpInput";
import { verifyOTP } from "../../apis/auth/verifyOTP";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router";

type Props = {
  back: () => void;
};

const useVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { credentials } = useAppSelector((state) => state.auth);
  const { isActivated } = useAppSelector((state) => state.user);
  const submit = async () => {
    const finalOTP = otp.length === 4 ? otp : null;
    const identifier = credentials?.email || credentials?.phone;
    if (!finalOTP) return;
    if (!identifier) {
      console.error("Neither email nor phone was provided.");
      navigate("/auth");
      return;
    }
    try {
      const { isAuthorized } = await verifyOTP({ identifier, otp });
      if (!isAuthorized) return console.error("Wrong OTP");
      if (!isActivated) return navigate("/auth");
      navigate("/app");
    } catch (err) {
      console.error("ERROR_VERIFYING_OTP", err);
    }
  };
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
