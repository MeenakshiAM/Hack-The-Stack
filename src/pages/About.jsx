function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 px-6 py-24">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
            About Hack The Stack
          </h1>
        </div>

        {/* Event Info */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-400">
             The Event
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Hack The Stack is a one-month open source contribution event
            conducted by the FOSS Club of LBS Institute of Technology for Women (LBSITW).
            The event encourages students to actively participate in real-world
            open-source development and collaborate with developers worldwide.
          </p>
        </section>

        {/* Objective */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-teal-400">
           Objective
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The primary goal of this event is to promote open-source culture,
            enhance collaboration skills, and help participants gain hands-on
            experience in contributing to live repositories.
          </p>
        </section>

        {/* Rules */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-cyan-400">
             Rules & Regulations
          </h2>

          <ul className="space-y-3 list-disc list-inside text-slate-300">
            <li>Participants must contribute to approved open-source repositories.</li>
            <li>Both Issues (open/closed) and Pull Requests (merged/unmerged) are counted.</li>
            <li>Quality contributions are encouraged over quantity.</li>
            <li>Spam PRs or irrelevant issues will be disqualified.</li>
            <li>Leaderboard updates automatically via GitHub Actions.</li>
            <li>Final rankings will be curated by the organizing committee.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-400">
            Points System
          </h2>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 space-y-4 text-slate-300">
            
            <p>
              Contributions are evaluated automatically through GitHub activity.
              The scoring is calculated as follows:
            </p>

            <ul className="space-y-2 list-disc list-inside">
              <li>Each Issue (Open or Closed) → <span className="text-indigo-400 font-bold">1 Point</span></li>
              <li>Each Pull Request (Merged or Open) → <span className="text-pink-400 font-bold">1 Point</span></li>
              <li>Contributions across multiple repositories increase visibility</li>
              <li>Spam or invalid contributions will be disqualified</li>
            </ul>

            <p className="text-xs opacity-60">
              Final leaderboard positions may be curated by the organizing team to ensure fairness.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}

export default About;
