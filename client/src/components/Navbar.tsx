import { memo, useCallback, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
} as const;

interface UserProfile {
  name?: string;
  avatar?: string;
}

const useNavbarState = (): {
  isActivated: boolean;
  user: UserProfile | null;
} => {
  const { isActivated, user } = useAppSelector((state) => state.user);
  return { isActivated, user };
};

const Navbar = (): JSX.Element => {
  const navigate = useNavigate();
  const { isActivated, user } = useNavbarState();

  const navigateToHome = useCallback((): void => {
    navigate(ROUTES.HOME);
  }, [navigate]);

  const navigateToProfile = useCallback((): void => {
    navigate(ROUTES.PROFILE);
  }, [navigate]);

  return (
    <nav
      className="flex w-full shrink-0 items-center justify-between py-4"
      role="navigation"
      aria-label="Main navigation"
    >
      <button
        type="button"
        onClick={navigateToHome}
        className="flex items-center"
        aria-label="Go to home page"
      >
        <div className="Icon" aria-hidden="true" />
        <span className="text-3xl font-bitcount md:text-4xl">Talkaro</span>
      </button>
      {isActivated && user && (
        <button
          type="button"
          onClick={navigateToProfile}
          className="flex items-center gap-5"
          aria-label="Go to profile"
        >
          <span className="text-lg md:text-xl">{user.name}</span>
          <div className="size-10 overflow-hidden rounded-full md:size-12">
            <img
              src={user.avatar}
              alt={`${user.name ?? "User"} avatar`}
              className="h-full w-full object-cover"
            />
          </div>
        </button>
      )}
    </nav>
  );
};

export default memo(Navbar);
