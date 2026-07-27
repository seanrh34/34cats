export const siteUrl = "https://34cats.com/seanhardjanto.com";
export const basePath = "/seanhardjanto.com";

export const projects = [
  {
    title: "GenAI SEO Writer",
    eyebrow: "Product engineering · Guidesify",
    description:
      "An end-to-end publishing workflow that turns a brief into an SEO-ready article, then ships it to WordPress and Telegram.",
    impact: "Reduced a multi-tool content workflow to one focused product.",
    technologies: ["SvelteKit", "TypeScript", "PostgreSQL", "WordPress API"],
    image: "/images/projects/genai-seo-writer.png",
    url: "https://app.guidesify.com/genai-seo-writer",
    cta: "View live product",
  },
  {
    title: "UEN Search",
    eyebrow: "Data product · Guidesify",
    description:
      "A fast, legible search interface for finding ACRA-registered Singapore businesses by name or UEN.",
    impact: "Made public business records useful to non-technical users.",
    technologies: ["SvelteKit", "REST APIs", "Node.js", "PostgreSQL"],
    image: "/images/projects/uen-search.png",
    url: "https://app.guidesify.com/uen-search",
    cta: "Try the search",
  },
  {
    title: "DozeBuster",
    eyebrow: "Computer vision · Hack&Roll 2025",
    description:
      "A focus companion that uses computer vision to turn attentiveness into a simple, actionable Doze Meter.",
    impact: "Built and demonstrated a working prototype in one hackathon weekend.",
    technologies: ["Next.js", "React", "Python", "Computer Vision"],
    image: "/images/projects/dozebuster.png",
    url: "https://devpost.com/software/dozebuster",
    repository: "https://github.com/seanrh34/team_mud",
    cta: "View case study",
  },
] as const;

export const experience = [
  {
    period: "2024 — present",
    role: "Freelance Web Developer",
    company: "Guidesify",
    description:
      "Builds and improves customer-facing products, ships new features with the app team, and delivers search-optimised WordPress sites for clients.",
  },
  {
    period: "Mar — Jul 2024",
    role: "Web Development & Digital Marketing Intern",
    company: "Guidesify",
    description:
      "Built an AI-assisted publishing tool, a WordPress site manager, and a Singapore company search product while contributing SEO content.",
  },
  {
    period: "2023 — 2024",
    role: "Military Intelligence Specialist",
    company: "Singapore Armed Forces",
    description:
      "Turned operational intelligence into maps, analysis, and clear plans for local and overseas exercises; also led battalion media work.",
  },
] as const;

export const faqs = [
  {
    question: "What kind of engineer is Sean Hardjanto?",
    answer:
      "Sean is a Singapore-based full-stack product engineer who works across customer discovery, interface design, application development, integrations, and delivery. His working style is closest to forward-deployed engineering: understand the real operational problem, build the useful thing, and iterate with users.",
  },
  {
    question: "What technologies does Sean work with?",
    answer:
      "Sean primarily works with TypeScript, React, Next.js, SvelteKit, Node.js, PostgreSQL, REST APIs, Python, and WordPress. He chooses tools around the product and deployment constraints rather than treating the stack as the goal.",
  },
  {
    question: "Where is Sean based?",
    answer:
      "Sean is based in Singapore and studies Computer Science at the National University of Singapore. He is a Singapore citizen and is open to relevant engineering opportunities.",
  },
] as const;
