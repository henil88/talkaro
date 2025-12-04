import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      icons={{
        success: <CircleCheckIcon className="size-4 text-teal-200" />,
        info: <InfoIcon className="size-4 text-sky-700" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-500" />,
        error: <OctagonXIcon className="size-4 text-amber-700" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--toast-bg": "var(--card)",
          "--toast-border": "var(--border)",
          "--toast-text": "var(--card-foreground)",
          "--toast-radius": "var(--radius)",
          "--toast-shadow": "0 4px 20px rgba(0,0,0,0.35)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
