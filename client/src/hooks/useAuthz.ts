import { useNavigate } from "react-router";
import { useCallback } from "react";
import api from "@/lib/axios";
import { checkAuthorization } from "@/utils/authUtils";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";

const useAuthz = () => {
  const navigate = useNavigate();
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);
  const isActivated = useAppSelector((state) => state.user.isActivated);

  const handleClick = useCallback(async () => {
    const dismiss = toast.loading("Checking authorization…");

    try {
      const status =
        isAuthorized && isActivated
          ? { isAuthorized: true, isActivated: true }
          : await checkAuthorization(api);

      toast.dismiss(dismiss);

      if (!status.isAuthorized) {
        navigate("/auth");
        toast.error("Access denied – please sign in or create an account.");
        return;
      }

      if (!status.isActivated) {
        navigate("/signup");
        toast.warning("Activate your account to continue.");
        return;
      }

      navigate("/app");
      toast.success("Welcome back – redirecting to dashboard.");
    } catch {
      toast.dismiss(dismiss);
      toast.error("Something went wrong – try again later.");
    }
  }, [navigate, isAuthorized, isActivated]);

  return { handleClick };
};

export default useAuthz;
