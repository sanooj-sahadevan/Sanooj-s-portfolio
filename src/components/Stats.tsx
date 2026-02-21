const stats = [
    { label: "Years of Experience", value: "2+" },
    { label: "Projects Completed", value: "10+" },
    { label: "Technologies Mastered", value: "15+" },
    { label: "Lines of Code", value: "50K+" },
];

const Stats = () => {
    return (
        <section className="py-20 bg-muted/30 overflow-hidden">
            <div className="section-container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="text-center"
                        >
                            <h3 className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
