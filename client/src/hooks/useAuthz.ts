import { useNavigate } from "react-router";
import { useCallback } from "react";
import api from "@/lib/axios";
import { checkAuthorization } from "@/utils/authUtils";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";

const useAuthz = () => {
  const navigate = useNavigate();
  const { isAuthorized } = useAppSelector((state) => state.auth);
  const { isActivated } = useAppSelector((state) => state.user);

  const handleClick = useCallback(() => {
    toast.promise(
      async () => {
        if (!isAuthorized && !isActivated) {
          const { isAuthorized, isActivated } = await checkAuthorization(api);
          if (!isAuthorized) throw { type: "unauthorized" };
          if (!isActivated) return { type: "inactive" };
        }
        return { type: "ok" };
      },
      {
        loading: "Checking authorization…",
        success: (result) => {
          if (result.type === "inactive") {
            navigate("/signup");
            return "Activate your account to continue.";
          }
          if (result.type === "ok") {
            navigate("/app");
            return "Welcome back - redirecting to dashboard.";
          }
          return "Success.";
        },
        error: (err) => {
          if (err?.type === "unauthorized") {
            navigate("/auth");
            return "Access denied - please sign in or create an account.";
          }
          return "Something went wrong - try again later.";
        },
      }
    );
  }, [navigate]);

  return { handleClick };
};

export default useAuthz;
