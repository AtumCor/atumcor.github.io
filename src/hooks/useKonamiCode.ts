import { useEffect, useRef, useState } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function useKonamiCode() {
  const [active, setActive] = useState(false);
  const [justActivated, setJustActivated] = useState(false);

  const progressRef = useRef(0);
  const resetTimerRef = useRef<number | null>(null);
  const activationTimerRef = useRef<number | null>(null);

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

      const expectedKey = KONAMI_SEQUENCE[progressRef.current];
      const pressedKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (pressedKey === expectedKey) {
        progressRef.current += 1;

        if (resetTimerRef.current !== null) {
          window.clearTimeout(resetTimerRef.current);
        }

        resetTimerRef.current = window.setTimeout(() => {
          progressRef.current = 0;
        }, 2000);

        if (progressRef.current === KONAMI_SEQUENCE.length) {
          setActive((prev) => !prev);
          setJustActivated(true);
          progressRef.current = 0;

          if (resetTimerRef.current !== null) {
            window.clearTimeout(resetTimerRef.current);
            resetTimerRef.current = null;
          }

          if (activationTimerRef.current !== null) {
            window.clearTimeout(activationTimerRef.current);
          }

          activationTimerRef.current = window.setTimeout(() => {
            setJustActivated(false);
          }, 1400);
        }

        return;
      }

      progressRef.current = pressedKey === KONAMI_SEQUENCE[0] ? 1 : 0;

      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }

      if (progressRef.current > 0) {
        resetTimerRef.current = window.setTimeout(() => {
          progressRef.current = 0;
        }, 2000);
      } else {
        resetTimerRef.current = null;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);

      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }

      if (activationTimerRef.current !== null) {
        window.clearTimeout(activationTimerRef.current);
      }
    };
  }, []);

  return { active, justActivated };
}