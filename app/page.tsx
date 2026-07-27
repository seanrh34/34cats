import Image from "next/image";
import Link from "next/link";
import { basePath, experience, faqs, projects, siteUrl } from "./data";

const Arrow = () => <span aria-hidden="true">↗</span>;

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
        image: `${siteUrl}/images/sean_photo_resized.jpg`,
        email: "mailto:seanhardjanto034@gmail.com",
        nationality: { "@type": "Country", name: "Singapore" },
        homeLocation: { "@type": "Place", name: "Singapore" },
        jobTitle: "Product Engineer",
        alumniOf: { "@type": "CollegeOrUniversity", name: "National University of Singapore" },
        sameAs: [
          "https://github.com/seanrh34",
          "https://www.linkedin.com/in/sean-hardjanto-0b8874139/",
          "https://leetcode.com/seanrh34",
          "https://blog.34cats.com",
        ],
        knowsAbout: ["Product engineering", "Full-stack development", "Next.js", "SvelteKit", "TypeScript", "PostgreSQL", "SEO"],
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
            description: project.description,
            url: project.url,
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
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Sean Hardjanto, home">
          <span className="wordmark-dot" /> SH
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="https://blog.34cats.com">Writing <Arrow /></a>
        </nav>
        <a className="header-cta" href="mailto:seanhardjanto034@gmail.com">Let&apos;s talk</a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Singapore · Open to opportunities</p>
            <h1>I turn messy problems into <em>working products.</em></h1>
            <p className="hero-intro">
              I&apos;m <strong>Sean Hardjanto</strong>, a product-minded engineer working across customer needs, software, data, and deployment — the territory of a forward-deployed engineer.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">See selected work <span aria-hidden="true">↓</span></a>
              <Link className="button button-secondary" href="/resume/">Read my résumé</Link>
            </div>
          </div>
          <div className="portrait-wrap">
            <div className="portrait-frame">
              <Image
                src={`${basePath}/images/sean_photo_resized.jpg`}
                alt="Sean Richardson Hardjanto, product engineer in Singapore"
                width={800}
                height={800}
                priority
                sizes="(max-width: 760px) 88vw, 38vw"
              />
            </div>
            <p><span>Currently</span> Computer Science at NUS<br />Building products at Guidesify</p>
          </div>
        </section>

        <section className="proof-strip" aria-label="Areas of practice">
          <span>Product discovery</span><span>Full-stack delivery</span><span>Customer integration</span><span>Deployment</span>
        </section>

        <section className="section" id="work">
          <div className="section-heading">
            <p className="eyebrow">01 / Selected work</p>
            <h2>Useful things, shipped.</h2>
            <p>Projects where the hard part was understanding the problem as much as writing the code.</p>
          </div>
          <div className="projects">
            {projects.map((project, index) => (
              <article className="project" key={project.title}>
                <a className="project-image" href={project.url} target="_blank" rel="noreferrer" aria-label={`View ${project.title}`}>
                  <Image src={`${basePath}${project.image}`} alt={`${project.title} product interface`} width={1280} height={720} sizes="(max-width: 760px) 92vw, 56vw" />
                  <span>0{index + 1}</span>
                </a>
                <div className="project-copy">
                  <p className="eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p className="impact"><span>Outcome</span>{project.impact}</p>
                  <ul className="tags" aria-label="Technologies">
                    {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                  <div className="project-links">
                    <a href={project.url} target="_blank" rel="noreferrer">{project.cta} <Arrow /></a>
                    {"repository" in project && <a href={project.repository} target="_blank" rel="noreferrer">Source code <Arrow /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a className="text-link" href="https://apps.34cats.com">Explore the 34cats app directory <Arrow /></a>
        </section>

        <section className="section about" id="about">
          <div className="section-heading">
            <p className="eyebrow">02 / How I work</p>
            <h2>Close to the problem.<br />Responsible for the outcome.</h2>
          </div>
          <div className="about-grid">
            <p className="about-lead">
              The best engineering starts before the editor opens. I like talking to the people doing the work, finding the constraint that matters, and carrying the solution all the way into use.
            </p>
            <div className="principles">
              <article><span>01</span><h3>Understand the terrain</h3><p>Map the user, workflow, data, and constraints before committing to a solution.</p></article>
              <article><span>02</span><h3>Make it tangible</h3><p>Use working software to replace assumptions with useful feedback quickly.</p></article>
              <article><span>03</span><h3>Own the last mile</h3><p>Integrate, deploy, document, and stay close enough to see whether it actually works.</p></article>
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="section-heading">
            <p className="eyebrow">03 / Experience</p>
            <h2>Engineering, with context.</h2>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <article key={`${item.company}-${item.period}`}>
                <p className="period">{item.period}</p>
                <div><h3>{item.role}</h3><p className="company">{item.company}</p></div>
                <p>{item.description}</p>
              </article>
            ))}
            <article>
              <p className="period">2024 — present</p>
              <div><h3>Bachelor of Computing</h3><p className="company">National University of Singapore</p></div>
              <p>Computer Science, alongside leadership roles in residential college orientation and the NUS Fencing Club.</p>
            </article>
          </div>
          <Link className="text-link" href="/resume/">Full résumé <Arrow /></Link>
        </section>

        <section className="section faq" aria-labelledby="faq-title">
          <div className="section-heading">
            <p className="eyebrow">04 / Quick context</p>
            <h2 id="faq-title">The short answers.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}
          </div>
        </section>

        <section className="contact" id="contact">
          <p className="eyebrow">Have a real problem to solve?</p>
          <h2>Let&apos;s make it work.</h2>
          <p>I&apos;m open to product engineering, forward-deployed engineering, and thoughtful collaborations.</p>
          <a className="button button-light" href="mailto:seanhardjanto034@gmail.com">seanhardjanto034@gmail.com <Arrow /></a>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Sean Hardjanto</p>
        <div><a href="https://github.com/seanrh34">GitHub</a><a href="https://www.linkedin.com/in/sean-hardjanto-0b8874139/">LinkedIn</a><a href="https://blog.34cats.com">Blog</a><a href="https://apps.34cats.com">Apps</a></div>
        <a href="#top">Back to top ↑</a>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
