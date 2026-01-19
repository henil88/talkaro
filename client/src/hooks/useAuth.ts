import { useAppSelector } from "@/store/hooks";

export const useAuth = () => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    throw new Error("useAuth must be used within a protected route");
  }

  return user;
};
