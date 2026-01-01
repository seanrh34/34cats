import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const leftNavItems = [
  { href: "/resume", label: "Resume", external: false },
  { href: "https://apps.34cats.com", label: "Apps", external: true },
  { href: "https://blog.34cats.com", label: "Blog", external: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      let current = "";
      let minDistance = Infinity;
      
      for (const item of navItems) {
        const id = item.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          // Check if section is in viewport and closest to top
          if (rect.top <= 100 && rect.bottom >= 0 && distance < minDistance) {
            current = id;
            minDistance = distance;
          }
        }
      }

      if (window.scrollY < 50 && !current) current = "home";
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300
        bg-navbar text-text border-b px-6 shadow-md md:px-48 navbar-ring
        ${isScrolled || isOpen ? "bg-navbar/95 backdrop-blur-md border-secondary" : "border-transparent"}`}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center h-16 sm:h-20">
        <div className="flex items-center gap-6">
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center"
          >
            <img src="/34cats_main.png" alt="34cats" className="h-10 sm:h-12" />
          </a>

          {/* Left side links - Desktop only */}
          <div className="hidden md:flex space-x-4 font-body text-lg">
            {leftNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (!item.external) {
                    e.preventDefault();
                    navigate(item.href);
                    setIsOpen(false);
                  }
                }}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`px-3 py-2 rounded font-semibold transition-colors ${
                  location.pathname === item.href && !item.external
                    ? "text-text-secondary bg-accent bg-opacity-20"
                    : "text-text hover:bg-slate-700/30"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 font-body text-xl">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={'/' + item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`px-4 py-2 rounded font-semibold transition-colors ${
                activeSection === item.href.substring(1)
                  ? "text-text-secondary bg-accent bg-opacity-20"
                  : "text-text hover:bg-slate-700/30"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="text-2xl">{isOpen ? "✖" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown - always rendered, animated with max-h */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible"}
        `}
      >
        <div className="p-4 shadow-lg backdrop-blur-none border-t border-slate-700/60">
          {leftNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (!item.external) {
                  e.preventDefault();
                  navigate(item.href);
                  setIsOpen(false);
                }
              }}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={`block px-4 py-2 rounded-md text-base font-bold text-lg transition-colors ${
                location.pathname === item.href && !item.external
                  ? "text-teal-300 bg-teal-500/20"
                  : "text-slate-200 hover:text-white hover:bg-slate-700/40"
              }`}
            >
              {item.label}
            </a>
          ))}
          <hr className="my-2 border-slate-700/60" />
          {navItems.map((item) => (
            <a
              key={item.href}
              href={'/' + item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`block px-4 py-2 rounded-md text-base font-bold text-lg transition-colors ${
                activeSection === item.href.substring(1)
                  ? "text-teal-300 bg-teal-500/20"
                  : "text-slate-200 hover:text-white hover:bg-slate-700/40"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
