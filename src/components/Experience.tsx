import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/portfolio";
import { FiBookOpen } from "react-icons/fi";

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">Journey</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Education & <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border/50" />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="flex gap-6 items-start"
              >
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-muted border border-primary/40 flex items-center justify-center shadow-[0_0_15px_hsl(217_91%_60%/0.2)]">
                  <FiBookOpen size={16} className="text-primary" />
                </div>

                <div className="glow-card p-5 flex-1">
                  <h3 className="font-heading font-semibold text-foreground text-lg">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.institution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
