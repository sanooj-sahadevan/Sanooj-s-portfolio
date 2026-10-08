import { useEffect, useRef } from "react";

// Portfolio colours: blue / cyan / purple
const RGB_COLORS = [
  "59,130,246",  // #3b82f6
  "6,182,212",   // #06b6d4
  "139,92,246",  // #8b5cf6
  "96,165,250",  // #60a5fa
  "34,211,238",  // #22d3ee
];

const MOUSE_RADIUS = 120;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  rgb: string;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

function mkParticle(w: number, h: number): Particle {
  const vx = (Math.random() - 0.5) * 0.2;
  const vy = (Math.random() - 0.5) * 0.2;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx,
    vy,
    baseVx: vx,
    baseVy: vy,
    radius: Math.random() * 1.5 + 0.8,
    rgb: RGB_COLORS[Math.floor(Math.random() * RGB_COLORS.length)],
    alpha: Math.random() * 0.4 + 0.25,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: Math.random() * 0.02 + 0.008,
  };
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parent = canvas.parentElement as HTMLElement;
    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];
    let rafId = 0;
    let isIntersecting = true;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 65;
    const maxDist = isMobile ? 85 : 115;
    const maxDistSq = maxDist * maxDist;

    // ── sizing ──────────────────────────────────────────────────────────────
    const setSize = () => {
      const w = parent.offsetWidth || window.innerWidth;
      const h = parent.offsetHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      particles = Array.from({ length: particleCount }, () => mkParticle(w, h));
    };
    setSize();
    window.addEventListener("resize", setSize, { passive: true });

    // ── mouse tracking on desktop only ──────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave, { passive: true });
    }

    // ── draw loop ────────────────────────────────────────────────────────────
    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.x;
      const my = mouse.y;
      const hasMouse = mx > -100;

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.pulse += p.pulseSpeed;
        const pa = Math.max(0.08, p.alpha + Math.sin(p.pulse) * 0.15);

        // Cursor attraction if mouse is near
        if (hasMouse) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_RADIUS_SQ && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = (MOUSE_RADIUS - d) / MOUSE_RADIUS;
            p.vx -= (dx / d) * f * 0.35;
            p.vy -= (dy / d) * f * 0.35;
          }
        }

        // Return to base speed gently
        p.vx = p.vx * 0.94 + p.baseVx * 0.06;
        p.vy = p.vy * 0.94 + p.baseVy * 0.06;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5;
        if (p.y > H + 5) p.y = -5;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.rgb},${Math.min(pa + 0.2, 0.85)})`;
        ctx.fill();
      }

      // Batch line drawing in a single path
      ctx.beginPath();
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "rgba(59, 130, 246, 0.12)";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          if (dx * dx + dy * dy < maxDistSq) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
          }
        }
      }
      ctx.stroke();

      // Cursor aura on desktop
      if (hasMouse) {
        const cg = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS);
        cg.addColorStop(0, "rgba(59,130,246,0.08)");
        cg.addColorStop(0.5, "rgba(6,182,212,0.03)");
        cg.addColorStop(1, "rgba(6,182,212,0)");
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96,165,250,0.85)";
        ctx.fill();
      }

      if (isIntersecting) {
        rafId = requestAnimationFrame(draw);
      }
    };

    // ── IntersectionObserver: pause drawing when Hero is out of view ──────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          if (!rafId) {
            rafId = requestAnimationFrame(draw);
          }
        } else {
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
          }
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    rafId = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setSize);
      if (!isMobile) {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseleave", onLeave);
      }
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
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
};

export default ParticleBackground;
