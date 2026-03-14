import { useEffect, useRef } from "react";
import "../../styles/layout/neural-network-backdrop.css";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type SectionId = "home" | "projects" | "skills" | "experience" | "contact";

type NeuralNetworkBackdropProps = {
  konamiProgress?: number;
  gravityMode?: boolean;
  blackHoleMode?: boolean;
  sectionId?: SectionId;
};

type SectionTuning = {
  speedMultiplier: number;
  connectionDistance: number;
  mouseDistance: number;
  nodeAlpha: number;
  glowAlpha: number;
};

function getSectionTuning(section: SectionId): SectionTuning {
  switch (section) {
    case "home":
      return {
        speedMultiplier: 0.45,
        connectionDistance: 110,
        mouseDistance: 120,
        nodeAlpha: 0.55,
        glowAlpha: 0.1,
      };
    case "projects":
      return {
        speedMultiplier: 1.35,
        connectionDistance: 220,
        mouseDistance: 210,
        nodeAlpha: 0.9,
        glowAlpha: 0.28,
      };
    case "skills":
      return {
        speedMultiplier: 0.6,
        connectionDistance: 190,
        mouseDistance: 150,
        nodeAlpha: 0.95,
        glowAlpha: 0.3,
      };
    case "experience":
      return {
        speedMultiplier: 0.3,
        connectionDistance: 125,
        mouseDistance: 140,
        nodeAlpha: 0.62,
        glowAlpha: 0.12,
      };
    case "contact":
      return {
        speedMultiplier: 1.05,
        connectionDistance: 150,
        mouseDistance: 320,
        nodeAlpha: 0.92,
        glowAlpha: 0.24,
      };
    default:
      return {
        speedMultiplier: 1,
        connectionDistance: 150,
        mouseDistance: 180,
        nodeAlpha: 0.75,
        glowAlpha: 0.18,
      };
  }
}

export default function NeuralNetworkBackdrop({
  konamiProgress = 0,
  gravityMode = false,
  blackHoleMode = false,
  sectionId = "home",
}: NeuralNetworkBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const progressRef = useRef(konamiProgress);
  const gravityModeRef = useRef(gravityMode);
  const blackHoleModeRef = useRef(blackHoleMode);
  const sectionIdRef = useRef<SectionId>(sectionId);

  useEffect(() => {
    progressRef.current = konamiProgress;
  }, [konamiProgress]);

  useEffect(() => {
    gravityModeRef.current = gravityMode;
  }, [gravityMode]);

  useEffect(() => {
    blackHoleModeRef.current = blackHoleMode;
  }, [blackHoleMode]);

  useEffect(() => {
    sectionIdRef.current = sectionId;
  }, [sectionId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    const pointer = { x: 0, y: 0 };
    let isPointerInside = false;

    const NODE_COUNT_BASE = prefersReducedMotion ? 28 : 52;
    const BASE_MAX_SPEED = prefersReducedMotion ? 0.18 : 0.35;
    const MAX_KONAMI_STEPS = 10;

    const getCssVar = (name: string, fallback: string) => {
      const value = getComputedStyle(document.body).getPropertyValue(name).trim();
      return value || fallback;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      pointer.x = width * 0.5;
      pointer.y = height * 0.5;

      const area = width * height;
      const scaledCount = Math.max(
        22,
        Math.min(90, Math.round((area / 1400000) * NODE_COUNT_BASE))
      );

      nodes = Array.from({ length: scaledCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * BASE_MAX_SPEED * 2,
        vy: (Math.random() - 0.5) * BASE_MAX_SPEED * 2,
      }));
    };

    const draw = () => {
      const surface = getCssVar("--surface", "#0f172a");
      const accent = getCssVar("--accent", "#8b5cf6");
      const text = getCssVar("--text-1", "#e5e7eb");

      const progress = progressRef.current;
      const gravityActive = gravityModeRef.current;
      const blackHoleActive = blackHoleModeRef.current;
      const tuning = getSectionTuning(sectionIdRef.current);

      const progressRatio = Math.max(0, Math.min(1, progress / MAX_KONAMI_STEPS));
      const litCount = Math.round(progressRatio * Math.min(nodes.length, 18));

      const time = performance.now() * 0.001;

      const orbitCenterX = width * 0.5 + Math.cos(time * 0.8) * width * 0.08;
      const orbitCenterY = height * 0.5 + Math.sin(time * 1.1) * height * 0.06;

      const gravityCenterX =
        blackHoleActive && isPointerInside ? pointer.x : orbitCenterX;
      const gravityCenterY =
        blackHoleActive && isPointerInside ? pointer.y : orbitCenterY;

      const maxSpeed = BASE_MAX_SPEED * tuning.speedMultiplier;
      const connectionDistance = tuning.connectionDistance;
      const mouseDistance = tuning.mouseDistance;

      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, surface);
      bg.addColorStop(1, "#000000");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (const node of nodes) {
        if (gravityActive) {
          const dx = gravityCenterX - node.x;
          const dy = gravityCenterY - node.y;
          const dist = Math.max(20, Math.hypot(dx, dy));

          const nx = dx / dist;
          const ny = dy / dist;

          const blackHoleBoost = blackHoleActive ? 2.2 : 1;
          const pull = Math.min(0.045, 1 / dist) * 2.2 * blackHoleBoost;
          const swirl = blackHoleActive ? 0.032 : 0.018;

          node.vx += nx * pull - ny * swirl;
          node.vy += ny * pull + nx * swirl;

          node.vx *= blackHoleActive ? 0.975 : 0.985;
          node.vy *= blackHoleActive ? 0.975 : 0.985;
        }

        const speed = Math.hypot(node.vx, node.vy);
        if (speed > maxSpeed) {
          const ratio = maxSpeed / speed;
          node.vx *= ratio;
          node.vy *= ratio;
        }

        node.x += node.vx;
        node.y += node.vy;

        if (!gravityActive) {
          if (node.x <= 0 || node.x >= width) node.vx *= -1;
          if (node.y <= 0 || node.y >= height) node.vy *= -1;

          node.x = Math.max(0, Math.min(width, node.x));
          node.y = Math.max(0, Math.min(height, node.y));
        } else {
          const margin = 60;

          if (node.x < -margin) node.x = width + margin;
          if (node.x > width + margin) node.x = -margin;
          if (node.y < -margin) node.y = height + margin;
          if (node.y > height + margin) node.y = -margin;
        }
      }

      if (gravityActive) {
        const coreRadius = blackHoleActive ? 190 : 140;

        const coreGlow = ctx.createRadialGradient(
          gravityCenterX,
          gravityCenterY,
          0,
          gravityCenterX,
          gravityCenterY,
          coreRadius
        );
        coreGlow.addColorStop(0, hexToRgba(accent, blackHoleActive ? 0.42 : 0.28));
        coreGlow.addColorStop(0.28, hexToRgba(accent, blackHoleActive ? 0.2 : 0.12));
        coreGlow.addColorStop(1, hexToRgba(accent, 0));

        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(gravityCenterX, gravityCenterY, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        if (blackHoleActive) {
          ctx.fillStyle = hexToRgba("#000000", 0.9);
          ctx.beginPath();
          ctx.arc(gravityCenterX, gravityCenterY, 16, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = hexToRgba(text, 0.7);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(gravityCenterX, gravityCenterY, 24, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.fillStyle = hexToRgba(text, 0.85);
          ctx.beginPath();
          ctx.arc(gravityCenterX, gravityCenterY, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const aLit = i < litCount;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bLit = j < litCount;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = 1 - dist / connectionDistance;
            const gravityBoost = gravityActive ? 1.35 : 1;
            const boost = (aLit || bLit ? 0.55 : 0.22) * gravityBoost;

            ctx.strokeStyle = hexToRgba(accent, alpha * boost);
            ctx.lineWidth = gravityActive ? 1.25 : aLit || bLit ? 1.6 : 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        if (isPointerInside) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseDistance) {
            const alpha = 1 - dist / mouseDistance;
            ctx.strokeStyle = hexToRgba(text, alpha * 0.18);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const isLit = i < litCount;

        if (isLit) {
          ctx.fillStyle = hexToRgba(accent, 0.2 + progressRatio * 0.25);
          ctx.beginPath();
          ctx.arc(node.x, node.y, 11, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = hexToRgba(text, 0.95);
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = hexToRgba(text, tuning.nodeAlpha);
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = hexToRgba(accent, tuning.glowAlpha);
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      isPointerInside = true;
    };

    const handlePointerLeave = () => {
      isPointerInside = false;
      pointer.x = width * 0.5;
      pointer.y = height * 0.5;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="neuralBackdrop" aria-hidden="true">
      <canvas ref={canvasRef} className="neuralBackdrop__canvas" />
      <div className="neuralBackdrop__veil" />
    </div>
  );
}

function hexToRgba(color: string, alpha: number) {
  const normalized = color.trim();

  if (normalized.startsWith("rgb")) {
    return normalized.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  }

  let hex = normalized.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const int = Number.parseInt(hex, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}