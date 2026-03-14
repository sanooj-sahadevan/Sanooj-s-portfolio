import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "Years of Experience", value: 2 },
    { label: "Projects Completed", value: 10 },
    { label: "Technologies Mastered", value: 15 },
    { label: "Lines of Code", value: 50, suffix: "K+" },
];

const Stats = () => {
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = statsRef.current?.querySelectorAll(".stat-value");
        if (!elements) return;

        elements.forEach((el, i) => {
            const target = stats[i].value;
            gsap.fromTo(el,
                { textContent: 0 },
                {
                    textContent: target,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                    },
                    snap: { textContent: 1 },
                }
            );
        });
    }, []);

    return (
        <motion.section
            className="py-20 bg-muted/30 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
        >
            <div className="section-container" ref={statsRef}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="text-center p-2"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold gradient-text mb-1 sm:mb-2">
                                <span className="stat-value">0</span>
                                {stat.suffix || "+"}
                            </h3>
                            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Stats;
