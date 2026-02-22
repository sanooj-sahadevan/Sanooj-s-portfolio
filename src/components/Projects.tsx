import { useState } from "react";
import { FiExternalLink, FiGithub, FiChevronDown, FiChevronUp, FiCode, FiBriefcase } from "react-icons/fi";
import { projects } from "@/data/portfolio";
import ThreeBadge from "./ThreeBadge";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "company" | "personal";

const companyProjects = projects.filter((p) => p.company);
const personalProjects = projects.filter((p) => !p.company);

// ── Contributions accordion ──────────────────────────────────────────────────
const Contributions = ({ items }: { items: string[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 border-t border-border/40 pt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-xs font-medium text-primary/80 hover:text-primary transition-colors"
      >
        <span>Key Contributions</span>
        {open ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 space-y-2 overflow-hidden"
          >
            {items.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                {c}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Single project card ──────────────────────────────────────────────────────
const ProjectCard = ({
  project,
  index,
  isCompany,
}: {
  project: (typeof projects)[0];
  index: number;
  isCompany: boolean;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="project-card group relative flex flex-col rounded-2xl bg-card border border-border/50 overflow-hidden
               hover:border-primary/30 hover:shadow-[0_0_30px_hsl(217_91%_60%/0.12)] transition-all duration-400"
  >
    {/* Gradient top accent line */}
    <div
      className="h-[2px] w-full"
      style={{
        background: isCompany
          ? "linear-gradient(90deg, hsl(38 92% 50%), hsl(48 96% 60%))"
          : "linear-gradient(90deg, hsl(217 91% 60%), hsl(192 91% 43%))",
      }}
    />

    <div className="flex flex-col flex-1 p-4 sm:p-6">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          {/* Index number */}
          <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground/50 mb-1 block">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-sm sm:text-base font-heading font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {project.title}
          </h3>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {"github" in project && project.github && (
            <a
              href={project.github as string}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-border/60
                         text-muted-foreground hover:text-primary hover:border-primary/50
                         hover:bg-primary/5 transition-all duration-200"
              title="View on GitHub"
            >
              <FiGithub size={13} />
            </a>
          )}
          {"live" in project && project.live && (
            <a
              href={project.live as string}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-border/60
                         text-muted-foreground hover:text-primary hover:border-primary/50
                         hover:bg-primary/5 transition-all duration-200"
              title="View Live"
            >
              <FiExternalLink size={13} />
            </a>
          )}
          {isCompany && (
            <span
              className="flex h-7 sm:h-8 items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 rounded-lg border text-[9px] sm:text-[11px] font-medium
                         border-amber-500/25 bg-amber-500/8 text-amber-400"
            >
              <FiBriefcase size={10} className="hidden xs:block" />
              Co.
            </span>
          )}
        </div>
      </div>

      {/* Role badge (company only) */}
      {"role" in project && project.role && (
        <div className="mb-3">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/15 font-medium">
            {project.role as string}
          </span>
        </div>
      )}

      {/* Description */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3 sm:line-clamp-none">
        {project.description}
      </p>

      {/* Contributions accordion */}
      {"contributions" in project &&
        Array.isArray(project.contributions) &&
        project.contributions.length > 0 && (
          <Contributions items={project.contributions as string[]} />
        )}

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1 mt-4 sm:mt-5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[9px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/50
                       hover:border-primary/30 hover:text-primary transition-colors duration-200"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// ── Tab button ───────────────────────────────────────────────────────────────
const TabBtn = ({
  active,
  onClick,
  icon: Icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  count: number;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-250
      ${active
        ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(217_91%_60%/0.35)]"
        : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30"
      }`}
  >
    <Icon size={15} />
    {label}
    <span
      className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
        }`}
    >
      {count}
    </span>
  </button>
);

// ── Main section ─────────────────────────────────────────────────────────────
const Projects = () => {
  const [activeTab, setActiveTab] = useState<Tab>("company");
  const displayed = activeTab === "company" ? companyProjects : personalProjects;

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="section-container">
        {/* Section heading */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">Portfolio</p>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <ThreeBadge />
          </div>
          <p className="text-muted-foreground text-sm max-w-xl">
            A selection of professional work and personal builds — spanning full-stack platforms, automation tools, and interactive UIs.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10">
          <TabBtn
            active={activeTab === "company"}
            onClick={() => setActiveTab("company")}
            icon={FiBriefcase}
            label="Company"
            count={companyProjects.length}
          />
          <TabBtn
            active={activeTab === "personal"}
            onClick={() => setActiveTab("personal")}
            icon={FiCode}
            label="Personal"
            count={personalProjects.length}
          />
        </div>

        {/* Context label */}
        {activeTab === "company" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-px flex-1 bg-border/40" />
            <span className="text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-border/50 bg-card">
              Built at MindOverMatter Technologies — source code is proprietary
            </span>
            <div className="h-px flex-1 bg-border/40" />
          </motion.div>
        )}

        {/* Cards grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                isCompany={activeTab === "company"}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
