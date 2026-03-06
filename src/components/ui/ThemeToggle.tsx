import { useEffect, useState } from "react";

type ThemeId = "obsidian" | "paper" | "dune" | "graphite" | "moss" | "plum";

const THEMES: ThemeId[] = ["obsidian", "paper", "dune", "graphite", "moss", "plum"];

function pickRandomTheme(exclude: ThemeId): ThemeId {
  const pool = THEMES.filter((t) => t !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeId>(() => "obsidian");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const randomizeTheme = () => {
    setTheme((prev) => pickRandomTheme(prev));
  };

  return (
    <button
      type="button"
      className="themeToggle"
      onClick={randomizeTheme}
      aria-label="Change theme"
    >
      <span className="themeToggleLabel themeToggleLabel--default">Light theme</span>
      <span className="themeToggleLabel themeToggleLabel--hover">a different theme</span>
    </button>
  );
}
