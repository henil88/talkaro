import { useNavigate } from "react-router";
import { useCallback } from "react";
import api from "../lib/axios";
import { checkAuthorization } from "../utils/authUtils";

const useAuthz = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(async () => {
    const { isAuthorized, isActivated } = await checkAuthorization(api);
    if (!isAuthorized) return navigate("/auth");
    if (!isActivated) return navigate("/signup");
    navigate("/app");
  }, [navigate]);

  return { handleClick };
};

export default useAuthz;
