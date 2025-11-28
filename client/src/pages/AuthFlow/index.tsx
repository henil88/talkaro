import { useState } from "react";
import RegisterOutlet from "../../layouts/RegisterOutlet";
import AuthInput from "../../components/AuthInput";
import OTPVerify from "../../components/OTPVerify";

const AuthFlow = () => {
  const [next, setNext] = useState(false);

  const Outlet = !next ? (
    <AuthInput forward={() => setNext(!next)} />
  ) : (
    <OTPVerify />
  );

  return <RegisterOutlet>{Outlet}</RegisterOutlet>;
};

export default AuthFlow;
