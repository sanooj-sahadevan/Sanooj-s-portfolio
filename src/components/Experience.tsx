import { experience } from "@/data/portfolio";
import { FiBookOpen } from "react-icons/fi";

const Experience = () => {
    const sorted = [...experience].sort((a: any, b: any) => {
        const parse = (p?: string) => {
            if (!p) return { start: -Infinity, end: -Infinity };
            const years = (p.match(/\d{4}/g) || []).map(Number);
            const hasPresent = /present/i.test(p);
            const start = years[0] ?? -Infinity;
            const end = hasPresent ? 9999 : years[1] ?? start;
            return { start, end };
        };
        const pa = parse((a as any).period);
        const pb = parse((b as any).period);
        if (pb.end !== pa.end) return pb.end - pa.end;
        return pb.start - pa.start;
    });

    return (
        <section id="experience" className="py-24 relative">
            <div className="section-container">
                <div className="mb-12">
                    <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">Journey</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold">
                        Education & <span className="gradient-text">Experience</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border/50" />

                    <div className="space-y-10">
                        {sorted.map((item) => (
                            <div
                                key={item.title}
                                className="flex gap-6 items-start"
                            >
                                {/* Dot */}
                                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-muted border border-border/50 flex items-center justify-center shadow-[0_0_15px_hsl(217_91%_60%/0.1)]">
                                    <FiBookOpen size={16} className="text-primary" />
                                </div>

                                <div className="glow-card p-5 flex-1 hover:border-primary/30 transition-colors duration-300">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-heading font-semibold text-foreground text-lg leading-tight">{item.title}</h3>
                                        {("type" in item) && (
                                            <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
                                                {item.type}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground text-sm mt-1">{item.institution}</p>
                                    {"period" in item && <p className="text-muted-foreground text-xs mt-1">{(item as any).period}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
