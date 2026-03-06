import { useEffect, useRef, useState } from "react";

type UseHorizontalWheelOptions = {
  homeIndex?: number;         // default 0
  blockOnHome?: boolean;      // default true
  blockMessage?: string;      // default "Not this way."
  oncePerSession?: boolean;   // default true (session = page load)
  storageKey?: string;        // used only if oncePerSession=false
};

export function useHorizontalWheel(
  scrollerRef: React.RefObject<HTMLElement>,
  opts: UseHorizontalWheelOptions = {}
) {
  const {
    homeIndex = 0,
    blockOnHome = true,
    blockMessage = "Not this way.",
    oncePerSession = true,
    storageKey = "notThisWayShown",
  } = opts;

  const [flash, setFlash] = useState(false);
  const shownThisLoadRef = useRef(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const verticalIntent = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (!verticalIntent) return;

      const idx = Math.round(el.scrollLeft / el.clientWidth);

      if (blockOnHome && idx === homeIndex) {
        e.preventDefault();

        const shownEver =
          !oncePerSession && localStorage.getItem(storageKey) === "1";

        const shouldShow =
          oncePerSession ? !shownThisLoadRef.current : !shownEver;

        if (shouldShow) {
          if (oncePerSession) shownThisLoadRef.current = true;
          else localStorage.setItem(storageKey, "1");

          setFlash(true);
          window.setTimeout(() => setFlash(false), 20);
        }
        return;
      }

      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "auto" });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, [scrollerRef, homeIndex, blockOnHome, blockMessage, oncePerSession, storageKey]);

  return { flash, blockMessage };
}
