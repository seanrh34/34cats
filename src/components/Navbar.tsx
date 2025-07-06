export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navbar border-b border-secondary text-text px-24 py-8 shadow-md flex justify-between items-center">
      <a href="#home" className="font-heading text-2xl font-bold text-text">
        34cats
      </a>
      <div className="space-x-6 hidden md:flex font-body text-xl">
        <a href="#about" className="hover:text-primary transition-colors">About</a>
        <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary blur-sm opacity-70 pointer-events-none" />
    </nav>
  )
}
