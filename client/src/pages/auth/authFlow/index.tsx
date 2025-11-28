import RegisterOutlet from "../../../layouts/RegisterOutlet";
import AuthInput from "../../../components/AuthInput";
// import OTPVerify from "../../../components/OTPVerify";

const AuthFlow = () => {
  return (
    <RegisterOutlet>
      <AuthInput />
      {/* <OTPVerify /> */}
    </RegisterOutlet>
  );
};

export default AuthFlow;
