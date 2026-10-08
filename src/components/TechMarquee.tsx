import { useMemo } from "react";
import { skills } from "@/data/portfolio";
import { motion } from "framer-motion";

const TechMarquee = () => {
  const techList = useMemo(() => {
    const techSet = new Set<string>();
    Object.values(skills).forEach((list) => {
      list.forEach((t) => techSet.add(t));
    });
    return Array.from(techSet);
  }, []);

  // Duplicate list once to create an infinite, seamless loop
  const duplicatedList = useMemo(() => [...techList, ...techList], [techList]);

  return (
    <motion.section
      className="py-12 overflow-hidden border-y border-border/30 relative select-none"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex overflow-hidden">
        <div className="animate-marquee-scroll flex gap-4 sm:gap-8 px-4 py-1">
          {duplicatedList.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex-shrink-0 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-muted-foreground border border-border/30 rounded-full whitespace-nowrap hover:text-primary hover:border-primary/40 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TechMarquee;
