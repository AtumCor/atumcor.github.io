import { useRef } from "react";
import "./styles/styles.css";

import ThemeToggle from "./components/ui/ThemeToggle";
import Section from "./components/layout/Section";
import PageIndicator from "./components/layout/PageIndicator";
import NotThisWay from "./components/ui/NotThisWay";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";

import { useHorizontalWheel } from "./hooks/useHorizontalWheel";

type PageDef = { id: string; title: string; Component: React.ComponentType };

const PAGES: PageDef[] = [
  { id: "home", title: "Home", Component: Home },
  { id: "projects", title: "Projects", Component: Projects },
  { id: "skills", title: "Skills", Component: Skills },
  { id: "experience", title: "Experience", Component: Experience },
  { id: "contact", title: "Contact", Component: Contact },
];

export default function App() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const { flash, blockMessage } = useHorizontalWheel(scrollerRef, {
    homeIndex: 0,
    blockOnHome: true,
    blockMessage: "Not this way.",
    oncePerSession: true,
  });

  return (
    <div className="scroller" ref={scrollerRef}>
      <div className="topRightControls">
        <ThemeToggle />
      </div>

      <PageIndicator scrollerRef={scrollerRef} pages={PAGES} />

      <NotThisWay show={flash} text={blockMessage} />

      <div className="gradientBackdrop" aria-hidden="true" />

      {PAGES.map(({ id, title, Component }) => (
        <Section key={id} id={id} title={title}>
          <Component />
        </Section>
      ))}
    </div>
  );
}
