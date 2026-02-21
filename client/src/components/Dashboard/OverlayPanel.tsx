import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import UsersIcon from "@/assets/Users.png";

type OverlayPanelProps = {
  onClose: () => void;
};

const OverlayPanel = ({ onClose }: OverlayPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState("");

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    if (!topic.trim()) return;
    onClose();
  }, [topic, onClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30"
        aria-hidden="true"
        onClick={handleClose}
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-lg bg-stone-900 rounded-3xl shadow-xl outline-none"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close dialog"
          className="w-6 h-6 absolute top-4 right-4 text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full cursor-pointer"
        >
          ✕
        </button>

        <div className="p-7.5 flex flex-col gap-6">
          <section>
            <h2 id="overlay-title" className="text-xl font-semibold mb-3">
              Create a room
            </h2>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter discussion topic"
              className="w-full h-10 px-4 rounded-lg bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-green-500/95 duration-100"
            />
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Room type</h3>
            <div className="flex gap-4 items-center rounded-2xl p-4 hover:bg-neutral-800 bg-neutral-800/50 duration-100 cursor-pointer">
              <div className="w-20 h-20 flex flex-col items-center justify-center rounded-xl bg-neutral-900">
                <img
                  src={UsersIcon}
                  alt="Users Icon"
                  aria-hidden="true"
                  draggable={false}
                  className="w-10 h-10"
                />
                <span className="text-sm mt-1">Social</span>
              </div>
              <span className="text-sm flex-1 text-neutral-300">
                A public room anyone can join and participate in.
              </span>
            </div>
          </section>
        </div>

        <div className="border-t border-neutral-800 p-6 flex flex-col items-center gap-4">
          <span className="text-lg font-semibold">Open to everyone</span>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!topic.trim()}
            className="rounded-full px-10 py-2.5 text-lg font-semibold bg-green-500/90 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Start Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverlayPanel;
