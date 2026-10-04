// ————————————————————————————————————————————————————————————————
// Central content model for the 34cats portfolio.
// Every item with `placeholder: true` is invented scaffolding:
// natural to read, easy to spot, listed in PLACEHOLDERS.md.
// ————————————————————————————————————————————————————————————————

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/seanhardjanto.com";
export const siteUrl = `https://34cats.com${basePath}`;

/** Prefix a /public path with the env-driven basePath (next/image `unoptimized` does not). */
export const asset = (path: string) => `${basePath}${path}`;

export const site = {
  name: "Sean Richardson Hardjanto",
  shortName: "Sean Hardjanto",
  tagline: "full-stack product engineer & NUS CS student",
  email: "seanhardjanto034@gmail.com",
  location: "Singapore",
  timezone: "Asia/Singapore",
  resumePath: "/seanhardjanto_resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/seanrh34" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sean-hardjanto-0b8874139/" },
    { label: "LeetCode", href: "https://leetcode.com/seanrh34" },
    { label: "Blog", href: "https://blog.34cats.com" },
    { label: "Apps", href: "https://apps.34cats.com" },
  ],
} as const;

export const status = {
  text: "Open to Summer 2027 internships",
  placeholder: true,
} as const;

export const hero = {
  name: "Sean Hardjanto",
  phrases: [
    "products people actually use",
    "tools for messy real-world workflows",
    "things at 2am, then fix them at 9am",
    "with a cat-sized sense of humour",
  ],
  intro:
    "NUS Computer Science student who loves the front-end because it is where work comes to life — and who reads enough of the stack to know why. Proudest ship: the GenAI SEO Writer, still Guidesify\u2019s flagship product.",
} as const;

export const sectionAnchors = [
  { id: "top", label: "Top", num: null },
  { id: "work", label: "Work", num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "education", label: "Education", num: "03" },
  { id: "toolbox", label: "Toolbox", num: "04" },
  { id: "offclock", label: "Off the clock", num: "05" },
  { id: "now", label: "Now", num: "06" },
  { id: "faq", label: "FAQ", num: "07" },
  { id: "contact", label: "Contact", num: null },
] as const;

/** Short list shown in the floating pill; the mobile menu + palette show everything. */
export const navLinks = sectionAnchors.filter((s) =>
  ["work", "experience", "toolbox", "offclock", "contact"].includes(s.id),
);

export const marquee = {
  rows: [
    ["TypeScript", "React", "Next.js", "Svelte 5", "SvelteKit", "Node.js", "PostgreSQL", "Python"],
    ["Java", "WordPress", "Tailwind CSS", "REST APIs", "Computer Vision", "SEO", "ArcGIS", "DaVinci Resolve"],
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
  { value: 2, suffix: "+", label: "yrs shipping at Guidesify", footnote: "Intern, then freelance — still going" },
  { value: 200, suffix: "+", label: "freshmen onboarded", footnote: "RVRC orientation · vice project director" },
  { value: 3, label: "languages spoken", footnote: "English · Bahasa Indonesia · Mandarin", placeholder: true },
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
      "Turns a brief into an SEO-ready article, then ships it to WordPress and Telegram — one focused product instead of a multi-tool shuffle.",
    role: "Product engineer",
    year: "Jun 2024 — present",
    association: "Guidesify · flagship product",
    image: "/images/projects/genai-seo-writer.png",
    url: "https://app.guidesify.com/genai-seo-writer",
    tech: ["Svelte 5", "SvelteKit", "Tailwind CSS", "Node.js", "PostgreSQL", "WordPress", "Telegram", "REST APIs"],
    caseStudy: {
      problem:
        "Guidesify\u2019s content workflow lived across too many tools: research, drafting, SEO checks and publishing each happened somewhere different, so a single article cost an afternoon of copy-paste.",
      built: [
        "An end-to-end writing flow that starts from a brief and an auto-generated outline",
        "GenAI drafting with inline SEO guidance — keywords, structure, internal links — instead of a separate checklist",
        "One-click publishing to WordPress and Telegram straight from the draft",
        "A review queue so the team can edit before anything goes live",
      ],
      outcome:
        "Reduced a multi-tool content workflow to one focused product. Still a flagship Guidesify product used by businesses today.",
      metrics: [
        { value: "1", label: "product replacing a five-tool shuffle" },
        { value: "—%", label: "faster article turnaround (add real figure)", placeholder: true },
      ],
      stack: ["Svelte 5", "SvelteKit", "Tailwind CSS", "Node.js", "PostgreSQL", "WordPress", "Telegram", "REST APIs"],
      gallery: ["/placeholders/gallery-genai-seo-writer-1.svg", "/placeholders/gallery-genai-seo-writer-2.svg"],
      links: [{ label: "View live product", href: "https://app.guidesify.com/genai-seo-writer" }],
    },
  },
  {
    slug: "uen-search",
    title: "UEN Search",
    pitch: "A fast, legible search interface for finding ACRA-registered Singapore businesses by name or UEN.",
    role: "Product engineer",
    year: "Apr 2024",
    association: "Guidesify · internship",
    image: "/images/projects/uen-search.png",
    url: "https://app.guidesify.com/uen-search",
    tech: ["Svelte 5", "SvelteKit", "Tailwind CSS", "Node.js", "PostgreSQL", "REST APIs"],
    caseStudy: {
      problem:
        "Singapore\u2019s public business registry is thorough but not friendly — finding a company by name or UEN meant fighting a form instead of just typing what you knew.",
      built: [
        "Search-as-you-type over ACRA\u2019s REST API",
        "Plain-language result cards: status, entity type, registered activities",
        "Deep-linkable result pages so an answer could be shared",
      ],
      outcome: "Made public business records useful to non-technical users — a small product that removed a real lookup pain.",
      metrics: [
        { value: "1", label: "search box replacing a government form" },
        { value: "—ms", label: "median keystroke-to-result (add real figure)", placeholder: true },
      ],
      stack: ["Svelte 5", "SvelteKit", "Tailwind CSS", "Node.js", "PostgreSQL", "REST APIs"],
      gallery: ["/placeholders/gallery-uen-search-1.svg", "/placeholders/gallery-uen-search-2.svg"],
      links: [{ label: "Try the search", href: "https://app.guidesify.com/uen-search" }],
    },
  },
  {
    slug: "dozebuster",
    title: "DozeBuster",
    pitch: "A computer-vision focus companion that turns attentiveness into a simple, actionable Doze Meter.",
    role: "Full-stack build",
    year: "Jan 2025",
    association: "Hack&Roll 2025 · team mud",
    image: "/images/projects/dozebuster.png",
    url: "https://devpost.com/software/dozebuster",
    repository: "https://github.com/seanrh34/team_mud",
    tech: ["React", "Next.js", "Tailwind CSS", "Python", "Computer Vision", "PostgreSQL"],
    caseStudy: {
      problem: "Long study sessions fail quietly: you only find out you drifted off after the time is already gone.",
      built: [
        "A webcam attentiveness scorer built with Python and OpenCV",
        "A Next.js dashboard with a live Doze Meter and session timeline",
        "Gentle alerts when the meter says you are fading",
      ],
      outcome: "Built and demonstrated a working prototype in one hackathon weekend.",
      metrics: [
        { value: "48h", label: "from idea to demo at Hack&Roll 2025" },
        { value: "—%", label: "drowsiness detection accuracy (add real figure)", placeholder: true },
      ],
      stack: ["React", "Next.js", "Tailwind CSS", "Python", "OpenCV", "PostgreSQL"],
      gallery: ["/placeholders/gallery-dozbuster-1.svg", "/placeholders/gallery-dozbuster-2.svg"],
      links: [
        { label: "Devpost write-up", href: "https://devpost.com/software/dozebuster" },
        { label: "Source code", href: "https://github.com/seanrh34/team_mud" },
      ],
    },
  },
  {
    slug: "34cats",
    title: "34cats.com — this site",
    pitch:
      "The site you are on: a static-export Next.js portfolio with a dot-grid hero, a command palette, and a find-the-cats easter egg.",
    role: "Design + build",
    year: "2026",
    association: "Personal · design + build",
    image: "/placeholders/project-34cats.svg",
    video: "/videos/placeholder-demo.webm",
    url: "https://34cats.com",
    tech: ["TypeScript", "React", "Next.js", "CSS", "Motion"],
    caseStudy: {
      problem: "My old portfolio was a single static page — accurate, but it said nothing about how I like to build.",
      built: [
        "A fully static Next.js 16 site themed like a night shift, with a warm-paper light mode",
        "Interactive chrome: command palette (⌘K), custom cursor, scroll progress, velocity-reactive marquee",
        "A dot-grid canvas hero, a scroll-linked horizontal work showcase, a draggable polaroid pile",
        "A find-the-cats easter egg (this card is a hint-free zone)",
      ],
      outcome:
        "A portfolio that is itself a demo of what it claims: interaction design, accessibility, and performance on a static export.",
      metrics: [
        { value: "0", label: "servers harmed (static export only)" },
        { value: "—", label: "Lighthouse score (add after first deploy)", placeholder: true },
      ],
      stack: ["Next.js", "React", "TypeScript", "CSS", "Motion", "Canvas 2D"],
      gallery: ["/placeholders/gallery-34cats-1.svg", "/placeholders/gallery-34cats-2.svg"],
      links: [{ label: "You are already here", href: "https://34cats.com" }],
    },
  },
  {
    slug: "project-placeholder",
    title: "Project Placeholder",
    pitch: "Replace me — e.g. an N-body orbital playground from a CS module.",
    role: "TBD",
    year: "TBD",
    association: "NUS · module project (placeholder)",
    image: "/placeholders/project-placeholder.svg",
    video: "/videos/placeholder-demo.webm",
    placeholder: true,
    tech: ["TypeScript", "React", "Canvas"],
    caseStudy: {
      problem: "Placeholder problem statement — swap this with the real constraint once the module project ships.",
      built: [
        "Placeholder bullet one — what the first week actually produced",
        "Placeholder bullet two — the part you are proud of",
        "Placeholder bullet three — the part that fought back",
      ],
      outcome: "Placeholder outcome — one honest sentence about what it did, for whom.",
      metrics: [{ value: "—", label: "headline metric (add when real)", placeholder: true }],
      stack: ["TypeScript", "React", "Canvas"],
      gallery: ["/placeholders/gallery-project-placeholder-1.svg", "/placeholders/gallery-project-placeholder-2.svg"],
      links: [],
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
  /** Broad capability areas used by the toolbox cross-reference. */
  domains?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "guidesify-freelance",
    period: "2024 — present",
    role: "Freelance Web Developer",
    company: "Guidesify",
    summary: "Builds and improves customer-facing products, ships new features with the app team, and delivers SEO-optimised WordPress sites for clients.",
    bullets: [
      "Maintain, update, and improve Guidesify\u2019s apps and products, including the GenAI SEO Writer app",
      "Build new features and products for Guidesify together with Guidesify\u2019s app development team",
      "Build SEO-optimised WordPress sites for Guidesify\u2019s clients",
    ],
    tags: ["JavaScript", "TypeScript", "Svelte 5", "SvelteKit", "Tailwind CSS", "Node.js", "PostgreSQL", "REST APIs", "WordPress", "SEO"],
  },
  {
    id: "guidesify-intern",
    period: "Mar 2024 — Jul 2024",
    role: "Web Development & Digital Marketing Intern",
    company: "Guidesify",
    summary: "Built an AI-assisted publishing tool, a WordPress site manager, and a Singapore company search product while contributing SEO content.",
    bullets: [
      "Developed a WordPress site manager to simplify posting articles to WordPress sites and an AI Post Writer to write SEO-optimised articles with Telegram integration",
      "Developed a company UEN Search web application using REST APIs",
      "Wrote SEO-optimised articles on various topics for the company, including both local and international topics",
    ],
    tags: ["JavaScript", "TypeScript", "Svelte 4", "SvelteKit", "Tailwind CSS", "Node.js", "PostgreSQL", "REST APIs", "SEO"],
  },
  {
    id: "saf",
    period: "Feb 2023 — 2024",
    role: "Military Intelligence Specialist",
    company: "Singapore Armed Forces",
    summary: "Turned operational intelligence into maps, analysis and clear plans for local and overseas exercises; also led the battalion\u2019s media work.",
    bullets: [
      "Supported both local and overseas exercises by visualising intelligence gathered, analysing intelligence, as well as assisting with planning and presenting plans based on the compiled intelligence",
      "Took charge of the battalion\u2019s social media and publications, including photo and video taking, writing captions, and managing other media personnel",
    ],
    tags: ["ArcGIS", "Microsoft Excel", "Microsoft PowerPoint", "DaVinci Resolve"],
    domains: ["Intelligence analysis", "Media production"],
  },
  {
    id: "ntu",
    period: "Jan 2022 — Feb 2022",
    role: "Multilingual Transcriptionist",
    company: "Nanyang Technological University",
    summary: "Transcribed regional-language conversations for NTU\u2019s speech-to-text project.",
    bullets: [
      "Transcribed audio recordings of conversations into text in Bahasa Indonesia where some of the conversations included regional languages such as Javanese and Sundanese for NTU\u2019s speech-to-text project",
    ],
    tags: ["Bahasa Indonesia", "Javanese", "Sundanese", "Transcription"],
    domains: ["Transcription"],
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
    period: "2024 — present · Year 3",
    headline: "Bachelor of Computing in Computer Science",
    details: [
      "RVRC Orientation Vice Project Director — onboarded 200+ freshmen",
      "NUS Fencing Club Logistics Executive",
      "Coursework placeholder — favourite module so far (edit me)",
    ],
  },
  {
    id: "hci",
    school: "Hwa Chong Institution",
    period: "2020 — 2021",
    headline: "GCE A-Levels · 85/90 rank points",
    details: [
      "Floorball goalkeeper / defender",
      "Vice Chairperson, Project Rejuvenation with Blessings in a Bag",
    ],
  },
  {
    id: "bpghs",
    school: "Bukit Panjang Government High School",
    period: "2017 — 2019",
    headline: "7 A1s · L1R5 nett 2",
    details: ["NCC (Air) — Platoon Sergeant", "Class chairperson"],
  },
];

export type SkillGroup = { group: string; skills: string[] };

export const toolbox: SkillGroup[] = [
  { group: "Languages", skills: ["TypeScript", "JavaScript", "Python", "Java", "SQL"] },
  { group: "Frontend", skills: ["React", "Next.js", "Svelte 5", "SvelteKit", "Tailwind CSS", "CSS"] },
  { group: "Backend & data", skills: ["Node.js", "PostgreSQL", "REST APIs", "WordPress"] },
  { group: "Tools", skills: ["Git & GitHub", "SEO", "ArcGIS", "DaVinci Resolve", "Microsoft Excel"] },
  { group: "Non-code", skills: ["Media production", "Intelligence analysis", "Transcription", "Bahasa Indonesia", "Javanese", "Sundanese"] },
];

export type SkillRef = {
  kind: "project" | "role";
  title: string;
  context: string;
  slug?: string;
  href?: string;
};

const norm = (s: string) => s.toLowerCase();

/** Cross-reference built from projects + experience at module load — not hard-coded. */
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
  { id: "fencing", caption: "Fencing at NUS", image: "/placeholders/photo-fencing.svg" },
  { id: "floorball", caption: "Floorball keeper days", image: "/placeholders/photo-floorball.svg" },
  { id: "rvrc", caption: "RVRC orientation", image: "/placeholders/photo-rvrc.svg" },
  { id: "battalion", caption: "Battalion media shoot", image: "/placeholders/photo-battalion.svg" },
  { id: "hacknroll", caption: "Hack&Roll 2025 all-nighter", image: "/placeholders/photo-hacknroll.svg" },
  { id: "cats", caption: "The 34 cats (allegedly)", image: "/placeholders/photo-cats.svg" },
];

export type NowItem = { label: string; text: string; placeholder?: boolean };

export const nowItems: NowItem[] = [
  { label: "Building", text: "Prototyping the next Guidesify experiment — details when it ships.", placeholder: true },
  { label: "Learning", text: "Algorithms & complexity, one LeetCode grind at a time.", placeholder: true },
  { label: "Reading", text: "Something with a cat on the cover, probably.", placeholder: true },
  { label: "Listening", text: "Lo-fi and a purring space heater.", placeholder: true },
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
      "Software and product engineering internships, plus part-time freelance web work that fits around the semester — especially front-end and full-stack product roles.",
    placeholder: true,
  },
  {
    question: "What is your availability?",
    answer: "Part-time during semesters; full-time May to August.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Day to day: TypeScript, SvelteKit and Node/PostgreSQL at Guidesify; React and Next.js for hackathons and this site; Python and Java at NUS. I pick the tool around the product, not the other way round.",
  },
  {
    question: "What do you enjoy most about building software?",
    answer:
      "The problem-solving — and not just the technical kind. Working out the real workflow behind a request, and the design and UX decisions that make a tool feel obvious, is the part I enjoy most.",
  },
];

/** ——— find-the-cats easter egg ——— */
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
