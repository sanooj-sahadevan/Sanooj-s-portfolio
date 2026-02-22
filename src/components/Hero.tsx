import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import ParticleBackground from "./ParticleBackground";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: FiGithub, href: "https://github.com/sanooj-sahadevan", label: "GitHub" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/sanooj-sahadevan/", label: "LinkedIn" },
  { icon: SiLeetcode, href: "https://leetcode.com/u/Sanooj_Sahadevan_123/", label: "LeetCode" },
  { icon: FiMail, href: "mailto:sanusahadev007@gmail.com", label: "Email" },
];

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-[1]" />

      <motion.div
        className="section-container relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-primary font-body text-[10px] xs:text-xs sm:text-sm tracking-[0.3em] uppercase mb-4"
          variants={itemVariants}
        >
          Full Stack MERN Developer
        </motion.p>

        <motion.h1
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 tracking-tight"
          variants={itemVariants}
        >
          Hi, I'm{" "}
          <span className="gradient-text-full">Sanooj</span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed px-4 sm:px-0"
          variants={itemVariants}
        >
          I’m a full‑stack MERN developer crafting scalable, secure, and high‑performance web applications
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={itemVariants}
        >
          <a href="#projects" className="glow-button text-center">
            View Projects
          </a>
          <a href="#contact" className="outline-glow-button text-center">
            Download Resume
          </a>
        </motion.div>

        <motion.div className="flex justify-center gap-5" variants={itemVariants}>
          {socialLinks.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_hsl(217_91%_60%/0.3)] transition-all duration-300"
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <s.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
