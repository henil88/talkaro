import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type RegisterOutletProps = PropsWithChildren<{
  className?: string;
}>;

const RegisterOutlet = ({ children, className }: RegisterOutletProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

RegisterOutlet.displayName = "RegisterOutlet";

export default RegisterOutlet;
