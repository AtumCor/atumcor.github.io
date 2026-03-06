import type { ComponentType } from "react";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";
import Experience from "../pages/Experience";
import Contact from "../pages/Contact";

export type PageDef = {
  id: "home" | "projects" | "skills" | "experience" | "contact";
  title: string;
  Component: ComponentType;
};

export const PAGES: PageDef[] = [
  { id: "home", title: "Home", Component: Home },
  { id: "projects", title: "Projects", Component: Projects },
  { id: "skills", title: "Skills", Component: Skills },
  { id: "experience", title: "Experience", Component: Experience },
  { id: "contact", title: "Contact", Component: Contact },
];