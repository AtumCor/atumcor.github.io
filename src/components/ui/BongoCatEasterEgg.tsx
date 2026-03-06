import { useEffect, useRef, useState } from "react";
import bongoCatGif from "../../assets/bongo-cat.gif";
import "../../styles/ui/bongo-cat-easter-egg.css";

export default function BongoCatEasterEgg() {
  const [, setSpaceCount] = useState(0);
  const [showBongo, setShowBongo] = useState(false);

  const resetTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName;
        const isTyping =
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          target?.isContentEditable;

        if (isTyping) return;

        setSpaceCount((prev) => {
          const next = prev + 1;

          if (resetTimerRef.current) {
            window.clearTimeout(resetTimerRef.current);
          }

          resetTimerRef.current = window.setTimeout(() => {
            setSpaceCount(0);
          }, 1800);

          if (next >= 5) {
            setShowBongo(true);
            setSpaceCount(0);

            if (resetTimerRef.current) {
              window.clearTimeout(resetTimerRef.current);
            }

            if (hideTimerRef.current) {
              window.clearTimeout(hideTimerRef.current);
            }

            hideTimerRef.current = window.setTimeout(() => {
              setShowBongo(false);
            }, 4000);

            return 0;
          }

          return next;
        });
      }

      if (e.key === "Escape") {
        setShowBongo(false);
        setSpaceCount(0);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);

      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }

      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return (
    <div className={`bongoGifShell ${showBongo ? "isVisible" : ""}`} aria-hidden={!showBongo}>
      <img
        className="bongoGif"
        src={bongoCatGif}
        alt="Bongo cat playing drums"
      />
    </div>
  );
}