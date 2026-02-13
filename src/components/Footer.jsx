function Footer() {
  return (
    <footer className="mt-0 bg-slate-900/80 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 text-center text-slate-400 text-sm">
        
        <p className="font-semibold text-slate-300">
          Conducted by FOSS Club LBSITW
        </p>

        <p className="mt-2">
          © {new Date().getFullYear()} Hack The Stack. Open Source for Everyone.
        </p>

        

      </div>
    </footer>
  );
}

export default Footer;
