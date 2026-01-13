import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const Navbar = () => {
  const navigate = useNavigate();
  const { isActivated, user } = useAppSelector((state) => state.user);

  const handleNavigateHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleNavigateProfile = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  return (
    <nav className="w-full flex items-center justify-between px-4 py-4 md:px-12">
      <button
        type="button"
        onClick={handleNavigateHome}
        className="flex cursor-pointer items-center gap-2"
        aria-label="Go to home page"
      >
        <div className="Icon" aria-hidden="true" />
        <span className="text-3xl md:text-4xl font-bitcount">Talkaro</span>
      </button>

      {isActivated && (
        <button
          type="button"
          onClick={handleNavigateProfile}
          className="flex cursor-pointer items-center gap-5"
          aria-label="Go to profile"
        >
          <span className="text-lg md:text-xl">{user?.name}</span>
          <div className="size-12 overflow-hidden rounded-full md:size-14">
            <img
              src={user?.avatar}
              alt={`${user?.name ?? "User"} avatar`}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
