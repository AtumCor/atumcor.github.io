import { useEffect, useState } from "react";

export type GravityModeState = {
  gravityEnabled: boolean;
  blackHoleEnabled: boolean;
};

export default function useGravityMode(): GravityModeState {
  const [gravityEnabled, setGravityEnabled] = useState(false);
  const [blackHoleEnabled, setBlackHoleEnabled] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;

      const isTyping =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable;

      if (isTyping) return;
      if (e.repeat) return;

      if (e.key.toLowerCase() !== "g") return;

      e.preventDefault();

      if (e.shiftKey) {
        setBlackHoleEnabled((prev) => {
          const next = !prev;

          // black hole implies gravity is on
          if (next) {
            setGravityEnabled(true);
          }

          return next;
        });
        return;
      }

      setGravityEnabled((prev) => {
        const next = !prev;

        // turning gravity off also turns black hole off
        if (!next) {
          setBlackHoleEnabled(false);
        }

        return next;
      });
    };

    const onBlur = () => {
      setGravityEnabled(false);
      setBlackHoleEnabled(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return { gravityEnabled, blackHoleEnabled };
}