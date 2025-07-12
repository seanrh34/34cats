// Components
import ProjectCard from '../components/ProjectCard';
import HoverHeading from "../components/HoverHeading";


// Constants and assets
import { sectionWrapper } from "../constants";
import { projectsData } from '../assets/profileData';

export default function Projects() {

  return (
    <section id="projects" className={`${sectionWrapper} scroll-mt-24 min-h-screen border-none relative`}>
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 transform scale-x-[-1] animate-pulse-slow fixed-background-glow pointer-events-none" />
      <div className="text-center md:mb-24">
        <h2 className="text-text text-4xl font-bold md:hidden">Projects</h2>
        <div className="hidden md:block">
          <HoverHeading title="Projects" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:px-96 mt-4 items-stretch">
        {projectsData.map((project, index) => (
          <div className="col-span-1 h-full" key={index}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}