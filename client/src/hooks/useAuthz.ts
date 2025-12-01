import { useNavigate } from "react-router";
import { useCallback } from "react";
import { getAccessToken } from "../apis/auth/getAccessToken";
import api from "../lib/axios";

const useAuthz = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(async () => {
    const response = await getAccessToken(api);
    if (response?.isAuthorized) {
      navigate("/app");
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  return { handleClick };
};

export default useAuthz;
