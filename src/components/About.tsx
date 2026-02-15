import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll("[data-gsap-about]");
    gsap.from(els, {
      opacity: 0,
      y: 50,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom-=100",
      },
    });
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section id="about" className="py-24 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">About Me</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
            Who I <span className="gradient-text">Am</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p data-gsap-about className="text-muted-foreground leading-relaxed text-lg mb-6">
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
                  data-gsap-about
                  className="glow-card p-4 hover:scale-[1.03] transition-transform duration-300"
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div data-gsap-about className="glow-card p-8 space-y-6">
              {[
                { number: "2+", label: "Projects Deployed" },
                { number: "6+", label: "Technologies Mastered" },
                { number: "100%", label: "Passion for Code" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4"
                >
                  <span className="text-3xl font-heading font-bold gradient-text">{stat.number}</span>
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
