export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-secondary text-text px-6 py-4 shadow-md flex justify-between items-center">
      <a href="#home" className="font-heading text-2xl font-bold text-text">
        34cats
      </a>
      <div className="space-x-6 hidden md:flex font-body text-xl">
        <a href="#about" className="hover:text-primary transition-colors">About</a>
        <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
      </div>
    </nav>
  )
}
