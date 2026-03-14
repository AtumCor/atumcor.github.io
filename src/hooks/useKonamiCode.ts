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
  const [locked, setLocked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showHadouken, setShowHadouken] = useState(false);

  const progressRef = useRef(0);
  const resetTimerRef = useRef<number | null>(null);
  const activationTimerRef = useRef<number | null>(null);
  const hadoukenTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const resetSequence = () => {
      progressRef.current = 0;
      setProgress(0);
      setLocked(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;

      const isTyping =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable;

      if (isTyping) return;

      const pressedKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = KONAMI_SEQUENCE[progressRef.current];

      if (progressRef.current === 0 && pressedKey === KONAMI_SEQUENCE[0]) {
        setLocked(true);
      }

      if (pressedKey === expectedKey) {
        progressRef.current += 1;
        setProgress(progressRef.current);

        if (resetTimerRef.current !== null) {
          window.clearTimeout(resetTimerRef.current);
        }

        resetTimerRef.current = window.setTimeout(() => {
          resetSequence();
        }, 3000);

        if (progressRef.current === KONAMI_SEQUENCE.length) {
          setActive((prev) => !prev);
          setJustActivated(true);
          setShowHadouken(true);

          resetSequence();

          if (activationTimerRef.current !== null) {
            window.clearTimeout(activationTimerRef.current);
          }

          activationTimerRef.current = window.setTimeout(() => {
            setJustActivated(false);
          }, 1400);

          if (hadoukenTimerRef.current !== null) {
            window.clearTimeout(hadoukenTimerRef.current);
          }

          hadoukenTimerRef.current = window.setTimeout(() => {
            setShowHadouken(false);
          }, 1600);
        }

        e.preventDefault();
        return;
      }

      resetSequence();
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

      if (hadoukenTimerRef.current !== null) {
        window.clearTimeout(hadoukenTimerRef.current);
      }
    };
  }, []);

  return { active, justActivated, locked, progress, showHadouken };
}