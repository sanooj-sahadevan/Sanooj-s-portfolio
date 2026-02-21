const About = () => {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="section-container">
                <div className="mb-12">
                    <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">About Me</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold">
                        Who I <span className="gradient-text">Am</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                            MERN Stack developer with a strong foundation in building scalable web applications.
                            Experienced in designing RESTful APIs and deploying cloud-based solutions. Focused on
                            contributing to impactful and efficient applications.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Location", value: "India" },
                                { label: "Email", value: "sanusahadev007@gmail.com" },
                                { label: "Phone", value: "+91 7994811405" },
                                { label: "Available", value: "For Hire" },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="glow-card p-4 hover:border-primary/30 transition-all duration-300"
                                >
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                                    <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
