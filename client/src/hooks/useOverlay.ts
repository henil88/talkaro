import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

type OverlayControls = {
  panel: string | null;
  open: (name: string) => void;
  close: () => void;
};

function getPanelFromHash(hash: string): string | null {
  const value = hash.startsWith("#") ? hash.slice(1) : hash;
  return value || null;
}

function useOverlay(): OverlayControls {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const panel = useMemo(() => getPanelFromHash(hash), [hash]);

  const open = useCallback(
    (name: string) => {
      navigate(`#${name}`, { replace: false });
    },
    [navigate],
  );

  const close = useCallback(() => {
    navigate("#", { replace: false });
  }, [navigate]);

  return { panel, open, close };
}

export default useOverlay;
