import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FiSend, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">Get in Touch</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Contact <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            {[
              { icon: FiMail, label: "Email", value: "sanusahadev007@gmail.com", href: "mailto:sanusahadev007@gmail.com" },
              { icon: FiPhone, label: "Phone", value: "+91 7994811405", href: "tel:+917994811405" },
              { icon: FiMapPin, label: "Location", value: "India" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-muted border border-border/50 text-primary">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-foreground hover:text-primary transition-colors text-sm">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-foreground text-sm">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="glow-card p-6 space-y-5"
          >
            {["Name", "Email"].map((field) => (
              <div key={field}>
                <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                  {field}
                </label>
                <input
                  type={field === "Email" ? "email" : "text"}
                  required
                  className="w-full bg-muted border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                  placeholder={`Your ${field.toLowerCase()}`}
                />
              </div>
            ))}
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                Message
              </label>
              <textarea
                required
                rows={4}
                className="w-full bg-muted border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                placeholder="Your message"
              />
            </div>

            <button
              type="submit"
              className="glow-button w-full flex items-center justify-center gap-2"
            >
              {submitted ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-primary-foreground"
                >
                  ✓ Sent!
                </motion.span>
              ) : (
                <>
                  Send Message <FiSend size={16} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
