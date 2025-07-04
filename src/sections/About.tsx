import { sectionWrapper } from "../constants";

export default function About() {
  return (
    <section id="about" className={sectionWrapper}>
      <h2 className="text-3xl font-heading text-accent mb-4">About Me</h2>
      <p className="text-base">I'm passionate about building clean and effective digital experiences.</p>
    </section>
  )
}
