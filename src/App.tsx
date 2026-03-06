import { useEffect, useRef, useState } from "react";
import "./styles/styles.css";

import ThemeToggle from "./components/ui/ThemeToggle";
import Section from "./components/layout/Section";
import NotThisWay from "./components/ui/NotThisWay";
import PageIndicator from "./components/layout/PageIndicator";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";

type PageDef = { id: string; title: string; Component: React.ComponentType };

const PAGES: PageDef[] = [
  { id: "home", title: "Home", Component: Home },
  { id: "projects", title: "Projects", Component: Projects },
  { id: "skills", title: "Skills", Component: Skills },
  { id: "experience", title: "Experience", Component: Experience },
  { id: "contact", title: "Contact", Component: Contact },
];

type BlockPosition = "top" | "bottom";

export default function App() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const [toast, setToast] = useState<{
    show: boolean;
    position: BlockPosition;
  }>({ show: false, position: "bottom" });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Show once per direction per page load
    let shownDown = false;
    let shownUp = false;

    const showToast = (position: BlockPosition) => {
      setToast({ show: true, position });
      window.setTimeout(() => setToast((t) => ({ ...t, show: false })), 900);
    };

    const onWheel = (e: WheelEvent) => {
      const verticalIntent = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (!verticalIntent) return;

      const idx = Math.round(el.scrollLeft / el.clientWidth);

      // ✅ Only do horizontal page scrolling when holding Shift
      if (e.shiftKey) {
        // Home: optional "Not this way" logic doesn't apply here; Shift IS the intended way
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "auto" });
        return;
      }

      // ✅ Without Shift: DO NOT prevent default.
      // Let the currently-hovered page content scroll vertically like normal.

      // Optional: keep your "Not this way." behavior ONLY on Home when user tries normal scroll
      // (This helps teach the interaction without breaking vertical scroll on other pages)
      if (idx === 0) {
        // if home has no vertical content, this will just show the toast
        // and prevent the "dead scroll" feeling
        e.preventDefault();

        if (Math.abs(e.deltaY) < 0.5) return;

        if (e.deltaY > 0 && !shownDown) {
          shownDown = true;
          showToast("bottom");
        } else if (e.deltaY < 0 && !shownUp) {
          shownUp = true;
          showToast("top");
        }
      }

      // For other pages, do nothing:
      // the browser will scroll the inner vertical scroller (we'll set it up in CSS)
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, []);

  return (
    <div className="scroller" ref={scrollerRef}>
      <div className="topRightControls">
        <ThemeToggle />
      </div>

      <PageIndicator scrollerRef={scrollerRef} pages={PAGES} />

      <NotThisWay
        show={toast.show}
        position={toast.position}
        text="Not this way."
      />

      <div className="gradientBackdrop" aria-hidden="true" />

      {PAGES.map(({ id, title, Component }) => (
        <Section key={id} id={id} title={title}>
          <Component />
        </Section>
      ))}
    </div>
  );
}
