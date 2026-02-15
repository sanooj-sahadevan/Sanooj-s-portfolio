export const projects = [
  {
    title: "Eventopia.shop",
    description: "Event management platform with real-time chat, vendor booking, secure JWT authentication, PayU payment integration, AWS S3 storage, deployed on Vercel and AWS EC2 using NGINX.",
    tech: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Socket.IO"],
    live: "https://eventopia.shop/",
    github: "https://github.com/sanooj-sahadevan/E-vent-Project-II",
    category: "fullstack",
  },
  {
    title: "Bxxy.shop",
    description: "Secure e-commerce platform for selling shoes with Razorpay integration, invoice download using PDFKit, admin dashboard with charts and sales reports.",
    tech: ["Node.js", "Express", "MongoDB", "EJS", "AWS EC2"],
    live: "https://bxxy.shop/",
    category: "fullstack",
  },
  {
    title: "User Management System",
    description: "A comprehensive user management system with authentication, CRUD operations, and role-based access control.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    category: "mini",
  },
  {
    title: "OLX Clone",
    description: "A marketplace clone built with Firebase for real-time data and authentication.",
    tech: ["React", "Firebase", "CSS"],
    category: "mini",
  },
];

export const skills = {
  Languages: ["JavaScript", "TypeScript"],
  Frontend: ["React", "Next.js", "Redux Toolkit", "Tailwind CSS", "Material UI"],
  Backend: ["Node.js", "Express.js", "Repository Pattern"],
  Database: ["MongoDB", "PostgreSQL"],
  Integrations: ["Razorpay", "PayU", "AWS S3", "Nodemailer", "Multer", "Socket.IO"],
  Deployment: ["AWS EC2", "Vercel", "NGINX"],
};

export const experience = [
  {
    title: "MERN Stack Development",
    institution: "Brototype, Coimbatore",
    type: "education" as const,
  },
  {
    title: "BSc Geography",
    institution: "VV College of Science and Technology",
    type: "education" as const,
  },
];
