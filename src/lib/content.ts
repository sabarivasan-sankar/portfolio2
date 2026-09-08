export const profile = {
  name: "Sabarivasan Sankar",
  role: "Full-Stack Engineer",
  location: "Coimbatore, India",
  positioning:
    "I build the systems that move money and permissions safely, then the interfaces people actually touch.",
  email: "sabarivasans315@gmail.com",
  github: {
    label: "sabarivasan-sankar",
    url: "https://github.com/sabarivasan-sankar",
  },
  linkedin: {
    label: "Sabarivasan Sankar",
    url: "https://linkedin.com/in/sabarivasan-sankar",
  },
};

export const about = {
  paragraphs: [
    "I'm a full-stack engineer with three-plus years building secure, scalable web applications, from backend systems handling real money and sensitive data to the React interfaces layered on top.",
    "I started as an intern at Rently Software Development and worked up to mid-level engineer, architecting role-based access control systems, integrating payment infrastructure, and building the data pipelines that keep enterprise systems in sync.",
    "I'm comfortable across the whole stack. TypeScript and React on the front end, Node.js, Express, and PostgreSQL on the back end, with hands-on time in Kafka-based data pipelines and some Go and Svelte on the side.",
  ],
};

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  commits: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer, Mid-Level",
    company: "Rently Software Development",
    period: "Mar 2026 - Present",
    current: true,
    commits: [
      "architect granular role- and permission-based access control across enterprise workflows",
      "harden full-stack architecture for performance, reliability, and security compliance",
      "drive cross-functional system design with product and platform teams",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Rently Software Development",
    period: "Jul 2024 - Mar 2026",
    commits: [
      "build and maintain core invoicing, billing, and automated inventory modules",
      "integrate Cybersource for one-time payments and recurring billing cycles",
      "engineer Kafka-based pipelines syncing high-volume data via REST APIs and Celigo",
    ],
  },
  {
    role: "Intern Developer",
    company: "Rently Software Development",
    period: "Mar 2023 - Jul 2024",
    commits: [
      "ship RESTful APIs from scratch with Node.js, Express, and PostgreSQL",
      "build React dashboards for internal admin portals",
      "write foundational database schemas",
    ],
  },
];

export type SkillGroup = {
  dir: string;
  items: { name: string; note?: string }[];
};

export const skills: SkillGroup[] = [
  {
    dir: "languages/",
    items: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "SQL / PostgreSQL" },
      { name: "Go", note: "familiar" },
      { name: "Ruby on Rails", note: "familiar" },
    ],
  },
  {
    dir: "frontend/",
    items: [
      { name: "React" },
      { name: "Redux" },
      { name: "Tailwind CSS" },
      { name: "Svelte", note: "familiar" },
      { name: "React Native", note: "familiar" },
    ],
  },
  {
    dir: "backend-security/",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "RESTful APIs" },
      { name: "RBAC" },
    ],
  },
  {
    dir: "data-infra/",
    items: [
      { name: "Apache Kafka" },
      { name: "Change Data Capture" },
      { name: "Celigo" },
      { name: "CI/CD" },
      { name: "cloud infrastructure" },
      { name: "microservices" },
      { name: "distributed systems" },
    ],
  },
  {
    dir: "practice/",
    items: [
      { name: "performance tuning" },
      { name: "database indexing" },
      { name: "unit & integration testing" },
      { name: "agile" },
    ],
  },
];

export type Highlight = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  stack: string[];
};

export const highlights: Highlight[] = [
  {
    id: "rbac",
    title: "Role-Based Access Control Engine",
    summary:
      "A granular permission model for enterprise workflows, replacing a flat role system that couldn't scale past a handful of user types.",
    detail:
      "Permission checks resolve through a single indexed query per request, not a cascade of role lookups.",
    stack: ["Node.js", "PostgreSQL", "Express"],
  },
  {
    id: "payments",
    title: "Cybersource Payment Integration",
    summary:
      "One-time and recurring billing cycles wired through Cybersource, reconciled against internal invoice state.",
    detail:
      "Webhook handling is idempotent, so a retried callback never double-bills a customer.",
    stack: ["Cybersource", "Node.js", "PostgreSQL"],
  },
  {
    id: "pipelines",
    title: "Cross-System Data Pipeline",
    summary:
      "Kafka-based pipelines syncing high-volume data between internal systems and Celigo-connected enterprise tools.",
    detail:
      "Change data capture keeps downstream systems consistent continuously, replacing what used to be a nightly batch job.",
    stack: ["Apache Kafka", "REST APIs", "Celigo"],
  },
];

export type Credential = {
  title: string;
  issuer: string;
  date: string;
};

export const credentials: Credential[] = [
  {
    title: "Meta Frontend Development Certificate",
    issuer: "Coursera",
    date: "Oct 2024",
  },
  {
    title: "Business Champ Award",
    issuer: "Rently Software Development",
    date: "Oct 2024",
  },
];
