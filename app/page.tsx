import { Footer } from "./components/footer";
import { Contact } from "./components/contact";
import { Education } from "./components/education";
import { Faq } from "./components/faq";
import { Hero } from "./components/hero";
import { Marquee } from "./components/marquee";
import { OffClock } from "./components/polaroids";
import { Stats } from "./components/stats";
import { Timeline } from "./components/timeline";
import { Toolbox } from "./components/toolbox";
import { Work } from "./components/work";
import { faqs, projects, siteUrl } from "./data";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Sean Richardson Hardjanto",
        alternateName: "Sean Hardjanto",
        url: `${siteUrl}/`,
        image: `${siteUrl}/images/sean-main.jpg`,
        email: "mailto:seanhardjanto034@gmail.com",
        nationality: { "@type": "Country", name: "Singapore" },
        homeLocation: { "@type": "Place", name: "Singapore" },
        jobTitle: "AI & Software Engineer",
        alumniOf: { "@type": "CollegeOrUniversity", name: "National University of Singapore" },
        sameAs: [
          "https://github.com/seanrh34",
          "https://www.linkedin.com/in/sean-hardjanto-0b8874139/",
          "https://leetcode.com/seanrh34",
          "https://blog.34cats.com",
        ],
        knowsAbout: [
          "Agentic AI",
          "LLM applications",
          "Software engineering",
          "Next.js",
          "SvelteKit",
          "TypeScript",
          "PostgreSQL",
          "SEO",
        ],
      },
      {
        "@type": "ItemList",
        name: "Selected software projects by Sean Hardjanto",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            name: project.title,
            description: project.pitch,
            ...(project.url ? { url: project.url } : {}),
            author: { "@id": `${siteUrl}/#person` },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <main id="main">
        <Hero />
        <Marquee />
        <Stats />
        <Work />
        <Timeline />
        <Education />
        <Toolbox />
        <OffClock />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
