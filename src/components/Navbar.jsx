import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-black bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Hack The Stack
        </h1>

        {/* Links */}
        <div className="flex gap-8 text-sm font-semibold text-slate-300">
          <Link to="/" className="hover:text-indigo-400 transition">
            Leaderboard
          </Link>
          <Link to="/about" className="hover:text-indigo-400 transition">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
