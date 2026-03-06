import { useEffect, useMemo, useRef, useState } from "react";

type PageItem = { id: string; title: string };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function PageIndicator({
  scrollerRef,
  pages,
}: {
  scrollerRef: React.RefObject<HTMLElement>;
  pages: PageItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  // right (initial) -> bottom (after moving away from Home)
  const position = activeIndex === 0 ? "right" : "bottom";

  // add a transient class to animate the "rotation down" motion
  const [animClass, setAnimClass] = useState<string>("");

  const prevPositionRef = useRef<string>(position);

  const ids = useMemo(() => pages.map((p) => p.id), [pages]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const idx = clamp(
        Math.round(el.scrollLeft / el.clientWidth),
        0,
        ids.length - 1
      );
      setActiveIndex(idx);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollerRef, ids.length]);

  useEffect(() => {
    const prev = prevPositionRef.current;
    if (prev === position) return;

    // Trigger a quick rotate animation when changing sides.
    setAnimClass(position === "bottom" ? "pageIndicator--animToBottom" : "pageIndicator--animToRight");

    const t = window.setTimeout(() => setAnimClass(""), 420);
    prevPositionRef.current = position;

    return () => window.clearTimeout(t);
  }, [position]);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <nav
      className={[
        "pageIndicator",
        position === "right" ? "pageIndicator--right" : "pageIndicator--bottom",
        animClass,
      ].join(" ")}
      aria-label="Page indicator"
    >
      {pages.map((p, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={p.id}
            type="button"
            className={`pageDot ${isActive ? "isActive" : ""}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to ${p.title}`}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="pageDotLabel" aria-hidden="true">
              {p.title}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
