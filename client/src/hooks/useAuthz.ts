import { useNavigate } from "react-router";
import { useCallback } from "react";
import { getAccessToken } from "../apis/auth/getAccessToken";
import { getUserDetails } from "../apis/user/getUserDetails";
import api from "../lib/axios";

const useAuthz = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(async () => {
    try {
      const authResponse = await getAccessToken(api);
      if (!authResponse?.isAuthorized) {
        navigate("/auth");
        return;
      }
      const user = await getUserDetails(api);
      if (!user?.isActivated) {
        navigate("/signup");
        return;
      }
      navigate("/app");
    } catch (err) {
      console.error("ERROR_AUTHZ", err);
      navigate("/auth");
    }
  }, [navigate]);

  return { handleClick };
};

export default useAuthz;
