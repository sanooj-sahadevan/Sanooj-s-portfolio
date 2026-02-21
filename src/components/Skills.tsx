import { skills } from "@/data/portfolio";

const Skills = () => {
    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            <div className="section-container">
                <div className="mb-12">
                    <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">Expertise</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(skills).map(([category, items]) => (
                        <div
                            key={category}
                            className="glow-card p-6"
                        >
                            <h3 className="text-xl font-heading font-bold mb-4 text-primary">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-xs px-3 py-1.5 rounded-full bg-muted border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all cursor-default"
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
