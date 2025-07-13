// Components
import HoverHeading from "../components/HoverHeading";
import ContactForm from "../components/ContactForm";


// Constants and assets
import { sectionWrapper } from "../constants";

export default function Contact() {
  return (
    <section id="contact" className={`${sectionWrapper} scroll-mt-24 min-h-screen border-none relative`}>
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 transform scale-y-[-1] animate-pulse-slow fixed-background-glow pointer-events-none" />
      <div className="text-center md:mb-24">
        <h2 className="text-text text-4xl font-bold md:hidden">Contact Me</h2>
        <div className="hidden md:block">
          <HoverHeading title="Contact Me" />
        </div>
      </div>
      <div className="w-full">
        <ContactForm />
      </div>
    </section>
  )
}
