import { skills, developerTools } from "@/data/portfolio";
import { motion } from "framer-motion";
import { FiTool } from "react-icons/fi";

const Skills = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="section-container">
        <motion.div
          className="mb-8"
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

        {/* Symmetrical 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="glow-card p-5 sm:p-6 hover:-translate-y-1 hover:border-primary/30 transition-all duration-200 flex flex-col justify-between"
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

        {/* Developer Tools Full-Width Bar */}
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-card border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/30 transition-colors duration-200">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold flex-shrink-0">
            <FiTool className="text-primary" size={14} />
            <span>Developer Tools</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {developerTools.map((tool) => (
              <span
                key={tool}
                className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-md bg-muted/60 border border-border/40 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors duration-150"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
