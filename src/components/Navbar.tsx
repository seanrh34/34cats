import { useEffect, useState } from 'react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -40% 0px', // triggers when section is near middle of screen
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);
    return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navbar border-b border-secondary text-text md:px-48 py-8 shadow-md flex justify-between items-center navbar-ring">
      <a href="#home" className="font-heading text-2xl font-bold text-text">
        34cats
      </a>
      <div className="space-x-6 hidden md:flex font-body text-xl">
        <a
          href="#about"
          className={`transition-colors ${
            activeSection === 'about' ? 'text-text bg-accent bg-opacity-30 px-4 py-2 rounded' : 'text-text px-4 py-2 rounded'
          }`}
        >
          About
        </a>
        <a
          href="#projects"
          className={`transition-colors ${
            activeSection === 'projects' ? 'text-text bg-accent bg-opacity-30 px-4 py-2 rounded' : 'text-text px-4 py-2 rounded'
          }`}
        >
          Projects
        </a>
        <a
          href="#contact"
          className={`transition-colors ${
            activeSection === 'contact' ? 'text-text bg-accent bg-opacity-30 px-4 py-2 rounded' : 'text-text px-4 py-2 rounded'
          }`}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}

