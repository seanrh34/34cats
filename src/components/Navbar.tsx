import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary text-text px-6 py-4 shadow-md flex justify-between items-center">
      <Link to="/" className="font-heading text-2xl text-accent">34cats</Link>
      <div className="space-x-6 hidden md:flex font-body text-sm">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  )
}
