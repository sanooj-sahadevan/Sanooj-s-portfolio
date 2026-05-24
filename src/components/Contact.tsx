import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="section-container">
                <div className="mb-14 text-center">
                    <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3 font-body">
                        Get In Touch
                    </p>

                    <h2 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
                        Let’s <span className="gradient-text">Connect</span>
                    </h2>

                    <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        Open for freelance projects, full-time opportunities, and
                        collaborations. Feel free to reach out anytime.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    {/* LEFT SIDE */}
                    <div className="space-y-6">
                        {[
                            {
                                icon: FiMail,
                                label: "Email",
                                value: "sanusahadev007@gmail.com",
                                href: "mailto:sanusahadev007@gmail.com",
                            },
                            {
                                icon: FiPhone,
                                label: "Phone",
                                value: "+91 7994811405",
                                href: "tel:+917994811405",
                            },
                            {
                                icon: FiMapPin,
                                label: "Location",
                                value: "India",
                                href: "#",
                            },
                        ].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="group flex items-center gap-5 p-5 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/50 hover:translate-y-[-2px] transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    <item.icon size={22} />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                                        {item.label}
                                    </p>

                                    <p className="text-base sm:text-lg font-medium text-foreground">
                                        {item.value}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="relative">
                        <div className="rounded-3xl border border-green-500/30 bg-card/70 backdrop-blur-md p-8 sm:p-10 shadow-2xl">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full border-2 border-green-500 flex items-center justify-center mb-6 bg-green-500/10">
                                    <FaWhatsapp
                                        className="text-green-500"
                                        size={50}
                                    />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                                    Contact on WhatsApp
                                </h3>

                                <p className="text-muted-foreground leading-relaxed max-w-md mb-8 text-sm sm:text-base">
                                    Fastest way to connect with me. Send your
                                    project details or any opportunity directly
                                    on WhatsApp.
                                </p>

                                <a
                                    href="https://wa.me/917994811405"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-green-500 text-green-500 font-semibold text-base hover:bg-green-500 hover:text-white transition-all duration-300 shadow-lg hover:scale-[1.02]"
                                >
                                    <FaWhatsapp size={24} />
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;