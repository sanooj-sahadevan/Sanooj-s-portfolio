import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import ParticleBackground from "./ParticleBackground";

const socialLinks = [
  { icon: FiGithub, href: "https://github.com/sanooj-sahadevan", label: "GitHub" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/sanooj-sahadevan/", label: "LinkedIn" },
  { icon: SiLeetcode, href: "https://leetcode.com/u/Sanooj_Sahadevan_123/", label: "LeetCode" },
  { icon: FiMail, href: "mailto:sanusahadev007@gmail.com", label: "Email" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-[1]" />

      <div className="section-container relative z-10 text-center">
        <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
          Full Stack MERN Developer
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6">
          Hi, I'm{" "}
          <span className="gradient-text-full">Sanooj</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          I’m a full‑stack MERN developer crafting scalable, secure, and high‑performance web applications
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
    </section>
  );
};

export default Hero;
