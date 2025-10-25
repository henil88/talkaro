import type { ReactNode } from "react";
import { FaAngleRight } from "react-icons/fa6";

type Props = {
  className?: string;
  onClick?: () => void;
  children: ReactNode; // Type the children prop as ReactNode
};

const Button = ({ children, className, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        " hover:gap-2 hover:bg-blue-700 rounded-sm bg-blue-900 px-4 py-2 cursor-pointer flex justify-center items-center gap-1.5 ease-in select-none duration-100 " +
        className
      }
    >
      {children}
      <div className="pt-0.5">
        <FaAngleRight />
      </div>
    </button>
  );
};

export default Button;
