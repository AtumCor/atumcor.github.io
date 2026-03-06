import { useEffect, useRef, useState } from "react";

type UseHorizontalWheelOptions = {
  homeIndex?: number;       // default 0
  blockOnHome?: boolean;    // default true
  blockMessage?: string;    // default "Not this way."
  oncePerSession?: boolean; // default true (session = page load)
  storageKey?: string;      // used only if oncePerSession=false
};

export type BlockPosition = "top" | "bottom";

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
  const [position, setPosition] = useState<BlockPosition>("bottom");

  // track shown messages without forcing rerenders
  const shownUpThisLoadRef = useRef(false);
  const shownDownThisLoadRef = useRef(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const verticalIntent = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (!verticalIntent) return;

      const idx = Math.round(el.scrollLeft / el.clientWidth);

      // Home: block vertical scrolling + show "Not this way." depending on direction
      if (blockOnHome && idx === homeIndex) {
        e.preventDefault();

        const dir: BlockPosition = e.deltaY < 0 ? "top" : "bottom";
        setPosition(dir);

        // once-ever logic (optional)
        const shownEver =
          !oncePerSession && localStorage.getItem(storageKey) === "1";

        // once-per-direction per load, or once-ever total
        let shouldShow = false;
        if (!oncePerSession) {
          shouldShow = !shownEver;
        } else {
          shouldShow = dir === "top" ? !shownUpThisLoadRef.current : !shownDownThisLoadRef.current;
        }

        if (shouldShow) {
          if (!oncePerSession) {
            localStorage.setItem(storageKey, "1");
          } else {
            if (dir === "top") shownUpThisLoadRef.current = true;
            else shownDownThisLoadRef.current = true;
          }

          setFlash(true);
          window.setTimeout(() => setFlash(false), 20);
        }
        return;
      }

      // Normal behavior: map vertical to horizontal
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "auto" });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, [scrollerRef, homeIndex, blockOnHome, blockMessage, oncePerSession, storageKey]);

  return { flash, blockMessage, position };
}
