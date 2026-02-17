import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-black bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
          Hack The Stack
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-300">
          <Link to="/" className="hover:text-indigo-400 transition">
            Leaderboard
          </Link>
          <Link to="/about" className="hover:text-indigo-400 transition">
            About
          </Link>
          <Link to="/rules" className="hover:text-indigo-400 transition">
            Rules and Regulations
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 bg-slate-900/95 text-slate-300 font-semibold">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Leaderboard
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/rules" onClick={() => setIsOpen(false)}>
            Rules and Regulations
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
