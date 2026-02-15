import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, string> = {
  Languages: "⚡",
  Frontend: "🎨",
  Backend: "⚙️",
  Database: "🗄️",
  Integrations: "🔗",
  Deployment: "🚀",
};

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".skill-card");
    gsap.from(cards, {
      opacity: 0,
      y: 60,
      rotateX: -15,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom-=100",
      },
    });
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section id="skills" className="py-24 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">Expertise</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="skill-card glow-card p-6 group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{categoryIcons[category]}</span>
                <h3 className="font-heading font-semibold text-lg text-foreground">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-muted text-muted-foreground border border-border/50 group-hover:border-primary/30 group-hover:text-primary transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
