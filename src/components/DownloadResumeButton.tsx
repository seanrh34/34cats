import { HiDownload } from 'react-icons/hi';

export default function DownloadResumeButton() {
  return (
    <a
      href="/seanhardjanto_resume.pdf"
      download
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Download Resume"
    >
      <div className="relative">
        {/* Animated glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
        
        {/* Main button */}
        <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-primary via-accent to-primary shadow-lg transition-all duration-300 group-hover:scale-110 group-active:scale-95">
          <div className="absolute inset-[2px] rounded-full bg-background flex items-center justify-center">
            <HiDownload className="w-6 h-6 sm:w-7 sm:h-7 text-accent transition-all duration-300 group-hover:text-text-secondary group-hover:scale-110" />
          </div>
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-secondary rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <span className="text-text text-sm font-semibold">Download Resume</span>
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-secondary"></div>
        </div>
      </div>
    </a>
  );
}
