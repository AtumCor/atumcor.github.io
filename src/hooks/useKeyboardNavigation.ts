import { useEffect } from "react";

type PageDef = {
  id: string;
  title: string;
};

export default function useKeyboardNavigation(
  scrollerRef: React.RefObject<HTMLDivElement | null>,
  pages: PageDef[]
) {
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const getCurrentIndex = () => {
      return Math.round(el.scrollLeft / el.clientWidth);
    };

    const scrollToPage = (index: number) => {
      const clamped = Math.max(0, Math.min(index, pages.length - 1));
      el.scrollTo({
        left: clamped * el.clientWidth,
        behavior: "smooth",
      });
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
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const currentIndex = getCurrentIndex();

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          scrollToPage(currentIndex + 1);
          return;

        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          scrollToPage(currentIndex - 1);
          return;

        case "Home":
          e.preventDefault();
          scrollToPage(0);
          return;

        case "End":
          e.preventDefault();
          scrollToPage(pages.length - 1);
          return;
      }

      const pageNumber = Number(e.key);

      if (Number.isInteger(pageNumber) && pageNumber >= 1 && pageNumber <= pages.length) {
        e.preventDefault();
        scrollToPage(pageNumber - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [scrollerRef, pages]);
}