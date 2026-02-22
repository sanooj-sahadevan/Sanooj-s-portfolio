import { motion } from "framer-motion";

const About = () => {
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
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="section-container">
                <motion.div
                    className="mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                >
                    <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">About Me</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold">
                        Who I <span className="gradient-text">Am</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.p className="text-muted-foreground leading-relaxed text-lg mb-8" variants={fadeIn}>
                            MERN Stack developer with a strong foundation in building scalable web applications.
                            Experienced in designing RESTful APIs and deploying cloud-based solutions. Focused on
                            contributing to impactful and efficient applications.
                        </motion.p>
                        <motion.div className="grid grid-cols-2 gap-4" variants={staggerContainer}>
                            {[
                                { label: "Location", value: "India" },
                                { label: "Email", value: "sanusahadev007@gmail.com" },
                                { label: "Phone", value: "+91 7994811405" },
                                { label: "Available", value: "For Hire" },
                            ].map((item) => (
                                <motion.div
                                    key={item.label}
                                    className="glow-card p-4 hover:border-primary/30 transition-all duration-300"
                                    variants={fadeIn}
                                    whileHover={{ y: -5, borderColor: "rgba(var(--primary), 0.3)" }}
                                >
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                                    <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="relative"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeIn}
                    >
                        <div className="glow-card p-8 space-y-6">
                            {[
                                { number: "2+", label: "Projects Deployed" },
                                { number: "6+", label: "Technologies Mastered" },
                                { number: "100%", label: "Passion for Code" },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex items-center gap-4 group"
                                >
                                    <span className="text-3xl font-heading font-bold gradient-text group-hover:scale-110 transition-transform duration-300">{stat.number}</span>
                                    <span className="text-muted-foreground">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
