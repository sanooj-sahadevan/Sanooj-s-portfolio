import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    className="border-t border-border/50 py-8"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
  >
    <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
      <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
        © {new Date(Date.now()).getFullYear()} <span className="gradient-text font-semibold">Sanooj S</span>. All rights reserved.
      </p>
      <div className="flex gap-6 sm:gap-4">
        {[
          { icon: FiGithub, href: "https://github.com/sanooj-sahadevan" },
          { icon: FiLinkedin, href: "https://www.linkedin.com/in/sanooj-sahadevan/" },
          { icon: SiLeetcode, href: "https://leetcode.com/u/Sanooj_Sahadevan_123/" },
          { icon: FiMail, href: "mailto:sanusahadev007@gmail.com" },
        ].map((s, i) => (
          <motion.a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300 p-1"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <s.icon size={18} />
          </motion.a>
        ))}
      </div>
    </div>
  </motion.footer>
);

export default Footer;
