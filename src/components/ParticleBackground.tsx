import { useEffect, useRef } from "react";

// Portfolio colours: blue / cyan / purple
const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6", "#60a5fa", "#22d3ee"];
const COUNT = 100;
const MAX_DIST = 130;
const MOUSE_RADIUS = 130;

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number;
  radius: number;
  color: string;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

function hexRgb(hex: string) {
  return `${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)}`;
}

function mkParticle(w: number, h: number): Particle {
  const vx = (Math.random() - 0.5) * 0.2;
  const vy = (Math.random() - 0.5) * 0.2;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx, vy, baseVx: vx, baseVy: vy,
    radius: Math.random() * 1.6 + 0.7,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.45 + 0.3,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: Math.random() * 0.02 + 0.008,
  };
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use parent sizing — the section/div wrapping the canvas
    const parent = canvas.parentElement as HTMLElement;

    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];
    let rafId = 0;

    // ── sizing ──────────────────────────────────────────────────────────────
    const setSize = () => {
      const w = parent.offsetWidth || window.innerWidth;
      const h = parent.offsetHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      particles = Array.from({ length: COUNT }, () => mkParticle(w, h));
    };
    setSize();
    window.addEventListener("resize", setSize);

    // ── mouse tracking on the WINDOW so z-index never blocks it ─────────────
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    // ── draw loop ────────────────────────────────────────────────────────────
    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.x;
      const my = mouse.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulsing alpha
        p.pulse += p.pulseSpeed;
        const pa = Math.max(0.05, p.alpha + Math.sin(p.pulse) * 0.15);

        // Cursor attraction
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        const d = Math.sqrt(d2);
        if (d < MOUSE_RADIUS && d > 1) {
          const f = (MOUSE_RADIUS - d) / MOUSE_RADIUS;
          p.vx -= (dx / d) * f * 0.35;
          p.vy -= (dy / d) * f * 0.35;
        }

        // Damping (nudge back to base speed)
        p.vx = p.vx * 0.94 + p.baseVx * 0.06;
        p.vy = p.vy * 0.94 + p.baseVy * 0.06;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges (toroidal — no bouncing)
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5;
        if (p.y > H + 5) p.y = -5;

        const rgb = hexRgb(p.color);

        // Glow halo
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        g.addColorStop(0, `rgba(${rgb},${pa})`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Solid dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${Math.min(pa + 0.3, 1)})`;
        ctx.fill();

        // Extra glow when near cursor
        if (d < MOUSE_RADIUS) {
          const boost = (1 - d / MOUSE_RADIUS) * 0.8;
          const eg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 7);
          eg.addColorStop(0, `rgba(${rgb},${boost})`);
          eg.addColorStop(1, `rgba(${rgb},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 7, 0, Math.PI * 2);
          ctx.fillStyle = eg;
          ctx.fill();
        }

        // Connection lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const lx = q.x - p.x;
          const ly = q.y - p.y;
          const ld = Math.sqrt(lx * lx + ly * ly);
          if (ld < MAX_DIST) {
            const la = (1 - ld / MAX_DIST) * 0.25;
            const lg = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
            lg.addColorStop(0, `rgba(${hexRgb(p.color)},${la})`);
            lg.addColorStop(1, `rgba(${hexRgb(q.color)},${la})`);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = lg;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Cursor aura ring
      if (mx > -100) {
        const cg = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS);
        cg.addColorStop(0, "rgba(59,130,246,0.08)");
        cg.addColorStop(0.5, "rgba(6,182,212,0.04)");
        cg.addColorStop(1, "rgba(6,182,212,0)");
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();

        // Cursor dot
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96,165,250,0.85)";
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: 0,
        pointerEvents: "none",   // let hero text remain clickable
      }}
    />
  );
};

export default ParticleBackground;
