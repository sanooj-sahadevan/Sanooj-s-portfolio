import { skills } from "@/data/portfolio";
import { motion } from "framer-motion";

const Skills = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.0 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            <div className="section-container">
                <motion.div
                    className="mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                >
                    <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">Expertise</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    {Object.entries(skills).map(([category, items]) => (
                        <motion.div
                            key={category}
                            className="glow-card p-6"
                            variants={fadeIn}
                            whileHover={{ y: -5, borderColor: "rgba(var(--primary), 0.3)" }}
                        >
                            <h3 className="text-xl font-heading font-bold mb-4 text-primary">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill) => (
                                    <motion.span
                                        key={skill}
                                        className="text-xs px-3 py-1.5 rounded-full bg-muted border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all cursor-default"
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
