function Header({ data }) {
  return (
    <div className="mb-16 text-center animate-fadeIn">
      
      {/* Event Title */}
      <h1 className="
        text-4xl md:text-6xl font-black tracking-tight
        bg-gradient-to-r from-indigo-400 via-teal-400 to-cyan-400
        bg-clip-text text-transparent
        bg-[length:200%_200%]
        animate-shimmer mt-12
        drop-shadow-xl 
      ">
        {data.eventName}
      </h1>

      {/* Subheading */}
      <p className="mt-6 text-xs md:text-sm uppercase tracking-[0.3em] text-slate-500">
        Last Updated
      </p>

      {/* Timestamp */}
      <p className="text-lg md:text-xl font-semibold text-slate-200 mt-2 animate-pulseSlow">
        {new Date(data.lastUpdated).toLocaleString()}
      </p>

      {/* Animated Divider */}
      <div className="
        w-40 h-1 mx-auto mt-8 rounded-full
        bg-gradient-to-r from-indigo-500 via-purple-500 to-green-500
        bg-[length:200%_200%]
        animate-shimmer
      " />

    </div>
  );
}

export default Header;
