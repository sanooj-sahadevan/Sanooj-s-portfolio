import { useRef, useEffect } from "react";
import { skills } from "@/data/portfolio";
import { gsap } from "gsap";

const TechMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const techSet = new Set<string>();

  Object.values(skills).forEach((list) => {
    list.forEach((t) => techSet.add(t));
  });

  const techList = Array.from(techSet);
  // Quadruple the list to ensure it covers the screen during animation
  const duplicatedList = [...techList, ...techList, ...techList, ...techList];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalWidth = container.scrollWidth / 2;

    const animation = gsap.to(container, {
      x: `-=${totalWidth}`,
      duration: 120,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth)
      }
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section className="py-12 overflow-hidden border-y border-border/30 relative">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div ref={containerRef} className="flex gap-4 sm:gap-8 w-max px-4">
        {duplicatedList.map((tech, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-muted-foreground border border-border/30 rounded-full whitespace-nowrap hover:text-primary hover:border-primary/40 transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TechMarquee;
