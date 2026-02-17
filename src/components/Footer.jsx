import fossLogo from "../assets/foss_logo.jpeg";

function Footer() {
  return (
    <footer className="mt-0 bg-slate-900/80 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 text-center text-slate-400 text-sm space-y-4">

        {/* Logo */}
        <div className="flex justify-center">
  <div className="w-10 h-10 rounded-full  border-indigo-400 flex items-center justify-center overflow-hidden">
    <img
      src={fossLogo}
      alt="FOSS Club Logo"
      className="w-full h-full object-cover"
    />
  </div>
</div>



        {/* Text */}
        <p className="font-semibold text-slate-300">
          Conducted by FOSS Club LBSITW
        </p>

        <p>
          © {new Date().getFullYear()} Hack The Stack. Open Source for Everyone.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
