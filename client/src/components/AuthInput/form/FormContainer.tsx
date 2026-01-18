import type { FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export interface FormContainerProps {
  className?: string;
}

const FormContainer: FC<PropsWithChildren<FormContainerProps>> = ({
  children,
  className,
}) => {
  return (
    <form
      className={cn(
        "w-80 md:w-xl bg-zinc-900 py-22 rounded-2xl px-8 flex flex-col gap-8",
        className,
      )}
    >
      {children}
    </form>
  );
};

export default FormContainer;
