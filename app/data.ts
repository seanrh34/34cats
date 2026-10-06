// ----------------------------------------------------------------
// Central content model for the 34cats portfolio.
// Every item with `placeholder: true` is invented scaffolding:
// natural to read, easy to spot, listed in PLACEHOLDERS.md.
// ----------------------------------------------------------------

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const siteUrl = `https://34cats.com${basePath}`;

/** Prefix a /public path with the env-driven basePath (next/image `unoptimized` does not). */
export const asset = (path: string) => `${basePath}${path}`;

export const site = {
  name: "Sean Richardson Hardjanto",
  shortName: "Sean Hardjanto",
  tagline: "AI & software engineer & NUS CS student",
  email: "seanhardjanto034@gmail.com",
  location: "Singapore",
  timezone: "Asia/Singapore",
  resumePath: "/seanhardjanto_resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/seanrh34" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sean-hardjanto-0b8874139/" },
    { label: "Blog", href: "https://blog.34cats.com" },
    { label: "Apps", href: "https://apps.34cats.com" },
  ],
} as const;

export const status = {
  text: "Open to internships: Summer 2027 & Aug–Nov 2027",
} as const;

export const hero = {
  name: "Sean Hardjanto",
  phrases: [
    "web apps people use",
    "tools for small teams",
    "things that ship",
    "websites for clients",
  ],
  intro:
    "I\u2019m a Computer Science student at NUS, and I like the front-end best: it\u2019s where I get to see my work come to life. My proudest work so far is the GenAI SEO Writer, which I built at Guidesify and which is still their flagship product.",
} as const;

export const sectionAnchors = [
  { id: "top", label: "Top", num: null },
  { id: "work", label: "Work", num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "education", label: "Education", num: "03" },
  { id: "toolbox", label: "Skills", num: "04" },
  { id: "offclock", label: "Outside code", num: "05" },
  { id: "faq", label: "FAQ", num: "06" },
  { id: "contact", label: "Contact", num: null },
] as const;

/** Short list shown in the floating pill; the mobile menu + palette show everything. */
export const navLinks = sectionAnchors.filter((s) =>
  ["work", "experience", "toolbox", "offclock", "contact"].includes(s.id),
);

export const marquee = {
  rows: [
    ["TypeScript", "React", "Next.js", "Svelte", "SvelteKit", "Node.js", "PostgreSQL", "Python"],
    [
      "Agentic AI",
      "LLMs",
      "MCP",
      "UiPath RPA",
      "Tailwind CSS",
      "REST APIs",
      "Computer Vision",
      "Prompt engineering",
      "SEO",
      "GIS",
      "Java",
      "WordPress",
    ],
  ],
} as const;

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
  footnote: string;
  placeholder?: boolean;
};

export const stats: Stat[] = [
  { value: 3, label: "AI and software engineering roles", footnote: "Univers · Aumovio · Guidesify" },
  { value: 200, suffix: "+", label: "freshmen onboarded", footnote: "RVRC orientation · vice project director" },
  { value: 3, label: "languages spoken", footnote: "English · Bahasa Indonesia · Mandarin" },
  { value: 85, suffix: "/90", label: "A-Level rank points", footnote: "Hwa Chong Institution · 2021" },
];

export type ProjectLink = { label: string; href: string };
export type ProjectMetric = { value: string; label: string; placeholder?: boolean };

export type Project = {
  slug: string;
  title: string;
  pitch: string;
  role: string;
  year: string;
  association: string;
  image: string;
  /** Optional looping demo clip under /public; when absent a poster state is shown. */
  video?: string;
  url?: string;
  repository?: string;
  placeholder?: boolean;
  tech: string[];
  caseStudy: {
    problem: string;
    built: string[];
    outcome: string;
    metrics: ProjectMetric[];
    stack: string[];
    gallery: string[];
    links: ProjectLink[];
  };
};

export const projects: Project[] = [
  {
    slug: "genai-seo-writer",
    title: "GenAI SEO Writer",
    pitch:
      "Turns a brief into an SEO-ready article, then publishes it to WordPress and Telegram from the same place.",
    role: "Product engineer",
    year: "Jun 2024–present",
    association: "Guidesify · flagship product",
    image: "/images/projects/genai-seo-writer.png",
    url: "https://app.guidesify.com/genai-seo-writer",
    tech: ["Svelte", "SvelteKit", "Tailwind CSS", "Node.js", "PostgreSQL", "WordPress", "Telegram", "REST APIs"],
    caseStudy: {
      problem:
        "At Guidesify, research, drafting, SEO checks and publishing all happened in different tools, so one article could take an afternoon of copy-paste.",
      built: [
        "A writing flow that starts from a brief and an auto-generated outline",
        "GenAI drafting with SEO guidance built in: keywords, structure and internal links",
        "One-click publishing to WordPress and Telegram straight from the draft",
        "A review queue so the team can edit before anything goes live",
      ],
      outcome:
        "One product now covers the whole content workflow. Guidesify and its clients still use it today.",
      metrics: [
        { value: "1", label: "product for the whole content workflow" },
        { value: "?", label: "faster article turnaround (add real figure)", placeholder: true },
      ],
      stack: ["Svelte", "SvelteKit", "Tailwind CSS", "Node.js", "PostgreSQL", "WordPress", "Telegram", "REST APIs"],
      gallery: ["/placeholders/gallery-genai-seo-writer-1.svg", "/placeholders/gallery-genai-seo-writer-2.svg"],
      links: [{ label: "View live product", href: "https://app.guidesify.com/genai-seo-writer" }],
    },
  },
  {
    slug: "uen-search",
    title: "UEN Search",
    pitch: "A simple search tool for finding ACRA-registered Singapore businesses by name or UEN.",
    role: "Product engineer",
    year: "Apr 2024",
    association: "Guidesify · internship",
    image: "/images/projects/uen-search.png",
    url: "https://app.guidesify.com/uen-search",
    tech: ["Svelte", "SvelteKit", "Tailwind CSS", "Node.js", "PostgreSQL", "REST APIs"],
    caseStudy: {
      problem:
        "Singapore\u2019s public business registry is thorough but awkward to use. Finding a company by name or UEN meant working through a form.",
      built: [
        "Search-as-you-type over ACRA\u2019s REST API",
        "Plain-language result cards: status, entity type, registered activities",
        "Result pages with their own link, so you can share one",
      ],
      outcome: "Made public business records easier to use for non-technical people.",
      metrics: [
        { value: "1", label: "search box for business records" },
        { value: "?", label: "median keystroke-to-result (add real figure)", placeholder: true },
      ],
      stack: ["Svelte", "SvelteKit", "Tailwind CSS", "Node.js", "PostgreSQL", "REST APIs"],
      gallery: ["/placeholders/gallery-uen-search-1.svg", "/placeholders/gallery-uen-search-2.svg"],
      links: [{ label: "Try the search", href: "https://app.guidesify.com/uen-search" }],
    },
  },
  {
    slug: "dozebuster",
    title: "DozeBuster",
    pitch: "A computer-vision study companion with a live Doze Meter for spotting when you drift off.",
    role: "Full-stack build",
    year: "Jan 2025",
    association: "Hack&Roll 2025 · team mud",
    image: "/images/projects/dozebuster.png",
    url: "https://devpost.com/software/dozebuster",
    repository: "https://github.com/seanrh34/team_mud",
    tech: ["React", "Next.js", "Tailwind CSS", "Python", "Computer Vision", "PostgreSQL"],
    caseStudy: {
      problem: "Long study sessions fail quietly: you only notice you drifted off after the time is gone.",
      built: [
        "A webcam attentiveness scorer built with Python and OpenCV",
        "A Next.js dashboard with a live Doze Meter and session timeline",
        "Gentle alerts when the meter says you are fading",
      ],
      outcome: "Built and demonstrated a working prototype in one hackathon weekend.",
      metrics: [
        { value: "48h", label: "from idea to demo at Hack&Roll 2025" },
        { value: "?", label: "drowsiness detection accuracy (add real figure)", placeholder: true },
      ],
      stack: ["React", "Next.js", "Tailwind CSS", "Python", "OpenCV", "PostgreSQL"],
      gallery: ["/placeholders/gallery-dozbuster-1.svg", "/placeholders/gallery-dozbuster-2.svg"],
      links: [
        { label: "Devpost write-up", href: "https://devpost.com/software/dozebuster" },
        { label: "Source code", href: "https://github.com/seanrh34/team_mud" },
      ],
    },
  },
];

export type ExperienceEntry = {
  id: string;
  period: string;
  role: string;
  company: string;
  summary: string;
  bullets: string[];
  tags: string[];
  /** Optional card photo; entries without one show a mono initial tile. */
  image?: { src: string; alt: string };
  /** Broad capability areas used by the toolbox cross-reference. */
  domains?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "univers",
    period: "Aug 2026–present",
    role: "AI Forward Deployed Engineer",
    company: "Univers",
    summary:
      "I work with client teams to find where an ontology layer or an AI platform would save them time, then prototype the fix quickly.",
    bullets: [
      "Analyzed existing client workflows and proposed solutions around building ontology layers and AI Platforms to improve business efficiency in collaboration with the AI lab heads and GTM team.",
      "Performed rapid prototyping for proposed solutions to validate feasibility and business impact.",
      "Conducted research on self-improvement and recursive self-improvement (RSI) agents and implemented SI and RSI loops, integrating them into both in-house and client solution workflows.",
    ],
    tags: ["Agentic AI", "LLMs", "Python", "Rapid prototyping", "Client workflow analysis"],
  },
  {
    id: "aumovio",
    period: "May 2026–Jul 2026",
    role: "AI & Automation Engineer",
    company: "Aumovio Singapore",
    summary:
      "I built UiPath RPA automations that pair LLMs and OCR with Python scripts to read documents accurately at a low cost.",
    image: { src: "/images/experience/experience-aumovio.jpg", alt: "Sean with fellow interns at Aumovio Singapore" },
    bullets: [
      "Developed UiPath Robotic Process Automation (RPA) applications to automate processes leveraging LLMs, OCR, and self-written Python scripts for both attended and unattended robot processes.",
      "Engineered prompts, guardrails, and workflows for LLMs to accurately extract information and to present them in a consistent manner from PDF files of varying templates to a near 100% accuracy while minimizing costs.",
      "Worked with product managers and senior engineers to make improvements to the applications according to client feedback, both technical and non-technical, following Agile principles.",
    ],
    tags: ["UiPath RPA", "LLMs", "Prompt engineering", "OCR", "Python", "Agile"],
  },
  {
    id: "guidesify",
    period: "Aug 2024–May 2026",
    role: "AI & Software Engineer",
    company: "Guidesify Pte. Ltd",
    summary:
      "I built and shipped Guidesify's GenAI products, including the SEO Writer and a UEN search app that lifted their digital impressions fast.",
    image: { src: "/images/experience/experience-guidesify.jpg", alt: "Sean with the Guidesify team" },
    bullets: [
      "Developed and deployed updates to the GenAI SEO Writer App to implement agentic AI capabilities including tools, sub-agents, orchestrator agents, and MCP servers for advanced reasoning and writing capabilities.",
      "Engineered, developed, and deployed a GenAI-powered B2B app using REST APIs to boost client brands' SEO ratings and digital presence, generating sustained sales revenue for Guidesify as one of their flagship products.",
      "Developed and deployed a Singapore company UEN Search web application with REST APIs using Svelte and SvelteKit, providing data on over 500,000 companies with minimal database storage usage. The app went on to increase the company's digital impressions by over 200% within 48 hours.",
    ],
    tags: ["Agentic AI", "MCP", "LLMs", "TypeScript", "Svelte", "SvelteKit", "Node.js", "PostgreSQL", "REST APIs", "SEO"],
  },
  {
    id: "saf",
    period: "Feb 2023–2024",
    role: "Military Intelligence Expert",
    company: "Singapore Armed Forces",
    summary:
      "I turned intelligence into maps, analysis and plans for local and overseas exercises, including next generation UAV trials.",
    image: { src: "/images/experience/experience-ns.jpg", alt: "Sean in Singapore Armed Forces ceremonial uniform" },
    bullets: [
      "Tactical map planning and analysis with Geographical Information Systems (GIS)",
      "Unmanned Aerial Vehicle (UAV) intelligence analysis",
      "Assisted with next generation tactical UAV trials in local and overseas exercises",
    ],
    tags: ["GIS", "UAV intelligence", "Intelligence analysis"],
  },
];

export type EducationCard = {
  id: string;
  school: string;
  period: string;
  headline: string;
  details: string[];
};

export const education: EducationCard[] = [
  {
    id: "nus",
    school: "National University of Singapore",
    period: "2024–present · Year 3",
    headline: "Bachelor of Computing in Computer Science · GPA 4.5/5.0",
    details: [
      "RVRC Orientation Vice Project Director, onboarded 200+ freshmen",
      "NUS Fencing Club Logistics Executive",
      "Coursework placeholder: favourite module so far (edit me)",
    ],
  },
  {
    id: "hci",
    school: "Hwa Chong Institution",
    period: "2020–2021",
    headline: "GCE A-Levels · 85/90 rank points",
    details: [
      "Floorball goalkeeper / defender",
      "Vice Chairperson, Project Rejuvenation with Blessings in a Bag",
    ],
  },
  {
    id: "bpghs",
    school: "Bukit Panjang Government High School",
    period: "2017–2019",
    headline: "7 A1s · L1R5 nett 2",
    details: ["NCC (Air), Platoon Sergeant", "Class chairperson"],
  },
];

export type SkillGroup = { group: string; skills: string[] };

export const toolbox: SkillGroup[] = [
  { group: "Languages", skills: ["TypeScript", "JavaScript", "Python", "Java", "HTML/CSS"] },
  {
    group: "AI & automation",
    skills: ["Agentic AI", "LLMs", "MCP", "Prompt engineering", "UiPath RPA", "OCR", "Computer Vision"],
  },
  { group: "Frontend", skills: ["React", "Next.js", "Svelte", "SvelteKit", "Tailwind CSS"] },
  { group: "Backend & data", skills: ["Node.js", "PostgreSQL", "REST APIs", "WordPress"] },
  { group: "Practices & tools", skills: ["Git", "Rapid prototyping", "Agile", "SEO", "GIS"] },
  {
    group: "Beyond code",
    skills: ["Client workflow analysis", "Intelligence analysis", "UAV intelligence", "Bahasa Indonesia"],
  },
];

export type SkillRef = {
  kind: "project" | "role";
  title: string;
  context: string;
  slug?: string;
  href?: string;
};

const norm = (s: string) => s.toLowerCase();

/** Cross-reference built from projects + experience at module load - not hard-coded. */
export const skillIndex: Record<string, SkillRef[]> = (() => {
  const map = new Map<string, SkillRef[]>();
  const add = (skill: string, ref: SkillRef) => {
    const key = norm(skill);
    const list = map.get(key) ?? [];
    if (!list.some((r) => r.title === ref.title)) list.push(ref);
    map.set(key, list);
  };
  for (const p of projects) {
    for (const t of p.tech) {
      add(t, { kind: "project", title: p.title, context: `${p.year} · ${p.association}`, slug: p.slug, href: p.url });
    }
  }
  for (const e of experience) {
    for (const t of [...e.tags, ...(e.domains ?? [])]) {
      add(t, { kind: "role", title: `${e.role} · ${e.company}`, context: e.period });
    }
  }
  return Object.fromEntries(map);
})();

export const lookUpSkill = (skill: string) => skillIndex[norm(skill)] ?? [];

export type Polaroid = { id: string; caption: string; image: string };

export const polaroids: Polaroid[] = [
  {
    id: "fencing-1",
    caption: "3rd place for SMUVC25 Men's Foil Teams",
    image: "/images/life/life-fencing-1.jpg",
  },
  {
    id: "rv-floorball",
    caption: "1st place with RVRC Floorball in Inter College Games 2025",
    image: "/images/life/life-rv-floorball.jpg",
  },
  {
    id: "rvfop",
    caption: "Vice-Project Director for RVFOP25",
    image: "/images/life/life-rvfop.jpg",
  },
];

export type Faq = { question: string; answer: string; placeholder?: boolean };

export const faqs: Faq[] = [
  {
    question: "Why is it called 34cats?",
    answer:
      "I currently have no plans to start a company or brand but if I did, I would name it 34cats. So I decided to use that domain for my personal website to get the domain early and maybe build some domain authority over time.",
  },
  {
    question: "What kind of roles are you open to?",
    answer:
      "I specialise in agentic AI and software engineering, so I'm most interested in Software/AI Engineer roles, but I'm open to other tech roles including, but not limited to, Forward Deployed Engineer and Product/Project Management roles.",
  },
  {
    question: "What is your availability?",
    answer:
      "As of October 2026, I'm open to full-time internships in summer 2027 and in Semester 1 (Aug–Nov 2027).",
  },
  {
    question: "What do you enjoy most about building software?",
    answer:
      "I love to see the results of my work, and building good software gives me the best validation for that, whether it's through the metrics my software improves or simply users saying that they liked it.",
  },
];

/** --- find-the-cats easter egg --- */
export const catTotal = 9;

export const catHints: { id: string; hint: string }[] = [
  { id: "hero", hint: "Warming up under the hero spotlight" },
  { id: "marquee", hint: "Chasing the marquee chips" },
  { id: "stats", hint: "Counting along in the numbers row" },
  { id: "work", hint: "Curled up on a project card" },
  { id: "experience", hint: "Hiding along the timeline" },
  { id: "education", hint: "Asleep in a school card" },
  { id: "toolbox", hint: "Nested between the tool chips" },
  { id: "offclock", hint: "Buried under the polaroid pile" },
  { id: "contact", hint: "Sitting on the contact shelf" },
];
