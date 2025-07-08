import SocialLinks from "../components/Socials";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <section
      id="home"
      className="scroll-mt-24 min-h-screen flex flex-col pt-12 pb-12 px-24 items-center justify-center text-text font-body relative border-none"
    >
      <div className="absolute inset-0 z-0 animate-pulse-slow fixed-background-glow" />
      <div className="text-center">
        <h1 className="text-5xl md:text-8xl leading-tight md:leading-snug mb-6 md:mb-2 font-heading font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] bg-clip-text       text-transparent animate-gradient-x">
          Sean Hardjanto
        </h1>
        <h2 className="text-4xl md:text-5xl mb-6 md:mb-2 font-heading font-bold text-text">
          Web Developer
        </h2>
        <p className="text-lg md:text-2xl font-normal text-text md:mt-4 mb-6 md:mx-24">
          Dedicated to coming up with useful digital solutions as well as crafting experiences that are fun for me to make and great for you to use.
        </p>
      </div>
      <div className="flex flex-row md:flex-row gap-4 my-4">
        <a
          href="#projects"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 
          bg-transparent hover:bg-transparent text-slate-100 hover:text-white font-medium rounded-lg text-lg px-6 py-6 text-center transition-transform hover:scale-105 border-2 border-slate-600 hover:border-slate-300"
        >   
          View Projects
          <FaArrowRight />
        </a>
      </div>
      <div className="mt-12 flex items-center justify-center gap-6 text-3xl text-text">
        <SocialLinks />
      </div>
    </section>
  );
}
