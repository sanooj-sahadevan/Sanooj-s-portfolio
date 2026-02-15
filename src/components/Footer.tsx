import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

const Footer = () => (
  <footer className="border-t border-border/50 py-8">
    <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © 2025 <span className="gradient-text font-semibold">Sanooj S</span>. All rights reserved.
      </p>
      <div className="flex gap-4">
        {[
          { icon: FiGithub, href: "https://github.com/sanooj-sahadevan" },
          { icon: FiLinkedin, href: "https://www.linkedin.com/in/sanooj-sahadevan/" },
          { icon: SiLeetcode, href: "https://leetcode.com/u/Sanooj_Sahadevan_123/" },
          { icon: FiMail, href: "mailto:sanusahadev007@gmail.com" },
        ].map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <s.icon size={18} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
