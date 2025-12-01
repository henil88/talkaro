import { useVerification } from "./hooks/useVerification";
import { wrapperClasses, headingClasses } from "./constants";
import OtpInput from "./OtpInput";
import Button from "../Button";

type Props = {
  back: () => void;
};

const Verification: React.FC<Props> = (props) => {
  const { onChange, submit } = useVerification(props);

  return (
    <div className={wrapperClasses}>
      <div className="flex flex-col gap-10.5">
        <h4 id="phone" className={headingClasses}>
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
  );
};

export default Verification;
