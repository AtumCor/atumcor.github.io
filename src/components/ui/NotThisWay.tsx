import type { BlockPosition } from "../../hooks/useHorizontalWheel";

export default function NotThisWay({
  show,
  text = "Not this way.",
  position = "bottom",
}: {
  show: boolean;
  text?: string;
  position?: BlockPosition;
}) {
  return (
    <div
      className={`notThisWay notThisWay--${position} ${show ? "isVisible" : ""}`}
      role="status"
      aria-live="polite"
    >
      {text}
    </div>
  );
}