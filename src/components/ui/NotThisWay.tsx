import { useEffect, useState } from "react";

export default function NotThisWay({
  show,
  text = "Not this way.",
  durationMs = 1200,
}: {
  show: boolean;
  text?: string;
  durationMs?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;

    setVisible(true);
    const t = window.setTimeout(() => setVisible(false), durationMs);
    return () => window.clearTimeout(t);
  }, [show, durationMs]);

  return (
    <div className={`notThisWay ${visible ? "isVisible" : ""}`} role="status" aria-live="polite">
      {text}
    </div>
  );
}
