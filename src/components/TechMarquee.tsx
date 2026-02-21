import { skills } from "@/data/portfolio";

const TechMarquee = () => {
  const techSet = new Set<string>();
  Object.values(skills).forEach((list) => {
    list.forEach((t) => techSet.add(t));
  });
  const techList = Array.from(techSet);

  return (
    <section className="py-12 overflow-hidden border-y border-border/30 relative">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex gap-8 animate-marquee">
        {[...techList, ...techList].map((tech, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-6 py-3 text-sm font-medium text-muted-foreground border border-border/30 rounded-full whitespace-nowrap hover:text-primary hover:border-primary/40 transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TechMarquee;
