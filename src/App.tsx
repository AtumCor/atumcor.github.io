import { useEffect, useRef, useState } from "react";
import "./styles/styles.css";

import ThemeToggle from "./components/ui/ThemeToggle";
import Section from "./components/layout/Section";
import NeuralNetworkBackdrop from "./components/layout/NeuralNetworkBackdrop";
import NotThisWay from "./components/ui/NotThisWay";
import PageIndicator from "./components/layout/PageIndicator";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";

import useKeyboardNavigation from "./hooks/useKeyboardNavigation";
import useKonamiCode from "./hooks/useKonamiCode";
import useGravityMode from "./hooks/useGravityMode";
import HadoukenEasterEgg from "./components/ui/HadoukenEasterEgg";

type PageDef = { id: string; title: string; Component: React.ComponentType };
type SectionId = "home" | "projects" | "skills" | "experience" | "contact";

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

  const [activeIndex, setActiveIndex] = useState(0);

  const {
    active: konamiActive,
    justActivated,
    locked,
    progress: konamiProgress,
    showHadouken,
  } = useKonamiCode();

  useKeyboardNavigation(scrollerRef, locked ? [] : PAGES);
  const { gravityEnabled, blackHoleEnabled } = useGravityMode();

  useEffect(() => {
    document.body.classList.toggle("konami-mode", konamiActive);

    return () => {
      document.body.classList.remove("konami-mode");
    };
  }, [konamiActive]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateActiveIndex = () => {
      const nextIndex = Math.round(el.scrollLeft / el.clientWidth);
      const clamped = Math.max(0, Math.min(nextIndex, PAGES.length - 1));
      setActiveIndex(clamped);
    };

    updateActiveIndex();
    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      el.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let shownDown = false;
    let shownUp = false;
    let toastTimeoutId: number | null = null;

    const showToast = (position: BlockPosition) => {
      setToast({ show: true, position });

      if (toastTimeoutId !== null) {
        window.clearTimeout(toastTimeoutId);
      }

      toastTimeoutId = window.setTimeout(() => {
        setToast((t) => ({ ...t, show: false }));
      }, 900);
    };

    const onWheel = (e: WheelEvent) => {
      const verticalIntent = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (!verticalIntent) return;

      const idx = Math.round(el.scrollLeft / el.clientWidth);

      if (e.shiftKey) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "auto" });
        return;
      }

      if (idx === 0) {
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
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);

      if (toastTimeoutId !== null) {
        window.clearTimeout(toastTimeoutId);
      }
    };
  }, []);

  return (
    <>
      <HadoukenEasterEgg show={showHadouken} />

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

        <NotThisWay
          show={justActivated}
          position="top"
          text="Developer mode activated"
        />

        <NeuralNetworkBackdrop
          konamiProgress={konamiProgress}
          gravityMode={gravityEnabled}
          blackHoleMode={blackHoleEnabled}
          sectionId={PAGES[activeIndex].id as SectionId}
        />

        {PAGES.map(({ id, title, Component }) => (
          <Section key={id} id={id} title={title}>
            <Component />
          </Section>
        ))}
      </div>
    </>
  );
}