import { useEffect, useMemo, useRef, useState } from "react";

type PageItem = {
  id: string;
  title: string;
};

type IndicatorPosition = "right" | "bottom";

export default function PageIndicator({
  scrollerRef,
  pages,
}: {
  scrollerRef: React.RefObject<HTMLElement | null>;
  pages: PageItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const prevPositionRef = useRef<IndicatorPosition>("right");

  const position: IndicatorPosition = activeIndex === 0 ? "right" : "bottom";

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateActive = () => {
      const nextIndex = Math.round(el.scrollLeft / el.clientWidth);
      setActiveIndex(nextIndex);
    };

    updateActive();
    el.addEventListener("scroll", updateActive, { passive: true });

    return () => el.removeEventListener("scroll", updateActive);
  }, [scrollerRef]);

  useEffect(() => {
    const indicator = indicatorRef.current;
    if (!indicator) return;

    const prev = prevPositionRef.current;
    if (prev === position) return;

    const animClass =
      position === "bottom"
        ? "pageIndicator--animToBottom"
        : "pageIndicator--animToRight";

    indicator.classList.remove(
      "pageIndicator--animToBottom",
      "pageIndicator--animToRight"
    );

    // force reflow so the animation can restart cleanly
    void indicator.offsetWidth;

    indicator.classList.add(animClass);

    const t = window.setTimeout(() => {
      indicator.classList.remove(animClass);
    }, 420);

    prevPositionRef.current = position;

    return () => window.clearTimeout(t);
  }, [position]);

  const wrapperClass = useMemo(() => {
    return `pageIndicator pageIndicator--${position}`;
  }, [position]);

  return (
    <div ref={indicatorRef} className={wrapperClass} aria-label="Page indicator">
      {pages.map((page, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={page.id}
            type="button"
            className={`pageDot ${isActive ? "isActive" : ""}`}
            aria-label={`Go to ${page.title}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => {
              const el = scrollerRef.current;
              if (!el) return;

              el.scrollTo({
                left: index * el.clientWidth,
                behavior: "smooth",
              });
            }}
          />
        );
      })}
    </div>
  );
}