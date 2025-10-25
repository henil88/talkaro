import { FaAngleRight } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import type { FC, ReactNode } from "react";

type Props = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode; // Type the children prop as ReactNode
};

const Button: FC<Props> = ({ children, className, onClick, ...props }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        "hover:bg-blue-700 rounded-full bg-blue-900 px-4 py-2.5 pb-3 cursor-pointer flex justify-center items-center gap-1.5 ease-in select-none duration-100",
        className
      )}
      {...props}
    >
      {children}
      <div className="pt-0.5">
        <FaAngleRight />
      </div>
    </button>
  );
};

export default Button;
