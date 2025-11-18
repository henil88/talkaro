import type { ReactNode } from "react";

type Props = {
  children: ReactNode; // Type the children prop as ReactNode
};

const RegisterOutlet = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default RegisterOutlet;
