import { experience } from "@/data/portfolio";
import { FiBookOpen } from "react-icons/fi";
import { motion } from "framer-motion";

type ExperienceItem = {
    title: string;
    institution: string;
    period?: string;
    type?: "internship" | "education" | "employment";
};

const Experience = () => {
    const sorted = [...experience].sort((a: ExperienceItem, b: ExperienceItem) => {
        const parse = (p?: string) => {
            if (!p) return { start: -Infinity, end: -Infinity };
            const years = (p.match(/\d{4}/g) || []).map(Number);
            const hasPresent = /present/i.test(p);
            const start = years[0] ?? -Infinity;
            const end = hasPresent ? 9999 : years[1] ?? start;
            return { start, end };
        };
        const pa = parse(a.period);
        const pb = parse(b.period);
        if (pb.end !== pa.end) return pb.end - pa.end;
        return pb.start - pa.start;
    });

    return (
        <section id="experience" className="py-24 relative">
            <div className="section-container">
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">Journey</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold">
                        Education & <span className="gradient-text">Experience</span>
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[17px] sm:left-[19px] top-0 bottom-0 w-px bg-border/50" />

                    <div className="space-y-8 sm:space-y-10">
                        {sorted.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="flex gap-4 sm:gap-6 items-start"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            >
                                {/* Dot */}
                                <div className="relative z-10 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-muted border border-border/50 flex items-center justify-center shadow-[0_0_15px_hsl(217_91%_60%/0.1)]">
                                    <FiBookOpen size={14} className="text-primary" />
                                </div>

                                <div className="glow-card p-4 sm:p-5 flex-1 hover:border-primary/30 transition-colors duration-300">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <h3 className="font-heading font-semibold text-foreground text-base sm:text-lg leading-tight">{item.title}</h3>
                                        {("type" in item) && (
                                            <span className="w-fit text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
                                                {item.type}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground text-xs sm:text-sm mt-1">{item.institution}</p>
                                    {item.period && <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">{item.period}</p>}
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
