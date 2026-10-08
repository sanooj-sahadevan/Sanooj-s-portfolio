import { skills } from "@/data/portfolio";
import { motion } from "framer-motion";

const Skills = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="section-container">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">Expertise</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        {/* All cards uniform, identical styling & dimensions */}
        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="glow-card p-5 sm:p-6 hover:-translate-y-1 hover:border-primary/30 transition-all duration-200 flex flex-col justify-between w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <div>
                <h3 className="text-base sm:text-lg font-heading font-bold mb-4 text-primary">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-muted border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/10 transition-colors duration-150 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
