import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

const Contact = () => {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="section-container">
                <div className="mb-12">
                    <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">Get In Touch</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: FiMail, label: "Email", value: "sanusahadev007@gmail.com", href: "mailto:sanusahadev007@gmail.com" },
                                { icon: FiPhone, label: "Phone", value: "+91 7994811405", href: "tel:+917994811405" },
                                { icon: FiMapPin, label: "Location", value: "India", href: "#" },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/50 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest leading-none mb-1">{item.label}</p>
                                        <p className="text-foreground font-medium">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="glow-card p-8">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Subject</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30"
                                    placeholder="Project Inquiry"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Message</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 focus:border-primary outline-none transition-all min-h-[150px] resize-none placeholder:text-muted-foreground/30"
                                    placeholder="Tell me about your project..."
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="glow-button w-full flex items-center justify-center gap-2"
                            >
                                Send Message
                                <FiSend size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
