import { motion } from "framer-motion";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="section-container">
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeIn}
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2 font-body">About Me</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Who I <span className="gradient-text">Am</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            <motion.p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8" variants={fadeIn}>
              Full Stack Software Engineer with 1.5+ years of professional experience plus a 1-year internship, building production apps with React, Next.js, NestJS, and Node.js. Experienced in designing scalable RESTful APIs, cloud infrastructure, and CI/CD pipelines on AWS. Shipped healthcare consultation platforms, AI publishing pipelines, and real-time collaborative tools.
            </motion.p>
            <motion.div className="grid grid-cols-1 xs:grid-cols-2 gap-4" variants={staggerContainer}>
              {[
                { label: "Location", value: "India" },
                { label: "Email", value: "sanusahadev007@gmail.com" },
                { label: "Phone", value: "+91 7994811405" },
                { label: "Available", value: "For Hire" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="glow-card p-4 hover:border-primary/30 hover:-translate-y-1 transition-all duration-200"
                  variants={fadeIn}
                >
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeIn}
          >
            <div className="glow-card p-6 sm:p-8 space-y-6">
              {[
                { number: "2.5+", label: "Years of Experience" },
                { number: "10+", label: "Projects Shipped" },
                { number: "20+", label: "Technologies Mastered" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 group"
                >
                  <span className="text-2xl sm:text-3xl font-heading font-bold gradient-text group-hover:scale-110 transition-transform duration-200">{stat.number}</span>
                  <span className="text-sm sm:text-base text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
