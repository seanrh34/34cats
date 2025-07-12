type Project = {
  title: string;
  image_src: string;
  description: string;
  date: string;
  association: string;
  technologies: string[];
  github: string;
  url: string;
};

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col items-center justify-start overflow-hidden rounded-[20px] 
    bg-gradient-to-r from-secondary via-background to-secondary
    transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_5px_25px_rgba(var(--color-accent-rgb))]">
      
      <div className="w-full h-full bg-black rounded-t-[20px] overflow-hidden flex items-center justify-center">
        <img
          src={project.image_src}
          alt={project.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-4 space-y-4 w-full">
        <div className="h-[150px]">
          <h2 className="text-accent group-hover:text-accent/70 text-xl md:text-2xl my-2">{project.title}</h2>
          <p className="text-text text-md md:text-lg">{project.description}</p>
        </div>
        <div className="flex flex-wrap text-xs mb-3 mx-2 gap-x-4 gap-y-1">
          <div>
            <p>Completion: <span className="text-text-secondary text-xs font-semibold">{project.date}</span></p>
          </div>
          <div>
            <p>Association: <span className="text-text-secondary text-xs font-semibold">{project.association}</span></p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-300">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-accent bg-opacity-20 text-text-secondary text-xs font-semibold px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex flex-row gap-2 text-xs text-slate-300">
          {project.github && project.github !== "NA" && (
            <button
              onClick={() => window.open(project.github, "_blank")}
              className="group/button flex justify-center items-center px-4 py-2 gap-4 w-1/2 bg-background outline-offset-[-3px] rounded-md cursor-pointer transition-all duration-400 border-background border-[2px] hover:bg-text"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z"
                  fill="white"
                  className="transition-all duration-400 group-hover/button:fill-[#181717]"
                />
              </svg>
              <p className="text-white font-bold text-text text-lg xl:text-lg group-hover/button:text-black transition-all duration-400">
                View Repo
              </p>
            </button>
          )}
          {project.url && (
            <button 
              onClick={() => window.open(project.url, "_blank")}
              className={`${
                project.github === "NA" ? "w-full" : "w-1/2"
              } group/button relative text-white text-lg font-semibold px-6 py-3 rounded-[10px] cursor-pointer bg-gradient-to-r from-primary via-accent to-primary`}>
              <span className="relative z-10 text-text">Try It!</span>
              <span className="absolute inset-[1px] rounded-[9px] bg-background transition-opacity duration-500 group-hover/button:opacity-90 z-0"></span>
              <span className="absolute inset-0 rounded-[9px] bg-gradient-to-r from-primary via-accent to-primary opacity-0 blur-[20px] transition-opacity duration-500 group-hover/button:opacity-100 z-0"></span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
