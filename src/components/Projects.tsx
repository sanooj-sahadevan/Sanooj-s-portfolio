import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const filters = ["all", "fullstack", "mini"];

const Projects = () => {
  const [active, setActive] = useState("all");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".project-card");
    gsap.from(cards, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom-=100",
      },
    });
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section id="projects" className="py-24 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          <div className="flex gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 text-sm rounded-full capitalize transition-all duration-300 ${
                  active === f
                    ? "glow-button !py-2 !px-4"
                    : "border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {f === "all" ? "All" : f === "fullstack" ? "Full Stack" : "Mini"}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="project-card glow-card p-6 flex flex-col hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-heading font-semibold text-foreground">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                      >
                        <FiGithub size={16} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                      >
                        <FiExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
