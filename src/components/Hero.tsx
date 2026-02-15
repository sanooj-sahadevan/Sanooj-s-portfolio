import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import gsap from "gsap";
import ParticleBackground from "./ParticleBackground";

const socialLinks = [
  { icon: FiGithub, href: "https://github.com/sanooj-sahadevan", label: "GitHub" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/sanooj-sahadevan/", label: "LinkedIn" },
  { icon: SiLeetcode, href: "https://leetcode.com/u/Sanooj_Sahadevan_123/", label: "LeetCode" },
  { icon: FiMail, href: "mailto:sanusahadev007@gmail.com", label: "Email" },
];

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from("[data-hero='subtitle']", { opacity: 0, y: 30, duration: 0.8 })
      .from("[data-hero='heading']", { opacity: 0, y: 50, duration: 1, scale: 0.95 }, "-=0.4")
      .from("[data-hero='desc']", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5")
      .from("[data-hero='cta']", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
      .from("[data-hero='social']", { opacity: 0, scale: 0.5, stagger: 0.1, duration: 0.5 }, "-=0.2");

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-[1]" />

      <div className="section-container relative z-10 text-center" ref={containerRef}>
        <p data-hero="subtitle" className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
          Full Stack MERN Developer
        </p>

        <h1 ref={headingRef} data-hero="heading" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6">
          Hi, I'm{" "}
          <span className="gradient-text-full">Sanooj</span>
        </h1>

        <p data-hero="desc" className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          I build scalable, secure and high-performance web applications using modern technologies.
        </p>

        <div data-hero="cta" className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="#projects" className="glow-button text-center">
            View Projects
          </a>
          <a href="#contact" className="outline-glow-button text-center">
            Download Resume
          </a>
        </div>

        <div className="flex justify-center gap-5">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              data-hero="social"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_hsl(217_91%_60%/0.3)] transition-all duration-300"
            >
              <s.icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
