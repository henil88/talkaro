import { useCallback } from "react";
import UsersIcon from "@/assets/Users.png";

type OverlayPanelProps = {
  onClose: () => void;
};

const OverlayPanel = ({ onClose }: OverlayPanelProps) => {
  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    // Submit handler logic stay's here
  }, []);

  return (
    <div
      className="fixed inset-0 z-30 bg-black/25"
      role="dialog"
      aria-modal="true"
      aria-labelledby="overlay-title"
    >
      <div
        className="absolute inset-0"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-lg md:w-lg h-123 bg-stone-900 rounded-3xl relative">
          <button
            type="button"
            onClick={handleCloseClick}
            aria-label="Close dialog"
            className="absolute top-0 right-0 text-xl font-light cursor-pointer p-4"
          >
            X
          </button>
          <div className="w-full flex flex-col gap-6 p-7.5">
            <section className="w-full">
              <h3 id="overlay-title" className="text-xl font-semibold mb-3">
                Enter the topic to be discussed
              </h3>
              <div className="w-full h-10">
                <input
                  type="text"
                  className="w-full h-full py-2.5 px-4 rounded-lg bg-neutral-800"
                  aria-label="Discussion topic"
                />
              </div>
            </section>

            <section className="w-full">
              <header className="mb-4">
                <h4 className="text-xl font-semibold">Room type</h4>
              </header>

              <div className="group cursor-pointer flex justify-start gap-4">
                <div className="w-30 h-30 rounded-2xl duration-100 group-hover:bg-neutral-800 hover:bg-neutral-800 flex flex-col justify-center items-center">
                  <div className="w-15 h-15">
                    <img
                      className="w-full h-full"
                      draggable="false"
                      src={UsersIcon}
                      alt="Users"
                    />
                  </div>
                  <span className="text-base font-light">Social</span>
                </div>

                <div className="flex-1 flex flex-col justify-center items-start">
                  <span>
                    This room is for public use only. If you want private, go
                    fuck yourself somewhere else.
                  </span>
                </div>
              </div>
            </section>
          </div>
          <div className="w-full h-px bg-neutral-800" />
          <div className="w-full flex flex-col gap-6 p-7.5 items-center justify-around">
            <div className="text-xl font-semibold">
              <span>Start a room, open to everyone</span>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="py-2.5 px-10 rounded-full text-lg font-semibold bg-green-500/90 hover:bg-green-500 cursor-pointer"
            >
              🎉 Let's Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayPanel;
